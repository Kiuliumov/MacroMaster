import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setAccessToken } from "../src/state_manager/userSlice";
import { API_BASE_URL } from "../src/config";

export function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const accessToken = useSelector((state) => state.user.accessToken);

  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function rehydrateUser() {
      try {
        let token =
          accessToken ||
          document.cookie
            .split("; ")
            .find((c) => c.startsWith("access="))
            ?.split("=")[1];

        if (!token) {
          setIsLoggedIn(false);
          setLoading(false);
          return;
        }

        let meRes = await fetch(`${API_BASE_URL}/me/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!meRes.ok) {
          const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh/`, {
            method: "POST",
            credentials: "include",
          });

          if (!refreshRes.ok) {
            setIsLoggedIn(false);
            setLoading(false);
            return;
          }

          const { access: newAccess } = await refreshRes.json();
          if (!newAccess) throw new Error("No access token returned");

          dispatch(setAccessToken(newAccess));
          token = newAccess;

          meRes = await fetch(`${API_BASE_URL}/me/`, {
            headers: {
              Authorization: `Bearer ${newAccess}`,
            },
            credentials: "include",
          });

          if (!meRes.ok) throw new Error("Failed to fetch user after refresh");
        }

        const data = await meRes.json();
        if (!data.user) throw new Error("Unexpected /me/ response shape");

        dispatch(setUser({ user: data.user, access: token }));
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Could not rehydrate user:", err);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }

    rehydrateUser();
  }, [dispatch, accessToken]);

  return { user, isLoggedIn, token: accessToken, loading };
}
