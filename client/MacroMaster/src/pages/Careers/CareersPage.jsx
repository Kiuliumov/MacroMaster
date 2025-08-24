import React from "react";
import Logo from "../../components/Logo";
import OpenPositions from "./components/OpenPositions";
import { commonStyles } from "../../styles/commonStyles";

const positions = [
  {
    title: "Front-End Developer",
    description:
      "Build beautiful interfaces and ensure a seamless experience for our users.",
  },
  {
    title: "Back-End Developer",
    description:
      "Design robust APIs, manage databases, and keep everything running smoothly.",
  },
  {
    title: "UI/UX Designer",
    description:
      "Create intuitive designs and delightful experiences for our users.",
  },
  {
    title: "QA Engineer",
    description:
      "Test, break, and improve the app to maintain the highest quality standards.",
  },
];

export default function CareersPage() {
  return (
    <div className={commonStyles.container}>
      {/* Gradient blur background */}
      <div
        className={commonStyles.gradientBlur}
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.2) 15.73%, rgba(14, 165, 233, 0.6) 15.74%, rgba(232, 121, 249, 0.35) 56.49%, rgba(79, 70, 229, 0.5) 115.91%)",
        }}
      />

      {/* Main content */}
      <div className="relative max-w-5xl mx-auto space-y-12 flex flex-col items-center w-full z-10 px-4 sm:px-6">
        <Logo className="h-16 w-16 mb-4" />
        
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-center">
          Join <span className="text-green-600 dark:text-green-400">The Cantina</span>
        </h1>
        
        <p className="text-lg md:text-xl text-center max-w-3xl text-gray-700 dark:text-gray-300">
          Our developers are the cantina—brewing code, crafting features, and
          keeping the app running smoothly.
        </p>

        <h2 className="text-3xl md:text-4xl font-semibold text-center">
          Open Positions
        </h2>

        <OpenPositions positions={positions} />

        <div className="text-center mt-6">
          <a
            href="mailto:careers@macromaster.com"
            className="text-green-600 dark:text-green-400 font-medium hover:underline"
          >
            Apply via email
          </a>
        </div>
      </div>
    </div>
  );
}
