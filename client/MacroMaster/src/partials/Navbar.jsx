import { useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = !!user;

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
            {["Home", "Features", "Pricing", "About"].map((item) => (
              <a key={item} href={`/${item.toLowerCase()}`} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-medium">
                {item}
              </a>
            ))}
            {isLoggedIn &&
              ["Dashboard", "Profile", "Forum"].map((item) => (
                <a key={item} href={`/${item.toLowerCase()}`} className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 font-medium">
                  {item}
                </a>
              ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {isLoggedIn ? (
              <a href="/dashboard" className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-md shadow hover:bg-green-700 transition-all duration-200">
                Dashboard
              </a>
            ) : (
              <>
                <a href="/login" className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition-all duration-200">
                  Log In
                </a>
                <a href="/signup" className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 transition-all duration-200">
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
