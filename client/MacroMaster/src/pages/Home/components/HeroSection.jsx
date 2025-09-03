import { Link } from "react-router-dom";
import Logo from "../../../components/Logo";
import { commonStyles } from "../../../styles/commonStyles";
import { useAuth } from "../../../../hooks/useAuth";
import { Activity, Flame, Scale, Target } from "lucide-react";

export default function HeroSection() {
  const { isLoggedIn, user } = useAuth();

  const currentWeight = user?.stats?.current_weight;
  const targetWeight = user?.stats?.target_weight;
  const startingWeight = user?.stats?.starting_weight ?? currentWeight;
  let weightProgress = 0;

  // Correct weight progress toward target
  if (currentWeight != null && targetWeight != null) {
    if (currentWeight === targetWeight) weightProgress = 100;
    else weightProgress = Math.min(
      ((startingWeight - currentWeight) / (startingWeight - targetWeight)) * 100,
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

          {/* WIDER GRID: fewer columns on large screens */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            <StatCard
              icon={<Activity className="h-10 w-10 text-purple-500" />}
              label="BMI"
              value={user?.stats?.bmi}
            />
            <ProgressStatCard
              icon={<Flame className="h-10 w-10 text-red-500" />}
              label="Calories"
              value={`${caloriesConsumed} / ${calorieGoal} kcal`}
              progress={calorieProgress}
            />
            <StatCard
              icon={<Scale className="h-10 w-10 text-green-500" />}
              label="Current Weight"
              value={currentWeight}
              suffix=" kg"
            />
            <ProgressStatCard
              icon={<Target className="h-10 w-10 text-blue-500" />}
              label="Target Weight"
              value={targetWeight}
              suffix=" kg"
              progress={weightProgress}
            />
          </div>

          <div className="flex justify-center mt-8 animate-fade-in" style={{ animationDelay: "800ms" }}>
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
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-6 text-center transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl animate-fade-in flex flex-col items-center gap-2 w-full">
      <div className="text-4xl">{icon}</div>
      <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
        {value != null ? `${value}${suffix ?? ""}` : "Not set"}
      </p>
      <p className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
}

function ProgressStatCard({ icon, label, value, suffix, progress }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-6 text-center transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl animate-fade-in flex flex-col items-center gap-2 w-full">
      <div className="text-4xl">{icon}</div>
      <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
        {value != null ? `${value}${suffix ?? ""}` : "Not set"}
      </p>
      <p className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {label}
      </p>
      {progress != null && progress >= 0 && (
        <div className="relative w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-6 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
          <span className="absolute right-2 top-0 text-xs font-semibold text-gray-900 dark:text-gray-100">
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
}
