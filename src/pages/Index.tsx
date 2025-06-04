
import { useState, useEffect } from 'react';
import ChatWindow from '@/components/ChatWindow';
import GoalForm from '@/components/GoalForm';
import WorkoutSuggestions from '@/components/WorkoutSuggestions';
import ProgressTracker from '@/components/ProgressTracker';
import MotivationBubble from '@/components/MotivationBubble';
import { UserData, ChatMessage, WorkoutPlan } from '@/types/fitness';
import { calculateBMI, generateWorkoutPlan } from '@/utils/fitnessUtils';

const Index = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'bot',
      message: "Hi there! I'm FitMate, your personal fitness coach! 💪 Let's start by setting up your fitness goals. What would you like to achieve?",
      timestamp: new Date()
    }
  ]);
  const [currentWorkout, setCurrentWorkout] = useState<WorkoutPlan | null>(null);
  const [showMotivation, setShowMotivation] = useState(false);
  const [currentStep, setCurrentStep] = useState<'welcome' | 'goals' | 'workout' | 'progress'>('welcome');

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = localStorage.getItem('fitmate-data');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setUserData(parsed.userData);
      setChatMessages(parsed.chatMessages || chatMessages);
      setCurrentStep(parsed.currentStep || 'welcome');
    }

    // Show motivation bubble every 30 seconds
    const motivationInterval = setInterval(() => {
      setShowMotivation(true);
      setTimeout(() => setShowMotivation(false), 5000);
    }, 30000);

    return () => clearInterval(motivationInterval);
  }, []);

  useEffect(() => {
    // Save data to localStorage whenever it changes
    if (userData) {
      localStorage.setItem('fitmate-data', JSON.stringify({
        userData,
        chatMessages,
        currentStep
      }));
    }
  }, [userData, chatMessages, currentStep]);

  const handleGoalSubmit = (data: UserData) => {
    setUserData(data);
    const bmi = calculateBMI(data.weight, data.height);
    const workout = generateWorkoutPlan(data);
    setCurrentWorkout(workout);
    
    const newMessages: ChatMessage[] = [
      {
        id: chatMessages.length + 1,
        sender: 'user',
        message: `My goal is ${data.goal}. I'm ${data.age} years old, ${data.height}cm tall, ${data.weight}kg, and prefer ${data.workoutDays.join(', ')} for workouts.`,
        timestamp: new Date()
      },
      {
        id: chatMessages.length + 2,
        sender: 'bot',
        message: `Great! Your BMI is ${bmi.toFixed(1)}. I've created a personalized workout plan for you. Let's get started! 🔥`,
        timestamp: new Date()
      }
    ];
    
    setChatMessages(prev => [...prev, ...newMessages]);
    setCurrentStep('workout');
  };

  const addChatMessage = (message: string, sender: 'user' | 'bot' = 'user') => {
    const newMessage: ChatMessage = {
      id: chatMessages.length + 1,
      sender,
      message,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  const handleWorkoutComplete = () => {
    addChatMessage("I completed my workout!", 'user');
    setTimeout(() => {
      addChatMessage("Awesome job! 🎉 Your progress has been updated. Keep up the great work!", 'bot');
      setCurrentStep('progress');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">FitMate</h1>
            <p className="text-blue-100">Your Personal Fitness Coach</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chat Area */}
        <div className="lg:col-span-2 space-y-6">
          <ChatWindow 
            messages={chatMessages}
            onSendMessage={addChatMessage}
          />
          
          {currentStep === 'welcome' && (
            <GoalForm onSubmit={handleGoalSubmit} />
          )}
          
          {currentStep === 'workout' && currentWorkout && (
            <WorkoutSuggestions 
              workout={currentWorkout}
              onComplete={handleWorkoutComplete}
            />
          )}
          
          {currentStep === 'progress' && userData && (
            <ProgressTracker userData={userData} />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {userData && (
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-semibold text-gray-800 mb-2">Your Profile</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-medium">Goal:</span> {userData.goal}</p>
                <p><span className="font-medium">Age:</span> {userData.age}</p>
                <p><span className="font-medium">BMI:</span> {calculateBMI(userData.weight, userData.height).toFixed(1)}</p>
                <p><span className="font-medium">Workout Days:</span> {userData.workoutDays.join(', ')}</p>
              </div>
            </div>
          )}
          
          {showMotivation && <MotivationBubble />}
          
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-4 shadow-md">
            <h3 className="font-semibold mb-2">💡 Quick Tips</h3>
            <ul className="text-sm space-y-1">
              <li>• Stay hydrated throughout the day</li>
              <li>• Get 7-9 hours of sleep</li>
              <li>• Take rest days seriously</li>
              <li>• Listen to your body</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
