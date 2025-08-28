import { pricingStyles } from "../styles";

export default function PriceButton() {
  return (
    <button
      className={`${pricingStyles.button} ${pricingStyles.buttonDisabled} ${pricingStyles.buttonHover} ${pricingStyles.buttonActive}`}
      disabled
    >
      Unavailable
    </button>
  );
}