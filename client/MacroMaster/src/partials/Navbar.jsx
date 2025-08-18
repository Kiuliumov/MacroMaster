import { useSelector, useDispatch } from "react-redux";
import { logout } from "../state_manager/userSlice";
import ThemeToggle from "./ThemeToggle";
import NavLink from "../components/NavLink";
import Button from "../components/Button";
import logo from "../assets/MacroMaster.png";

const publicLinks = ["Home", "Features", "Pricing", "Forum", "About"];

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = !!user;

  const handleLogout = () => dispatch(logout());

  return (
    <header className="bg-white dark:bg-gray-900 shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-2">
              <img className="h-8 w-8" src={logo} alt="MacroMaster Logo" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                MacroMaster
              </span>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            {publicLinks.map((item) => (
              <NavLink key={item} href={`/${item.toLowerCase()}`}>
                {item}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {isLoggedIn ? (
              <>
                <Button className="bg-green-400 text-white hover:bg-green-500 dark:bg-green-600 dark:hover:bg-green-700">
                  <a href="/dashboard">Dashboard</a>
                </Button>
                <Button
                  className="bg-red-400 text-white hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-700"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button className="bg-blue-400 text-white hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700">
                  <a href="/login">Log In</a>
                </Button>
                <Button className="bg-blue-300 text-white hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600">
                  <a href="/signup">Sign Up</a>
                </Button>
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
