import { useState } from "react";
import { API_BASE_URL } from "../../../config";
import FormInput from "./FormInput";
import PasswordFields from "./PasswordFields";
import { commonStyles } from "../commonStyles";
import { validateEmail, validateUsername, validatePassword } from "../validation";

export default function RegisterForm({ onSuccess }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const validators = {
    username: (val) =>
      val && !validateUsername(val)
        ? "Username must be at least 3 characters and only contain Latin letters/numbers."
        : "",
    email: (val) => (val && !validateEmail(val) ? "Invalid email format" : ""),
    password: (val) =>
      val && !validatePassword(val)
        ? "Password must be at least 8 characters and contain at least one letter."
        : "",
    password2: (val) =>
      val && val !== form.password ? "Passwords do not match" : "",
  };

  const validateField = (name, value, updatedForm = form) => {
    if (!validators[name]) return;
    setErrors((prev) => ({
      ...prev,
      [name]: validators[name](value, updatedForm),
      ...(name === "password" && updatedForm.password2
        ? { password2: updatedForm.password2 !== value ? "Passwords do not match" : "" }
        : {}),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    validateField(name, value, updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    Object.entries(form).forEach(([field, value]) =>
      validateField(field, value, form)
    );

    const hasErrors =
      Object.values(errors).some(Boolean) ||
      !form.username ||
      !form.email ||
      !form.password ||
      !form.password2;

    if (hasErrors) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        const fieldErrors = {};
        Object.keys(data).forEach((key) => {
          fieldErrors[key] = Array.isArray(data[key]) ? data[key].join(", ") : data[key];
        });
        setErrors((prev) => ({ ...prev, ...fieldErrors }));
        return;
      }

      onSuccess();
      setForm({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        password2: "",
      });
      setErrors({});
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const hasErrors =
    Object.values(errors).some(Boolean) ||
    !form.username ||
    !form.email ||
    !form.password ||
    !form.password2;

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
        disabled={loading || hasErrors}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
