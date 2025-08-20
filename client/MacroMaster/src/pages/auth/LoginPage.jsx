import React, { useState } from "react";
import { API_BASE_URL } from "../../config";
import PasswordInput from "../../components/PasswordField";
import CardWrapper from "./components/CardWrapper";
import { commonStyles } from "./commonStyles";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <CardWrapper title="Login">
      {error && <p className={commonStyles.errorText}>{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          autoComplete="username"
          className={commonStyles.input}
          required
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
        />

        <div className="text-center">
          <a href="/forgot-password" className={commonStyles.link}>Forgot Password?</a>
        </div>

        <button type="submit" className={commonStyles.button}>Log In</button>
      </form>

      <p className={commonStyles.textCenter}>
        Don’t have an account? <a href="/register" className={commonStyles.link}>Sign up</a>
      </p>
    </CardWrapper>
  );
}
