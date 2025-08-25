import { useRef, useState } from "react";
import FormInput from "./FormInput";
import { validateUsername, checkUsernameAvailable } from "../validation";
import { commonStyles } from "../commonStyles";

export default function UsernameInput({ form = {}, setForm, setFieldErrors }) {
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const timeoutRef = useRef(null);
  const lastCallRef = useRef(0);

  const handleChange = (e) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, username: value }));

    if (!validateUsername(value)) {
      setError(
        "Username must be at least 3 characters and only contain letters/numbers."
      );
      setFieldErrors((prev) => ({ ...prev, username: "invalid" }));
      return;
    } else {
      setError("");
      setFieldErrors((prev) => ({ ...prev, username: "" }));
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      const callId = Date.now();
      lastCallRef.current = callId;

      setChecking(true);
      const available = await checkUsernameAvailable(value);
      setChecking(false);

      if (lastCallRef.current === callId) {
        if (!available) {
          setError("Username is already taken");
          setFieldErrors((prev) => ({ ...prev, username: "taken" }));
        } else {
          setError("");
          setFieldErrors((prev) => ({ ...prev, username: "" }));
        }
      }
    }, 300);
  };

  return (
    <div className="relative">
      <FormInput
        name="username"
        placeholder="Username"
        value={form.username || ""}
        onChange={handleChange}
        autoComplete="username"
        error={error}
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
