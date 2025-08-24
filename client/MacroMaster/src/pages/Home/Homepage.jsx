import { commonStyles } from "../../styles/commonStyles";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";

export default function Homepage() {
  return (
    <div className={commonStyles.container}>
      <div
        className={commonStyles.gradientBlur}
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.2) 15.73%, rgba(14, 165, 233, 0.6) 15.74%, rgba(232, 121, 249, 0.35) 56.49%, rgba(79, 70, 229, 0.5) 115.91%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto space-y-20 flex flex-col items-center">
        <HeroSection />
        <FeaturesSection />
      </div>
    </div>
  );
}
