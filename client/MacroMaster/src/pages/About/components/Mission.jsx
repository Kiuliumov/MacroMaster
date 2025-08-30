import { styles } from "../styles";

export default function Mission() {
  return (
    <div className={styles.mission.container}>
      <h2 className={styles.mission.heading}>Our Mission</h2>
      <p className={styles.mission.text}>
        We aim to empower people to make informed nutritional choices,
        simplify tracking, and achieve their health goals with confidence.
      </p>
    </div>
  );
}
