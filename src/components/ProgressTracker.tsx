
import { useState, useEffect } from 'react';
import { UserData, ProgressData } from '@/types/fitness';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { generateMockProgress } from '@/utils/fitnessUtils';

interface ProgressTrackerProps {
  userData: UserData;
}

const ProgressTracker = ({ userData }: ProgressTrackerProps) => {
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [currentWeek, setCurrentWeek] = useState(4);

  useEffect(() => {
    const mockData = generateMockProgress();
    setProgressData(mockData);
  }, []);

  const totalCaloriesBurned = progressData.reduce((sum, week) => sum + week.caloriesBurned, 0);
  const totalWorkouts = progressData.reduce((sum, week) => sum + week.workoutsCompleted, 0);
  const averageWorkoutsPerWeek = totalWorkouts / progressData.length;
  const goalCompletionRate = (averageWorkoutsPerWeek / 4) * 100; // Assuming 4 workouts per week as goal

  const getCurrentWeekData = () => progressData[progressData.length - 1];
  const currentWeekData = getCurrentWeekData();

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardHeader>
          <CardTitle className="text-center text-xl">📊 Your Progress Journey</CardTitle>
          <p className="text-center text-purple-100">Week {currentWeek} Progress</p>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{totalCaloriesBurned}</div>
            <div className="text-sm text-gray-600">Total Calories Burned</div>
            <div className="text-xs text-green-600 mt-1">🔥 Great progress!</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{totalWorkouts}</div>
            <div className="text-sm text-gray-600">Workouts Completed</div>
            <div className="text-xs text-green-600 mt-1">💪 Keep it up!</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{goalCompletionRate.toFixed(0)}%</div>
            <div className="text-sm text-gray-600">Goal Achievement</div>
            <div className="text-xs text-blue-600 mt-1">🎯 On track!</div>
          </CardContent>
        </Card>
      </div>

      {/* Current Week Progress */}
      {currentWeekData && (
        <Card>
          <CardHeader>
            <CardTitle>This Week's Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Weekly Workout Goal</span>
                <span>{currentWeekData.workoutsCompleted}/{currentWeekData.goal}</span>
              </div>
              <Progress value={(currentWeekData.workoutsCompleted / currentWeekData.goal) * 100} />
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <span className="text-sm text-gray-600">Weight</span>
                <p className="font-semibold">{currentWeekData.weight} kg</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Calories This Week</span>
                <p className="font-semibold">{currentWeekData.caloriesBurned}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progressData.map((week, index) => (
              <div key={week.week} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Week {week.week}</h4>
                  <Badge variant={week.workoutsCompleted >= week.goal ? "default" : "secondary"}>
                    {week.workoutsCompleted >= week.goal ? "Goal Met! 🎉" : "In Progress"}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Weight:</span>
                    <p className="font-medium">{week.weight} kg</p>
                    {index > 0 && (
                      <p className={`text-xs ${
                        week.weight < progressData[index - 1].weight ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {week.weight < progressData[index - 1].weight 
                          ? `↓ ${(progressData[index - 1].weight - week.weight).toFixed(1)} kg`
                          : 'Stable'
                        }
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <span className="text-gray-600">Workouts:</span>
                    <p className="font-medium">{week.workoutsCompleted}/{week.goal}</p>
                  </div>
                  
                  <div>
                    <span className="text-gray-600">Calories:</span>
                    <p className="font-medium">{week.caloriesBurned}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>🏆 Your Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl">🔥</div>
              <div>
                <p className="font-medium">Calorie Crusher</p>
                <p className="text-sm text-gray-600">Burned {totalCaloriesBurned} calories</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl">💪</div>
              <div>
                <p className="font-medium">Consistency Champion</p>
                <p className="text-sm text-gray-600">{totalWorkouts} workouts completed</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="text-2xl">🎯</div>
              <div>
                <p className="font-medium">Goal Getter</p>
                <p className="text-sm text-gray-600">{goalCompletionRate.toFixed(0)}% goal achievement</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl">⭐</div>
              <div>
                <p className="font-medium">Progress Star</p>
                <p className="text-sm text-gray-600">4 weeks of progress</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracker;
