export default function StatCard({ icon, label, value, suffix }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition group text-center">
      <div className="flex flex-col items-center gap-2">
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:scale-105 transition">
          {icon}
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {value}
            {suffix}
          </p>
        </div>
      </div>
    </div>
  );
}
