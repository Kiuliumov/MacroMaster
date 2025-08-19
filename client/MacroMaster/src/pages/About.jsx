import React from "react";
import { Apple, Activity, Scale, Users } from "lucide-react";
import Logo from "../components/Logo";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-8">
      
      <div className="text-center max-w-3xl">
        <div className="flex justify-center mb-6">
          <Logo className="h-16 w-16" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          About <span className="text-blue-500">MacroMaster</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
          MacroMaster is designed to make nutrition tracking simple, accurate, and engaging. 
          Whether you're managing weight, building muscle, or just eating healthier, we’ve got you covered.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl w-full">
        <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100 dark:border-gray-600">
          <Apple className="mx-auto h-12 w-12 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Log Your Meals</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Quickly add foods and track calories with an extensive food database.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100 dark:border-gray-600">
          <Activity className="mx-auto h-12 w-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Monitor your daily intake and stay aligned with your health goals.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100 dark:border-gray-600">
          <Scale className="mx-auto h-12 w-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Balance Macros</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Keep carbs, proteins, and fats in check for optimal nutrition.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100 dark:border-gray-600">
          <Users className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Our Team</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            A passionate team of nutritionists and developers dedicated to your health.
          </p>
        </div>
      </div>

      <div className="mt-16 max-w-2xl text-center">
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          We aim to empower people to make informed nutritional choices, simplify tracking, and achieve their health goals with confidence.
        </p>
      </div>

    </div>
  );
}
