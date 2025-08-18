import { Link } from "react-router-dom";
import NavLink from "../components/NavLink";
import Button from "../components/Button";

const publicLinks = ["Home", "Features", "Pricing", "Forum", "About"];

export default function MobileMenu({ isLoggedIn, handleLogout, setMobileOpen }) {
  return (
    <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
      <div className="flex flex-col items-center px-4 pt-4 pb-6 space-y-3">
        {publicLinks.map((item) => (
          <NavLink
            key={item}
            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            className="px-3 py-2 text-center rounded-md text-gray-700 dark:text-gray-300 
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full"
            onClick={() => setMobileOpen(false)}
          >
            {item}
          </NavLink>
        ))}

        <div className="w-full border-t border-gray-200 dark:border-gray-700 my-2"></div>

        {isLoggedIn ? (
          <>
            <Button className="px-4 py-2 text-sm bg-green-400 text-white hover:bg-green-500 dark:bg-green-600 dark:hover:bg-green-700">
              <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                Dashboard
              </Link>
            </Button>
            <Button
              className="px-4 py-2 text-sm bg-red-400 text-white hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-700"
              onClick={() => {
                handleLogout();
                setMobileOpen(false);
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button className="px-4 py-2 text-sm bg-blue-400 text-white hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700">
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                Log In
              </Link>
            </Button>
            <Button className="px-4 py-2 text-sm bg-blue-300 text-white hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600">
              <Link to="/signup" onClick={() => setMobileOpen(false)}>
                Sign Up
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
