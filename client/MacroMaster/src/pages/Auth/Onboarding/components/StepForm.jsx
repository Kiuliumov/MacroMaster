export default function StepForm({ step, value, error, onChange }) {
  const numberFieldProps = {
    weight: { min: 45, max: 120, step: 1, default: 60 },
    height: { min: 150, max: 200, step: 1, default: 170 },
    age: { min: 18, max: 80, step: 1, default: 25 },
  };

  const inputClasses =
    "w-full h-3 rounded-2xl appearance-none bg-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500";

  const fillPercentage = () => {
    if (!numberFieldProps[step.field]) return 0;
    const { min, max } = numberFieldProps[step.field];
    return ((value - min) / (max - min)) * 100;
  };

  const handleSliderChange = (field, val) => {
    onChange(field, Number(val));
  };

  return (
    <div className="transition-all duration-500">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex justify-center items-center gap-3 text-center">
        {step.icon} {step.title}
      </h2>

      <div className="mb-6 relative w-full">
        {step.type === "number" && (
          <>
            <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm mb-2">
              <span>{numberFieldProps[step.field].min}</span>
              <span>{numberFieldProps[step.field].max}</span>
            </div>
            <input
              type="range"
              min={numberFieldProps[step.field].min}
              max={numberFieldProps[step.field].max}
              step={numberFieldProps[step.field].step}
              value={value || numberFieldProps[step.field].default}
              onChange={(e) => handleSliderChange(step.field, e.target.value)}
              className={inputClasses}
              style={{
                background: `linear-gradient(to right, #7c3aed ${fillPercentage()}%, #d1d5db ${fillPercentage()}%)`,
              }}
            />
            <div className="mt-2 text-center text-gray-700 dark:text-gray-300 font-medium text-lg">
              {value || numberFieldProps[step.field].default}{" "}
              {step.field === "weight"
                ? "kg"
                : step.field === "height"
                ? "cm"
                : "years"}
            </div>
          </>
        )}

        {step.type === "select" && (
          <div className="relative">
            <select
              value={value}
              onChange={(e) => onChange(step.field, e.target.value)}
              className="w-full px-5 py-3 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
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

      {error && <p className="text-red-500 text-sm mb-4 animate-pulse">{error}</p>}
    </div>
  );
}
