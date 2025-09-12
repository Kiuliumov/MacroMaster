export default function StatCard({ icon, label, value, suffix }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-6 text-center transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl animate-fade-in flex flex-col items-center gap-2 w-full">
      <div className="text-4xl">{icon}</div>
      <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
        {value != null ? `${value}${suffix ?? ""}` : "Not set"}
      </p>
      <p className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
}
