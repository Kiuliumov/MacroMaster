import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900 shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              className="h-8 w-auto"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg"
              alt="MacroMaster Logo"
            />
          </div>

          <nav className="hidden md:flex space-x-8" aria-label="Primary Navigation">
            {["Home", "Features", "Pricing", "About"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-medium"
              >
                {item}
              </a>
            ))}

            {isLoggedIn && ["Dashboard", "Profile", "Forum"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 font-medium"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />

            {isLoggedIn ? (
              <a
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-md shadow hover:bg-green-700 transition-all duration-200"
              >
                Dashboard
              </a>
            ) : (
              <>
                <a
                  href="/login"
                  className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition-all duration-200"
                >
                  Log In
                </a>
                <a
                  href="/signup"
                  className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 transition-all duration-200"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              type="button"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
              aria-label="Open menu"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
