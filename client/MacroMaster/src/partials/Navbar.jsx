import { useSelector, useDispatch } from "react-redux";
import { logout } from "../state_manager/userSlice";
import ThemeToggle from "./ThemeToggle";

const publicLinks = ["Home", "Features", "Pricing", "About"];
const privateLinks = ["Dashboard", "Profile", "Forum"];

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = !!user;

  const navLinkClasses =
    "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-medium";
  const navLinkLoggedInClasses =
    "text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 font-medium";
  const buttonClasses =
    "inline-flex items-center px-4 py-2 text-sm font-semibold text-white rounded-md shadow transition-all duration-200";
  const loginButtonClasses = buttonClasses + " bg-blue-600 hover:bg-blue-700";
  const signupButtonClasses = buttonClasses + " bg-blue-500 hover:bg-blue-600";
  const dashboardButtonClasses = buttonClasses + " bg-green-600 hover:bg-green-700";
  const logoutButtonClasses = buttonClasses + " bg-red-600 hover:bg-red-700";

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          <div className="flex-shrink-0">
            <img
              className="h-8 w-auto"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg"
              alt="MacroMaster Logo"
            />
          </div>

          <nav className="hidden md:flex space-x-8">
            {publicLinks.map((item) => (
              <a key={item} href={`/${item.toLowerCase()}`} className={navLinkClasses}>
                {item}
              </a>
            ))}
            {isLoggedIn &&
              privateLinks.map((item) => (
                <a key={item} href={`/${item.toLowerCase()}`} className={navLinkLoggedInClasses}>
                  {item}
                </a>
              ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {isLoggedIn ? (
              <>
                <a href="/dashboard" className={dashboardButtonClasses}>
                  Dashboard
                </a>
                <button onClick={handleLogout} className={logoutButtonClasses}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className={loginButtonClasses}>
                  Log In
                </a>
                <a href="/signup" className={signupButtonClasses}>
                  Sign Up
                </a>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
          </div>

        </div>
      </div>
    </header>
  );
}
