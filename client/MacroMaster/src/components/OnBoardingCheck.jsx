import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function OnboardingCheck() {
  const { isLoggedIn, onboardingRequired } = useAuth();

  if (isLoggedIn && onboardingRequired) {
    return <Navigate to="/onboarding" replace />;
  }

  return null;
}