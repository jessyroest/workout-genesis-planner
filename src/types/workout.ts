
export type Goal = 
  | "muscleGain" 
  | "fatLoss" 
  | "strength" 
  | "endurance" 
  | "tone" 
  | "general"
  | "cursed mass gain"
  | "heavenly pact strength"
  | "domain expansion shred"
  | "speed-type fighter";

export type ExperienceLevel = 
  | "beginner" 
  | "intermediate"
  | "advanced"
  | "grade 4"
  | "grade 3"
  | "grade 2"
  | "grade 1"
  | "special grade";

export type CurseTechnique = 
  | "domain" 
  | "reversal" 
  | "manipulation" 
  | "restriction" 
  | "innate";

export type SpiritAnimal = 
  | "gorilla" 
  | "wolf" 
  | "lion" 
  | "bear" 
  | "eagle" 
  | "tiger";

export type Playlist = 
  | "metal" 
  | "rap" 
  | "rock" 
  | "electronic" 
  | "anime" 
  | "jazz";

export type MuscleGroup = 
  | "demonic chest" 
  | "titanic back" 
  | "shoulder domination" 
  | "arm control" 
  | "legs of steel" 
  | "core seal"
  | "v-taper lats"
  | "mountain traps"
  | "explosive glutes"
  | "unshakeable calves"
  | "grip of a curse user"
  | "posture stabilizers"
  | "mobility and flexibility"
  | "cardio conditioning"
  | "recovery and regeneration";

export type BodySplit = 
  | "zenin style" 
  | "inverted spear protocol" 
  | "domain split" 
  | "full body curse mastery";

export type IntensityTechnique = 
  | "domain expansion" 
  | "black flash" 
  | "maximum curse" 
  | "simple domain" 
  | "binding vow" 
  | "reversed curse" 
  | "hollow technique";

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

export interface FormData {
  goal: Goal;
  experienceLevel: ExperienceLevel;
  curseTechnique: CurseTechnique;
  daysPerWeek: number;
  spiritAnimal: SpiritAnimal;
  playlist: Playlist;
  bodySplit?: BodySplit;
  priorityMuscles?: MuscleGroup[];
  limitations?: string[];
}

export interface WorkoutDay {
  day: number;
  focus: MuscleGroup | MuscleGroup[];
  workoutSets: WorkoutSet[];
  notes: string;
  quote: string;
  name?: string;
  exercises?: any[];
}

export interface WorkoutPlan {
  goal: string;
  experienceLevel: string;
  days?: WorkoutDay[];
  daysPerWeek: number;
  bodySplit?: BodySplit;
  workoutDays: WorkoutDay[];
  priorityMuscles?: MuscleGroup[];
  limitations?: string[];
}
