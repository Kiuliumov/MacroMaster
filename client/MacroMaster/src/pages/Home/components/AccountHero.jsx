import { Link } from "react-router-dom";
import { Activity, Flame, Scale, Target, Droplets, Award } from "lucide-react";
import StatCard from "./StatCard";
import ProgressStatCard from "./ProgressStatCard";
import { calculateWeightProgress, calculateCalorieProgress } from "./statsCalculator";
import { useMotivationalQuote } from "../../../../hooks/useMotivationalQuote";
import MotivationalQuoteBox from "./MotivationalQuoteBox";

export default function AccountHero({ user }) {
  const currentWeight = user?.stats?.current_weight;
  const targetWeight = user?.stats?.target_weight;
  const startingWeight = user?.stats?.starting_weight ?? currentWeight;

  const weightProgress = calculateWeightProgress(startingWeight, currentWeight, targetWeight);
  const caloriesConsumed = user?.stats?.calories_consumed ?? 0;
  const calorieGoal = user?.stats?.calorie_goal ?? 1;
  const calorieProgress = calculateCalorieProgress(caloriesConsumed, calorieGoal);

  const waterConsumed = user?.stats?.water_consumed ?? 0;
  const waterGoal = 8;

  const streak = user?.stats?.streak ?? 0;

  const { quote, loading, error } = useMotivationalQuote();

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-14">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white animate-slide-down">
          Welcome back,{" "}
          <span className="text-blue-600 dark:text-green-600">{user?.username || "friend"}</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 animate-fade-in">
          Keep pushing towards your goals – you’re doing amazing!
        </p>

        <MotivationalQuoteBox quote={quote} loading={loading} error={error} />
      </div>

      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <div className="col-span-1">
          <StatCard
            icon={<Activity className="h-9 w-9 text-purple-500" />}
            label="BMI"
            value={user?.stats?.bmi ?? "N/A"}
            className="h-48 rounded-xl flex flex-col justify-center"
          />
        </div>
        <div className="col-span-1">
          <StatCard
            icon={<Scale className="h-9 w-9 text-green-500" />}
            label="Current Weight"
            value={currentWeight ?? "N/A"}
            suffix=" kg"
            className="h-48 rounded-xl flex flex-col justify-center"
          />
        </div>
        <div className="col-span-1">
          <StatCard
            icon={<Award className="h-9 w-9 text-yellow-500" />}
            label="Streak"
            value={streak}
            suffix=" days 🔥"
            className="h-48 rounded-xl flex flex-col justify-center"
          />
        </div>

        <div className="col-span-1">
          <StatCard
            icon={<Droplets className="h-9 w-9 text-cyan-500" />}
            label="Water Intake"
            value={`${waterConsumed} / ${waterGoal} cups`}
            className="h-48 rounded-xl flex flex-col justify-center"
          />
        </div>

        <div className="col-span-2 md:col-span-2 xl:col-span-2">
          <ProgressStatCard
            icon={<Flame className="h-9 w-9 text-red-500" />}
            label="Calories"
            value={`${caloriesConsumed} / ${calorieGoal} kcal`}
            progress={calorieProgress}
            className="h-48 rounded-xl flex flex-col justify-between"
          />
        </div>

        <div className="col-span-2 md:col-span-3 xl:col-span-2">
          <ProgressStatCard
            icon={<Target className="h-9 w-9 text-blue-500" />}
            label="Target Weight"
            value={targetWeight ?? "N/A"}
            suffix=" kg"
            progress={weightProgress}
            className="h-48 rounded-xl"
          />
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-6">
        <Link
          to="/dashboard"
          className="px-8 py-4 rounded-full shadow-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition transform hover:scale-105"
        >
          Go to Dashboard
        </Link>
        <Link
          to="/log-meal"
          className="px-8 py-4 rounded-full shadow-lg font-semibold text-white bg-purple-500 hover:bg-purple-600 transition transform hover:scale-105"
        >
          Log Meal
        </Link>
        <Link
          to="/add-workout"
          className="px-8 py-4 rounded-full shadow-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 transition transform hover:scale-105"
        >
          Add Workout
        </Link>
      </div>
    </div>
  );
}
