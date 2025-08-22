import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getJwtFromCookie } from "../authentication";
import { setUser, logout } from "../src/state_manager/userSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = getJwtFromCookie("access");
  const isLoggedIn = !!token;

  useEffect(() => {
    if (token && !user?.token) {
      dispatch(setUser({ token })); 
    } else if (!token && user) {
      dispatch(logout());
    }
  }, [token, user, dispatch]);

  return { user, isLoggedIn, token };
}
