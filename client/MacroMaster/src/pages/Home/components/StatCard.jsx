export default function StatCard({ icon, label, value, suffix }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-3xl p-8 text-center transform transition duration-400 ease-in-out hover:scale-105 hover:shadow-2xl animate-fade-in flex flex-col items-center gap-3 w-full">
      
      <div className="text-5xl mb-2 text-blue-500 flex justify-center items-center">
        {icon}
      </div>

      <p className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
        {value != null ? `${value}${suffix ?? ""}` : "Not set"}
      </p>

      <p className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
}
