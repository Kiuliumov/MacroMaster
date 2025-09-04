import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToast } from "../../state_manager/toastSlice";
import CardWrapper from "./components/CardWrapper";
import { API_BASE_URL } from "../../config";

const styles = {
  container:
    "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 relative overflow-hidden p-4",
  gradientBlur:
    "absolute inset-0 z-0 opacity-30 blur-3xl",
  cardWrapper: "relative z-10 w-full max-w-md",
  description:
    "text-gray-600 dark:text-gray-300 mb-4 text-center",
  errorText:
    "text-red-500 mb-2 text-center",
  form: "flex flex-col gap-4",
  input:
    "w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition",
  spinnerContainer:
    "absolute right-3 top-1/2 transform -translate-y-1/2",
  spinner:
    "w-4 h-4 border-2 border-t-green-500 border-gray-300 rounded-full animate-spin",
  button:
    "w-full py-4 rounded-xl text-white font-semibold bg-green-600 hover:bg-green-700 transition-colors duration-200 focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed",
  footerText:
    "mt-4 text-center text-gray-500 dark:text-gray-400 text-sm",
  link: "text-green-600 hover:underline cursor-pointer",
};

export default function ForgotPasswordPage() {
  const emailRef = useRef(null);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const email = e.target.value;
    setError("");
    setEmailValid(false);

    if (!email) return;

    setChecking(true);
    try {
      const res = await fetch(`${API_BASE_URL}/check_email/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setError("No account found with this email.");
        setEmailValid(false);
      } else {
        setEmailValid(true);
      }
    } catch (err) {
      console.error("Email check failed:", err);
      setError("Error checking email. Please try again.");
    } finally {
      setChecking(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    if (!emailValid) {
      setError("Please enter a valid registered email.");
      return;
    }

    setLoading(true);
    try {
      await fetch(`${API_BASE_URL}/forgot-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      dispatch(addToast({ message: "Password reset link sent!", type: "success" }));
      navigate("/login");
    } catch (err) {
      console.error("Password reset request failed:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <div
        className={styles.gradientBlur}
        style={{
          background:
            "linear-gradient(120deg, rgba(192,132,252,0.2) 0%, rgba(14,165,233,0.4) 50%, rgba(79,70,229,0.5) 100%)",
        }}
      />

      <div className={styles.cardWrapper}>
        <CardWrapper title="Reset Password">
          <p className={styles.description}>
            Enter your email and we’ll send you a link to reset your password.
          </p>

          {error && <p className={styles.errorText}>{error}</p>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className="relative">
              <input
                type="email"
                ref={emailRef}
                placeholder="Email address"
                autoComplete="email"
                className={styles.input}
                onChange={handleChange}
                required
              />

              {checking && (
                <div className={styles.spinnerContainer}>
                  <div className={styles.spinner}></div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className={styles.button}
              disabled={!emailValid || loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className={styles.footerText}>
            Remembered your password?{" "}
            <span
              className={styles.link}
              onClick={() => navigate("/login")}
            >
              Log in
            </span>
          </p>
        </CardWrapper>
      </div>
    </main>
  );
}
