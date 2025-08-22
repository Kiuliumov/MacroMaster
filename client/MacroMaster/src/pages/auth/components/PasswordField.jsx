import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import PasswordStrengthMeter from "../../../components/PassStrength";

export default function PasswordField({
  value,
  onChange,
  placeholder,
  name,
  compareValue, 
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (name === "password") {
      setError(
        value && value.length < 8
          ? "Password must be at least 8 characters"
          : ""
      );
    } else if (name === "password2") {
      setError(value && value !== compareValue ? "Passwords do not match" : "");
    }
  }, [value, compareValue, name]);

  return (
    <div className="w-full">
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="new-password"
          className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {name === "password" && <PasswordStrengthMeter password={value} />}

      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}
