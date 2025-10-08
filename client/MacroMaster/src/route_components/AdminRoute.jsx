import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { addToast } from "../state_manager/toastSlice";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const dispatch = useDispatch();
  const toastFired = useRef(false);

  useEffect(() => {
    if (!toastFired.current && !loading && (!user || !user.is_staff)) {
      dispatch(addToast({ message: "You need admin access to view this page.", type: "danger" }));
      toastFired.current = true;
    }
  }, [loading, user, dispatch]);

  if (loading) return null;

  if (!user || !user.is_staff) {
    return <Navigate to="/" replace />;
  }

  return children;
}
