import { styles } from "../styles";

export default function ValueCard({ Icon, title, text, color }) {
  return (
    <div className={styles.valueCard.container}>
      {Icon && <Icon className={`${styles.valueCard.icon} ${color}`} />}
      <h3 className={styles.valueCard.title}>{title}</h3>
      <p className={styles.valueCard.text}>{text}</p>
    </div>
  );
}
