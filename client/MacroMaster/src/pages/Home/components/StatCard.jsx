export default function StatCard({ icon, label, value, suffix }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4 text-center transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg animate-fade-in flex flex-col items-center gap-2 w-full">
      
      <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">
        {icon}
      </div>

      <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
        {value != null ? `${value}${suffix ?? ""}` : "—"}
      </p>

      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
}
