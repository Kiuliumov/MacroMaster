import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user.user); 
  if (!user?.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
