import React from "react";
import {
  FireIcon,
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import FeaturesGrid from "./components/FeaturesGrid";
import { commonStyles } from "../../styles/commonStyles";

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
      icon: <ChatBubbleBottomCenterTextIcon className="h-16 w-16 text-yellow-500 mb-4" />,
    },
  ];

  return (
    <div className={commonStyles.container}>
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4">🚀 Our Features</h1>
      <p className="text-lg md:text-xl text-center text-gray-600 dark:text-gray-300 mb-14 max-w-2xl">
        Explore powerful tools designed to make your fitness and nutrition
        journey <span className="font-semibold">simple</span>,{" "}
        <span className="font-semibold">effective</span>, and{" "}
        <span className="font-semibold">fun 🎉</span>. From tracking your daily
        meals 🍽️ to connecting with the community 🤝, we’ve got you covered.
      </p>

      <FeaturesGrid features={features} />
    </div>
  );
}
