import React from "react";

export default function Card({ icon: Icon, title, text, className = "" }) {
  const baseStyle =
    "bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100 dark:border-gray-600 text-center";

  const iconStyle = "mx-auto h-12 w-12 mb-4";

  const titleStyle = "text-xl font-semibold mb-2";
  const textStyle = "text-gray-600 dark:text-gray-300 text-sm";

  return (
    <div className={`${baseStyle} ${className}`}>
      {Icon && <Icon className={iconStyle} />}
      {title && <h3 className={titleStyle}>{title}</h3>}
      {text && <p className={textStyle}>{text}</p>}
    </div>
  );
}