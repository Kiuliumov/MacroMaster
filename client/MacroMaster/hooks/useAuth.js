import { useSelector } from "react-redux";
import { getJwtFromCookie } from "../authentication";

export function useAuth() {
  const user = useSelector((state) => state.user.user);
  const token = getJwtFromCookie("access");
  const isLoggedIn = !!token;

  return { user, isLoggedIn, token };
}

