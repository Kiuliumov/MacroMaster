import React from "react";
import FeatureCard from "./FeatureCard";

export default function FeaturesGrid({ features }) {
  return (
    <div className="flex gap-8 overflow-x-auto w-full px-4 py-6">
      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
}
