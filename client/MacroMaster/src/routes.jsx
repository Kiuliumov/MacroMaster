import { lazy } from "react";
import ProtectedRoute from "./route_components/ProtectedRoute";
import GuestRoute from "./route_components/GuestRoute";
import RegularLayout from "./layouts/RegularLayout";
import SiteLayout from "./layouts/SiteLayout";
import Onboarding from "./pages/Auth/Onboarding/Onboarding";
import Forum from "./pages/Forum/Forum";
import ContactMessagesPage from "./pages/Support/ContactMessages";

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
const LoginPage = lazy(() => import("./pages/Auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/Auth/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("./pages/Auth/ForgotPasswordPage"));
const ActivationSuccess = lazy(() => import("./pages/Auth/components/ActivationSuccess"));
const PasswordReset = lazy(() => import("./pages/Auth/PasswordReset"));

// --- Dashboard Pages ---
const DashboardPage = lazy(() => import("./pages/DashboardPage"));

// --- Route Config ---

const routes = [
  // Public routes
  { path: "/", element: <Homepage />, layout: SiteLayout },
  { path: "/about", element: <About />, layout: SiteLayout },
  { path: "/careers", element: <CareersPage />, layout: SiteLayout },
  { path: "/pricing", element: <PricingPage />, layout: SiteLayout },
  { path: "/support", element: <SupportPage />, layout: SiteLayout },
  { path: "/contact-messages", element: <ContactMessagesPage />, layout: SiteLayout },
  { path: "/features", element: <FeaturesPage />, layout: SiteLayout },
  { path: "/policy", element: <PrivacyPolicy />, layout: SiteLayout },

  // Auth routes (guest only)
  { path: "/login", element: <GuestRoute><LoginPage /></GuestRoute>, layout: SiteLayout },
  { path: "/register", element: <GuestRoute><RegisterPage /></GuestRoute>, layout: SiteLayout},
  { path: "/forgot-password", element: <GuestRoute><ForgotPasswordPage /></GuestRoute>, layout: SiteLayout },
  { path: "/activate/:uid/:token", element: <ActivationSuccess />, layout: SiteLayout },
  {path: "/reset-password/:uid/:token", element: <GuestRoute><PasswordReset /></GuestRoute>, layout: RegularLayout},
  
  // Protected routes
  { path: "/dashboard", element: <ProtectedRoute><DashboardPage /></ProtectedRoute>, layout: SiteLayout },
  { path: "/onboarding", element: <ProtectedRoute><Onboarding  /></ProtectedRoute>, layout: RegularLayout },
  { path: "/forum", element: <ProtectedRoute><Forum /></ProtectedRoute>, layout: SiteLayout },

  // Catch-all
  { path: "*", element: <NotFoundPage />, layout: SiteLayout },
];


export default routes;
