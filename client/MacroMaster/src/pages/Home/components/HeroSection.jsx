import { Link } from "react-router-dom";
import Logo from "../../../components/Logo";
import { commonStyles } from "../../../styles/commonStyles";
import { useAuth } from "../../../../hooks/useAuth"; 

export default function HeroSection() {
  const { isLoggedIn } = useAuth();

  return (
    <div className={commonStyles.headerWrapper}>
      <div className="flex justify-center mb-6">
        <Logo className="h-16 w-16" />
      </div>
      <h1 className={commonStyles.pageTitle}>
        Welcome to <span className="text-blue-500">MacroMaster</span>
      </h1>
      <p className={commonStyles.pageSubtitle}>
        Track your calories, manage your macros, and take control of your
        health with ease.
      </p>

      <div className="flex justify-center space-x-4 mt-6">
        {!isLoggedIn ? (
          <>
            <Link to="/register" className={commonStyles.btnPrimary}>
              Get Started
            </Link>
            <Link to="/login" className={ "px-6 py-2 rounded-xl text-center border border-white text-white font-medium hover:bg-white hover:text-gray-900 transition-colors duration-300 shadow-md"}>
              Log In
            </Link>
          </>
        ) : (
          <Link to="/dashboard" className={commonStyles.btnDashboard}>
            Go to Dashboard
          </Link>
        )}
      </div>
    </div>
  );
}
