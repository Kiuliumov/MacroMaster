import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null; 

  if (!user || !user.is_staff) {
    return <Navigate to="/" replace />;
  }

  return children;
}
