import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../src/state_manager/userSlice";
import { API_BASE_URL } from "../src/config";

export function useLogout() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await fetch(`${API_BASE_URL}/logout/`, {
        method: "POST",
        credentials: "include", 
      });

      dispatch(logoutAction());
    } catch (err) {
      console.error("Logout failed:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  return { logout, loading, error };
}
