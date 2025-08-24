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

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const hasErrors =
    Object.values(errors).some(Boolean) ||
    !form.username ||
    !form.email ||
    !form.password ||
    !form.password2;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

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
          fieldErrors[key] = Array.isArray(data[key])
            ? data[key].join(", ")
            : data[key];
        });
        setErrors((prev) => ({ ...prev, ...fieldErrors }));
        return;
      }

      onSuccess();
      setForm({ username: "", email: "", first_name: "", last_name: "", password: "", password2: "" });
      setErrors({});
    } catch (err) {
      setSubmitError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
      {submitError && <p className="text-red-600 font-semibold mb-2">{submitError}</p>}

      <UsernameInput form={form} setForm={setForm} errors={errors} setErrors={setErrors} />
      <EmailInput form={form} setForm={setForm} errors={errors} setErrors={setErrors} />
      <NameFields form={form} setForm={setForm} />
      <PasswordFields form={form} setForm={setForm} errors={errors} />

      <button type="submit" className={commonStyles.button} disabled={loading || hasErrors}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
