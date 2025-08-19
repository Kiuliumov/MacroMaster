import React from "react";
import Logo from "../components/Logo";

const positions = [
  {
    title: "Front-End Developer",
    description: "Build beautiful interfaces and ensure a seamless experience for our users.",
  },
  {
    title: "Back-End Developer",
    description: "Design robust APIs, manage databases, and keep everything running smoothly.",
  },
  {
    title: "UI/UX Designer",
    description: "Create intuitive designs and delightful experiences for our users.",
  },
  {
    title: "QA Engineer",
    description: "Test, break, and improve the app to maintain the highest quality standards.",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center py-6 px-4">
      <Logo className="h-16 w-16 mb-4" />
      <h1 className="text-4xl md:text-5xl font-bold mb-3 text-center">
        Join <span className="text-green-600 dark:text-green-400">The Cantina</span>
      </h1>
      <p className="text-lg md:text-xl mb-8 text-center max-w-3xl text-gray-700 dark:text-gray-300">
        Our developers are the cantina—brewing code, crafting features, and keeping the app running smoothly.
      </p>

      <h2 className="text-3xl md:text-4xl font-semibold mb-5 text-center">
        Open Positions
      </h2>

      <div className="relative w-full max-w-6xl overflow-hidden py-3 flex justify-center">
        <div className="flex animate-scroll gap-6 w-max">
          {positions.concat(positions).map((pos, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-80 md:w-96 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {pos.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-md md:text-lg leading-relaxed">
                {pos.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-6">
        <a
          href="mailto:careers@macromaster.com"
          className="text-green-600 dark:text-green-400 font-medium hover:underline"
        >
          Apply via email
        </a>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          animation: scroll 15s linear infinite;
        }
      `}</style>
    </div>
  );
}
