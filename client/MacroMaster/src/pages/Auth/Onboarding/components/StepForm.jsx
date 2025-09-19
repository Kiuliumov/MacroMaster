export default function StepForm({ step, value, error, onChange }) {
  const inputClasses =
    "w-full px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm dark:shadow-none";

  return (
    <div className="transition-all duration-500">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center">
        {step.icon} {step.title}
      </h2>

      <div className="mb-4">
        {step.type === "number" && (
          <input
            type="number"
            placeholder={step.placeholder}
            value={value}
            onChange={(e) => onChange(step.field, e.target.value)}
            className={`${inputClasses} no-spinner`}
          />
        )}
        {step.type === "select" && (
          <select
            value={value}
            onChange={(e) => onChange(step.field, e.target.value)}
            className={inputClasses}
          >
            {step.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt.charAt(0).toUpperCase() + opt.slice(1).replace("_", " ")}
              </option>
            ))}
          </select>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
    </div>
  );
}
