
export interface UserData {
  name: string;
  age: number;
  height: number; // in cm
  weight: number; // in kg
  goal: 'weight-loss' | 'muscle-gain' | 'general-health' | 'endurance';
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  workoutDays: string[];
  timeAvailable: number; // in minutes
}

export interface ChatMessage {
  id: number;
  sender: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  duration?: number;
  description: string;
}

export interface WorkoutPlan {
  name: string;
  duration: number;
  difficulty: string;
  exercises: Exercise[];
  caloriesBurned: number;
}

export interface ProgressData {
  week: number;
  weight: number;
  caloriesBurned: number;
  workoutsCompleted: number;
  goal: number;
}
