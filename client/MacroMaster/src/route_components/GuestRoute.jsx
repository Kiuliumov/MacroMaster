import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { addToast } from "../state_manager/toastSlice";

export default function GuestRoute({ children }) {
  const { user, loading } = useAuth();
  const dispatch = useDispatch();
  const toastFired = useRef(false);

  useEffect(() => {
    if (!toastFired.current && user) {
      dispatch(addToast({ message: "You are already logged in.", type: "danger" }));
      toastFired.current = true;
    }
  }, [user, dispatch]);

  if (loading) return null;

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
