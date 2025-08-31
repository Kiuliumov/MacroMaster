export const commonStyles = {
  container:
    "relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 pb-10 pt-10",

  gradientBlur:
    "absolute inset-0 blur-[118px] max-w-4xl h-[900px] mx-auto sm:max-w-5xl sm:h-[500px]",

  headerWrapper: "text-center mb-12 max-w-3xl",
  pageTitle: "text-4xl md:text-5xl font-extrabold mb-4",
  pageSubtitle: "text-lg md:text-xl text-gray-700 dark:text-gray-300",

  card:
    "bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700",
  cardTitle: "text-2xl font-bold mb-6 text-center",

  form: "flex flex-col space-y-5",
  input:
    "w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500",
  textarea:
    "w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500",
  button:
    "w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-medium py-2 rounded-xl transition-colors",

  status: "text-center mb-4 text-sm text-green-500",

  grid: "grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl items-start",

  mapWrapper:
    "rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col",
  mapText: "text-center text-gray-700 dark:text-gray-300 mt-2",
  iframe: "w-full h-full min-h-[400px] border-0",

  featuresGrid: "mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full",
  featureCard:
    "bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100 dark:border-gray-600",
  featureIcon: "mx-auto h-12 w-12 mb-4",
  featureTitle: "text-xl font-semibold mb-3",
  featureText: "text-gray-700 dark:text-gray-300 text-sm leading-relaxed",

  btnPrimary:
    "px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-600 hover:shadow-xl transition transform hover:-translate-y-0.5",
  btnSecondary:
    "px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition transform hover:-translate-y-0.5",
  btnDashboard:
    "px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-lg hover:bg-green-600 hover:shadow-xl transition transform hover:-translate-y-0.5",
};
