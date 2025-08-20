import React from "react";

export default function FeatureCard({ Icon, title, text, color }) {
  return (
    <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100 dark:border-gray-600">
      {Icon && <Icon className={`mx-auto h-12 w-12 mb-4 ${color}`} />}
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{text}</p>
    </div>
  );
}
