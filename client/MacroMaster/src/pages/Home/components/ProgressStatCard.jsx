export default function ProgressStatCard({ icon, label, value, suffix, progress }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-6 text-center transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl animate-fade-in flex flex-col items-center gap-2 w-full">
      <div className="text-4xl">{icon}</div>
      <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
        {value != null ? `${value}${suffix ?? ""}` : "Not set"}
      </p>
      <p className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {label}
      </p>
      {progress != null && progress >= 0 && (
        <div className="relative w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-2">
          <div
            className="absolute top-0 left-0 h-6 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
          <span className="absolute right-2 top-0 text-xs font-semibold text-gray-900 dark:text-gray-100">
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
}
