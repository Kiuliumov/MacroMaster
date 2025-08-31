import { Link } from "react-router-dom";
import logo from "../assets/MacroMaster.png";
import SocialIcon from "../components/SocialIcon";

const socialPaths = [
	// Facebook
	"M22.675 0h-21.35C.596 0 0 .593 0 1.326v21.348C0 23.406.596 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24h-1.918c-1.504 0-1.795.716-1.795 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.326V1.326C24 .593 23.405 0 22.675 0z",
	// Twitter
	"M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.384 4.482A13.945 13.945 0 0 1 1.671 3.149a4.916 4.916 0 0 0 1.523 6.574 4.897 4.897 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 0 1-2.224.084 4.918 4.918 0 0 0 4.59 3.417 9.868 9.868 0 0 1-6.102 2.104c-.396 0-.788-.023-1.175-.068a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.496 14.009-13.986 0-.21 0-.423-.015-.634A10.012 10.012 0 0 0 24 4.557z",
	// LinkedIn
	"M22.225 0H1.771C.792 0 0 .771 0 1.725v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.274V1.725C24 .771 23.2 0 22.225 0zM7.09 20.452H3.545v-11.4h3.545v11.4zM5.318 7.845a2.056 2.056 0 1 1 0-4.112 2.056 2.056 0 0 1 0 4.112zM20.452 20.452h-3.546v-5.604c0-1.336-.024-3.056-1.862-3.056-1.862 0-2.146 1.454-2.146 2.956v5.704h-3.546v-11.4h3.406v1.557h.048c.474-.898 1.632-1.846 3.36-1.846 3.593 0 4.258 2.367 4.258 5.448v6.241z",
];

const footerLinks = {
	Company: ["About", "Features", "Careers"],
	Help: ["Support", "API", "Privacy Policy"],
	Products: ["Login", "Register", "Forum"],
};

export default function Footer() {
	const footerStyles = {
		footer: "py-10 bg-gray-50 dark:bg-gray-900 sm:pt-16 lg:pt-24",
		container: "px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl",
		grid: "grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12",

		brandWrapper: "col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8",
		brand: "flex items-center space-x-2",
		logo: "h-8 w-8",
		brandText: "text-xl font-bold text-gray-900 dark:text-white",
		description:
			"text-base leading-relaxed text-gray-600 dark:text-gray-300 mt-7",
		socials: "flex items-center space-x-3 mt-9",

		sectionTitle:
			"text-sm font-semibold tracking-widest text-gray-400 dark:text-gray-500 uppercase",
		sectionList: "mt-6 space-y-4",
		link: "flex text-base text-black dark:text-gray-200 transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 focus:text-blue-600 dark:focus:text-blue-400",
	};

	return (
		<footer className={footerStyles.footer}>
			<div className={footerStyles.container}>
				<div className={footerStyles.grid}>
					<div className={footerStyles.brandWrapper}>
						<div className={footerStyles.brand}>
							<img
								className={footerStyles.logo}
								src={logo}
								alt="MacroMaster Logo"
							/>
							<span className={footerStyles.brandText}>MacroMaster</span>
						</div>
						<p className={footerStyles.description}>
							Track, manage, and crush your goals with the ultimate calorie app
							of 2025!
						</p>
						<ul className={footerStyles.socials}>
							{socialPaths.map((path, i) => (
								<li key={i}>
									<SocialIcon path={path} />
								</li>
							))}
						</ul>
					</div>

					{Object.entries(footerLinks).map(([section, links]) => (
						<div key={section}>
							<p className={footerStyles.sectionTitle}>{section}</p>
							<ul className={footerStyles.sectionList}>
								{links.map((link) => (
									<li key={link}>
										<Link
											to={`/${
												link === "Privacy Policy"
													? "policy"
													: link.toLowerCase().replace(" ", "")
											}`}
											className={footerStyles.link}
										>
											{link}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</footer>
	);
}
