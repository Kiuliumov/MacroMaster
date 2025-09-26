import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setAccessToken } from "../src/state_manager/userSlice";
import { API_BASE_URL } from "../src/config";

export function useLogin() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const login = async (username, password) => {
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include", 
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Invalid credentials.");
      }

      dispatch(setUser({ user: data.user, access: data.access }));
      dispatch(setAccessToken(data.access));

      return { user: data.user, access: data.access };
    } catch (err) {
      setError(err.message || "Login failed");
      return null;
    }
  };

  return { login, error };
}
