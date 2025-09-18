import { Link } from "react-router-dom";
import { Activity, Flame, Scale, Target } from "lucide-react";
import { commonStyles } from "../../../styles/commonStyles";
import StatCard from "./StatCard";
import ProgressStatCard from "./ProgressStatCard";

export default function AccountHero({ user }) {
  const currentWeight = user?.stats?.current_weight;
  const targetWeight = user?.stats?.target_weight;
  const startingWeight = user?.stats?.starting_weight ?? currentWeight;

  let weightProgress = 0;
  if (currentWeight != null && targetWeight != null) {
    if (currentWeight === targetWeight) weightProgress = 100;
    else {
      weightProgress = Math.min(
        ((startingWeight - currentWeight) / (startingWeight - targetWeight)) * 100,
        100
      );
    }
  }

  const caloriesConsumed = user?.stats?.calories_today ?? 0;
  const calorieGoal = user?.stats?.calorie_goal ?? 1;
  const calorieProgress = Math.min((caloriesConsumed / calorieGoal) * 100, 100);

  return (
    <>
      <h1 className={`${commonStyles.pageTitle} animate-slide-down`}>
        Welcome back, <span className="text-blue-500">{user?.username || "friend"}</span>
      </h1>

      <p className="text-gray-600 dark:text-gray-300 mt-2 animate-fade-in">
        Keep pushing towards your goals – you’re doing amazing!
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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

      <div
        className="flex justify-center mt-10 animate-fade-in"
        style={{ animationDelay: "800ms" }}
      >
        <Link to="/dashboard" className={commonStyles.btnDashboard}>
          Go to Dashboard
        </Link>
      </div>
    </>
  );
}
