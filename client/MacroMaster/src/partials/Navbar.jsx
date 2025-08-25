import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import Logo from "../components/Logo";
import DesktopNav from "../components/DesktopNav";
import AuthButtons from "../components/AuthButtons";
import MobileMenu from "../components/MobileMenu";
import ThemeToggle from "./ThemeToggle";

const styles = {
  header: "bg-white dark:bg-gray-900 shadow sticky top-0 z-50",
  container: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
  inner: "flex h-16 items-center justify-between",
  desktopActions: "hidden md:flex items-center space-x-4",
  mobileActions: "md:hidden flex items-center space-x-2",
  mobileButton: "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800",
  icon: "h-6 w-6 text-gray-900 dark:text-white",
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <Link to="/">
            <Logo />
          </Link>

          <DesktopNav asLink={Link} />

          <div className={styles.desktopActions}>
            <ThemeToggle />
            <AuthButtons LinkComponent={Link} />
          </div>

          <div className={styles.mobileActions}>
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={styles.mobileButton}
            >
              {mobileOpen ? (
                <X className={styles.icon} />
              ) : (
                <Menu className={styles.icon} />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <MobileMenu setMobileOpen={setMobileOpen} LinkComponent={Link} />
      )}
    </header>
  );
}
