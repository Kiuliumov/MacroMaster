import React from "react";
import CardWrapper from "./CardWrapper";
import { commonStyles } from "../commonStyles";

export default function ActivateMessage() {
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
        <CardWrapper title="Verify Your Email">
          <p className={commonStyles.textCenter}>
            Thank you for registering! We’ve sent a verification email to your
            inbox. Please check your email and click the link to activate your
            account.
          </p>

          <p className={commonStyles.textCenter}>
            Didn’t receive the email?{" "}
            <a href="/register" className={commonStyles.link}>
              Resend verification email
            </a>
          </p>

          <p className={commonStyles.textCenter}>
            <a href="/login" className={commonStyles.link}>
              Back to login
            </a>
          </p>
        </CardWrapper>
      </div>
    </div>
  );
}
