import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setAccessToken, logout as logoutAction } from "../src/state_manager/userSlice";
import { API_BASE_URL } from "../src/config";

export function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const accessToken = useSelector((state) => state.user.accessToken);

  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!user;

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  useEffect(() => {
    async function rehydrateUser() {
      try {
        let token = document.cookie
          .split("; ")
          .find((c) => c.startsWith("access="))
          ?.split("=")[1];

        if (!token) {
          const refreshRes = await fetch(`${API_BASE_URL}/refresh/`, {
            method: "POST",
            credentials: "include",
          });

          if (!refreshRes.ok) {
            logout();
            setLoading(false);
            return;
          }

          const { access: newAccess } = await refreshRes.json();
          dispatch(setAccessToken(newAccess));
          token = newAccess;
        }

        const meRes = await fetch(`${API_BASE_URL}/me/`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });

        if (!meRes.ok) {
          logout();
          setLoading(false);
          return;
        }

        const data = await meRes.json();
        dispatch(setUser({ user: data.user, access: token }));
      } catch (err) {
        console.error("Could not rehydrate user:", err);
        logout();
      } finally {
        setLoading(false);
      }
    }

    rehydrateUser();
  }, [dispatch, logout]);

  return { user, isLoggedIn, token: accessToken, loading, logout };
}
