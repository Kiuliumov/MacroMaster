import { commonStyles } from "../../styles/commonStyles";
import FeaturesSection from "./components/FeaturesSection";
import Logo from '../../components/Logo';
import AccountHero from "./components/AccountHero";
import NoAccountHero from "./components/NoAccountHero";
import { useAuth } from "../../../hooks/useAuth";

export default function Homepage() {
	const { isLoggedIn, user} = useAuth();
	return (
		<main className={commonStyles.container}>
			<div
				className={commonStyles.gradientBlur}
				style={{
					background:
						"linear-gradient(106.89deg, rgba(192, 132, 252, 0.2) 15.73%, rgba(14, 165, 233, 0.6) 15.74%, rgba(232, 121, 249, 0.35) 56.49%, rgba(79, 70, 229, 0.5) 115.91%)",
				}}
			/>

			<div className="relative max-w-5xl mx-auto space-y-20 flex flex-col items-center">
				<div className={commonStyles.headerWrapper}>
					<div className="flex justify-center mb-6">
						<Logo className="h-16 w-16 animate-fade-in" />
					</div>

					{isLoggedIn ? <AccountHero user={user} /> : <NoAccountHero />}
				</div>
				{!isLoggedIn && <FeaturesSection />}
			</div>
		</main>
	);
}
