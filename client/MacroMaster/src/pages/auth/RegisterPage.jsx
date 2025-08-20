import React, { useState } from "react";
import { API_BASE_URL } from "../../config";
import PasswordInput from "../../components/PasswordField";
import PasswordStrengthMeter from "../../components/PassStrength";
import CardWrapper from "./components/CardWrapper";
import { commonStyles } from "./commonStyles";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(JSON.stringify(errData));
      }
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <CardWrapper title="Create Account">
      {error && <p className={commonStyles.errorText}>{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          autoComplete="username"
          className={commonStyles.input}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          className={commonStyles.input}
          required
        />

        <div className="flex flex-col md:flex-row gap-4">
          <input
            name="first_name"
            placeholder="First name"
            value={form.first_name}
            onChange={handleChange}
            autoComplete="given-name"
            className={`${commonStyles.input} md:flex-1`}
          />
          <input
            name="last_name"
            placeholder="Last name"
            value={form.last_name}
            onChange={handleChange}
            autoComplete="family-name"
            className={`${commonStyles.input} md:flex-1`}
          />
        </div>

        <div>
          <PasswordInput
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            name="password"
            autoComplete="new-password"
          />
          <PasswordStrengthMeter password={form.password} />
        </div>

        <PasswordInput
          value={form.password2}
          onChange={handleChange}
          placeholder="Confirm password"
          name="password2"
          autoComplete="new-password"
        />

        <button type="submit" className={commonStyles.button}>
          Register
        </button>
      </form>

      <p className={commonStyles.textCenter}>
        Already have an account? <a href="/login" className={commonStyles.link}>Log in</a>
      </p>
    </CardWrapper>
  );
}
