import PriceButton from "./PricingButton";
import { pricingStyles } from "../styles";

export default function PricingCard({ tier }) {
  const { name, price, features, logo } = tier;

  return (
    <div
      className={`${pricingStyles.cardWrapper} ${pricingStyles.cardBgGradient}`}
    >
      <div className={pricingStyles.cardHeader}>
        <img src={logo} alt={`${name} logo`} className={pricingStyles.cardLogo} />
        <span className={pricingStyles.cardName}>{name}</span>
        <div className={pricingStyles.cardPrice}>
          ${price.toFixed(2)} <span className={pricingStyles.cardPriceUnit}>/mo</span>
        </div>

        <PriceButton />
      </div>

      <ul className={pricingStyles.cardFeatures}>
        {features.map((feature, idx) => (
          <li key={idx} className={pricingStyles.cardFeatureItem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={pricingStyles.checkIcon}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}