import React from "react";

function getStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: "Very Weak", color: "bg-red-500", width: "20%" };
  if (score === 2) return { label: "Weak", color: "bg-orange-500", width: "40%" };
  if (score === 3) return { label: "Moderate", color: "bg-yellow-500", width: "60%" };
  if (score === 4) return { label: "Strong", color: "bg-green-500", width: "80%" };
  return { label: "Very Strong", color: "bg-emerald-600", width: "100%" };
}

export default function PassStrength({ password }) {
  if (!password) return null;

  const { label, color, width } = getStrength(password);

  return (
    <div className="mt-2">
      <div className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-300`}
          style={{ width }}
        />
      </div>
      <p className="mt-1 text-sm font-medium">{label}</p>
    </div>
  );
}
