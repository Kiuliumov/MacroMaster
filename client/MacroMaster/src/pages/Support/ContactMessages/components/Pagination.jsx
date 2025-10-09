export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex flex-wrap justify-center mt-4 space-x-1 mb-4">
      <button
        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded disabled:opacity-50"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={`px-2 py-1 rounded ${
            currentPage === i + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded disabled:opacity-50"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}