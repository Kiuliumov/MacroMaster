import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./partials/Navbar";
import Footer from "./partials/Footer";
import Toast from "./components/Toast";
import { setUser } from "./state_manager/userSlice";
import { getJwtFromCookie } from "../authentication";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import CareersPage from "./pages/CareersPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import PricingPage from "./pages/PricingPage";
import DashboardPage from "./pages/DashboardPage";
import ScrollToTop from "./components/Scroller";
import ProtectedRoute from "./route_components/ProtectedRoute";
import GuestRoute from "./route_components/GuestRoute";
import SupportPage from "./pages/SupportPage";
import FeaturesPage from "./pages/FeaturesPage";

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
			<Navbar />
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/about" element={<About />} />
				<Route path="/careers" element={<CareersPage />} />
				<Route path="/pricing" element={<PricingPage />} />
				<Route path="/support" element={<SupportPage />} />
				<Route path="/features" element={<FeaturesPage />} />

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
			</Routes>
			<Footer />
		</>
	);
}

export default App;
