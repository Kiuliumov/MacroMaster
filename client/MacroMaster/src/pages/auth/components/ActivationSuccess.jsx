import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { commonStyles } from "../commonStyles";
import { setCookie } from "../../../../authentication";

export default function ActivationSuccess() {
  const { uid, token } = useParams();
  const [status, setStatus] = useState("loading"); 
  const [errorMessage, setErrorMessage] = useState(""); // now used in JSX
  const API_BASE_URL = "http://localhost:8000/api";

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
        });

        const data = await res.json();

        if (!res.ok) {
          setErrorMessage(data.error || "You do not have permission to activate this account.");
          setStatus("forbidden");
          return;
        }

        if (data.access && data.refresh) {
          setCookie("access", data.access, 1);
          setCookie("refresh", data.refresh, 7);
        }

        setStatus("success");
      } catch (err) {
        setErrorMessage(err.errorMessage.toUpperCase());
        setStatus("forbidden");
      }
    }

    activateAccount();
  }, [uid, token]);

  if (status === "loading") {
    return (
      <div className={commonStyles.container}>
        <p className={commonStyles.textCenter}>Activating your account...</p>
      </div>
    );
  }

  if (status === "forbidden") {
    return (
      <div className={commonStyles.container}>
        <h1 className="text-6xl font-bold mb-4">403</h1>
        <p className={commonStyles.textCenter} style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
          🚫 {errorMessage}
        </p>
        <p className={commonStyles.textCenter}>
          <a href="/register" className={commonStyles.link} style={{ fontSize: "1.25rem" }}>
            Go back to Register
          </a>
        </p>
        <p className={commonStyles.textCenter}>
          <a href="/login" className={commonStyles.link} style={{ fontSize: "1.25rem" }}>
            Go to Login
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className={commonStyles.container}>
      <h1 className="text-5xl font-bold mb-4">🎉 Account Activated!</h1>
      <p className={commonStyles.textCenter} style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
        Your account has been successfully activated! You are now logged in.
      </p>
      <p className={commonStyles.textCenter}>
        <a href="/dashboard" className={commonStyles.link} style={{ fontSize: "1.25rem" }}>
          Go to Dashboard
        </a>
      </p>
    </div>
  );
}
