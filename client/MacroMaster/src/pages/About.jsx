import React from "react";
import { Link } from "react-router-dom";
import { Apple, Activity, Scale, Users, Heart, Star, PieChart } from "lucide-react";
import Logo from "../components/Logo";

export default function About() {
  const styles = {
    container:
      "min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-start p-8",

    headerWrapper: "text-center max-w-3xl mb-12",
    logoWrapper: "flex justify-center mb-6",
    logo: "h-16 w-16",
    title: "text-4xl md:text-5xl font-extrabold mb-4",
    highlight: "text-blue-500",
    subtitle: "text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6",

    featuresGrid: "mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl w-full",
    featureCard:
      "bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100 dark:border-gray-600",
    featureIcon: "mx-auto h-12 w-12 mb-4",
    featureTitle: "text-xl font-semibold mb-3",
    featureText: "text-gray-600 dark:text-gray-300 text-sm leading-relaxed",

    missionWrapper: "mt-16 max-w-2xl text-center",
    missionTitle: "text-3xl font-bold mb-4",
    missionText: "text-gray-600 dark:text-gray-300 text-lg leading-relaxed",

    valuesWrapper: "mt-16 max-w-5xl w-full text-center",
    valuesTitle: "text-3xl font-bold mb-8",
    valuesGrid: "grid grid-cols-1 md:grid-cols-3 gap-8",
    valueCard:
      "bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-600",
    valueIcon: "mx-auto h-10 w-10 mb-4",
    valueTitle: "text-xl font-semibold mb-2",
    valueText: "text-gray-600 dark:text-gray-300 text-sm",

    testimonialsWrapper: "mt-16 max-w-5xl w-full text-center",
    testimonialsTitle: "text-3xl font-bold mb-8",
    testimonialsGrid: "grid grid-cols-1 md:grid-cols-2 gap-8",
    testimonialCard:
      "bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-600",
    testimonialText: "text-gray-600 dark:text-gray-300 text-sm mb-2",
    testimonialAuthor: "font-semibold",

    ctaWrapper: "mt-16 text-center",
    ctaTitle: "text-3xl font-bold mb-4",
    ctaText: "text-gray-600 dark:text-gray-300 mb-6",
    ctaButton:
      "inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition transform hover:-translate-y-0.5",
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <div className={styles.logoWrapper}>
          <Logo className={styles.logo} />
        </div>
        <h1 className={styles.title}>
          About <span className={styles.highlight}>MacroMaster</span>
        </h1>
        <p className={styles.subtitle}>
          MacroMaster is designed to make nutrition tracking simple, accurate,
          and engaging. Whether you're managing weight, building muscle, or just
          eating healthier, we’ve got you covered.
        </p>
      </div>

      <div className={styles.featuresGrid}>
        <div className={styles.featureCard}>
          <Apple className={`${styles.featureIcon} text-green-500`} />
          <h3 className={styles.featureTitle}>Log Your Meals</h3>
          <p className={styles.featureText}>
            Quickly add foods and track calories with an extensive food database.
          </p>
        </div>
        <div className={styles.featureCard}>
          <Activity className={`${styles.featureIcon} text-blue-500`} />
          <h3 className={styles.featureTitle}>Track Progress</h3>
          <p className={styles.featureText}>
            Monitor your daily intake and stay aligned with your health goals.
          </p>
        </div>
        <div className={styles.featureCard}>
          <Scale className={`${styles.featureIcon} text-purple-500`} />
          <h3 className={styles.featureTitle}>Balance Macros</h3>
          <p className={styles.featureText}>
            Keep carbs, proteins, and fats in check for optimal nutrition.
          </p>
        </div>
        <div className={styles.featureCard}>
          <Users className={`${styles.featureIcon} text-yellow-500`} />
          <h3 className={styles.featureTitle}>Our Team</h3>
          <p className={styles.featureText}>
            A passionate team of nutritionists and developers dedicated to your
            health.
          </p>
        </div>
      </div>

      <div className={styles.missionWrapper}>
        <h2 className={styles.missionTitle}>Our Mission</h2>
        <p className={styles.missionText}>
          We aim to empower people to make informed nutritional choices,
          simplify tracking, and achieve their health goals with confidence.
        </p>
      </div>

      <div className={styles.valuesWrapper}>
        <h2 className={styles.valuesTitle}>Our Core Values</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <Heart className={`${styles.valueIcon} text-red-500`} />
            <h3 className={styles.valueTitle}>Health First</h3>
            <p className={styles.valueText}>
              We prioritize user health by providing accurate and actionable
              nutrition data.
            </p>
          </div>
          <div className={styles.valueCard}>
            <Star className={`${styles.valueIcon} text-yellow-400`} />
            <h3 className={styles.valueTitle}>Quality & Accuracy</h3>
            <p className={styles.valueText}>
              Reliable food databases and smart tracking features for consistent
              results.
            </p>
          </div>
          <div className={styles.valueCard}>
            <PieChart className={`${styles.valueIcon} text-green-500`} />
            <h3 className={styles.valueTitle}>Empowerment</h3>
            <p className={styles.valueText}>
              Help users understand their nutrition and take control of their
              health journey.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.testimonialsWrapper}>
        <h2 className={styles.testimonialsTitle}>What Users Say</h2>
        <div className={styles.testimonialsGrid}>
          <div className={styles.testimonialCard}>
            <p className={styles.testimonialText}>
              "MacroMaster has completely changed how I plan my meals. It's so
              intuitive and motivating!"
            </p>
            <span className={styles.testimonialAuthor}>— Alex R.</span>
          </div>
          <div className={styles.testimonialCard}>
            <p className={styles.testimonialText}>
              "I love the macro tracking feature. It keeps me on track without
              any stress."
            </p>
            <span className={styles.testimonialAuthor}>— Jamie L.</span>
          </div>
        </div>
      </div>

      <div className={styles.ctaWrapper}>
        <h2 className={styles.ctaTitle}>Join MacroMaster Today</h2>
        <p className={styles.ctaText}>
          Start your journey to smarter nutrition and better health.
        </p>
        <Link to="/" className={styles.ctaButton}>
          Get Started
        </Link>
      </div>
    </div>
  );
}
