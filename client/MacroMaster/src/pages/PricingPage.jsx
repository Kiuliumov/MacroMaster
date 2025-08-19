import React from "react";
import AppleLogo from "../assets/apple_logo.png";
import BananaLogo from "../assets/banana_logo.png";
import PineappleLogo from "../assets/pineapple_logo.png";

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center px-6 py-12">
      <div className="text-center max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Choose Your Premium Tier
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Unlock all features and elevate your health journey. All tiers are coming soon!
        </p>
      </div>

      <div className="flex justify-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center transform transition hover:-translate-y-1 h-full"
            >
              <img src={tier.logo} alt={tier.name} className="h-16 w-16 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
              <p className="text-2xl font-bold mb-4">{tier.price}</p>

              <ul className="text-gray-600 dark:text-gray-300 mb-6 space-y-2 text-left w-full flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <span className="mr-2 text-green-500 font-bold">✓</span> {feature}
                  </li>
                ))}
              </ul>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Coming Soon
              </p>

              <button
                disabled
                className="w-full bg-gray-400 text-white font-semibold py-2 rounded-xl cursor-not-allowed opacity-70"
              >
                Unavailable
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center text-gray-600 dark:text-gray-400 max-w-3xl">
        <p className="mb-2">Why wait? Get notified when Premium launches!</p>
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition transform hover:-translate-y-0.5">
          Notify Me
        </button>
      </div>
    </div>
  );
}
