import {
  FireIcon,
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import FeaturesGrid from "./components/FeaturesGrid";
import AnimatedStats from "./components/AnimatedStats";
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
      icon: (
        <ChatBubbleBottomCenterTextIcon className="h-16 w-16 text-yellow-500 mb-4" />
      ),
    },
  ];

  return (
    <main className={commonStyles.container}>
      <div
        className={commonStyles.gradientBlur}
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.2) 15.73%, rgba(14, 165, 233, 0.6) 15.74%, rgba(232, 121, 249, 0.35) 56.49%, rgba(79, 70, 229, 0.5) 115.91%)",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
          🚀 Our Features
        </h1>

        <p className="text-lg md:text-xl text-center text-gray-600 dark:text-gray-300 mb-14 max-w-3xl mx-auto">
          Explore powerful tools designed to make your fitness and nutrition
          journey <span className="font-semibold">simple</span>,{" "}
          <span className="font-semibold">effective</span>, and{" "}
          <span className="font-semibold">fun 🎉</span>. From tracking your daily
          meals 🍽️ to connecting with the community 🤝, we’ve got you covered.
        </p>

        <FeaturesGrid features={features} />

        <div className="mt-20">
          <AnimatedStats
            stats={[
              { label: "Active Users", value: 10000, color: "text-green-600" },
              {
                label: "Calories Tracked Daily",
                value: 500000,
                color: "text-blue-500",
              },
              { label: "Community Posts", value: 2000, color: "text-red-500" },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
