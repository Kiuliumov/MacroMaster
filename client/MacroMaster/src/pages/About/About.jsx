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
      <Header />
      <FeaturesGrid />
      <Mission />
      <ValuesGrid />
      <TestimonialsGrid />
      <CTA />
    </div>
  );
}
