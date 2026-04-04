import {
    calculateBMR,
    calculateTDEE,
    calculateCaloriesTarget,
    calculateMacros,
    calculateBMI,
    calculateBodyFat,
    calculateOneRepMax,
    calculateWorkingWeight,
    calculateVolume,
    calculateHeartRateZones,
} from './algorythm';

// ── User profile ──────────────────────────────────────────
const weight = 80;   // kg
const height = 180;  // cm
const age = 25;
const gender = 'male' as const;

// ── Nutrition chain ───────────────────────────────────────
const bmr = calculateBMR({ weight, height, age, gender });
const tdee = calculateTDEE({ bmr, activityLevel: 'moderately_active' });
const calorieTarget = calculateCaloriesTarget({ tdee, goal: 'cut' });
const macros = calculateMacros(calorieTarget, weight);

console.log('── Nutrition ──────────────────────');
console.log(`BMR:           ${bmr} kcal`);
console.log(`TDEE:          ${tdee} kcal`);
console.log(`Calorie target: ${calorieTarget} kcal (cut)`);
console.log(`Macros:        protein ${macros.protein}g | fat ${macros.fat}g | carbs ${macros.carbs}g`);

// ── Body metrics ──────────────────────────────────────────
const bmi = calculateBMI(weight, height);
const bodyFat = calculateBodyFat({ waistCm: 85, neckCm: 38, heightCm: height, gender });

console.log('\n── Body Metrics ───────────────────');
console.log(`BMI:           ${bmi.bmi} (${bmi.category})`);
console.log(`Body fat:      ${bodyFat}%`);

// ── Training chain ────────────────────────────────────────
const oneRepMax = calculateOneRepMax(100, 8);
const workingWeight = calculateWorkingWeight({ oneRepMax, trainingGoal: 'hypertrophy' });
const volume = calculateVolume({ sets: 4, reps: 8, weightKg: workingWeight });

console.log('\n── Training ───────────────────────');
console.log(`1RM (bench):   ${oneRepMax} kg`);
console.log(`Working weight: ${workingWeight} kg (75% - hypertrophy)`);
console.log(`Session volume: ${volume} kg total`);

// ── Cardio ────────────────────────────────────────────────
const zones = calculateHeartRateZones(age);

console.log('\n── Heart Rate Zones ───────────────');
console.log(`HRmax:         ${220 - age} bpm`);
Object.entries(zones).forEach(([zone, { min, max }]) => {
    console.log(`${zone.padEnd(12)} ${min}–${max} bpm`);
});
