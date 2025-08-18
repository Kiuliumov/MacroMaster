import { Link } from "react-router-dom";
import NavLink from "../components/NavLink";
import Button from "../components/Button";

const publicLinks = ["Home", "Features", "Pricing", "Forum", "About"];

export default function MobileMenu({ isLoggedIn, handleLogout, setMobileOpen }) {
  return (
    <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
      <div className="flex flex-col items-center text-center px-4 pt-4 pb-6 space-y-3">
        {/* Nav links */}
        {publicLinks.map((item) => (
          <NavLink
            key={item}
            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            className="py-2 px-4 rounded-md text-gray-700 dark:text-gray-300 
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            {item}
          </NavLink>
        ))}

        {/* Auth buttons */}
        <div className="flex flex-col items-center space-y-2 pt-2">
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
    </div>
  );
}
