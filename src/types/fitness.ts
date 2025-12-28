export interface UserProfile {
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female';
  healthIssues: string;
  goal: 'lose-weight' | 'gain-muscle' | 'gain-height' | 'aesthetic' | 'general-fitness';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
}

export interface DietPlan {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  meals: Meal[];
}

export interface Meal {
  name: string;
  time: string;
  foods: string[];
  calories: number;
}

export interface Workout {
  name: string;
  day: string;
  exercises: Exercise[];
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

export interface Supplement {
  name: string;
  timing: string;
  dosage: string;
  purpose: string;
  recommended: boolean;
}

export interface FitnessResult {
  bmi: number;
  bmiCategory: string;
  dailyCalories: number;
  dietPlan: DietPlan;
  workouts: Workout[];
  supplements: Supplement[];
}

export interface ProgressEntry {
  id: string;
  date: string;
  weight: number;
  chest?: number;
  waist?: number;
  hips?: number;
  arms?: number;
  thighs?: number;
  workoutCompleted: boolean;
  notes?: string;
}

export interface ProgressData {
  entries: ProgressEntry[];
}
