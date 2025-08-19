import React from "react";
import { Link } from "react-router-dom";
import { Apple, Activity, Scale } from "lucide-react";
import { useSelector } from "react-redux";
import Logo from "../components/Logo";

export default function Homepage() {
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = !!user;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <div className="flex justify-center mb-6">
          <Logo className="h-16 w-16" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Welcome to <span className="text-blue-500">MacroMaster</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
          Track your calories, manage your macros, and take control of your
          health with ease.
        </p>
        <div className="flex justify-center space-x-4">
          {!isLoggedIn ? (
            <>
              <Link
                to="/signup"
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-600 hover:shadow-xl transition transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition transform hover:-translate-y-0.5"
              >
                Log In
              </Link>
            </>
          ) : (
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-lg hover:bg-green-600 hover:shadow-xl transition transform hover:-translate-y-0.5"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100 dark:border-gray-600">
          <Apple className="mx-auto h-12 w-12 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Log Your Meals</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Quickly add foods and track calories with an extensive database.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100 dark:border-gray-600">
          <Activity className="mx-auto h-12 w-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Monitor your daily intake and stay aligned with your fitness goals.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100 dark:border-gray-600">
          <Scale className="mx-auto h-12 w-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Balance Macros</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Keep carbs, proteins, and fats in check for optimal performance.
          </p>
        </div>
      </div>
    </div>
  );
}