import React, { useState } from "react";
import { API_BASE_URL } from "../../config";
import PasswordStrengthMeter from "../../components/PassStrength";
import PasswordInput from "../../components/PasswordField";

const styles = {
  container:
    "min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center px-6 py-12",
  card: "w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700",
  title: "text-3xl md:text-4xl font-bold mb-6 text-center",
  link: "text-green-600 dark:text-green-400 hover:underline font-medium",
  textCenter: "text-center text-sm text-gray-600 dark:text-gray-400 mt-6",
};

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create Account</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            autoComplete="username"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <div className="flex flex-col md:flex-row w-full gap-3 md:gap-4">
            <input
              type="text"
              name="first_name"
              placeholder="First name"
              value={form.first_name}
              onChange={handleChange}
              autoComplete="given-name"
              className="w-full md:flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last name"
              value={form.last_name}
              onChange={handleChange}
              autoComplete="family-name"
              className="w-full md:flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
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

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-medium py-2 rounded-xl transition-colors"
          >
            Register
          </button>
        </form>

        <p className={styles.textCenter}>
          Already have an account?{" "}
          <a href="/login" className={styles.link}>
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
