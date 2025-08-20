import { Link, useLocation } from "react-router-dom";
import NavLink from "../components/NavLink";
import Button from "../components/Button";
import { useEffect, useState, useRef } from "react";
import Logo from "../components/Logo";

const publicLinks = ["Home", "Features", "Pricing", "Forum", "About"];

export default function MobileMenu({
	isLoggedIn,
	handleLogout,
	setMobileOpen,
}) {
	const [showMenu, setShowMenu] = useState(false);
	const location = useLocation();
	const firstRender = useRef(true);

	useEffect(() => {
		const timeout = setTimeout(() => setShowMenu(true), 10);
		return () => clearTimeout(timeout);
	}, []);

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			return;
		}
		setShowMenu(false);
		const timeout = setTimeout(() => setMobileOpen(false), 300);
		return () => clearTimeout(timeout);
	}, [location.pathname, setMobileOpen]);

	const closeMenu = () => {
		setShowMenu(false);
		setTimeout(() => setMobileOpen(false), 300);
	};

	return (
		<>
			<div
				onClick={closeMenu}
				style={{
					position: "fixed",
					inset: 0,
					backgroundColor: "rgba(0, 0, 0, 0.15)",
					zIndex: 30,
				}}
			/>

			<div
				className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-40
                    transform transition-transform duration-300 ease-in-out
                    ${
											showMenu ? "translate-x-0" : "-translate-x-full"
										} flex flex-col`}
			>
				<div className="mt-4 px-4">
					<Link to="/" onClick={closeMenu}>
						<Logo className="h-10 w-auto" />
					</Link>
				</div>

				<div className="flex flex-col mt-8 px-4 space-y-3 flex-grow">
					{publicLinks.map((item) => (
						<NavLink
							key={item}
							to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
							className="py-2 px-4 rounded-md text-gray-700 dark:text-gray-300 
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full"
							onClick={closeMenu}
						>
							{item}
						</NavLink>
					))}
				</div>

				<div className="flex flex-col px-4 pb-6 space-y-2">
					{isLoggedIn ? (
						<>
							<Button className="w-full px-4 py-2 text-sm bg-green-400 text-white hover:bg-green-500 dark:bg-green-600 dark:hover:bg-green-700">
								<Link
									to="/dashboard"
									style={{
										display: "block",
										width: "100%",
										textAlign: "center",
									}}
								>
									Dashboard
								</Link>
							</Button>
							<Button
								className="w-full max-w-xs block px-4 py-2 text-sm bg-red-400 text-white hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-700 mx-auto"
								onClick={handleLogout}
							>
								<div className="text-center w-full">Logout</div>
							</Button>
						</>
					) : (
						<>
							<Button className="w-full px-4 py-2 text-sm bg-blue-400 text-white hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700">
								<Link
									to="/login"
									style={{
										display: "block",
										width: "100%",
										textAlign: "center",
									}}
								>
									Log In
								</Link>
							</Button>
							<Button className="w-full px-4 py-2 text-sm bg-blue-300 text-white hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600">
								<Link
									to="/signup"
									style={{
										display: "block",
										width: "100%",
										textAlign: "center",
									}}
								>
									Sign Up
								</Link>
							</Button>
						</>
					)}
				</div>
			</div>
		</>
	);
}
