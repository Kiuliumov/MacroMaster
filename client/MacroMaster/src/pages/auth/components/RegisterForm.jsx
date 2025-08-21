import { useState } from "react";
import { API_BASE_URL } from "../../../config";
import FormInput from "./FormInput";
import PasswordFields from "./PasswordFields";
import { commonStyles } from "../commonStyles";

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateUsername = (username) => /^[A-Za-z]{3,}$/.test(username);

  const validateForm = (field, value) => {
    switch (field) {
      case "username":
        setErrors((prev) => ({
          ...prev,
          username:
            value && !validateUsername(value)
              ? "Username must be at least 3 letters and only English characters"
              : "",
        }));
        break;
      case "email":
        setErrors((prev) => ({
          ...prev,
          email: value && !validateEmail(value) ? "Invalid email format" : "",
        }));
        break;
      case "password":
        setErrors((prev) => ({
          ...prev,
          password:
            value && value.length < 8 ? "Password must be at least 8 characters" : "",
          password2:
            form.password2 && value !== form.password2
              ? "Passwords do not match"
              : "",
        }));
        break;
      case "password2":
        setErrors((prev) => ({
          ...prev,
          password2:
            value && value !== form.password ? "Passwords do not match" : "",
        }));
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateForm(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (errors.username || errors.email || errors.password || errors.password2) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(
          errData.detail || JSON.stringify(errData) || "Registration failed"
        );
      }

      window.location.href = "/";
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
      {submitError && <p className="text-red-600 font-semibold mb-2">{submitError}</p>}

      <FormInput
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        autoComplete="username"
        error={errors.username}
        className={commonStyles.input}
        required
      />

      <FormInput
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        autoComplete="email"
        error={errors.email}
        className={commonStyles.input}
        required
      />

      <div className="flex flex-col md:flex-row gap-4">
        <FormInput
          name="first_name"
          placeholder="First name"
          value={form.first_name}
          onChange={handleChange}
          autoComplete="given-name"
          className={`${commonStyles.input} md:flex-1`}
        />
        <FormInput
          name="last_name"
          placeholder="Last name"
          value={form.last_name}
          onChange={handleChange}
          autoComplete="family-name"
          className={`${commonStyles.input} md:flex-1`}
        />
      </div>

      <PasswordFields form={form} errors={errors} handleChange={handleChange} />

      <button
        type="submit"
        className={commonStyles.button}
        disabled={
          loading ||
          errors.username ||
          errors.email ||
          errors.password ||
          errors.password2
        }
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
