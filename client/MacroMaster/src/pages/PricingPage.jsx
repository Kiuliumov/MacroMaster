import React from "react";
import AppleLogo from "../assets/apple_logo.png";
import BananaLogo from "../assets/banana_logo.png";
import PineappleLogo from "../assets/pineapple_logo.png";

const styles = {
  container:
    "min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 text-gray-900 dark:text-gray-100 flex flex-col items-center px-6 py-12",
  header: "text-center max-w-3xl mb-12",
  title: "text-4xl md:text-5xl font-extrabold mb-4",
  subtitle: "text-lg md:text-xl text-gray-600 dark:text-gray-300",
  gridWrapper: "flex justify-center w-full",
  grid: "grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl",
  card:
    "bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center transform transition hover:-translate-y-1 h-full",
  logo: "h-16 w-16 mb-4",
  tierName: "text-xl font-semibold mb-2",
  tierPrice: "text-2xl font-bold mb-4",
  featureList:
    "text-gray-600 dark:text-gray-300 mb-6 space-y-2 text-left w-full flex-1",
  featureItem: "flex items-center",
  featureCheck: "mr-2 text-green-500 font-bold",
  comingSoon: "text-sm text-gray-500 dark:text-gray-400 mb-4",
  disabledButton:
    "w-full bg-gray-400 text-white font-semibold py-2 rounded-xl cursor-not-allowed opacity-70",
  footer: "mt-12 text-center text-gray-600 dark:text-gray-400 max-w-3xl",
  notifyButton:
    "px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition transform hover:-translate-y-0.5",
};

export default function PricingPage() {
  const tiers = [
    {
      name: "Apple Tier",
      price: "$9.99/mo",
      features: [
        "Access to exclusive weekly recipes",
        "Basic nutrition insights",
        "Email support",
      ],
      logo: AppleLogo,
    },
    {
      name: "Banana Tier",
      price: "$19.99/mo",
      features: [
        "Custom meal planning",
        "Progress tracking with charts",
        "Priority email support",
      ],
      logo: BananaLogo,
    },
    {
      name: "Pineapple Tier",
      price: "$29.99/mo",
      features: [
        "1-on-1 nutrition consultation",
        "Personalized macro analysis",
        "Advanced weekly performance reports",
      ],
      logo: PineappleLogo,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Choose Your Premium Tier</h1>
        <p className={styles.subtitle}>
          Unlock all features and elevate your health journey. All tiers are
          coming soon!
        </p>
      </div>

      <div className={styles.gridWrapper}>
        <div className={styles.grid}>
          {tiers.map((tier) => (
            <div key={tier.name} className={styles.card}>
              <img src={tier.logo} alt={tier.name} className={styles.logo} />
              <h3 className={styles.tierName}>{tier.name}</h3>
              <p className={styles.tierPrice}>{tier.price}</p>

              <ul className={styles.featureList}>
                {tier.features.map((feature) => (
                  <li key={feature} className={styles.featureItem}>
                    <span className={styles.featureCheck}>✓</span> {feature}
                  </li>
                ))}
              </ul>

              <p className={styles.comingSoon}>Coming Soon</p>

              <button disabled className={styles.disabledButton}>
                Unavailable
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <p className="mb-2">Why wait? Get notified when Premium launches!</p>
        <button className={styles.notifyButton}>Notify Me</button>
      </div>
    </div>
  );
}
