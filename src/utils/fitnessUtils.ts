
import { UserData, WorkoutPlan, Exercise, ProgressData } from '@/types/fitness';

export const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

export const calculateCaloriesBurned = (duration: number, intensity: string, weight: number): number => {
  const multipliers = {
    low: 3.5,
    moderate: 5.0,
    high: 7.0
  };
  
  const met = multipliers[intensity as keyof typeof multipliers] || 5.0;
  return Math.round((met * weight * duration) / 60);
};

export const generateWorkoutPlan = (userData: UserData): WorkoutPlan => {
  const { goal, fitnessLevel, timeAvailable } = userData;
  
  const workoutPlans: Record<string, Record<string, Exercise[]>> = {
    'weight-loss': {
      beginner: [
        { name: 'Jumping Jacks', sets: 3, reps: '30 seconds', description: 'Full body cardio exercise' },
        { name: 'Bodyweight Squats', sets: 3, reps: '10-15', description: 'Lower body strength' },
        { name: 'Push-ups (modified)', sets: 3, reps: '5-10', description: 'Upper body strength' },
        { name: 'Plank', sets: 3, reps: '20-30 seconds', description: 'Core stability' },
        { name: 'Walking in place', sets: 1, reps: '5 minutes', description: 'Light cardio cooldown' }
      ],
      intermediate: [
        { name: 'Burpees', sets: 3, reps: '8-12', description: 'Full body HIIT exercise' },
        { name: 'Mountain Climbers', sets: 3, reps: '45 seconds', description: 'Cardio and core' },
        { name: 'Jump Squats', sets: 3, reps: '12-15', description: 'Explosive lower body' },
        { name: 'Push-ups', sets: 3, reps: '10-15', description: 'Upper body strength' },
        { name: 'High Knees', sets: 3, reps: '30 seconds', description: 'Cardio finisher' }
      ],
      advanced: [
        { name: 'Burpee Box Jumps', sets: 4, reps: '10-12', description: 'Advanced full body' },
        { name: 'Sprint Intervals', sets: 5, reps: '30 sec on/30 sec off', description: 'High intensity cardio' },
        { name: 'Plyometric Push-ups', sets: 3, reps: '8-12', description: 'Explosive upper body' },
        { name: 'Single-leg Burpees', sets: 3, reps: '6-8 each leg', description: 'Unilateral strength' },
        { name: 'Tabata Squats', sets: 4, reps: '20 sec on/10 sec off', description: 'High intensity legs' }
      ]
    },
    'muscle-gain': {
      beginner: [
        { name: 'Bodyweight Squats', sets: 3, reps: '12-15', description: 'Lower body foundation' },
        { name: 'Push-ups', sets: 3, reps: '8-12', description: 'Upper body strength' },
        { name: 'Lunges', sets: 3, reps: '10 each leg', description: 'Unilateral leg strength' },
        { name: 'Plank', sets: 3, reps: '30-45 seconds', description: 'Core stability' },
        { name: 'Glute Bridges', sets: 3, reps: '12-15', description: 'Posterior chain' }
      ],
      intermediate: [
        { name: 'Pike Push-ups', sets: 3, reps: '8-12', description: 'Shoulder strength' },
        { name: 'Single-leg Squats', sets: 3, reps: '6-10 each leg', description: 'Advanced leg strength' },
        { name: 'Diamond Push-ups', sets: 3, reps: '8-12', description: 'Tricep focused' },
        { name: 'Bulgarian Split Squats', sets: 3, reps: '10-12 each leg', description: 'Unilateral strength' },
        { name: 'Decline Push-ups', sets: 3, reps: '10-15', description: 'Upper chest focus' }
      ],
      advanced: [
        { name: 'One-arm Push-ups', sets: 3, reps: '3-8 each arm', description: 'Advanced upper body' },
        { name: 'Pistol Squats', sets: 3, reps: '5-8 each leg', description: 'Single leg mastery' },
        { name: 'Handstand Push-ups', sets: 3, reps: '5-10', description: 'Vertical pressing' },
        { name: 'Archer Push-ups', sets: 3, reps: '6-10 each side', description: 'Unilateral pushing' },
        { name: 'Shrimp Squats', sets: 3, reps: '3-6 each leg', description: 'Advanced single leg' }
      ]
    },
    'general-health': {
      beginner: [
        { name: 'Arm Circles', sets: 2, reps: '10 each direction', description: 'Shoulder mobility' },
        { name: 'Bodyweight Squats', sets: 2, reps: '10-12', description: 'Functional movement' },
        { name: 'Wall Push-ups', sets: 2, reps: '8-12', description: 'Gentle upper body' },
        { name: 'Standing March', sets: 2, reps: '30 seconds', description: 'Light cardio' },
        { name: 'Stretching', sets: 1, reps: '5 minutes', description: 'Flexibility work' }
      ],
      intermediate: [
        { name: 'Cat-Cow Stretches', sets: 2, reps: '10', description: 'Spinal mobility' },
        { name: 'Squats', sets: 3, reps: '12-15', description: 'Functional strength' },
        { name: 'Modified Push-ups', sets: 3, reps: '8-12', description: 'Upper body' },
        { name: 'Side Steps', sets: 2, reps: '20 each direction', description: 'Hip mobility' },
        { name: 'Deep Breathing', sets: 3, reps: '1 minute', description: 'Stress relief' }
      ],
      advanced: [
        { name: 'Dynamic Warm-up', sets: 1, reps: '5 minutes', description: 'Movement preparation' },
        { name: 'Functional Squats', sets: 3, reps: '15-20', description: 'Daily movement' },
        { name: 'Push-up Variations', sets: 3, reps: '12-15', description: 'Upper body variety' },
        { name: 'Balance Challenges', sets: 3, reps: '30 seconds each', description: 'Stability work' },
        { name: 'Yoga Flow', sets: 1, reps: '10 minutes', description: 'Mind-body connection' }
      ]
    },
    'endurance': {
      beginner: [
        { name: 'Marching in Place', sets: 3, reps: '2 minutes', description: 'Cardio base building' },
        { name: 'Step-ups', sets: 3, reps: '10 each leg', description: 'Leg endurance' },
        { name: 'Arm Raises', sets: 3, reps: '15', description: 'Shoulder endurance' },
        { name: 'Gentle Jogging', sets: 2, reps: '1 minute', description: 'Aerobic base' },
        { name: 'Walking Recovery', sets: 1, reps: '3 minutes', description: 'Active recovery' }
      ],
      intermediate: [
        { name: 'Jogging in Place', sets: 4, reps: '3 minutes', description: 'Aerobic endurance' },
        { name: 'Squat Pulses', sets: 3, reps: '45 seconds', description: 'Muscular endurance' },
        { name: 'Boxing Punches', sets: 3, reps: '1 minute', description: 'Upper body endurance' },
        { name: 'Butt Kickers', sets: 3, reps: '45 seconds', description: 'Cardio intervals' },
        { name: 'Cool-down Walk', sets: 1, reps: '5 minutes', description: 'Recovery' }
      ],
      advanced: [
        { name: 'Running Intervals', sets: 6, reps: '2 min on/1 min off', description: 'High intensity intervals' },
        { name: 'Squat Jumps', sets: 4, reps: '1 minute', description: 'Power endurance' },
        { name: 'Shadow Boxing', sets: 4, reps: '2 minutes', description: 'Total body cardio' },
        { name: 'Burpee Intervals', sets: 5, reps: '30 sec on/30 sec off', description: 'Anaerobic capacity' },
        { name: 'Long Jog', sets: 1, reps: '10 minutes', description: 'Aerobic base' }
      ]
    }
  };

  const exercises = workoutPlans[goal]?.[fitnessLevel] || workoutPlans['general-health']['beginner'];
  const caloriesBurned = calculateCaloriesBurned(timeAvailable, fitnessLevel === 'advanced' ? 'high' : fitnessLevel === 'intermediate' ? 'moderate' : 'low', 70);

  return {
    name: `${goal.replace('-', ' ').toUpperCase()} - ${fitnessLevel.toUpperCase()}`,
    duration: timeAvailable,
    difficulty: fitnessLevel,
    exercises,
    caloriesBurned
  };
};

export const generateMockProgress = (): ProgressData[] => {
  return [
    { week: 1, weight: 75, caloriesBurned: 1200, workoutsCompleted: 3, goal: 4 },
    { week: 2, weight: 74.5, caloriesBurned: 1400, workoutsCompleted: 4, goal: 4 },
    { week: 3, weight: 74.2, caloriesBurned: 1300, workoutsCompleted: 3, goal: 4 },
    { week: 4, weight: 73.8, caloriesBurned: 1600, workoutsCompleted: 5, goal: 4 },
  ];
};

export const getMotivationalQuotes = (): string[] => {
  return [
    "💪 Every workout brings you closer to your goals!",
    "🔥 Your only competition is who you were yesterday!",
    "⭐ Believe in yourself and you're halfway there!",
    "🏆 Success is the sum of small efforts repeated daily!",
    "💯 You're stronger than your excuses!",
    "🚀 Progress, not perfection!",
    "⚡ Make today count!",
    "🎯 Focus on how you want to feel!",
    "💎 You are capable of amazing things!",
    "🌟 Keep going, you're doing great!"
  ];
};
