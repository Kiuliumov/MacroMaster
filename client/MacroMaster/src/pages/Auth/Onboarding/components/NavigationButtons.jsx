export default function NavigationButtons({ step, isLastStep, onBack, onNext }) {
  return (
    <div className="flex justify-center items-center mt-6 gap-4 w-full">
      {step > 0 && (
        <button
          onClick={onBack}
          className="px-5 py-2 rounded-xl bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-medium hover:bg-gray-400 dark:hover:bg-gray-600 transition flex-1"
        >
          Back
        </button>
      )}

      <button
        onClick={onNext}
        className={`px-6 py-3 rounded-2xl bg-purple-500 hover:bg-purple-600 text-white font-medium shadow-md transition flex-1 ${
          step === 0 ? "max-w-xs" : ""
        }`}
      >
        {isLastStep ? "Finish" : "Next"}
      </button>
    </div>
  );
}
