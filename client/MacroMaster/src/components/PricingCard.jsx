import React from "react";

export default function PricingCard({ name, price, features, logo, comingSoon = true }) {
	const styles = {
		card: "bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center transform transition hover:-translate-y-1 h-full",
		logo: "h-16 w-16 mb-4",
		tierName: "text-xl font-semibold mb-2",
		tierPrice: "text-2xl font-bold mb-4",
		featureList: "text-gray-600 dark:text-gray-300 mb-6 space-y-2 text-left w-full flex-1",
		featureItem: "flex items-center",
		featureCheck: "mr-2 text-green-500 font-bold",
		comingSoon: "text-sm text-gray-500 dark:text-gray-400 mb-4",
		disabledButton: "w-full bg-gray-400 text-white font-semibold py-2 rounded-xl cursor-not-allowed opacity-70",
	};

	return (
		<div className={styles.card}>
			<img src={logo} alt={name} className={styles.logo} />
			<h3 className={styles.tierName}>{name}</h3>
			<p className={styles.tierPrice}>{price}</p>

			<ul className={styles.featureList}>
				{features.map((feature) => (
					<li key={feature} className={styles.featureItem}>
						<span className={styles.featureCheck}>✓</span> {feature}
					</li>
				))}
			</ul>

			{comingSoon && <p className={styles.comingSoon}>Coming Soon ...</p>}

			<button disabled className={styles.disabledButton}>
				Unavailable
			</button>
		</div>
	);
}
