import React from "react";
import { commonStyles } from "../../../styles/commonStyles";

export default function TestimonialCard({ text, author }) {
  return (
    <div className={commonStyles.card}>
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{text}</p>
      <span className="font-semibold">{author}</span>
    </div>
  );
}
