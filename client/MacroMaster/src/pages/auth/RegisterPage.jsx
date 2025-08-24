import React, { useState } from "react";
import CardWrapper from "./components/CardWrapper";
import RegisterForm from "./components/RegisterForm";
import SuccessMessage from "./components/ActivateMessage";
import { commonStyles } from "./commonStyles";

export default function RegisterPage() {
  const [success, setSuccess] = useState(false);

  if (success) return <SuccessMessage />;

  return (
    <div className={commonStyles.container}>
      <div
        className={commonStyles.loginGradientBlur} 
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192,132,252,0.3) 15.73%, rgba(14,165,233,0.8) 15.74%, rgba(232,121,249,0.5) 56.49%, rgba(79,70,229,0.7) 115.91%)",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <CardWrapper title="Create Account">
          <RegisterForm onSuccess={() => setSuccess(true)} />
          <p className={commonStyles.textCenter}>
            Already have an account?{" "}
            <a href="/login" className={commonStyles.link}>
              Log in
            </a>
          </p>
        </CardWrapper>
      </div>
    </div>
  );
}
