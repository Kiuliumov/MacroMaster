import { lazy } from "react";
import ProtectedRoute from "./route_components/ProtectedRoute";
import GuestRoute from "./route_components/GuestRoute";

// --- Public Pages ---
const Homepage = lazy(() => import("./pages/Home/Homepage"));
const About = lazy(() => import("./pages/About/About"));
const CareersPage = lazy(() => import("./pages/Careers/CareersPage"));
const PricingPage = lazy(() => import("./pages/Pricing/PricingPage"));
const SupportPage = lazy(() => import("./pages/Support/SupportPage"));
const FeaturesPage = lazy(() => import("./pages/Features/FeaturesPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// --- Auth Pages ---
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("./pages/auth/ForgotPasswordPage"));
const ActivationSuccess = lazy(() => import("./pages/auth/components/ActivationSuccess"));

// --- Dashboard Pages ---
const DashboardPage = lazy(() => import("./pages/DashboardPage"));

// --- Route Config ---
const routes = [
  // Public routes
  { path: "/", element: <Homepage /> },
  { path: "/about", element: <About /> },
  { path: "/careers", element: <CareersPage /> },
  { path: "/pricing", element: <PricingPage /> },
  { path: "/support", element: <SupportPage /> },
  { path: "/features", element: <FeaturesPage /> },
  { path: "/policy", element: <PrivacyPolicy /> },

  // Auth routes (guest only)
  { path: "/login", element: <GuestRoute><LoginPage /></GuestRoute> },
  { path: "/register", element: <GuestRoute><RegisterPage /></GuestRoute> },
  { path: "/forgot-password", element: <GuestRoute><ForgotPasswordPage /></GuestRoute> },
  { path: "/activate/:uid/:token", element: <ActivationSuccess /> },

  // Protected routes
  { path: "/dashboard", element: <ProtectedRoute><DashboardPage /></ProtectedRoute> },

  // Catch-all
  { path: "*", element: <NotFoundPage /> },
];

export default routes;
