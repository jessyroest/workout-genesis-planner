
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
        };
      };
      user_habits: {
        Row: {
          actual_value: number;
          completed: boolean;
          created_at: string | null;
          habit_type: string;
          id: string;
          notes: string | null;
          target_value: number;
          user_id: string;
        };
        Insert: {
          actual_value?: number;
          completed?: boolean;
          created_at?: string | null;
          habit_type: string;
          id?: string;
          notes?: string | null;
          target_value: number;
          user_id: string;
        };
        Update: {
          actual_value?: number;
          completed?: boolean;
          created_at?: string | null;
          habit_type?: string;
          id?: string;
          notes?: string | null;
          target_value?: number;
          user_id?: string;
        };
      };
      user_metrics: {
        Row: {
          created_at: string | null;
          id: string;
          metric_type: string;
          notes: string | null;
          user_id: string;
          value: number;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          metric_type: string;
          notes?: string | null;
          user_id: string;
          value: number;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          metric_type?: string;
          notes?: string | null;
          user_id?: string;
          value?: number;
        };
      };
      workouts: {
        Row: {
          created_at: string | null;
          experience_level: string;
          goal: string;
          id: string;
          name: string;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          experience_level: string;
          goal: string;
          id?: string;
          name: string;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          experience_level?: string;
          goal?: string;
          id?: string;
          name?: string;
          user_id?: string;
        };
      };
      workout_days: {
        Row: {
          created_at: string | null;
          day: string;
          exercises: Json;
          id: string;
          workout_id: string;
        };
        Insert: {
          created_at?: string | null;
          day: string;
          exercises: Json;
          id?: string;
          workout_id: string;
        };
        Update: {
          created_at?: string | null;
          day?: string;
          exercises?: Json;
          id?: string;
          workout_id?: string;
        };
      };
    };
    Functions: {
      get_habit_streaks: {
        Args: { user_id_param: string };
        Returns: {
          habit_type: string;
          streak_count: number;
        }[];
      };
    };
  };
}
