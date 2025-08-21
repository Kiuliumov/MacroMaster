import { commonStyles } from "../../../styles/commonStyles";

export default function FeatureCard({ icon, title, text }) {
  return (
    <div className={commonStyles.featureCard}>
      {icon}
      <h3 className={commonStyles.featureTitle}>{title}</h3>
      <p className={commonStyles.featureText}>{text}</p>
    </div>
  );
}
