import React from "react";
import TestimonialCard from "./TestimonialCard";
import { commonStyles } from "../../../styles/commonStyles";

export default function TestimonialsGrid() {
  const testimonials = [
    {
      text: "MacroMaster has completely changed how I plan my meals. It's so intuitive and motivating!",
      author: "— Alex R.",
    },
    {
      text: "I love the macro tracking feature. It keeps me on track without any stress.",
      author: "— Jamie L.",
    },
  ];

  return (
    <div className={`mt-16 max-w-5xl w-full text-center`}>
      <div className={commonStyles.headerWrapper}>
        <h2 className={commonStyles.pageTitle}>What Users Say</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((t, idx) => (
          <TestimonialCard key={idx} {...t} />
        ))}
      </div>
    </div>
  );
}
