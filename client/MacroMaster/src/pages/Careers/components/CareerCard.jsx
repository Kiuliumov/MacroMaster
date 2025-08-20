import React from "react";

export default function CareerCard({ title, description }) {
  return (
    <div className="flex-shrink-0 w-80 md:w-96 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 text-md md:text-lg leading-relaxed">
        {description}
      </p>
    </div>
  );
}
