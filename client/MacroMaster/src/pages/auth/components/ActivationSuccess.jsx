import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardWrapper from "./CardWrapper";
import { commonStyles } from "../commonStyles";
import { setCookie } from "../../../../authentication";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../state_manager/userSlice";
import { API_BASE_URL } from "../../../config"

export default function ActivationSuccess() {
  const { uid, token } = useParams();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

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

        dispatch(setUser({ token: data.access }));

        setStatus("success");
      } catch (err) {
        setErrorMessage(err.errorMessage.toUpperCase());
        setStatus("forbidden");
      }
    }

    activateAccount();
  }, [uid, token, dispatch]);

  if (status === "loading") {
    return (
      <CardWrapper title="Account Activation">
        <p className={commonStyles.textCenter}>Activating your account...</p>
      </CardWrapper>
    );
  }

  if (status === "forbidden") {
    return (
      <CardWrapper title="403 - Forbidden">
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
      </CardWrapper>
    );
  }

  return (
    <CardWrapper title="Account Activated">
      <p className={commonStyles.textCenter} style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
        🎉 Your account has been successfully activated! You are now logged in.
      </p>
      {isLoggedIn && (
        <p className={commonStyles.textCenter}>
          <a href="/dashboard" className={commonStyles.link} style={{ fontSize: "1.25rem" }}>
            Go to Dashboard
          </a>
        </p>
      )}
    </CardWrapper>
  );
}
