import React from "react";
import { Link } from "react-router-dom";
import { Apple, Activity, Scale } from "lucide-react";
import { useSelector } from "react-redux";
import Logo from "../components/Logo";
import { commonStyles } from "../styles/commonStyles";

export default function Homepage() {
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = !!user;

  return (
    <div className={commonStyles.container}>
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
              <Link to="/login" className={commonStyles.btnSecondary}>
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

      <div className={commonStyles.featuresGrid}>
        <div className={commonStyles.featureCard}>
          <Apple className={`${commonStyles.featureIcon} text-green-500`} />
          <h3 className={commonStyles.featureTitle}>Log Your Meals</h3>
          <p className={commonStyles.featureText}>
            Quickly add foods and track calories with an extensive database.
          </p>
        </div>
        <div className={commonStyles.featureCard}>
          <Activity className={`${commonStyles.featureIcon} text-blue-500`} />
          <h3 className={commonStyles.featureTitle}>Track Progress</h3>
          <p className={commonStyles.featureText}>
            Monitor your daily intake and stay aligned with your fitness goals.
          </p>
        </div>
        <div className={commonStyles.featureCard}>
          <Scale className={`${commonStyles.featureIcon} text-purple-500`} />
          <h3 className={commonStyles.featureTitle}>Balance Macros</h3>
          <p className={commonStyles.featureText}>
            Keep carbs, proteins, and fats in check for optimal performance.
          </p>
        </div>
      </div>
    </div>
  );
}
