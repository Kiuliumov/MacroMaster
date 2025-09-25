import { Link } from "react-router-dom";
import {
  Activity,
  Flame,
  Scale,
  Target,
  Droplets,
  Award,
} from "lucide-react";
import StatCard from "./StatCard";
import ProgressStatCard from "./ProgressStatCard";
import {
  calculateWeightProgress,
  calculateCalorieProgress,
  calculateWaterProgress,
} from "./statsCalculator";

export default function AccountHero({ user }) {
  const currentWeight = user?.stats?.current_weight;
  const targetWeight = user?.stats?.target_weight;
  const startingWeight = user?.stats?.starting_weight ?? currentWeight;

  const weightProgress = calculateWeightProgress(
    startingWeight,
    currentWeight,
    targetWeight
  );

  const caloriesConsumed = user?.stats?.calories_consumed ?? 0;
  const calorieGoal = user?.stats?.calorie_goal ?? 1;
  const calorieProgress = calculateCalorieProgress(
    caloriesConsumed,
    calorieGoal
  );

  const waterConsumed = user?.stats?.water_consumed ?? 0;
  const waterGoal = 8;
  const waterProgress = calculateWaterProgress(waterConsumed, waterGoal);

  const streak = user?.stats?.streak ?? 0;

  const quotes = [
    "Small steps every day lead to big results.",
    "Your only competition is who you were yesterday.",
    "Discipline beats motivation.",
    "Progress, not perfection.",
  ];
  const dailyQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="w-full space-y-10">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white animate-slide-down">
          Welcome back,{" "}
          <span className="text-blue-600">{user?.username || "friend"}</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 animate-fade-in">
          Keep pushing towards your goals – you’re doing amazing!
        </p>

        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 rounded-2xl shadow-inner text-center animate-fade-in">
          <p className="italic text-blue-700 dark:text-blue-300 font-medium">
            “{dailyQuote}”
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={<Activity className="h-8 w-8 text-purple-500" />}
          label="BMI"
          value={user?.stats?.bmi ?? "N/A"}
        />
        <ProgressStatCard
          icon={<Flame className="h-8 w-8 text-red-500" />}
          label="Calories"
          value={`${caloriesConsumed} / ${calorieGoal} kcal`}
          progress={calorieProgress}
        />
        <StatCard
          icon={<Scale className="h-8 w-8 text-green-500" />}
          label="Current Weight"
          value={currentWeight ?? "N/A"}
          suffix=" kg"
        />
        <ProgressStatCard
          icon={<Target className="h-8 w-8 text-blue-500" />}
          label="Target Weight"
          value={targetWeight ?? "N/A"}
          suffix=" kg"
          progress={weightProgress}
        />
        <ProgressStatCard
          icon={<Droplets className="h-8 w-8 text-cyan-500" />}
          label="Water Intake"
          value={`${waterConsumed} / ${waterGoal} cups`}
          progress={waterProgress}
        />
        <StatCard
          icon={<Award className="h-8 w-8 text-yellow-500" />}
          label="Streak"
          value={streak}
          suffix=" days 🔥"
        />
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          to="/dashboard"
          className="px-6 py-3 rounded-full shadow-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition transform hover:scale-105"
        >
          Go to Dashboard
        </Link>
        <Link
          to="/log-meal"
          className="px-6 py-3 rounded-full shadow-md font-semibold text-white bg-purple-500 hover:bg-purple-600 transition transform hover:scale-105"
        >
          Log Meal
        </Link>
        <Link
          to="/add-workout"
          className="px-6 py-3 rounded-full shadow-md font-semibold text-white bg-orange-500 hover:bg-orange-600 transition transform hover:scale-105"
        >
          Add Workout
        </Link>
      </div>
    </div>
  );
}
