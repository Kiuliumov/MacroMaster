import React, { useState } from "react";
import CardWrapper from "./components/CardWrapper";
import RegisterForm from "./components/RegisterForm";
import SuccessMessage from "./components/ActivateMessage";
import { commonStyles } from "./commonStyles";

export default function RegisterPage() {
  const [success, setSuccess] = useState(false);

  return success ? (
    <SuccessMessage />
  ) : (
    <CardWrapper title="Create Account">
      <RegisterForm onSuccess={() => setSuccess(true)} />
      <p className={commonStyles.textCenter}>
        Already have an account?{" "}
        <a href="/login" className={commonStyles.link}>
          Log in
        </a>
      </p>
    </CardWrapper>
  );
}
