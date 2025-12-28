import { UserProfile, FitnessResult, DietPlan, Workout, Supplement } from '@/types/fitness';

export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export function calculateDailyCalories(profile: UserProfile): number {
  // Mifflin-St Jeor Equation
  let bmr: number;
  if (profile.gender === 'male') {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
  } else {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
  }

  const activityMultipliers = {
    'sedentary': 1.2,
    'light': 1.375,
    'moderate': 1.55,
    'active': 1.725,
    'very-active': 1.9
  };

  let tdee = bmr * activityMultipliers[profile.activityLevel];

  // Adjust based on goal
  switch (profile.goal) {
    case 'lose-weight':
      return Math.round(tdee - 500);
    case 'gain-muscle':
    case 'aesthetic':
      return Math.round(tdee + 300);
    default:
      return Math.round(tdee);
  }
}

export function generateDietPlan(profile: UserProfile, calories: number): DietPlan {
  let proteinRatio = 0.3;
  let carbRatio = 0.4;
  let fatRatio = 0.3;

  if (profile.goal === 'gain-muscle' || profile.goal === 'aesthetic') {
    proteinRatio = 0.35;
    carbRatio = 0.45;
    fatRatio = 0.2;
  } else if (profile.goal === 'lose-weight') {
    proteinRatio = 0.4;
    carbRatio = 0.3;
    fatRatio = 0.3;
  }

  const protein = Math.round((calories * proteinRatio) / 4);
  const carbs = Math.round((calories * carbRatio) / 4);
  const fats = Math.round((calories * fatRatio) / 9);

  const meals = [
    {
      name: 'Breakfast',
      time: '7:00 AM',
      foods: ['Oatmeal with berries', 'Scrambled eggs (3)', 'Black coffee'],
      calories: Math.round(calories * 0.25)
    },
    {
      name: 'Mid-Morning Snack',
      time: '10:00 AM',
      foods: ['Greek yogurt', 'Almonds (handful)', 'Banana'],
      calories: Math.round(calories * 0.1)
    },
    {
      name: 'Lunch',
      time: '1:00 PM',
      foods: ['Grilled chicken breast', 'Brown rice', 'Steamed vegetables', 'Olive oil dressing'],
      calories: Math.round(calories * 0.3)
    },
    {
      name: 'Pre-Workout',
      time: '4:00 PM',
      foods: ['Protein shake', 'Apple'],
      calories: Math.round(calories * 0.1)
    },
    {
      name: 'Dinner',
      time: '7:00 PM',
      foods: ['Salmon fillet', 'Sweet potato', 'Mixed salad', 'Avocado'],
      calories: Math.round(calories * 0.25)
    }
  ];

  return { calories, protein, carbs, fats, meals };
}

