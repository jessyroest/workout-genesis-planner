
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { getUserHabits, updateHabit, getHabitStreaks, DailyHabit, HABIT_TYPES } from "@/utils/habitUtils";
import { Button } from "@/components/ui/button";
import { Flame, MinusCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface HabitTrackerProps {
  user: User | null;
}

const HabitTracker = ({ user }: HabitTrackerProps) => {
  const [habits, setHabits] = useState<DailyHabit[]>([]);
  const [streaks, setStreaks] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
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
      const userHabits = await getUserHabits(user.id, selectedDate);
      setHabits(userHabits);
    } catch (error) {
      console.error("Error loading habits:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStreaks = async () => {
    if (!user) return;
    
    try {
      const habitStreaks = await getHabitStreaks(user.id);
      setStreaks(habitStreaks);
    } catch (error) {
      console.error("Error loading streaks:", error);
    }
  };

  const handleUpdateHabit = async (habitIndex: number, increment: number) => {
    if (!user) return;
    
    const habit = habits[habitIndex];
    const newValue = Math.max(0, habit.actual_value + increment);
    const wasCompleted = habit.completed;
    
    // Update locally first for immediate feedback
    const updatedHabits = [...habits];
    updatedHabits[habitIndex] = {
      ...habit,
      actual_value: newValue,
      completed: newValue >= habit.target_value
    };
    setHabits(updatedHabits);
    
    // Then update in database
    try {
      await updateHabit({
        ...habit,
        user_id: user.id,
        actual_value: newValue,
        completed: newValue >= habit.target_value
      });
      
      // If habit was just completed, show a congratulatory toast
      if (!wasCompleted && newValue >= habit.target_value) {
        const habitDef = HABIT_TYPES[habit.habit_type];
        const name = habitDef ? habitDef.name : habit.habit_type;
        
        toast({
          title: `${name} Completed! 🎉`,
          description: "Great job keeping up with your habits!",
          variant: "default"
        });
        
        // Reload streaks to get updated counts
        loadStreaks();
      }
    } catch (error) {
      console.error("Error updating habit:", error);
      
      // Revert the local update if the server update failed
      loadHabits();
    }
  };

  const getProgressColor = (habitType: string) => {
    return HABIT_TYPES[habitType]?.color || 'purple';
  };

  return (
    <Card className="bg-card border-border shadow-lg backdrop-blur rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center">
          <span className="bg-primary/10 text-primary p-2 rounded-md mr-2">📝</span>
          Daily Habits
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Track your daily wellness and fitness habits
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-background border border-input rounded p-2 mb-2"
          />
        </div>

        {isLoading ? (
          <div className="h-48 flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
            {habits.map((habit, index) => {
              const habitDef = HABIT_TYPES[habit.habit_type];
              if (!habitDef) return null;
              
              const progressPercent = Math.min(100, (habit.actual_value / habit.target_value) * 100);
              const progressColorClass = `bg-${getProgressColor(habit.habit_type)}-600`;
              const streakCount = streaks[habit.habit_type] || 0;
              
              return (
                <div 
                  key={habit.id || index} 
                  className={`p-3 rounded-lg ${
                    habit.completed 
                      ? 'bg-green-500/10 border border-green-500/30' 
                      : 'bg-muted/30'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">{habitDef.icon}</span>
                      <span className="font-medium">{habitDef.name}</span>
                    </div>
                    
                    {streakCount > 0 && (
                      <div className="flex items-center text-xs bg-orange-500/10 px-2 py-1 rounded">
                        <Flame className="h-3 w-3 text-orange-500 mr-1" />
                        <span className="text-orange-400">{streakCount} day streak</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{habit.actual_value} / {habit.target_value} {habitDef.unit}</span>
                    </div>
                    <Progress 
                      value={progressPercent} 
                      className="h-2 bg-muted"
                      // Use cn utility to combine classes instead of indicatorClassName
                      // This avoids the TypeScript error
                      indicatorClassName={cn(progressColorClass)}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-input text-muted-foreground hover:bg-muted hover:text-foreground"
                      onClick={() => handleUpdateHabit(index, -1)}
                      disabled={habit.actual_value <= 0}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    
                    <span className="font-bold text-lg">{habit.actual_value}</span>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-input text-muted-foreground hover:bg-muted hover:text-foreground"
                      onClick={() => handleUpdateHabit(index, 1)}
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HabitTracker;
