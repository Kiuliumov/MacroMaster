import React, { useState } from "react";
import { API_BASE_URL } from "../../config";
import CardWrapper from "./components/CardWrapper";
import { commonStyles } from "./commonStyles";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/forgot-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to send email");
      }
      setMessage("Password reset email sent. Check your inbox!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <CardWrapper title="Forgot Password">
      {message && <p className={commonStyles.successText}>{message}</p>}
      {error && <p className={commonStyles.errorText}>{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={commonStyles.input}
          required
        />
        <button type="submit" className={commonStyles.button}>Send Reset Email</button>
      </form>

      <p className={commonStyles.textCenter}>
        Remember your password? <a href="/login" className={commonStyles.link}>Log in</a>
      </p>
    </CardWrapper>
  );
}
