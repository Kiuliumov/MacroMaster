import { useSelector } from "react-redux";

export function useAuth() {
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const accessToken = useSelector((state) => state.user.accessToken);

  const onboardingRequired =
    isLoggedIn && user && !user.stats?.daily_calories;

  return {
    user,
    isLoggedIn,
    token: accessToken,
    onboardingRequired,
    loading: false,
  };
}
