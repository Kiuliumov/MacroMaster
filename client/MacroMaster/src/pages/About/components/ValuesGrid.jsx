import { Heart, Star, PieChart } from "lucide-react";
import ValueCard from "./ValueCard";
import { styles } from "../styles";

export default function ValuesGrid() {
  const values = [
    { Icon: Heart, title: "Health First", text: "We prioritize user health by providing accurate and actionable nutrition data.", color: styles.valuesGrid.colors.health },
    { Icon: Star, title: "Quality & Accuracy", text: "Reliable food databases and smart tracking features for consistent results.", color: styles.valuesGrid.colors.quality },
    { Icon: PieChart, title: "Empowerment", text: "Help users understand their nutrition and take control of their health journey.", color: styles.valuesGrid.colors.empowerment },
  ];

  return (
    <div className={styles.valuesGrid.container}>
      <h2 className={styles.valuesGrid.heading}>Our Core Values</h2>
      <div className={styles.valuesGrid.grid}>
        {values.map((value, idx) => (
          <ValueCard key={idx} {...value} />
        ))}
      </div>
    </div>
  );
}
