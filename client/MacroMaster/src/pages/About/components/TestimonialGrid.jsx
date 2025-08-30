import TestimonialCard from "./TestimonialCard";
import { styles } from "../styles";

export default function TestimonialsGrid() {
  const testimonials = [
    { text: "MacroMaster has completely changed how I plan my meals. It's so intuitive and motivating!", author: "— Alex R." },
    { text: "I love the macro tracking feature. It keeps me on track without any stress.", author: "— Jamie L." },
  ];

  return (
    <div className={styles.testimonialsGrid.container}>
      <h2 className={styles.testimonialsGrid.heading}>What Users Say</h2>
      <div className={styles.testimonialsGrid.grid}>
        {testimonials.map((t, idx) => (
          <TestimonialCard key={idx} {...t} />
        ))}
      </div>
    </div>
  );
}
