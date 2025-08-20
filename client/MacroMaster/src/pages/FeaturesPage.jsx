import React from "react";
import {
  FireIcon,
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

export default function FeaturesPage() {
  const features = [
    {
      title: "Calorie Tracking",
      description:
        "Easily log your meals and track your daily calorie intake to stay on top of your goals.",
      icon: <FireIcon className="h-16 w-16 text-green-500 mb-4" />,
    },
    {
      title: "Macros Management",
      description:
        "Manage your macronutrients (protein, carbs, fats) for a balanced diet tailored to you.",
      icon: <Squares2X2Icon className="h-16 w-16 text-blue-500 mb-4" />,
    },
    {
      title: "Exercise Tracking",
      description:
        "Track your workouts, monitor progress, and stay motivated with your exercise routine.",
      icon: <HeartIcon className="h-16 w-16 text-red-500 mb-4" />,
    },
    {
      title: "Community Forum",
      description:
        "Connect with other users, share experiences, and get advice on fitness and nutrition.",
      icon: <ChatBubbleBottomCenterTextIcon className="h-16 w-16 text-yellow-500 mb-4" />,
    },
  ];

  const styles = {
    container:
      "min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center px-8 py-16",
    header:
      "text-4xl md:text-5xl font-extrabold text-center mb-14 text-gray-900 dark:text-gray-100",
    featuresWrapper:
      "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full max-w-7xl",
    card:
      "flex flex-col justify-center items-center bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-10 border border-gray-200 dark:border-gray-700 rounded-3xl hover:scale-105 transform transition-transform duration-300 text-center",
    cardTitle: "text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100",
    cardDescription: "text-gray-700 dark:text-gray-300 text-lg",
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Our Features</h1>
      <div className={styles.featuresWrapper}>
        {features.map((feature) => (
          <div key={feature.title} className={styles.card}>
            {feature.icon}
            <h2 className={styles.cardTitle}>{feature.title}</h2>
            <p className={styles.cardDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
