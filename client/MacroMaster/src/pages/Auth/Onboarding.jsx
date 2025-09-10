import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { commonStyles } from "../../styles/commonStyles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../state_manager/userSlice";
import { addToast } from "../../state_manager/toastSlice";

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
    const errorMsg = validate(field, value);
    setErrors({ ...errors, [field]: errorMsg });
  };

  const steps = [
    {
      title: "What's your weight?",
      field: "weight",
      input: (
        <input
          type="number"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={(e) => handleChange("weight", e.target.value)}
          className={commonStyles.input}
        />
      ),
    },
    {
      title: "How tall are you?",
      field: "height",
      input: (
        <input
          type="number"
          placeholder="Height (cm)"
          value={formData.height}
          onChange={(e) => handleChange("height", e.target.value)}
          className={commonStyles.input}
        />
      ),
    },
    {
      title: "Your age?",
      field: "age",
      input: (
        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => handleChange("age", e.target.value)}
          className={commonStyles.input}
        />
      ),
    },
    {
      title: "Gender",
      field: "gender",
      input: (
        <select
          value={formData.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
          className={commonStyles.input}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      ),
    },
    {
      title: "Activity level",
      field: "activity_level",
      input: (
        <select
          value={formData.activity_level}
          onChange={(e) => handleChange("activity_level", e.target.value)}
          className={commonStyles.input}
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
      input: (
        <select
          value={formData.goal}
          onChange={(e) => handleChange("goal", e.target.value)}
          className={commonStyles.input}
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

  const handleNext = () => {
    const errorMsg = validate(currentField, formData[currentField]);
    if (errorMsg) {
      setErrors({ ...errors, [currentField]: errorMsg });
      return;
    }

    if (!isLastStep) {
      setStep((prev) => prev + 1);
    } else {
      console.log("Submitting", formData);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  return (
    <div className={commonStyles.container}>
      <div
        className={commonStyles.loginGradientBlur}
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
        }}
      />

      <div className="flex justify-end w-full max-w-md mb-4">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl"
        >
          Logout
        </button>
      </div>

      <div className={commonStyles.card}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className={commonStyles.title}>{steps[step].title}</h2>
            <div className="mb-2">{steps[step].input}</div>
            {errors[currentField] && (
              <p className={commonStyles.errorText}>{errors[currentField]}</p>
            )}

            <div className="flex justify-between mt-6">
              {step > 0 && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 rounded-xl bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                >
                  Back
                </button>
              )}
              <button onClick={handleNext} className={commonStyles.button}>
                {isLastStep ? "Finish" : "Next"}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}