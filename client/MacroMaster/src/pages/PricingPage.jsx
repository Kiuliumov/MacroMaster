import React from "react";
import PricingCard from "./PricingCard";
import AppleLogo from "../assets/apple_logo.png";
import BananaLogo from "../assets/banana_logo.png";
import PineappleLogo from "../assets/pineapple_logo.png";

const styles = {
	container: "min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center px-6 py-12",
	header: "text-center max-w-3xl mb-12",
	title: "text-4xl md:text-5xl font-extrabold mb-4",
	subtitle: "text-lg md:text-xl text-gray-600 dark:text-gray-300",
	gridWrapper: "flex justify-center w-full",
	grid: "grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl",
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
					Unlock all features and elevate your health journey. All tiers are coming soon!
				</p>
			</div>

			<div className={styles.gridWrapper}>
				<div className={styles.grid}>
					{tiers.map((tier) => (
						<PricingCard key={tier.name} {...tier} />
					))}
				</div>
			</div>
		</div>
	);
}
