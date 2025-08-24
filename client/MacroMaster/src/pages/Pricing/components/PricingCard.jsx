import React from "react";
import PriceButton from "./PricingButton";

export default function PricingCard({ tier }) {
  const { name, price, features, logo, isMostPop } = tier;

  const bgGradient = isMostPop
    ? "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700"
    : "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700";

  return (
    <div
      className={`relative flex-1 flex flex-col mt-6 border-2 sm:mt-0 sm:rounded-xl sm:max-w-md border-transparent shadow-lg ${bgGradient}`}
    >
      <div className="p-6 py-8 border-b border-gray-200 dark:border-gray-700 md:p-8 flex flex-col items-center">
        <img src={logo} alt={`${name} logo`} className="h-12 w-12 mb-4" />
        <span className="text-gray-900 dark:text-white font-medium text-lg">{name}</span>
        <div className="text-gray-900 dark:text-white text-3xl font-semibold">
          ${price.toFixed(2)} <span className="text-xl font-normal">/mo</span>
        </div>

        <PriceButton />
      </div>

      <ul className="p-6 py-8 space-y-3 md:p-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 dark:text-gray-300"
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