export function generateWorkouts(profile: UserProfile): Workout[] {
  if (profile.goal === 'lose-weight') {
    return [
      {
        name: 'Full Body HIIT',
        day: 'Monday',
        exercises: [
          { name: 'Jumping Jacks', sets: 3, reps: '30 sec', rest: '15 sec' },
          { name: 'Burpees', sets: 3, reps: '12', rest: '30 sec' },
          { name: 'Mountain Climbers', sets: 3, reps: '20', rest: '20 sec' },
          { name: 'Squat Jumps', sets: 3, reps: '15', rest: '30 sec' },
          { name: 'Plank', sets: 3, reps: '45 sec', rest: '15 sec' }
        ]
      },
      {
        name: 'Cardio & Core',
        day: 'Wednesday',
        exercises: [
          { name: 'Running/Jogging', sets: 1, reps: '20 min', rest: '-' },
          { name: 'Bicycle Crunches', sets: 3, reps: '20', rest: '30 sec' },
          { name: 'Russian Twists', sets: 3, reps: '20', rest: '30 sec' },
          { name: 'Leg Raises', sets: 3, reps: '15', rest: '30 sec' }
        ]
      },
      {
        name: 'Strength Circuit',
        day: 'Friday',
        exercises: [
          { name: 'Push-ups', sets: 3, reps: '15', rest: '45 sec' },
          { name: 'Bodyweight Squats', sets: 3, reps: '20', rest: '45 sec' },
          { name: 'Lunges', sets: 3, reps: '12 each', rest: '45 sec' },
          { name: 'Dumbbell Rows', sets: 3, reps: '12', rest: '45 sec' }
        ]
      }
    ];
  }

  // Muscle building / Aesthetic
  return [
    {
      name: 'Push Day (Chest, Shoulders, Triceps)',
      day: 'Monday',
      exercises: [
        { name: 'Bench Press', sets: 4, reps: '8-10', rest: '90 sec', notes: 'Focus on controlled movement' },
        { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '60 sec' },
        { name: 'Overhead Press', sets: 4, reps: '8-10', rest: '90 sec' },
        { name: 'Lateral Raises', sets: 3, reps: '12-15', rest: '45 sec' },
        { name: 'Tricep Dips', sets: 3, reps: '12', rest: '60 sec' },
        { name: 'Tricep Pushdowns', sets: 3, reps: '12-15', rest: '45 sec' }
      ]
    },
    {
      name: 'Pull Day (Back, Biceps)',
      day: 'Tuesday',
      exercises: [
        { name: 'Deadlifts', sets: 4, reps: '6-8', rest: '120 sec', notes: 'Maintain proper form' },
        { name: 'Pull-ups/Lat Pulldowns', sets: 4, reps: '8-10', rest: '90 sec' },
        { name: 'Barbell Rows', sets: 3, reps: '10-12', rest: '60 sec' },
        { name: 'Face Pulls', sets: 3, reps: '15', rest: '45 sec' },
        { name: 'Barbell Curls', sets: 3, reps: '10-12', rest: '60 sec' },
        { name: 'Hammer Curls', sets: 3, reps: '12', rest: '45 sec' }
      ]
    },
    {
      name: 'Legs Day',
      day: 'Thursday',
      exercises: [
        { name: 'Squats', sets: 4, reps: '8-10', rest: '120 sec', notes: 'Go below parallel' },
        { name: 'Romanian Deadlifts', sets: 3, reps: '10-12', rest: '90 sec' },
        { name: 'Leg Press', sets: 3, reps: '12', rest: '60 sec' },
        { name: 'Leg Curls', sets: 3, reps: '12-15', rest: '45 sec' },
        { name: 'Calf Raises', sets: 4, reps: '15-20', rest: '45 sec' }
      ]
    },
    {
      name: 'Upper Body & Core',
      day: 'Friday',
      exercises: [
        { name: 'Incline Bench Press', sets: 3, reps: '10-12', rest: '60 sec' },
        { name: 'Cable Flyes', sets: 3, reps: '12-15', rest: '45 sec' },
        { name: 'Dumbbell Shoulder Press', sets: 3, reps: '10-12', rest: '60 sec' },
        { name: 'Hanging Leg Raises', sets: 3, reps: '12', rest: '45 sec' },
        { name: 'Cable Crunches', sets: 3, reps: '15', rest: '45 sec' }
      ]
    }
  ];
}

export function generateSupplements(profile: UserProfile): Supplement[] {
  const supplements: Supplement[] = [
    {
      name: 'Whey Protein',
      timing: 'Post-workout & morning',
      dosage: '25-30g per serving',
      purpose: 'Muscle recovery and protein intake optimization',
      recommended: true
    },
    {
      name: 'Creatine Monohydrate',
      timing: 'Daily (any time)',
      dosage: '5g per day',
      purpose: 'Increased strength, power, and muscle volume',
      recommended: profile.goal === 'gain-muscle' || profile.goal === 'aesthetic'
    },
    {
      name: 'Multivitamin',
      timing: 'With breakfast',
      dosage: '1 tablet daily',
      purpose: 'Fill nutritional gaps and support overall health',
      recommended: true
    },
    {
      name: 'Omega-3 Fish Oil',
      timing: 'With meals',
      dosage: '1000-2000mg daily',
      purpose: 'Heart health, joint support, and inflammation reduction',
      recommended: true
    },
    {
      name: 'Pre-Workout',
      timing: '30 min before training',
      dosage: '1 scoop (follow label)',
      purpose: 'Enhanced energy, focus, and performance',
      recommended: profile.activityLevel === 'active' || profile.activityLevel === 'very-active'
    },
    {
      name: 'BCAA',
      timing: 'During workout',
      dosage: '5-10g',
      purpose: 'Reduce muscle breakdown during training',
      recommended: profile.goal === 'lose-weight'
    }
  ];

  return supplements;
}

export function generateFitnessResult(profile: UserProfile): FitnessResult {
  const bmi = calculateBMI(profile.weight, profile.height);
  const bmiCategory = getBMICategory(bmi);
  const dailyCalories = calculateDailyCalories(profile);
  const dietPlan = generateDietPlan(profile, dailyCalories);
  const workouts = generateWorkouts(profile);
  const supplements = generateSupplements(profile);

  return {
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory,
    dailyCalories,
    dietPlan,
    workouts,
    supplements
  };
}
