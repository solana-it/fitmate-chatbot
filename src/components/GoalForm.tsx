
import { useState } from 'react';
import { UserData } from '@/types/fitness';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GoalFormProps {
  onSubmit: (data: UserData) => void;
}

const GoalForm = ({ onSubmit }: GoalFormProps) => {
  const [formData, setFormData] = useState<Partial<UserData>>({
    workoutDays: [],
    timeAvailable: 30
  });

  const goals = [
    { value: 'weight-loss', label: 'Weight Loss', emoji: '🔥' },
    { value: 'muscle-gain', label: 'Muscle Gain', emoji: '💪' },
    { value: 'general-health', label: 'General Health', emoji: '🌟' },
    { value: 'endurance', label: 'Endurance', emoji: '⚡' }
  ];

  const fitnessLevels = [
    { value: 'beginner', label: 'Beginner', desc: 'New to exercise' },
    { value: 'intermediate', label: 'Intermediate', desc: 'Some experience' },
    { value: 'advanced', label: 'Advanced', desc: 'Very experienced' }
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleWorkoutDayChange = (day: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      workoutDays: checked 
        ? [...(prev.workoutDays || []), day]
        : (prev.workoutDays || []).filter(d => d !== day)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.age && formData.height && formData.weight && 
        formData.goal && formData.fitnessLevel && formData.workoutDays?.length) {
      onSubmit(formData as UserData);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
        <CardTitle className="text-center text-xl">🎯 Let's Set Your Fitness Goals!</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={formData.name || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                value={formData.age || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="170"
                value={formData.height || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="70"
                value={formData.weight || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: parseInt(e.target.value) }))}
                required
              />
            </div>
          </div>

          {/* Fitness Goal */}
          <div>
            <Label>Fitness Goal</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {goals.map((goal) => (
                <button
                  key={goal.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, goal: goal.value as UserData['goal'] }))}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    formData.goal === goal.value
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="text-2xl mb-1">{goal.emoji}</div>
                  <div className="text-sm font-medium">{goal.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Fitness Level */}
          <div>
            <Label>Fitness Level</Label>
            <Select value={formData.fitnessLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, fitnessLevel: value as UserData['fitnessLevel'] }))}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select your fitness level" />
              </SelectTrigger>
              <SelectContent>
                {fitnessLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    <div>
                      <div className="font-medium">{level.label}</div>
                      <div className="text-sm text-gray-500">{level.desc}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Workout Days */}
          <div>
            <Label>Preferred Workout Days</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {weekDays.map((day) => (
                <div key={day} className="flex items-center space-x-2 p-2 border rounded">
                  <Checkbox
                    id={day}
                    checked={formData.workoutDays?.includes(day) || false}
                    onCheckedChange={(checked) => handleWorkoutDayChange(day, checked as boolean)}
                  />
                  <Label htmlFor={day} className="text-sm cursor-pointer">{day.slice(0, 3)}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Time Available */}
          <div>
            <Label htmlFor="time">Time Available per Workout (minutes)</Label>
            <Select value={formData.timeAvailable?.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, timeAvailable: parseInt(value) }))}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select workout duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="90">1.5 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg py-3"
          >
            🚀 Create My Fitness Plan!
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GoalForm;
