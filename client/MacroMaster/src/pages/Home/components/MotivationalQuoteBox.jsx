export default function MotivationalQuoteBox({ quote, loading, error }) {
  return (
    <div
      className="mt-6 p-6 bg-gradient-to-r from-green-200/30 to-green-300/30 dark:from-blue-900/40 dark:to-blue-800/40
                  rounded-3xl shadow-inner text-center animate-fade-in max-w-3xl mx-auto
                  h-48 flex flex-col justify-center overflow-hidden"
    >
      {loading && (
        <p className="italic text-gray-500 dark:text-gray-400 truncate">
          Loading your daily motivation...
        </p>
      )}

      {error && (
        <p className="italic text-red-500 truncate">
          Could not load a quote today. Keep pushing forward!
        </p>
      )}

      {!loading && !error && (
        <div className="flex flex-col justify-center h-full overflow-auto">
          <p className="italic text-lg md:text-xl text-green-700 dark:text-blue-300 font-medium leading-snug">
            “{quote.content}”
          </p>
          {quote.author && (
            <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400">
              — {quote.author}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
