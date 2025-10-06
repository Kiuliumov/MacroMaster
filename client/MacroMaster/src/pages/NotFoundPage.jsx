import { commonStyles } from "../styles/commonStyles";

export default function NotFoundPage() {
  return (
    <main className={`${commonStyles.container} grid place-items-center`}>
      <div
        className={commonStyles.gradientBlur}
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.2) 15.73%, rgba(14, 165, 233, 0.6) 15.74%, rgba(232, 121, 249, 0.35) 56.49%, rgba(79, 70, 229, 0.5) 115.91%)",
        }}
      />

      <div className={`${commonStyles.card} text-center p-8 relative z-10`}>
        <h1 className="text-6xl md:text-7xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          404
        </h1>
        <p className="text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300 mb-6">
          😕 Oops! The page you’re looking for doesn’t exist.
        </p>
        <a
          href="/"
          className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium text-base transition"
        >
          Go back to Homepage
        </a>
      </div>
    </main>
  );
}
