import React from "react";

export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center transition transform hover:-translate-y-1">
      {icon}
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300 text-base">{description}</p>
    </div>
  );
}
