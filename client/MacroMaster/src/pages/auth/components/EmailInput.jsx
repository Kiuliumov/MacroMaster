import { useRef, useState } from "react";
import FormInput from "./FormInput";
import { validateEmail, checkEmailAvailable } from "../validation";
import { commonStyles } from "../commonStyles";

export default function EmailInput({ form, setForm, errors, setErrors }) {
  const [checking, setChecking] = useState(false);
  const timeoutRef = useRef(null);
  const lastCallRef = useRef(0);

  const handleChange = (e) => {
  const { value } = e.target;
  setForm((prev) => ({ ...prev, email: value }));

  if (!validateEmail(value)) {
    setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
    return;
  } else {
    setErrors((prev) => ({ ...prev, email: "" }));
  }

  clearTimeout(timeoutRef.current);
  timeoutRef.current = setTimeout(async () => {
    const callId = Date.now();
    lastCallRef.current = callId;

    setChecking(true);
    const available = await checkEmailAvailable(value);
    setChecking(false);

    if (lastCallRef.current === callId) {
      setErrors((prev) => ({
        ...prev,
        email: available ? "" : "Email is already registered",
      }));
    }
  }, 500);
};

  return (
    <div className="relative">
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
      {checking && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
