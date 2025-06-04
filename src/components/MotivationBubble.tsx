
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getMotivationalQuotes } from '@/utils/fitnessUtils';

const MotivationBubble = () => {
  const [currentQuote, setCurrentQuote] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const quotes = getMotivationalQuotes();
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
  }, []);

  if (!isVisible) return null;

  return (
    <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg animate-fade-in">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">✨</span>
              <span className="font-semibold text-sm">Motivation Boost!</span>
            </div>
            <p className="text-sm leading-relaxed">{currentQuote}</p>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="ml-2 text-white opacity-70 hover:opacity-100 transition-opacity"
          >
            <span className="text-lg">×</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationBubble;
