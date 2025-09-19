export default function StepForm({ step, value, error, onChange }) {
  const inputClasses =
    "w-full px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm dark:shadow-none appearance-none";

  return (
    <div className="transition-all duration-500">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100 flex justify-center items-center gap-3 text-center">
        {step.icon} {step.title}
      </h2>

      <div className="mb-6 relative">
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
          <div className="relative">
            <select
              value={value}
              onChange={(e) => onChange(step.field, e.target.value)}
              className={`${inputClasses} pr-10 cursor-pointer`}
            >
              {step.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt.charAt(0).toUpperCase() + opt.slice(1).replace("_", " ")}
                </option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
              ▼
            </span>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-4 animate-pulse">{error}</p>
      )}
    </div>
  );
}
