import React from "react";
import { commonStyles } from "../styles/commonStyles";

export default function NotFoundPage() {
  return (
    <div className={commonStyles.container}>
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className={commonStyles.textCenter} style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
          😕 Oops! The page you’re looking for doesn’t exist.
        </p>
        <a href="/" className={commonStyles.link} style={{ fontSize: "1.25rem" }}>
          Go back to Homepage
        </a>
      </div>
    </div>
  );
}
