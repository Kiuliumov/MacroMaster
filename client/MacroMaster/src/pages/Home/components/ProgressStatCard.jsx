export default function ProgressStatCard({
  icon,
  label,
  value,
  suffix,
  progress,
  subLabel,
}) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition group text-center">
      <div className="flex flex-col items-center gap-1 mb-3">
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:scale-105 transition">
          {icon}
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {value}
            {suffix}
          </p>
          {subLabel && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {subLabel}
            </p>
          )}
        </div>
      </div>

      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}
