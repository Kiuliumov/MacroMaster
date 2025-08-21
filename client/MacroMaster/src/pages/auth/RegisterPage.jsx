import React from "react";
import CardWrapper from "./components/CardWrapper";
import RegisterForm from "./components/RegisterForm";
import { commonStyles } from "./commonStyles";

export default function RegisterPage() {
  return (
    <CardWrapper title="Create Account">
      <RegisterForm />
      <p className={commonStyles.textCenter}>
        Already have an account?{" "}
        <a href="/login" className={commonStyles.link}>
          Log in
        </a>
      </p>
    </CardWrapper>
  );
}
