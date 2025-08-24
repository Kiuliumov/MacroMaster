import React, { useState } from "react";
import { API_BASE_URL } from "../../config";
import PasswordInput from "./components/PasswordField";
import CardWrapper from "./components/CardWrapper";
import { commonStyles } from "./commonStyles";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			const res = await fetch(`${API_BASE_URL}/login/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.detail || "Invalid credentials.");
			}

			document.cookie = `access=${data.access}; path=/; max-age=${
				60 * 60 * 24
			}; SameSite=Lax; Secure`;
			document.cookie = `refresh=${data.refresh}; path=/; max-age=${
				60 * 60 * 24 * 7
			}; SameSite=Lax; Secure`;

			window.location.href = "/";
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className={commonStyles.container}>
			<div
				className={commonStyles.loginGradientBlur}
				style={{
					background:
						"linear-gradient(106.89deg, rgba(192, 132, 252, 0.2) 15.73%, rgba(14, 165, 233, 0.6) 15.74%, rgba(232, 121, 249, 0.35) 56.49%, rgba(79, 70, 229, 0.5) 115.91%)",
				}}
			/>

			<div className="relative z-10 w-full max-w-md">
				<CardWrapper title="Login">
					{error && <p className={commonStyles.errorText}>{error}</p>}

					<form onSubmit={handleSubmit} className="flex flex-col space-y-5">
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Username"
							autoComplete="username"
							className={commonStyles.input}
							required
						/>
						<PasswordInput
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							autoComplete="current-password"
						/>

						<div className="text-center">
							<a href="/forgot-password" className={commonStyles.link}>
								Forgot Password?
							</a>
						</div>

						<button type="submit" className={commonStyles.button}>
							Log In
						</button>
					</form>

					<p className={commonStyles.textCenter}>
						Don’t have an account?{" "}
						<a href="/register" className={commonStyles.link}>
							Sign up
						</a>
					</p>
				</CardWrapper>
			</div>
		</div>
	);
}
