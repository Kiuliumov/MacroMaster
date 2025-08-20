import React from "react";

export default function ValueCard({ Icon, title, text, color }) {
  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-600">
      { Icon && <Icon className={`mx-auto h-10 w-10 mb-4 ${color}`} />}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm">{text}</p>
    </div>
  );
}
