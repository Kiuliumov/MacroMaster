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

      setMessage("✅ Password reset email sent. Check your inbox!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className={commonStyles.container}>
      <div
        className={commonStyles.loginGradientBlur}
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.2) 15.73%, rgba(14, 165, 233, 0.6) 15.74%, rgba(232, 121, 249, 0.35) 56.49%, rgba(79, 70, 229, 0.5) 115.91%)",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
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
            <button type="submit" className={commonStyles.button}>
              Send Reset Email
            </button>
          </form>

          <p className={commonStyles.textCenter}>
            Remember your password?{" "}
            <a href="/login" className={commonStyles.link}>
              Log in
            </a>
          </p>
        </CardWrapper>
      </div>
    </main>
  );
}
