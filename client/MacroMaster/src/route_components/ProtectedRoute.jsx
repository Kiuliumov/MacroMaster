import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { addToast } from "../state_manager/toastSlice";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const dispatch = useDispatch();

  if (loading) return null; 

  if (!user) {
    dispatch(addToast({ message: "You need to log in to access this page.", type: "warning" }));
    return <Navigate to="/login" replace />;
  }

  return children;
}
