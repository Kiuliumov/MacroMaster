export default function ProgressBar({ progress }) {
  return (
    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 overflow-hidden">
      <div
        className="h-2 bg-purple-500 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
