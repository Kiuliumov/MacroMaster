import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GuestRoute({ children }) {
  const user = useSelector((state) => state.user.user);

  if (user?.token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
