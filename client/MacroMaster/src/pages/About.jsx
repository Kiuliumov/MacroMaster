import React from "react";
import { Link } from "react-router-dom";
import { Apple, Activity, Scale, Users, Heart, Star, PieChart } from "lucide-react";
import Logo from "../components/Logo";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-start p-8">
      
      <div className="text-center max-w-3xl mb-12">
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

      <div className="mt-16 max-w-5xl w-full text-center">
        <h2 className="text-3xl font-bold mb-8">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-600">
            <Heart className="mx-auto h-10 w-10 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Health First</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              We prioritize user health by providing accurate and actionable nutrition data.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-600">
            <Star className="mx-auto h-10 w-10 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quality & Accuracy</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Reliable food databases and smart tracking features for consistent results.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-600">
            <PieChart className="mx-auto h-10 w-10 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Empowerment</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Help users understand their nutrition and take control of their health journey.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-5xl w-full text-center">
        <h2 className="text-3xl font-bold mb-8">What Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-600">
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
              "MacroMaster has completely changed how I plan my meals. It's so intuitive and motivating!"
            </p>
            <span className="font-semibold">— Alex R.</span>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-600">
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
              "I love the macro tracking feature. It keeps me on track without any stress."
            </p>
            <span className="font-semibold">— Jamie L.</span>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Join MacroMaster Today</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Start your journey to smarter nutrition and better health.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition transform hover:-translate-y-0.5"
        >
          Get Started
        </Link>
      </div>

    </div>
  );
}
