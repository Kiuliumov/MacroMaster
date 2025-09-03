import { useSelector } from "react-redux";

export function useAuth() {
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const token = user?.token || null;
  const onboardingRequired = isLoggedIn && user && !user.onboardingCompleted;

  return { user, isLoggedIn, token, onboardingRequired, loading: false };
}
