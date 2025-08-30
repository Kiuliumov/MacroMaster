import React from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";

export default function CTA() {
  return (
    <div className={styles.cta.container}>
      <h2 className={styles.cta.heading}>Join MacroMaster Today</h2>
      <p className={styles.cta.text}>
        Start your journey to smarter nutrition and better health.
      </p>
      <Link to="/register" className={styles.cta.button}>
        Get Started
      </Link>
    </div>
  );
}
