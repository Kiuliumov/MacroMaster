import { useState } from "react";
import { commonStyles } from "../commonStyles";
import UsernameInput from "./UsernameInput";
import EmailInput from "./EmailInput";
import NameFields from "./NameFields";
import PasswordFields from "./PasswordFields";
import { API_BASE_URL } from "../../../config";

export default function RegisterForm({ onSuccess }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const hasErrors =
    Object.values(fieldErrors).some(Boolean) || 
    !form.username ||
    !form.email ||
    !form.password ||
    !form.password2;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasErrors) return;

    setSubmitError("");

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        const firstError =
          typeof data === "object" && Object.values(data)[0]
            ? Array.isArray(Object.values(data)[0])
              ? Object.values(data)[0][0]
              : Object.values(data)[0]
            : "Registration failed";
        setSubmitError(firstError);
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
      setFieldErrors({});
    } catch (err) {
      setSubmitError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
      {submitError && (
        <p className="text-red-600 font-semibold mb-2">{submitError}</p>
      )}

      <UsernameInput form={form} setForm={setForm} setFieldErrors={setFieldErrors} />
      <EmailInput form={form} setForm={setForm} setFieldErrors={setFieldErrors} />
      <NameFields form={form} setForm={setForm} setFieldErrors={setFieldErrors} />
      <PasswordFields form={form} setForm={setForm} setFieldErrors={setFieldErrors} />

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
