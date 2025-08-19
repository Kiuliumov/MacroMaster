import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../state_manager/userSlice";
import { addToast } from "../state_manager/toastSlice";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";

import Logo from "../components/Logo";
import DesktopNav from "../components/DesktopNav";
import AuthButtons from "../components/AuthButtons";
import MobileMenu from "../components/MobileMenu";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = !!user;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(addToast({ message: "Logout successful ✅", type: "success" }));
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>

          <DesktopNav asLink={Link} />

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <AuthButtons isLoggedIn={isLoggedIn} handleLogout={handleLogout} LinkComponent={Link} />
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileOpen ? (
                <X className="h-6 w-6 text-gray-900 dark:text-white" />
              ) : (
                <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <MobileMenu
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          setMobileOpen={setMobileOpen}
          LinkComponent={Link}
        />
      )}
    </header>
  );
}
