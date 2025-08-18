import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./partials/Navbar";
import Footer from "./partials/Footer";
import Toast from "./components/Toast";
import { setUser } from "./state_manager/userSlice";
import { getJwtFromCookie } from "../authentication";
import Homepage from "./pages/Homepage";

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
			</Routes>
			<Footer />
		</>
	);
}

export default App;
