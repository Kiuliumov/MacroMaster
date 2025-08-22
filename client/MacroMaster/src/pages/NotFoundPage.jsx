import React from "react";
import { commonStyles } from "../styles/commonStyles";

export default function NotFoundPage() {
  return (
    <div className={`${commonStyles.container} flex items-center justify-center`}>
      <div className={`${commonStyles.card} text-center p-8`}>
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
    </div>
  );
}
