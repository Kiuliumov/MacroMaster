import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function AuthButtons({ isLoggedIn, handleLogout }) {
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
