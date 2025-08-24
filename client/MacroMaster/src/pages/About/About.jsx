import React from "react";
import Header from "./components/Header";
import FeaturesGrid from "./components/FeaturesGrid";
import Mission from "./components/Mission";
import ValuesGrid from "./components/ValuesGrid";
import TestimonialsGrid from "./components/TestimonialGrid";
import CTA from "./components/CTA";
import { commonStyles } from "../../styles/commonStyles";

export default function About() {
  return (
    <div className={commonStyles.container}>
      <div
        className={commonStyles.gradientBlur}
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.2) 15.73%, rgba(14, 165, 233, 0.6) 15.74%, rgba(232, 121, 249, 0.35) 56.49%, rgba(79, 70, 229, 0.5) 115.91%)",
        }}
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
