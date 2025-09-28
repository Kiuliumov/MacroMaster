import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setAccessToken, logout } from "../src/state_manager/userSlice";
import { API_BASE_URL } from "../src/config";

export function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const accessToken = useSelector((state) => state.user.accessToken);

  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!user;

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
            dispatch(logout());
            return;
          }

          const { access: newAccess } = await refreshRes.json();
          token = newAccess;
          dispatch(setAccessToken(newAccess));
        }

        const meRes = await fetch(`${API_BASE_URL}/me/`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });

        if (!meRes.ok) {
          dispatch(logout());
          return;
        }

        const data = await meRes.json();
        if (!data.user) throw new Error("Invalid /me/ response");

        dispatch(setUser({ user: data.user, access: token }));
      } catch (err) {
        console.error("Could not rehydrate user:", err);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    }

    rehydrateUser();
  }, [dispatch]);

  return { user, isLoggedIn, token: accessToken, loading };
}
