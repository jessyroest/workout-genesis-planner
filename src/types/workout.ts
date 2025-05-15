
export type Goal = 
  | "muscleGain" 
  | "fatLoss" 
  | "strength" 
  | "endurance" 
  | "tone" 
  | "general";

export type ExperienceLevel = 
  | "beginner" 
  | "intermediate"
  | "advanced";

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

export interface FormData {
  goal: Goal;
  experienceLevel: ExperienceLevel;
  curseTechnique: CurseTechnique;
  daysPerWeek: number;
  spiritAnimal: SpiritAnimal;
  playlist: Playlist;
}

export interface WorkoutDay {
  name: string;
  exercises: any[];
}

export interface WorkoutPlan {
  goal: string;
  experienceLevel: string;
  days: WorkoutDay[];
}
