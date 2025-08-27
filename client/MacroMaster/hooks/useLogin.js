import { useState } from "react";
import { API_BASE_URL } from "../src/config";

export function useLogin() {
  const [error, setError] = useState("");

  const login = async (username, password) => {
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Invalid credentials.");
      }

      document.cookie = `access=${data.access}; path=/; max-age=${
        60 * 60 * 24
      }; SameSite=Lax; Secure`;
      document.cookie = `refresh=${data.refresh}; path=/; max-age=${
        60 * 60 * 24 * 7
      }; SameSite=Lax; Secure`;

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  return { login, error };
}
