import { Apple, Activity, Scale } from "lucide-react";
import { commonStyles } from "../../../styles/commonStyles";
import FeatureCard from "./FeatureCard";

export default function FeaturesSection() {
  return (
    <div className={commonStyles.featuresGrid}>
      <FeatureCard
        icon={<Apple className={`${commonStyles.featureIcon} text-green-500`} />}
        title="Log Your Meals"
        text="Quickly add foods and track calories with an extensive database."
      />
      <FeatureCard
        icon={<Activity className={`${commonStyles.featureIcon} text-blue-500`} />}
        title="Track Progress"
        text="Monitor your daily intake and stay aligned with your fitness goals."
      />
      <FeatureCard
        icon={<Scale className={`${commonStyles.featureIcon} text-purple-500`} />}
        title="Balance Macros"
        text="Keep carbs, proteins, and fats in check for optimal performance."
      />
    </div>
  );
}
