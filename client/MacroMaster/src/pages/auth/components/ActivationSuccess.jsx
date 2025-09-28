import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardWrapper from "./CardWrapper";
import { commonStyles } from "../commonStyles";
import { API_BASE_URL } from "../../../config";
import { useAuth } from "../../../../hooks/useAuth";

export default function ActivationSuccess() {
  const { uid, token } = useParams();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!uid || !token) {
      setStatus("forbidden");
      setErrorMessage("Missing activation link parameters.");
      return;
    }

    async function activateAccount() {
      try {
        const res = await fetch(`${API_BASE_URL}/activate/${uid}/${token}/`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          setErrorMessage(data.error || "Activation failed.");
          setStatus("forbidden");
          return;
        }

        setStatus("success");
      } catch (err) {
        setErrorMessage(err.message || "Unexpected error");
        setStatus("forbidden");
      }
    }

    activateAccount();
  }, [uid, token]);

  useEffect(() => {
    if (status === "success" && isLoggedIn) {
      navigate("/dashboard");
    }
  }, [status, isLoggedIn, navigate]);

  const renderCard = (title, children) => (
    <div className={commonStyles.container}>
      <div
        className={commonStyles.loginGradientBlur}
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.2) 15.73%, rgba(14, 165, 233, 0.6) 15.74%, rgba(232, 121, 249, 0.35) 56.49%, rgba(79, 70, 229, 0.5) 115.91%)",
        }}
      />
      <div className="relative z-10 w-full max-w-md">
        <CardWrapper title={title}>{children}</CardWrapper>
      </div>
    </div>
  );

  if (status === "loading") {
    return renderCard(
      "Account Activation",
      <p className={commonStyles.textCenter}>Activating your account...</p>
    );
  }

  if (status === "forbidden") {
    return renderCard(
      "403 - Forbidden",
      <>
        <p
          className={commonStyles.textCenter}
          style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}
        >
          🚫 {errorMessage}
        </p>
        <p className={commonStyles.textCenter}>
          <a href="/register" className={commonStyles.link}>
            Go back to Register
          </a>
        </p>
        <p className={commonStyles.textCenter}>
          <a href="/login" className={commonStyles.link}>
            Go to Login
          </a>
        </p>
      </>
    );
  }

  return renderCard(
    "Account Activated",
    <p className={commonStyles.textCenter} style={{ fontSize: "1.25rem" }}>
      🎉 Your account has been successfully activated! Redirecting to dashboard...
    </p>
  );
}
