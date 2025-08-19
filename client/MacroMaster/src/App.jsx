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
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from "./pages/auth/RegisterPage";
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
			<Toast />
			<Navbar />
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/about" element={<About />} />
				<Route path="/careers" element={<CareersPage />} />
				<Route path="/login" element={<LoginPage />} />
      			<Route path="/register" element={<RegisterPage />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
