
export type Goal = "muscle gain" | "fat loss" | "strength";

export type ExperienceLevel = "beginner" | "intermediate" | "advanced";

export type MuscleGroup =
  | "chest"
  | "back"
  | "shoulders"
  | "legs"
  | "arms"
  | "core"
  | "full body";

export interface Exercise {
  name: string;
  muscleGroup: MuscleGroup;
  experience: ExperienceLevel[];
  goals: Goal[];
  description?: string;
}

export interface WorkoutSet {
  exercise: Exercise;
  sets: number;
  reps: string;
  rest: number;
}

export interface WorkoutDay {
  day: number;
  focus: MuscleGroup | MuscleGroup[];
  workoutSets: WorkoutSet[];
  notes?: string;
}

export interface WorkoutPlan {
  goal: Goal;
  experienceLevel: ExperienceLevel;
  daysPerWeek: number;
  workoutDays: WorkoutDay[];
}

export interface FormData {
  goal: Goal;
  experienceLevel: ExperienceLevel;
  daysPerWeek: number;
}
