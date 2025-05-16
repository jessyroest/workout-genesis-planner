
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Goal, ExperienceLevel } from '@/types/workout';
import { getMotivationalQuote, getWorkoutRecommendation, getMealSuggestion } from '@/utils/aiUtils';
import { Volume2, RefreshCw, Bot } from 'lucide-react';

interface AiCoachProps {
  user: User | null;
  goal?: Goal;
  experienceLevel?: ExperienceLevel;
}

const AiCoach = ({ user, goal = "muscleGain", experienceLevel = "beginner" }: AiCoachProps) => {
  const [quote, setQuote] = useState<string>("");
  const [recommendation, setRecommendation] = useState<string>("");
  const [mealSuggestion, setMealSuggestion] = useState<string>("");
  const [mealType, setMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack">("breakfast");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      generateContent();
    }
  }, [user, goal, experienceLevel]);

  // Generate AI content
  const generateContent = () => {
    // Get motivational quote
    const newQuote = getMotivationalQuote(goal, "anime");
    setQuote(newQuote);
    
    // Get workout recommendation
    const newRecommendation = getWorkoutRecommendation(goal, experienceLevel);
    setRecommendation(newRecommendation);
    
    // Get meal suggestion
    const currentTime = new Date();
    const hour = currentTime.getHours();
    
    // Determine meal type based on time of day
    let currentMealType: "breakfast" | "lunch" | "dinner" | "snack" = "breakfast";
    if (hour < 11) {
      currentMealType = "breakfast";
    } else if (hour < 15) {
      currentMealType = "lunch";
    } else if (hour < 20) {
      currentMealType = "dinner";
    } else {
      currentMealType = "snack";
    }
    
    setMealType(currentMealType);
    const newMeal = getMealSuggestion(goal, currentMealType);
    setMealSuggestion(newMeal);
  };

  // Handle refresh button click
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      generateContent();
      setIsRefreshing(false);
    }, 500);
  };

  // Speak text using browser's speech synthesis
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = text;
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;
      
      // Try to find a voice that sounds good
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('Samantha') || 
        voice.name.includes('Google')
      );
      
      if (preferredVoice) {
        speech.voice = preferredVoice;
      }
      
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <Card className="bg-black/50 border-purple-800/30 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <span className="bg-purple-900 p-2 rounded-md mr-2">🤖</span>
          AI Fitness Coach
        </CardTitle>
        <CardDescription className="text-gray-400 flex items-center justify-between">
          <span>Personalized guidance for your fitness journey</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Motivational Quote */}
        <div className="bg-purple-900/20 border border-purple-800/50 p-4 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-purple-400">Daily Motivation</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={() => speakText(quote)}
            >
              <Volume2 className="h-3 w-3" />
            </Button>
          </div>
          <blockquote className="italic text-lg">"{quote}"</blockquote>
        </div>

        {/* AI Recommendation */}
        <div className="bg-black/30 border border-gray-800 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="mt-1 bg-blue-900/50 p-2 rounded-full">
              <Bot className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-blue-400 mb-1">Coach Tips</h3>
              <p>{recommendation}</p>
            </div>
          </div>
        </div>

        {/* Meal Suggestion */}
        <div className="bg-black/30 border border-gray-800 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="mt-1 bg-green-900/50 p-2 rounded-full">
              <span className="text-xl">🍲</span>
            </div>
            <div>
              <h3 className="font-bold text-green-400 mb-1">
                Suggested {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
              </h3>
              <p>{mealSuggestion}</p>
            </div>
          </div>
        </div>

        {/* Voice Coaching */}
        <Button 
          className="w-full bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-600 hover:to-blue-600 text-white"
          onClick={() => speakText(`Here's your fitness advice for today: ${recommendation} Also, for your ${mealType}, consider having ${mealSuggestion}`)}
        >
          <Volume2 className="mr-2 h-4 w-4" />
          Play Voice Coaching
        </Button>
      </CardContent>
    </Card>
  );
};

export default AiCoach;
