import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./partials/Navbar";
import Footer from "./partials/Footer";
import Toast from "./components/Toast";
import ScrollToTop from "./components/Scroller";
import CookieNotice from "./components/CookieNotice";
import { setUser } from "./state_manager/userSlice";
import { getJwtFromCookie } from "../authentication";

import Homepage from "./pages/Home/Homepage";
import About from "./pages/About/About";
import CareersPage from "./pages/Careers/CareersPage";
import PricingPage from "./pages/PricingPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SupportPage from "./pages/SupportPage";
import FeaturesPage from "./pages/Features/FeaturesPage";
import DashboardPage from "./pages/DashboardPage";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

import ProtectedRoute from "./route_components/ProtectedRoute";
import GuestRoute from "./route_components/GuestRoute";
import ActivationSuccess from "./pages/auth/components/ActivationSuccess";
import NotFoundPage from "./pages/NotFoundPage";
function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const token = getJwtFromCookie();
		if (token) {
			dispatch(setUser({ token }));
		}
	}, [dispatch]);

	return (
		<>
			<ScrollToTop />
			<Toast />
			<CookieNotice />
			<Navbar />

			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/about" element={<About />} />
				<Route path="/careers" element={<CareersPage />} />
				<Route path="/pricing" element={<PricingPage />} />
				<Route path="/support" element={<SupportPage />} />
				<Route path="/features" element={<FeaturesPage />} />
				<Route path="/policy" element={<PrivacyPolicy />} />

				<Route
					path="/login"
					element={
						<GuestRoute>
							<LoginPage />
						</GuestRoute>
					}
				/>
				<Route
					path="/register"
					element={
						<GuestRoute>
							<RegisterPage />
						</GuestRoute>
					}
				/>
				<Route
					path="/forgot-password"
					element={
						<GuestRoute>
							<ForgotPasswordPage />
						</GuestRoute>
					}
				/>

				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<DashboardPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/activate/:uid/:token"
					element={
						<GuestRoute>
							<ActivationSuccess />
						</GuestRoute>
					}
				/>

				<Route path="*" element={<NotFoundPage />} />	
			</Routes>

			<Footer />
		</>
	);
}

export default App;
