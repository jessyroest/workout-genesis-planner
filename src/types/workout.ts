
export type Goal = "muscle gain" | "fat loss" | "strength" | "shredding";

export type ExperienceLevel = "beginner" | "intermediate" | "advanced";

export type MuscleGroup =
  | "chest"
  | "back"
  | "shoulders"
  | "legs"
  | "arms"
  | "core"
  | "full body"
  | "triceps"
  | "biceps"
  | "lats"
  | "calves"
  | "neck"
  | "grip"
  | "traps"
  | "forearms"
  | "glutes"
  | "hamstrings"
  | "quads"
  | "abs";

export type BodySplit = "push/pull/legs" | "bro split" | "upper/lower" | "full body";

export type IntensityTechnique = 
  | "drop set" 
  | "superset" 
  | "forced reps" 
  | "rest-pause" 
  | "giant set" 
  | "negative reps"
  | "partials";

export interface Exercise {
  name: string;
  muscleGroup: MuscleGroup;
  experience: ExperienceLevel[];
  goals: Goal[];
  description?: string;
  isPriority?: boolean;
}

export interface WorkoutSet {
  exercise: Exercise;
  sets: number;
  reps: string;
  rest: number;
  intensityTechnique?: IntensityTechnique;
}

export interface WorkoutDay {
  day: number;
  focus: MuscleGroup | MuscleGroup[];
  workoutSets: WorkoutSet[];
  notes?: string;
  quote?: string;
}

export interface WorkoutPlan {
  goal: Goal;
  experienceLevel: ExperienceLevel;
  daysPerWeek: number;
  bodySplit: BodySplit;
  priorityMuscles: MuscleGroup[];
  limitations?: string;
  workoutDays: WorkoutDay[];
}

export interface FormData {
  goal: Goal;
  experienceLevel: ExperienceLevel;
  daysPerWeek: number;
  bodySplit: BodySplit;
  priorityMuscles: MuscleGroup[];
  limitations?: string;
}
