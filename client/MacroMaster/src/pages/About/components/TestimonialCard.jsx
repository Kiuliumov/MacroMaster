import { styles } from "../styles";

export default function TestimonialCard({ text, author }) {
  return (
    <div className={styles.testimonialCard.container}>
      <p className={styles.testimonialCard.text}>{text}</p>
      <span className={styles.testimonialCard.author}>{author}</span>
    </div>
  );
}
