
import { supabase } from "@/integrations/supabase/client";

export interface DailyHabit {
  id?: string;
  user_id?: string;
  habit_type: string;
  completed: boolean;
  target_value: number;
  actual_value: number;
  created_at?: string;
  streak?: number;
}

export interface HabitDefinition {
  type: string;
  name: string;
  icon: string;
  unit: string;
  defaultTarget: number;
  color: string;
}

export const HABIT_TYPES: Record<string, HabitDefinition> = {
  water: {
    type: 'water',
    name: 'Hydration',
    icon: '💧',
    unit: 'glasses',
    defaultTarget: 8,
    color: 'blue'
  },
  sleep: {
    type: 'sleep',
    name: 'Sleep',
    icon: '😴',
    unit: 'hours',
    defaultTarget: 8,
    color: 'indigo'
  },
  vitamin: {
    type: 'vitamin',
    name: 'Vitamins',
    icon: '💊',
    unit: 'taken',
    defaultTarget: 1,
    color: 'amber'
  },
  meditation: {
    type: 'meditation',
    name: 'Meditation',
    icon: '🧘',
    unit: 'minutes',
    defaultTarget: 10,
    color: 'purple'
  },
  training: {
    type: 'training',
    name: 'Training',
    icon: '💪',
    unit: 'workout',
    defaultTarget: 1,
    color: 'red'
  },
  steps: {
    type: 'steps',
    name: 'Steps',
    icon: '👣',
    unit: 'steps',
    defaultTarget: 10000,
    color: 'green'
  },
  protein: {
    type: 'protein',
    name: 'Protein',
    icon: '🥩',
    unit: 'grams',
    defaultTarget: 120,
    color: 'rose'
  },
  calories: {
    type: 'calories',
    name: 'Calories',
    icon: '🔥',
    unit: 'kcal',
    defaultTarget: 2000,
    color: 'orange'
  }
};

export const getUserHabits = async (
  userId: string, 
  date: string
): Promise<DailyHabit[]> => {
  try {
    // Convert date to start and end of day
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    
    const { data, error } = await supabase
      .from('user_habits')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());
      
    if (error) {
      console.error("Error fetching habits:", error);
      return [];
    }
    
    // Initialize with defaults if no data
    if (!data || data.length === 0) {
      return Object.values(HABIT_TYPES).map(habit => ({
        habit_type: habit.type,
        completed: false,
        target_value: habit.defaultTarget,
        actual_value: 0,
        streak: 0
      }));
    }
    
    return data;
  } catch (error) {
    console.error("Error in getUserHabits:", error);
    return [];
  }
};

export const updateHabit = async (habit: DailyHabit): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('user_habits')
      .upsert({
        id: habit.id,
        user_id: habit.user_id,
        habit_type: habit.habit_type,
        completed: habit.actual_value >= habit.target_value,
        target_value: habit.target_value,
        actual_value: habit.actual_value
      });
      
    if (error) {
      console.error("Error updating habit:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error in updateHabit:", error);
    return false;
  }
};

export const getHabitStreaks = async (userId: string): Promise<Record<string, number>> => {
  try {
    const { data, error } = await supabase
      .rpc('get_habit_streaks', { user_id_param: userId });
      
    if (error) {
      console.error("Error fetching habit streaks:", error);
      return {};
    }
    
    // Convert to record for easy lookup
    const streaks: Record<string, number> = {};
    (data || []).forEach((item: any) => {
      streaks[item.habit_type] = item.streak_count;
    });
    
    return streaks;
  } catch (error) {
    console.error("Error in getHabitStreaks:", error);
    return {};
  }
};
