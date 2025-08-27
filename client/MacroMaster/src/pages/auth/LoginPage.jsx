import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToast } from "../../state_manager/toastSlice";

import CardWrapper from "./components/CardWrapper";
import { commonStyles } from "./commonStyles";
import { useLogin } from "../../../hooks/useLogin";

export default function LoginPage() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { login, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const success = await login(username, password);

    if (success) {
      dispatch(addToast({ message: "Login successful!", type: "success" }));
      navigate("/");
    }
  };

  return (
    <div className={commonStyles.container}>
      <div
        className={commonStyles.loginGradientBlur}
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.2) 15.73%, rgba(14, 165, 233, 0.6) 15.74%, rgba(232, 121, 249, 0.35) 56.49%, rgba(79, 70, 229, 0.5) 115.91%)",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <CardWrapper title="Login">
          {error && <p className={commonStyles.errorText}>{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <input
              type="text"
              ref={usernameRef}
              placeholder="Username"
              autoComplete="username"
              className={commonStyles.input}
              required
            />

            <input
              type="password"
              ref={passwordRef}
              placeholder="Password"
              autoComplete="current-password"
              className={commonStyles.input}
              required
            />

            <button type="submit" className={commonStyles.button}>
              Log In
            </button>
          </form>

          <p className={commonStyles.textCenter}>
            Don’t have an account?{" "}
            <Link to="/register" className={commonStyles.link}>
              Sign up
            </Link>
          </p>
        </CardWrapper>
      </div>
    </div>
  );
}
