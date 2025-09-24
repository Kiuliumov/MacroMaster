import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../state_manager/userSlice";
import { addToast } from "../../../state_manager/toastSlice";
import CardWrapper from "../components/CardWrapper";
import ProgressBar from "./components/ProgressBar";
import StepForm from "./components/StepForm";
import NavigationButtons from "./components/NavigationButtons";
import LogoutButton from "./components/LogoutButton";
import { useEffect } from "react";
import { API_BASE_URL } from "../../../config";
import {
	FaWeight,
	FaRulerVertical,
	FaBirthdayCake,
	FaVenusMars,
	FaRunning,
	FaBullseye,
} from "react-icons/fa";
import { useAuth } from "../../../../hooks/useAuth";

export default function Onboarding() {
	const [step, setStep] = useState(0);
	const [formData, setFormData] = useState({
		weight: "",
		height: "",
		age: "",
		gender: "male",
		activity_level: "sedentary",
		goal: "maintain",
	});
	const [errors, setErrors] = useState({});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const auth = useAuth();
	const user = auth.user;

	useEffect(() => {
		if (user?.stats?.onboarding) {
			navigate("/");
		}
	}, [user, navigate]);
	
	const handleLogout = () => {
		dispatch(logout());
		dispatch(addToast({ message: "Logout successful!", type: "success" }));
		navigate("/");
	};

	const validate = (field, value) => {
		let message = "";
		if (field === "weight") {
			if (!value || value <= 0) message = "Weight is required";
			else if (value < 30 || value > 300)
				message = "Enter weight between 30–300 kg";
		}
		if (field === "height") {
			if (!value || value <= 0) message = "Height is required";
			else if (value < 100 || value > 250)
				message = "Enter height between 100–250 cm";
		}
		if (field === "age") {
			if (!value || value <= 0) message = "Age is required";
			else if (value < 10 || value > 100) message = "Enter age between 10–100";
		}
		return message;
	};

	const handleChange = (field, value) => {
		setFormData({ ...formData, [field]: value });
		setErrors({ ...errors, [field]: validate(field, value) });
	};

	const steps = [
		{
			title: "Weight?",
			field: "weight",
			icon: <FaWeight className="text-purple-500 w-6 h-6 inline-block mr-2" />,
			type: "number",
			placeholder: "Weight (kg)",
		},
		{
			title: "Height?",
			field: "height",
			icon: (
				<FaRulerVertical className="text-purple-500 w-6 h-6 inline-block mr-2" />
			),
			type: "number",
			placeholder: "Height (cm)",
		},
		{
			title: "Your age?",
			field: "age",
			icon: (
				<FaBirthdayCake className="text-purple-500 w-6 h-6 inline-block mr-2" />
			),
			type: "number",
			placeholder: "Age",
		},
		{
			title: "Gender",
			field: "gender",
			icon: (
				<FaVenusMars className="text-purple-500 w-6 h-6 inline-block mr-2" />
			),
			type: "select",
			options: ["male", "female"],
		},
		{
			title: "Activity level",
			field: "activity_level",
			icon: <FaRunning className="text-purple-500 w-6 h-6 inline-block mr-2" />,
			type: "select",
			options: ["sedentary", "light", "moderate", "active", "very_active"],
		},
		{
			title: "Your goal",
			field: "goal",
			icon: (
				<FaBullseye className="text-purple-500 w-6 h-6 inline-block mr-2" />
			),
			type: "select",
			options: ["lose", "maintain", "gain"],
		},
	];

	const isLastStep = step === steps.length - 1;
	const currentField = steps[step].field;
	const progress = ((step + 1) / steps.length) * 100;

	const getCookie = (name) => {
		return document.cookie
			.split("; ")
			.find((row) => row.startsWith(name + "="))
			?.split("=")[1];
	};

	const handleNext = async () => {
		const errorMsg = validate(currentField, formData[currentField]);
		if (errorMsg) {
			setErrors({ ...errors, [currentField]: errorMsg });
			return;
		}

		if (!isLastStep) {
			setStep((prev) => prev + 1);
		} else {
			try {
				const csrfToken = getCookie("csrftoken");
				const accessToken = getCookie("access");

				if (!accessToken) {
					dispatch(addToast({ message: "Not authenticated", type: "error" }));
					return;
				}

				const response = await fetch(`${API_BASE_URL}/onboarding/`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"X-CSRFToken": csrfToken || "",
						Authorization: `Bearer ${accessToken}`,
					},
					credentials: "include",
					body: JSON.stringify(formData),
				});

				const data = await response.json();

				if (!response.ok) {
					dispatch(
						addToast({
							message: data.detail || "Onboarding failed",
							type: "error",
						})
					);
					return;
				}

				dispatch(
					addToast({ message: "Onboarding completed!", type: "success" })
				);
				navigate("/dashboard");
			} catch (err) {
				console.error(err);
				dispatch(addToast({ message: "Something went wrong", type: "error" }));
			}
		}
	};

	const handleBack = () => step > 0 && setStep((prev) => prev - 1);

	return (
		<main className="min-h-screen flex items-center justify-center relative bg-gray-50 dark:bg-gray-900 transition-colors px-4 py-12">
			<div
				className="absolute inset-0"
				style={{
					background:
						"linear-gradient(106.89deg, rgba(192,132,252,0.2) 15.73%, rgba(14,165,233,0.6) 15.74%, rgba(232,121,249,0.35) 56.49%, rgba(79,70,229,0.5) 115.91%)",
				}}
			/>

			<div className="relative z-10 w-full max-w-md">
				<CardWrapper className="shadow-2xl dark:shadow-xl flex flex-col items-center space-y-8 p-10 sm:p-12">
					<ProgressBar progress={progress} />

					<div className="w-full px-2 sm:px-6">
						<StepForm
							step={steps[step]}
							value={formData[currentField]}
							error={errors[currentField]}
							onChange={handleChange}
						/>
					</div>

					<div className="w-full flex justify-center mt-2">
						<NavigationButtons
							step={step}
							isLastStep={isLastStep}
							onBack={handleBack}
							onNext={handleNext}
						/>
					</div>

					<LogoutButton
						onLogout={handleLogout}
						className="mt-4 text-sm text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition"
					/>
				</CardWrapper>
			</div>
		</main>
	);
}
