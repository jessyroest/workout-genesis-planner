
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DailyHabit, getUserHabits, HABIT_TYPES, updateHabit, getHabitStreaks } from '@/utils/habitUtils';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';

interface HabitTrackerProps {
  user: User | null;
}

const HabitTracker = ({ user }: HabitTrackerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [habits, setHabits] = useState<DailyHabit[]>([]);
  const [streaks, setStreaks] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadHabits();
      loadStreaks();
    }
  }, [user, selectedDate]);

  const loadHabits = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const dateStr = selectedDate.toISOString().split('T')[0];
      const data = await getUserHabits(user.id, dateStr);
      setHabits(data);
    } catch (error) {
      console.error("Error loading habits:", error);
      toast({
        title: "Error",
        description: "Failed to load habit data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadStreaks = async () => {
    if (!user) return;
    
    try {
      const data = await getHabitStreaks(user.id);
      setStreaks(data);
    } catch (error) {
      console.error("Error loading streaks:", error);
    }
  };

  const handleUpdateHabit = async (habitIndex: number, newValue: number) => {
    if (!user) return;
    
    try {
      const updatedHabit = {
        ...habits[habitIndex],
        user_id: user.id,
        actual_value: newValue,
        completed: newValue >= habits[habitIndex].target_value
      };
      
      const success = await updateHabit(updatedHabit);
      
      if (success) {
        const updatedHabits = [...habits];
        updatedHabits[habitIndex] = updatedHabit;
        setHabits(updatedHabits);
        
        // Also update streaks if needed
        if (updatedHabit.completed && !habits[habitIndex].completed) {
          const habitType = updatedHabit.habit_type;
          setStreaks((prev) => ({
            ...prev,
            [habitType]: (prev[habitType] || 0) + 1
          }));
        }
      }
    } catch (error) {
      console.error("Error updating habit:", error);
      toast({
        title: "Error",
        description: "Failed to update habit",
        variant: "destructive",
      });
    }
  };

  const changeDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction === 'prev' ? -1 : 1));
    setSelectedDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  return (
    <Card className="bg-black/50 border-purple-800/30 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <span className="bg-purple-900 p-2 rounded-md mr-2">✅</span>
          Daily Habits
        </CardTitle>
        <CardDescription className="text-gray-400">
          Track your wellness and fitness habits
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => changeDay('prev')}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <ChevronLeft />
          </Button>
          
          <div className="font-bold text-lg">
            {isToday(selectedDate) ? 'Today' : formatDate(selectedDate)}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => changeDay('next')}
            disabled={isToday(selectedDate)}
            className="text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30"
          >
            <ChevronRight />
          </Button>
        </div>

        {isLoading ? (
          <div className="py-10 flex justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-purple-500 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {habits.map((habit, index) => {
              const habitDef = HABIT_TYPES[habit.habit_type] || {
                name: habit.habit_type,
                icon: '🔷',
                unit: 'times',
                defaultTarget: 1,
                color: 'gray'
              };
              
              const streakCount = streaks[habit.habit_type] || 0;
              const progress = (habit.actual_value / habit.target_value) * 100;
              
              const colorClass = habit.completed 
                ? `bg-${habitDef.color}-600/50 border-${habitDef.color}-500`
                : 'bg-gray-900 border-gray-800';
              
              return (
                <div 
                  key={`${habit.habit_type}-${index}`} 
                  className={`border rounded-lg p-3 ${colorClass}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="text-2xl mr-2">{habitDef.icon}</div>
                      <div>
                        <div className="font-medium">{habitDef.name}</div>
                        <div className="text-xs text-gray-400 flex items-center">
                          {streakCount > 0 && (
                            <span className="flex items-center mr-1 text-orange-500">
                              <Flame className="h-3 w-3 mr-0.5" /> {streakCount} days
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full border-gray-700 bg-black/50"
                        onClick={() => handleUpdateHabit(index, Math.max(0, habit.actual_value - 1))}
                      >
                        -
                      </Button>
                      
                      <div className="text-center min-w-[60px]">
                        <span className="text-lg font-bold">{habit.actual_value}</span>
                        <span className="text-gray-400 text-sm">/{habit.target_value}</span>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full border-gray-700 bg-black/50"
                        onClick={() => handleUpdateHabit(index, habit.actual_value + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-2 w-full bg-gray-900 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full bg-${habitDef.color}-500`} 
                      style={{ width: `${Math.min(100, progress)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
            
            {habits.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No habit data available</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HabitTracker;
