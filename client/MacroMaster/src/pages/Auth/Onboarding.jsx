import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../state_manager/userSlice";
import { addToast } from "../../state_manager/toastSlice";
import CardWrapper from "./components/CardWrapper";
import { API_BASE_URL } from "../../config";
import { FaWeight, FaRulerVertical, FaBirthdayCake, FaVenusMars, FaRunning, FaBullseye } from "react-icons/fa";

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

  const handleLogout = () => {
    dispatch(logout());
    dispatch(addToast({ message: "Logout successful!", type: "success" }));
    navigate("/");
  };

  const validate = (field, value) => {
    let message = "";
    if (field === "weight") {
      if (!value || value <= 0) message = "Weight is required";
      else if (value < 30 || value > 300) message = "Enter weight between 30–300 kg";
    }
    if (field === "height") {
      if (!value || value <= 0) message = "Height is required";
      else if (value < 100 || value > 250) message = "Enter height between 100–250 cm";
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

  const inputClasses =
    "w-full px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm dark:shadow-none";

  const steps = [
    {
      title: "What's your weight?",
      field: "weight",
      icon: <FaWeight className="text-purple-500 w-6 h-6 inline-block mr-2" />,
      input: (
        <input
          type="number"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={(e) => handleChange("weight", e.target.value)}
          className={`${inputClasses} no-spinner`}
        />
      ),
    },
    {
      title: "How tall are you?",
      field: "height",
      icon: <FaRulerVertical className="text-purple-500 w-6 h-6 inline-block mr-2" />,
      input: (
        <input
          type="number"
          placeholder="Height (cm)"
          value={formData.height}
          onChange={(e) => handleChange("height", e.target.value)}
          className={`${inputClasses} no-spinner`}
        />
      ),
    },
    {
      title: "Your age?",
      field: "age",
      icon: <FaBirthdayCake className="text-purple-500 w-6 h-6 inline-block mr-2" />,
      input: (
        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => handleChange("age", e.target.value)}
          className={`${inputClasses} no-spinner`}
        />
      ),
    },
    {
      title: "Gender",
      field: "gender",
      icon: <FaVenusMars className="text-purple-500 w-6 h-6 inline-block mr-2" />,
      input: (
        <select
          value={formData.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
          className={inputClasses}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      ),
    },
    {
      title: "Activity level",
      field: "activity_level",
      icon: <FaRunning className="text-purple-500 w-6 h-6 inline-block mr-2" />,
      input: (
        <select
          value={formData.activity_level}
          onChange={(e) => handleChange("activity_level", e.target.value)}
          className={inputClasses}
        >
          <option value="sedentary">Sedentary</option>
          <option value="light">Light</option>
          <option value="moderate">Moderate</option>
          <option value="active">Active</option>
          <option value="very_active">Very Active</option>
        </select>
      ),
    },
    {
      title: "Your goal",
      field: "goal",
      icon: <FaBullseye className="text-purple-500 w-6 h-6 inline-block mr-2" />,
      input: (
        <select
          value={formData.goal}
          onChange={(e) => handleChange("goal", e.target.value)}
          className={inputClasses}
        >
          <option value="lose">Lose Weight</option>
          <option value="maintain">Maintain</option>
          <option value="gain">Gain Weight</option>
        </select>
      ),
    },
  ];

  const isLastStep = step === steps.length - 1;
  const currentField = steps[step].field;
  const progress = ((step + 1) / steps.length) * 100;

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
        const response = await fetch(`${API_BASE_URL}/onboarding/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!response.ok) {
          dispatch(addToast({ message: data.detail || "Onboarding failed", type: "error" }));
          return;
        }
        dispatch(addToast({ message: "Onboarding completed!", type: "success" }));
        navigate("/dashboard");
      } catch (err) {
        console.error(err);
        dispatch(addToast({ message: "Something went wrong", type: "error" }));
      }
    }
  };

  const handleBack = () => step > 0 && setStep((prev) => prev - 1);

  return (
    <main className="min-h-screen flex items-center justify-center relative bg-gray-50 dark:bg-gray-900 transition-colors">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192,132,252,0.2) 15.73%, rgba(14,165,233,0.6) 15.74%, rgba(232,121,249,0.35) 56.49%, rgba(79,70,229,0.5) 115.91%)",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <CardWrapper title="Onboarding" className="shadow-2xl dark:shadow-xl">
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 overflow-hidden">
            <div
              className="h-2 bg-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="transition-all duration-500">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center">
              {steps[step].icon} {steps[step].title}
            </h2>

            <div className="mb-4">{steps[step].input}</div>
            {errors[currentField] && (
              <p className="text-red-500 text-sm mb-4">{errors[currentField]}</p>
            )}

            <div className="flex justify-between items-center mt-6">
              {step > 0 && (
                <button
                  onClick={handleBack}
                  className="px-5 py-2 rounded-xl bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-medium hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="ml-auto px-6 py-3 rounded-2xl bg-purple-500 hover:bg-purple-600 text-white font-medium shadow-md transition"
              >
                {isLastStep ? "Finish" : "Next"}
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-2xl shadow transition"
              >
                Logout
              </button>
            </div>
          </div>
        </CardWrapper>
      </div>

      <style>{`
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </main>
  );
}
