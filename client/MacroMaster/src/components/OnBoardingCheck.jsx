import { useAuth } from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';

export default function OnboardingCheck() {
  const { user } = useAuth();
  const location = useLocation();
  if (
    user &&
    !user.stats.onboarding &&
    !window.location.href.includes("activate") &&
    location.pathname !== "/onboarding"
  ) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Complete Your Onboarding
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            You need to complete your onboarding to begin using the app.
          </p>
          <a
            href="/onboarding"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Go to Onboarding
          </a>
        </div>
      </div>
    );
  }

  return null;
}
