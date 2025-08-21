import React from "react";
import FeatureCard from "./FeatureCard";

export default function FeaturesGrid({ features }) {
  return (
    <div className="w-full px-4 py-6">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
}
