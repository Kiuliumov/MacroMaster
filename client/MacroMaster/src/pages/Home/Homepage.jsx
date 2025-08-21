import { commonStyles } from "../../styles/commonStyles";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";

export default function Homepage() {

  return (
    <div className={commonStyles.container}>
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}
