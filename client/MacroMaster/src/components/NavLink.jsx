export default function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-medium"
    >
      {children}
    </a>
  );
}
