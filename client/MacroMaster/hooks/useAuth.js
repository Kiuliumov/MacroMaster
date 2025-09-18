import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setAccessToken } from "../src/state_manager/userSlice";
import { API_BASE_URL } from "../src/config";

export function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const accessToken = useSelector((state) => state.user.accessToken);

  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken); 

  const onboardingRequired = user && !user.stats?.daily_calories;

  useEffect(() => {
    async function rehydrateUser() {
      if (!user) {
        try {
          const refreshRes = await fetch(`${API_BASE_URL}/refresh/`, {
            method: "POST",
            credentials: "include", 
          });

          if (!refreshRes.ok) {
            setIsLoggedIn(false);
            setLoading(false);
            return;
          }

          const { access: newAccess } = await refreshRes.json();
          dispatch(setAccessToken(newAccess));
          setIsLoggedIn(true);

          const meRes = await fetch(`${API_BASE_URL}/me/`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${newAccess}`,
            },
            credentials: "include",
          });

          if (!meRes.ok) throw new Error("Failed to fetch user");

          const data = await meRes.json();
          dispatch(setUser({ user: data.user, access: newAccess }));
        } catch (err) {
          console.error("Could not rehydrate user:", err);
          setIsLoggedIn(false);
        } finally {
          setLoading(false);
        }
      } else {
        setIsLoggedIn(true); 
        setLoading(false);
      }
    }

    rehydrateUser();
  }, [user, dispatch]);

  return {
    user,
    isLoggedIn,
    token: accessToken,
    onboardingRequired,
    loading,
  };
}
