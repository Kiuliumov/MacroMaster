import React from "react";
import { Link } from "react-router-dom";
import { Apple, Activity, Scale } from "lucide-react";
import { useSelector } from "react-redux";
import Logo from "../components/Logo";

export default function Homepage() {
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = !!user;

const styles = {
  container:
    "min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-8",
  headerWrapper: "text-center max-w-2xl",
  logoWrapper: "flex justify-center mb-6",
  logo: "h-16 w-16",
  title: "text-4xl md:text-5xl font-extrabold mb-4",
  highlight: "text-blue-500",
  subtitle: "text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6",
  buttonGroup: "flex justify-center space-x-4",
  btnPrimary:
    "px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-600 hover:shadow-xl transition transform hover:-translate-y-0.5",
  btnSecondary:
    "px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition transform hover:-translate-y-0.5",
  btnDashboard:
    "px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-lg hover:bg-green-600 hover:shadow-xl transition transform hover:-translate-y-0.5",
  featuresGrid: "mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full",
  featureCard:
    "bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100 dark:border-gray-600",
  featureIcon: "mx-auto h-12 w-12 mb-4",
  featureTitle: "text-xl font-semibold mb-3",
  featureText: "text-gray-700 dark:text-gray-300 text-sm leading-relaxed",
};


  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <div className={styles.logoWrapper}>
          <Logo className={styles.logo} />
        </div>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>MacroMaster</span>
        </h1>
        <p className={styles.subtitle}>
          Track your calories, manage your macros, and take control of your
          health with ease.
        </p>

        <div className={styles.buttonGroup}>
          {!isLoggedIn ? (
            <>
              <Link to="/register" className={styles.btnPrimary}>
                Get Started
              </Link>
              <Link to="/login" className={styles.btnSecondary}>
                Log In
              </Link>
            </>
          ) : (
            <Link to="/dashboard" className={styles.btnDashboard}>
              Go to Dashboard
            </Link>
          )}
        </div>
      </div>

      <div className={styles.featuresGrid}>
        <div className={styles.featureCard}>
          <Apple className={`${styles.featureIcon} text-green-500`} />
          <h3 className={styles.featureTitle}>Log Your Meals</h3>
          <p className={styles.featureText}>
            Quickly add foods and track calories with an extensive database.
          </p>
        </div>
        <div className={styles.featureCard}>
          <Activity className={`${styles.featureIcon} text-blue-500`} />
          <h3 className={styles.featureTitle}>Track Progress</h3>
          <p className={styles.featureText}>
            Monitor your daily intake and stay aligned with your fitness goals.
          </p>
        </div>
        <div className={styles.featureCard}>
          <Scale className={`${styles.featureIcon} text-purple-500`} />
          <h3 className={styles.featureTitle}>Balance Macros</h3>
          <p className={styles.featureText}>
            Keep carbs, proteins, and fats in check for optimal performance.
          </p>
        </div>
      </div>
    </div>
  );
}
