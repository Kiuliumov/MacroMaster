import { useSelector, useDispatch } from "react-redux";
import { logout } from "../state_manager/userSlice";
import ThemeToggle from "./ThemeToggle";
import logo from '../assets/MacroMaster.png';

const publicLinks = ["Home", "Features", "Pricing", "Forum", "About"];

export default function Navbar() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);
	const isLoggedIn = !!user;

	const navLinkClasses =
		"text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-medium";
	const buttonClasses =
		"inline-flex items-center px-4 py-2 text-sm font-semibold rounded-md shadow transition-all duration-200";

	const loginButtonClasses =
		buttonClasses +
		" bg-blue-400 text-white hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700";
	const signupButtonClasses =
		buttonClasses +
		" bg-blue-300 text-white hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600";
	const dashboardButtonClasses =
		buttonClasses +
		" bg-green-400 text-white hover:bg-green-500 dark:bg-green-600 dark:hover:bg-green-700";
	const logoutButtonClasses =
		buttonClasses +
		" bg-red-400 text-white hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-700";

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<header className="bg-white dark:bg-gray-900 shadow">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex-shrink-0">
						<div className="flex items-center space-x-2">
							<img
								className="h-8 w-8"
								src={logo}
								alt="MacroMaster Logo"
							/>
							<span className="text-xl font-bold text-gray-900 dark:text-white">
								MacroMaster
							</span>
						</div>
					</div>

					<nav className="hidden md:flex space-x-8">
						{publicLinks.map((item) => (
							<a
								key={item}
								href={`/${item.toLowerCase()}`}
								className={navLinkClasses}
							>
								{item}
							</a>
						))}

					</nav>

					<div className="hidden md:flex items-center space-x-4">
						<ThemeToggle />
						{isLoggedIn ? (
							<>
								<a href="/dashboard" className={dashboardButtonClasses}>
									Dashboard
								</a>
								<button onClick={handleLogout} className={logoutButtonClasses}>
									Logout
								</button>
							</>
						) : (
							<>
								<a href="/login" className={loginButtonClasses}>
									Log In
								</a>
								<a href="/signup" className={signupButtonClasses}>
									Sign Up
								</a>
							</>
						)}
					</div>

					<div className="md:hidden flex items-center space-x-2">
						<ThemeToggle />
					</div>
				</div>
			</div>
		</header>
	);
}
