import PricingCard from "./components/PricingCard";
import BronzeLogo from "../../assets/bronze_apple.png";
import SilverLogo from "../../assets/silver_apple.png";
import GoldLogo from "../../assets/gold_apple.png";
import { pricingStyles } from "./styles";
import { commonStyles } from '../../styles/commonStyles';
const tiers = [
  {
    name: "Bronze",
    price: 2.99,
    isMostPop: false,
    features: [
      "Access to all basic features",
      "Access to exclusive weekly recipes",
      "Basic nutrition insights",
    ],
    logo: BronzeLogo,
  },
  {
    name: "Silver",
    price: 9.99,
    isMostPop: true,
    features: [
      "Custom meal planning",
      "Progress tracking with charts",
      "Priority email support",
    ],
    logo: SilverLogo,
  },
  {
    name: "Gold",
    price: 19.99,
    isMostPop: false,
    features: [
      "1-on-1 nutrition consultation",
      "Personalized macro analysis",
      "Advanced weekly performance reports",
    ],
    logo: GoldLogo,
  },
];

export default function PricingPage() {
  return (
    <main className={commonStyles.container}>
      <div
        className={pricingStyles.gradientBlur}
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
        }}
      />

      <div className={pricingStyles.container}>
        <div className={pricingStyles.header}>
          <h3 className={pricingStyles.subheading}>MacroMaster Premium</h3>
          <p className={pricingStyles.heading}>Pricing plans</p>
          <p className={pricingStyles.paragraph}>
            Choose the tier that fits your goals. All tiers unlock powerful features to support your health journey.
          </p>
        </div>

        <div className={pricingStyles.cardContainer}>
          {tiers.map((tier, idx) => (
            <PricingCard key={idx} tier={tier} />
          ))}
        </div>
      </div>
    </main>
  );
}