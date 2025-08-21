import { useSelector } from "react-redux";

export function useAuth() {
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = !!user;

  return { user, isLoggedIn };
}
