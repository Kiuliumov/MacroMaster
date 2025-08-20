import React from "react";
import { Link } from "react-router-dom";
import { commonStyles } from "../../../styles/commonStyles";

export default function CTA() {
  return (
    <div className="mt-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Join MacroMaster Today</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Start your journey to smarter nutrition and better health.
      </p>
      <Link to="/register" className={commonStyles.btnPrimary}>
        Get Started
      </Link>
    </div>
  );
}
