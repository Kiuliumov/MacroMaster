import React from "react";
import { commonStyles } from "../../../styles/commonStyles";

export default function ValueCard({ Icon, title, text, color }) {
  return (
    <div className={commonStyles.card}>
      {Icon && <Icon className={`${commonStyles.featureIcon} ${color}`} />}
      <h3 className={commonStyles.featureTitle}>{title}</h3>
      <p className={commonStyles.featureText}>{text}</p>
    </div>
  );
}
