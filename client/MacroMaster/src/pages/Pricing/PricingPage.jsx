import React from "react";
import PricingCard from "./components/PricingCard";
import AppleLogo from "../../assets/apple_logo.png";
import BananaLogo from "../../assets/banana_logo.png";
import PineappleLogo from "../../assets/pineapple_logo.png";
import { pricingStyles } from "./styles";

const tiers = [
  {
    name: "Apple Tier",
    price: 9.99,
    isMostPop: false,
    features: [
      "Access to exclusive weekly recipes",
      "Basic nutrition insights",
      "Email support",
    ],
    logo: AppleLogo,
  },
  {
    name: "Banana Tier",
    price: 19.99,
    isMostPop: true,
    features: [
      "Custom meal planning",
      "Progress tracking with charts",
      "Priority email support",
    ],
    logo: BananaLogo,
  },
  {
    name: "Pineapple Tier",
    price: 29.99,
    isMostPop: false,
    features: [
      "1-on-1 nutrition consultation",
      "Personalized macro analysis",
      "Advanced weekly performance reports",
    ],
    logo: PineappleLogo,
  },
];

export default function PricingPage() {
  return (
    <section className={pricingStyles.section}>
      <div
        className={pricingStyles.gradientBlur}
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
        }}
      />

      <div className={pricingStyles.container}>
        <div className={pricingStyles.header}>
          <h3 className={pricingStyles.subheading}>Pricing</h3>
          <p className={pricingStyles.heading}>Pay as you grow</p>
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
    </section>
  );
}