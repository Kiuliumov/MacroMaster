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
      <Logo className="h-16 w-16 mb-4" />
      <h1 className="text-4xl md:text-5xl font-bold mb-3 text-center">
        Join <span className="text-green-600 dark:text-green-400">The Cantina</span>
      </h1>
      <p className="text-lg md:text-xl mb-8 text-center max-w-3xl text-gray-700 dark:text-gray-300">
        Our developers are the cantina—brewing code, crafting features, and
        keeping the app running smoothly.
      </p>

      <h2 className="text-3xl md:text-4xl font-semibold mb-5 text-center">Open Positions</h2>

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
  );
}
