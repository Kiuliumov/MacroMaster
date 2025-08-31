import { Link } from "react-router-dom";
import Logo from "../../../components/Logo";
import { commonStyles } from "../../../styles/commonStyles";
import { useAuth } from "../../../../hooks/useAuth"; 

export default function HeroSection() {
  const { isLoggedIn, user } = useAuth();

  return (
    <div className={commonStyles.headerWrapper}>
      <div className="flex justify-center mb-6">
        <Logo className="h-16 w-16" />
      </div>

      {isLoggedIn ? (
        <>
          <h1 className={commonStyles.pageTitle}>
            Welcome, <span className="text-blue-500">{user?.username || "there"}</span>
          </h1>
          <div className="flex justify-center mt-6">
            <Link to="/dashboard" className={commonStyles.btnDashboard}>
              Go to Dashboard
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1 className={commonStyles.pageTitle}>
            Welcome to <span className="text-blue-500">MacroMaster</span>
          </h1>
          <p className={commonStyles.pageSubtitle}>
            Track your calories, manage your macros, and take control of your
            health with ease.
          </p>
          <div className="flex justify-center mt-6">
            <Link to="/register" className={commonStyles.btnPrimary}>
              Get Started
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
