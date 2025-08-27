import AppleLogo from "../assets/apple_logo.png";
import BananaLogo from "../assets/banana_logo.png";
import PineappleLogo from "../assets/pineapple_logo.png";

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
    <section className="relative py-14 bg-gray-50 dark:bg-gray-900">
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
            <div
              key={idx}
              className={`relative flex-1 flex flex-col mt-6 border-2 sm:mt-0 sm:rounded-xl sm:max-w-md ${
                tier.isMostPop
                  ? "bg-gray-50 dark:bg-gray-800 border-cyan-500 sm:border-x-2"
                  : "bg-gray-100 dark:bg-gray-800 border-transparent"
              } shadow-lg`}
            >
              <div className="p-6 py-8 space-y-4 border-b border-gray-200 dark:border-gray-700 md:p-8 flex flex-col items-center">
                <img src={tier.logo} alt={`${tier.name} logo`} className="h-12 w-12 mb-4" />
                <span className="text-gray-900 dark:text-white font-medium text-lg">{tier.name}</span>
                <div className="text-cyan-500 text-3xl font-semibold">
                  ${tier.price.toFixed(2)} <span className="text-xl font-normal">/mo</span>
                </div>
                <button className="px-4 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700">
                  Get Started
                </button>
              </div>

              <ul className="p-6 py-8 space-y-3 md:p-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${tier.isMostPop ? "text-cyan-500" : "text-gray-400 dark:text-gray-300"}`}
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
          ))}
        </div>
      </div>
    </section>
  );
}
