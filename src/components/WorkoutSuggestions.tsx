
import { useState } from 'react';
import { WorkoutPlan } from '@/types/fitness';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Timer, Flame, Dumbbell } from 'lucide-react';

interface WorkoutSuggestionsProps {
  workout: WorkoutPlan;
  onComplete: () => void;
}

const WorkoutSuggestions = ({ workout, onComplete }: WorkoutSuggestionsProps) => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startWorkout = () => {
    setIsWorkoutStarted(true);
    setIsTimerActive(true);
  };

  const completeExercise = () => {
    setCompletedExercises(prev => [...prev, currentExercise]);
    if (currentExercise < workout.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else {
      setIsTimerActive(false);
      onComplete();
    }
  };

  const progress = (completedExercises.length / workout.exercises.length) * 100;

  return (
    <div className="space-y-6">
      {/* Workout Header */}
      <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <CardHeader>
          <CardTitle className="text-center text-xl">{workout.name}</CardTitle>
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-1">
              <Timer className="w-4 h-4" />
              {workout.duration} min
            </div>
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4" />
              {workout.caloriesBurned} cal
            </div>
            <div className="flex items-center gap-1">
              <Dumbbell className="w-4 h-4" />
              {workout.difficulty}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Workout Progress */}
      {isWorkoutStarted && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Workout Progress</span>
                <span className="text-sm text-gray-600">{formatTime(timer)}</span>
              </div>
              <Progress value={progress} className="w-full" />
              <div className="text-center text-sm text-gray-600">
                {completedExercises.length} of {workout.exercises.length} exercises completed
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Exercise */}
      {isWorkoutStarted && currentExercise < workout.exercises.length && (
        <Card className="border-2 border-blue-500">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-lg">
              Current Exercise: {workout.exercises[currentExercise].name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Sets:</span>
                  <p className="text-lg font-bold">{workout.exercises[currentExercise].sets}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Reps:</span>
                  <p className="text-lg font-bold">{workout.exercises[currentExercise].reps}</p>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Description:</span>
                <p className="mt-1">{workout.exercises[currentExercise].description}</p>
              </div>
              <Button 
                onClick={completeExercise} 
                className="w-full bg-green-600 hover:bg-green-700"
              >
                ✅ Exercise Complete!
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Exercise List */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Exercises</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {workout.exercises.map((exercise, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border transition-all ${
                  completedExercises.includes(index) 
                    ? 'bg-green-50 border-green-200' 
                    : index === currentExercise && isWorkoutStarted
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{exercise.name}</h4>
                      {completedExercises.includes(index) && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          ✅ Done
                        </Badge>
                      )}
                      {index === currentExercise && isWorkoutStarted && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          🏃 Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{exercise.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{exercise.sets} sets</p>
                    <p className="text-sm text-gray-600">{exercise.reps}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Start/Complete Workout Button */}
      {!isWorkoutStarted ? (
        <Button 
          onClick={startWorkout} 
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg py-3"
        >
          🚀 Start Workout!
        </Button>
      ) : completedExercises.length === workout.exercises.length && (
        <div className="text-center space-y-4">
          <div className="text-2xl">🎉</div>
          <h3 className="text-xl font-bold text-green-600">Workout Completed!</h3>
          <p className="text-gray-600">Great job! You've finished your workout in {formatTime(timer)}</p>
        </div>
      )}
    </div>
  );
};

export default WorkoutSuggestions;
