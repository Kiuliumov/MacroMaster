import { Link } from "react-router-dom";
import Logo from "../../../components/Logo";
import { commonStyles } from "../../../styles/commonStyles";
import { useAuth } from "../../../../hooks/useAuth";
import { Activity, Flame, Scale, Target } from "lucide-react";

export default function HeroSection() {
  const { isLoggedIn, user } = useAuth();

  const currentWeight = user?.stats?.current_weight;
  const targetWeight = user?.stats?.target_weight;
  let weightProgress = 0;

  if (currentWeight != null && targetWeight != null) {
    if (currentWeight === targetWeight) weightProgress = 100;
    else if (currentWeight < targetWeight)
      weightProgress = Math.min((currentWeight / targetWeight) * 100, 100);
    else
      weightProgress = Math.min(
        ((currentWeight - targetWeight) / currentWeight) * 100,
        100
      );
  }

  const caloriesConsumed = user?.stats?.calories_today ?? 0;
  const calorieGoal = user?.stats?.calorie_goal ?? 1; // avoid division by zero
  const calorieProgress = Math.min((caloriesConsumed / calorieGoal) * 100, 100);

  return (
    <div className={commonStyles.headerWrapper}>
      <div className="flex justify-center mb-6">
        <Logo className="h-16 w-16 animate-fade-in" />
      </div>

      {isLoggedIn ? (
        <>
          <h1 className={`${commonStyles.pageTitle} animate-slide-down`}>
            Welcome, <span className="text-blue-500">{user?.username || "there"}</span>
          </h1>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard icon={<Activity className="h-6 w-6 text-purple-500" />} label="BMI" value={user?.stats?.bmi} />
            <ProgressStatCard
              icon={<Flame className="h-6 w-6 text-red-500" />}
              label="Calories"
              value={`${caloriesConsumed} / ${calorieGoal} kcal`}
              progress={calorieProgress}
            />
            <StatCard icon={<Scale className="h-6 w-6 text-green-500" />} label="Current Weight" value={currentWeight} suffix=" kg" />
            <ProgressStatCard
              icon={<Target className="h-6 w-6 text-blue-500" />}
              label="Target Weight"
              value={targetWeight}
              suffix=" kg"
              progress={weightProgress}
            />
          </div>

          <div className="flex justify-center mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "800ms" }}>
            <Link to="/dashboard" className={commonStyles.btnDashboard}>
              Go to Dashboard
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1 className={commonStyles.pageTitle}>
            Welcome to <span className="text-blue-500">MacroMaster</span>
          </h1>
          <p className={commonStyles.pageSubtitle}>
            Track your calories, manage your macros, and take control of your health with ease.
          </p>
          <div className="flex justify-center mt-6">
            <Link to="/register" className={commonStyles.btnPrimary}>
              Get Started
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, suffix }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4 text-center transform transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg opacity-0 animate-fade-in">
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {value != null ? `${value}${suffix ?? ""}` : "Not set"}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  );
}

function ProgressStatCard({ icon, label, value, suffix, progress }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4 text-center transform transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg opacity-0 animate-fade-in">
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {value != null ? `${value}${suffix ?? ""}` : "Not set"}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      {progress != null && progress >= 0 && (
        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
          <div
            className="h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
