import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../state_manager/userSlice";
import { addToast } from "../state_manager/toastSlice";

export default function AuthButtons() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  let navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(addToast({ message: "Logout successful!", type: "success" }));
    navigate('/');    
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <Button className="bg-green-400 text-white hover:bg-green-500 dark:bg-green-600 dark:hover:bg-green-700">
            <Link to="/dashboard">Dashboard</Link>
          </Button>
          <Button
            className="bg-red-400 text-white hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button className="bg-blue-400 text-white hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700">
            <Link to="/login">Log In</Link>
          </Button>
          <Button className="bg-blue-300 text-white hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600">
            <Link to="/register">Sign Up</Link>
          </Button>
        </>
      )}
    </>
  );
}
