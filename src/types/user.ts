
export interface UserProfile {
  id: string;
  username: string;
  created_at: string;
  updated_at: string;
}

export interface WorkoutDay {
  id: string;
  day: string;
  exercises: any; // This will be a JSON object containing exercise details
}

export interface UserWorkout {
  id: string;
  user_id?: string;
  name: string;
  goal: string;
  experience_level: string;
  created_at: string;
  workout_days: WorkoutDay[];
}
