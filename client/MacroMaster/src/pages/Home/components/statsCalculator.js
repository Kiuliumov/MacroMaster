export function calculateWeightProgress(startingWeight, currentWeight, targetWeight) {
    if (startingWeight == null || currentWeight == null || targetWeight == null) return 0;

    if (startingWeight === targetWeight) return 100;

    const progress = ((startingWeight - currentWeight) / (startingWeight - targetWeight)) * 100;
    return Math.min(Math.max(progress, 0), 100);
}


export function calculateCalorieProgress(caloriesConsumed, calorieGoal) {
    if (!calorieGoal || calorieGoal <= 0) return 100;
    const progress = (caloriesConsumed / calorieGoal) * 100;
    return Math.max(progress, 0);
}


export function calculateWaterProgress(waterConsumed, waterGoal = 8) {
    if (!waterGoal || waterGoal <= 0) return 100;
    const progress = (waterConsumed / waterGoal) * 100;
    return Math.min(Math.max(progress, 0), 100);
}
