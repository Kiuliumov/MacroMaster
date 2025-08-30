import { Apple, Activity, Scale, Users } from "lucide-react";
import FeatureCard from "./FeatureCard";
import { styles } from "../styles";

export default function FeaturesGrid() {
  const features = [
    { Icon: Apple, title: "Log Your Meals", text: "Quickly add foods and track calories with an extensive food database.", color: styles.featuresGrid.colors.logMeals },
    { Icon: Activity, title: "Track Progress", text: "Monitor your daily intake and stay aligned with your health goals.", color: styles.featuresGrid.colors.trackProgress },
    { Icon: Scale, title: "Balance Macros", text: "Keep carbs, proteins, and fats in check for optimal nutrition.", color: styles.featuresGrid.colors.balanceMacros },
    { Icon: Users, title: "Our Team", text: "A passionate team of nutritionists and developers dedicated to your health.", color: styles.featuresGrid.colors.team },
  ];

  return (
    <div className={styles.featuresGrid.container}>
      {features.map((feature, idx) => (
        <FeatureCard key={idx} {...feature} />
      ))}
    </div>
  );
}
