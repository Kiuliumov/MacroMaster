import Logo from "../../../components/Logo";
import { commonStyles } from "../../../styles/commonStyles";
import { useAuth } from "../../../../hooks/useAuth";
import AccountHero from "./AccountHero";
import NoAccountHero from "./NoAccountHero";

export default function HeroSection() {
  const { isLoggedIn, user } = useAuth();

  return (
    <div className={commonStyles.headerWrapper}>
      <div className="flex justify-center mb-6">
        <Logo className="h-16 w-16 animate-fade-in" />
      </div>

      {isLoggedIn ? <AccountHero user={user} /> : <NoAccountHero />}
    </div>
  );
}