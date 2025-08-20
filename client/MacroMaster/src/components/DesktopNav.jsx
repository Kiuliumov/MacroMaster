import NavLink from "../components/NavLink";

const publicLinks = ["Home", "Features", "Pricing", "Forum", "About"];

export default function DesktopNav() {
  return (
    <nav className="hidden md:flex space-x-4">
      {publicLinks.map((item) => (
        <NavLink
          key={item}
          to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
          className="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 
                     hover:bg-gray-100 dark:hover:bg-gray-800 
                     transition-colors duration-200"
        >
          {item}
        </NavLink>
      ))}
    </nav>
  );
}
