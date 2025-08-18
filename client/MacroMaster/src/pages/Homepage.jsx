import React from "react";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">
        Welcome to MacroMaster
      </h1>
      <p className="text-base md:text-lg mb-5 text-center max-w-md">
        This is a simple homepage component for testing your setup.
      </p>
      <div className="flex space-x-3">
        <a
          href="/login"
          className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Log In
        </a>
        <a
          href="/signup"
          className="px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Sign Up
        </a>
      </div>
    </div>
  );
}
