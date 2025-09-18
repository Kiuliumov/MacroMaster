import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToast } from "../../state_manager/toastSlice";
import CardWrapper from "./components/CardWrapper";
import { commonStyles } from "./commonStyles";
import PasswordFields from "./components/PasswordFields";

export default function ResetPasswordPage() {
  const [form, setForm] = useState({ password: "", password2: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uid, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { password, password2 } = form;

    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/reset-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, token, new_password: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Password reset failed");
      }

      dispatch(
        addToast({
          message: "Password reset successful! You can log in now.",
          type: "success",
        })
      );
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={commonStyles.container}>
      <div
        className={commonStyles.loginGradientBlur}
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.2) 15.73%, rgba(14, 165, 233, 0.6) 15.74%, rgba(232, 121, 249, 0.35) 56.49%, rgba(79, 70, 229, 0.5) 115.91%)",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <CardWrapper title="Reset Password">
          {error && <p className={commonStyles.errorText}>{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <PasswordFields form={form} setForm={setForm} />

            <button type="submit" className={commonStyles.button} disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p className={commonStyles.textCenter}>
            <Link to="/login" className={commonStyles.link}>
              Back to login
            </Link>
          </p>
        </CardWrapper>
      </div>
    </main>
  );
}
