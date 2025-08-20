import React from "react";
import { commonStyles } from "../../../styles/commonStyles";

export default function Mission() {
  return (
    <div className={commonStyles.headerWrapper}>
      <h2 className={commonStyles.pageTitle}>Our Mission</h2>
      <p className={commonStyles.pageSubtitle}>
        We aim to empower people to make informed nutritional choices,
        simplify tracking, and achieve their health goals with confidence.
      </p>
    </div>
  );
}
