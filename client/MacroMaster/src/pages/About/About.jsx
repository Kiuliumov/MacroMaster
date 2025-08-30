import Header from "./components/Header";
import FeaturesGrid from "./components/FeaturesGrid";
import Mission from "./components/Mission";
import ValuesGrid from "./components/ValuesGrid";
import TestimonialsGrid from "./components/TestimonialGrid";
import CTA from "./components/CTA";
import { commonStyles } from "../../styles/commonStyles";
import { styles } from "./styles";

export default function About() {
  return (
    <div className={commonStyles.container}>
      <div
        className={commonStyles.gradientBlur}
        style={styles.about.gradientBlur}
      />

      <div className="relative max-w-5xl mx-auto space-y-20 flex flex-col items-center w-full">
        <Header />
        <FeaturesGrid />
        <Mission />
        <ValuesGrid />
        <TestimonialsGrid />
        <CTA />
      </div>
    </div>
  );
}
