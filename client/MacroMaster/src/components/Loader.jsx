const styles = {
	container:
		"relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-700",
	background: {
		background:
			"linear-gradient(106.89deg, rgba(192, 132, 252, 0.25) 15.73%, rgba(14, 165, 233, 0.5) 15.74%, rgba(232, 121, 249, 0.4) 56.49%, rgba(79, 70, 229, 0.45) 115.91%)",
		filter: "blur(150px)",
		zIndex: 0,
	},
	backgroundDark: {
		background:
			"linear-gradient(120deg, rgba(79, 70, 229, 0.4) 10%, rgba(14, 165, 233, 0.3) 40%, rgba(232, 121, 249, 0.25) 70%, rgba(17, 24, 39, 0.9) 100%)",
		filter: "blur(180px)",
		zIndex: 0,
	},
	backgroundDiv: "absolute inset-0",
	contentWrapper: "relative z-10 flex flex-col items-center",
	spinner:
		"w-16 h-16 border-4 border-blue-500 dark:border-purple-400 border-t-transparent dark:border-t-transparent rounded-full animate-spin mb-4",
	text: "text-gray-900 dark:text-gray-200 text-lg font-semibold",
};

export default function Loader() {
	return (
		<div className={styles.container}>
			<div className={`${styles.backgroundDiv} dark:hidden`} style={styles.background} />
			<div className={`${styles.backgroundDiv} hidden dark:block`} style={styles.backgroundDark} />

			<div className={styles.contentWrapper}>
				<div className={styles.spinner}></div>
				<p className={styles.text}>Loading...</p>
			</div>
		</div>
	);
}

