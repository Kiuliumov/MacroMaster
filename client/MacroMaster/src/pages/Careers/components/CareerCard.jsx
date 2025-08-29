import { careersStyles } from "../styles";

export default function CareerCard({ title, description }) {
  return (
    <div className={careersStyles.card}>
      <h3 className={careersStyles.title}>
        {title}
      </h3>
      <p className={careersStyles.description}>
        {description}
      </p>
    </div>
  );
}
