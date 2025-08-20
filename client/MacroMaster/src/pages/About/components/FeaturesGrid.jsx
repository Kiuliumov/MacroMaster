import React from "react";
import { Apple, Activity, Scale, Users } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function FeaturesGrid() {
  const features = [
    { Icon: Apple, title: "Log Your Meals", text: "Quickly add foods and track calories with an extensive food database.", color: "text-green-500" },
    { Icon: Activity, title: "Track Progress", text: "Monitor your daily intake and stay aligned with your health goals.", color: "text-blue-500" },
    { Icon: Scale, title: "Balance Macros", text: "Keep carbs, proteins, and fats in check for optimal nutrition.", color: "text-purple-500" },
    { Icon: Users, title: "Our Team", text: "A passionate team of nutritionists and developers dedicated to your health.", color: "text-yellow-500" },
  ];

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl w-full">
      {features.map((feature, idx) => (
        <FeatureCard key={idx} {...feature} />
      ))}
    </div>
  );
}
