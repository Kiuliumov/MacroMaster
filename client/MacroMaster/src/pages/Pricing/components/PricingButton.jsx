export default function PriceButton() {
	return (
		<button
			className="px-4 py-3 w-full rounded-lg text-sm font-semibold text-white bg-gray-400 disabled:cursor-not-allowed disabled:bg-gray-400 hover:bg-gray-500 active:bg-gray-600 mt-4"
			disabled
		>
			Unavailable
		</button>
	);
}
