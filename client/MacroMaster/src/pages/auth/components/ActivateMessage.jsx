import React from "react";
import CardWrapper from "./CardWrapper";
import { commonStyles } from "../commonStyles";

export default function ActivateMessage() {
  return (
    <CardWrapper title="Verify Your Email">
      <p className={commonStyles.textCenter}>
        Thank you for registering! We’ve sent a verification email to your inbox. Please check your email and click the link to activate your account.
      </p>

      <p className={commonStyles.textCenter}>
        Didn’t receive the email? <a href="/register" className={commonStyles.link}>Resend verification email</a>
      </p>

      <p className={commonStyles.textCenter}>
        <a href="/login" className={commonStyles.link}>Back to login</a>
      </p>
    </CardWrapper>
  );
}
