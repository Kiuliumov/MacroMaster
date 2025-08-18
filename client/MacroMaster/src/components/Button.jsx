export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded-md shadow transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
