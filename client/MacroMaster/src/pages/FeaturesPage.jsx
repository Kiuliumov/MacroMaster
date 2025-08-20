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
      title: "Calorie Tracking 🍎",
      description:
        "Easily log your meals and track your daily calorie intake to stay on top of your goals.",
      icon: <FireIcon className="h-16 w-16 text-green-500 mb-4" />,
    },
    {
      title: "Macro Management ⚡",
      description:
        "Manage your macronutrients (protein, carbs, fats) for a balanced diet tailored to you.",
      icon: <Squares2X2Icon className="h-16 w-16 text-blue-500 mb-4" />,
    },
    {
      title: "Exercise Tracking 🏋️",
      description:
        "Track your workouts, monitor progress, and stay motivated with your exercise routine.",
      icon: <HeartIcon className="h-16 w-16 text-red-500 mb-4" />,
    },
    {
      title: "Community Forum 💬",
      description:
        "Connect with other users, share experiences, and get advice on fitness and nutrition.",
      icon: (
        <ChatBubbleBottomCenterTextIcon className="h-16 w-16 text-yellow-500 mb-4" />
      ),
    },
  ];

  const styles = {
    container:
      "min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 flex flex-col items-center justify-center px-8 py-16 text-gray-900 dark:text-gray-100",
    header: "text-4xl md:text-5xl font-extrabold text-center mb-4",
    subtitle:
      "text-lg md:text-xl text-center text-gray-600 dark:text-gray-300 mb-14 max-w-2xl",
    featuresWrapper:
      "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full max-w-7xl",
    card:
      "bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center transition transform hover:-translate-y-1",
    cardTitle: "text-xl font-semibold mb-2",
    cardDescription: "text-gray-600 dark:text-gray-300 text-base",
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>🚀 Our Features</h1>
      <p className={styles.subtitle}>
        Explore powerful tools designed to make your fitness and nutrition
        journey <span className="font-semibold">simple</span>,{" "}
        <span className="font-semibold">effective</span>, and{" "}
        <span className="font-semibold">fun 🎉</span>. From tracking your daily
        meals 🍽️ to connecting with the community 🤝, we’ve got you covered.
      </p>

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
