import React from "react";
import Logo from "../../../components/Logo";

export default function Header() {
  return (
    <div className="text-center max-w-3xl mb-12">
      <div className="flex justify-center mb-6">
        <Logo className="h-16 w-16" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
        About <span className="text-blue-500">MacroMaster</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
        MacroMaster is designed to make nutrition tracking simple, accurate,
        and engaging. Whether you're managing weight, building muscle, or just
        eating healthier, we’ve got you covered.
      </p>
    </div>
  );
}
