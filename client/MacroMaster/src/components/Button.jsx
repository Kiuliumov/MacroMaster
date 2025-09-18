import { Link } from "react-router-dom";

export default function Button({ children, to, className = "", ...props }) {
  const baseClass =
    "inline-flex items-center px-4 py-2 text-sm font-semibold rounded-md shadow transition-all duration-200 " +
    className;

  if (to) {
    return (
      <Link to={to} className={baseClass} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseClass} {...props}>
      {children}
    </button>
  );
}
