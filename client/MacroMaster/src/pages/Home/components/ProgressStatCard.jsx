export default function ProgressStatCard({ icon, label, value, suffix, progress }) {
  let progressBarColor = "from-blue-400 to-blue-600";
  if (label === "Calories" && progress > 100) {
    progressBarColor = "from-yellow-500 to-red-700";
  }

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-2xl rounded-3xl p-6 text-center transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-3xl flex flex-col items-center gap-4 w-full">
      
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 text-white text-3xl shadow-lg">
        {icon}
      </div>

      <p className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
        {value != null ? `${value}${suffix ?? ""}` : "Not set"}
      </p>

      <p className="text-sm md:text-base font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {label}
      </p>

      {progress != null && progress >= 0 && (
        <div className="relative w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-3 shadow-inner">
          <div
            className={`absolute top-0 left-0 h-6 bg-gradient-to-r ${progressBarColor} rounded-full transition-all duration-700`}
            style={{ width: `${Math.min(progress, 150)}%` }}
          />
          <span className="absolute right-2 top-0 text-xs font-semibold text-gray-900 dark:text-gray-100">
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
}
