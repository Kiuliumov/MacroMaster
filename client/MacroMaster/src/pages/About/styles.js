export const styles = {
  about: {
    gradientBlur: {
      background:
        "linear-gradient(106.89deg, rgba(192, 132, 252, 0.2) 15.73%, rgba(14, 165, 233, 0.6) 15.74%, rgba(232, 121, 249, 0.35) 56.49%, rgba(79, 70, 229, 0.5) 115.91%)",
    },
    contentWrapper:
      "relative max-w-5xl mx-auto space-y-20 flex flex-col items-center w-full",
  },

  header: {
    wrapper: "text-center max-w-3xl mx-auto",
    logoWrapper: "flex justify-center mb-6",
    logo: "h-16 w-16",
    title: "text-4xl font-bold mb-4",
    titleHighlight: "text-blue-500",
    subtitle: "text-lg text-gray-700 dark:text-gray-300 leading-relaxed",
  },

  mission: {
    container: "mt-16 max-w-2xl text-center",
    heading: "text-3xl font-bold mb-4",
    text: "text-gray-700 dark:text-gray-300 text-lg leading-relaxed",
  },

  featuresGrid: {
    container: "mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl w-full",
    colors: {
      logMeals: "text-green-500",
      trackProgress: "text-blue-500",
      balanceMacros: "text-purple-500",
      team: "text-yellow-500",
    },
  },

  valuesGrid: {
    container: "mt-16 max-w-5xl w-full text-center",
    heading: "text-3xl font-bold mb-8",
    grid: "grid grid-cols-1 md:grid-cols-3 gap-8",
    colors: {
      health: "text-red-500",
      quality: "text-yellow-400",
      empowerment: "text-green-500",
    },
  },

  valueCard: {
    container:
      "bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-600",
    icon: "mx-auto h-10 w-10 mb-4",
    title: "text-xl font-semibold mb-2",
    text: "text-gray-700 dark:text-gray-300 text-sm",
  },

  testimonialsGrid: {
    container: "mt-16 max-w-5xl w-full text-center",
    heading: "text-3xl font-bold mb-8",
    grid: "grid grid-cols-1 md:grid-cols-2 gap-8",
  },

  testimonialCard: {
    container:
      "bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-600",
    text: "text-gray-700 dark:text-gray-300 text-sm mb-2",
    author: "font-semibold",
  },

  cta: {
    container: "mt-16 text-center",
    heading: "text-3xl font-bold mb-4",
    text: "text-gray-700 dark:text-gray-300 mb-6",
    button:
      "inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition transform hover:-translate-y-0.5",
  },
};
