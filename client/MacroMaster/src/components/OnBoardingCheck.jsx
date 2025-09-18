import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function OnboardingCheck() {
  const { user } = useAuth();

  if (user && !user.stats.onboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return null;
}