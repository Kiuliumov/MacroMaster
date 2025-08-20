import React from "react";
import Logo from "../../../components/Logo";
import { commonStyles } from "../../../styles/commonStyles";

export default function Header() {
  return (
    <div className={commonStyles.headerWrapper}>
      <div className="flex justify-center mb-6">
        <Logo className="h-16 w-16" />
      </div>
      <h1 className={commonStyles.pageTitle}>
        About <span className="text-blue-500">MacroMaster</span>
      </h1>
      <p className={commonStyles.pageSubtitle}>
        MacroMaster is designed to make nutrition tracking simple, accurate,
        and engaging. Whether you're managing weight, building muscle, or just
        eating healthier, we’ve got you covered.
      </p>
    </div>
  );
}
