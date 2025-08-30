import { commonStyles } from "../../../styles/commonStyles";

export default function FeatureCard({ Icon, title, text, color }) {
  return (
    <div className={commonStyles.featureCard}>
      {Icon && <Icon className={`${commonStyles.featureIcon} ${color}`} />}
      <h3 className={commonStyles.featureTitle}>{title}</h3>
      <p className={commonStyles.featureText}>{text}</p>
    </div>
  );
}
