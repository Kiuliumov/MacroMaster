import { Link } from "react-router-dom";
import { commonStyles } from "../../../styles/commonStyles";

export default function NoAccountHero() {
  return (
    <>
      <h1 className={commonStyles.pageTitle}>
        Welcome to <span className="text-blue-500">MacroMaster</span>
      </h1>
      <p className={commonStyles.pageSubtitle}>
        Track your calories, manage your macros, and take control of your health with ease.
      </p>
      <div className="flex justify-center mt-6">
        <Link to="/register" className={commonStyles.btnPrimary}>
          Get Started
        </Link>
      </div>
    </>
  );
}
