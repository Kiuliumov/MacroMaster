import React from "react";
import PricingCard from "./components/PricingCard";
import AppleLogo from "../../assets/apple_logo.png";
import BananaLogo from "../../assets/banana_logo.png";
import PineappleLogo from "../../assets/pineapple_logo.png";

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
    <section className="relative py-14 bg-gray-50/95 dark:bg-gray-900">
      <div
        className="absolute inset-0 blur-[118px] max-w-lg h-[800px] mx-auto sm:max-w-3xl sm:h-[400px]"
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
        }}
      />

      <div className="relative max-w-screen-xl mx-auto text-gray-900 dark:text-gray-100 sm:px-4 md:px-8">
        <div className="max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0">
          <h3 className="text-cyan-500 font-semibold">Pricing</h3>
          <p className="text-gray-900 dark:text-white text-3xl font-semibold sm:text-4xl">
            Pay as you grow
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Choose the tier that fits your goals. All tiers unlock powerful features to support your health journey.
          </p>
        </div>

        <div className="mt-16 justify-center sm:flex gap-6">
          {tiers.map((tier, idx) => (
            <PricingCard key={idx} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}
