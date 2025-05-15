
export type Goal = 
  | "cursed mass gain" 
  | "domain expansion shred" 
  | "heavenly pact strength" 
  | "speed-type fighter" 
  | "balanced sorcerer" 
  | "jujutsu athlete" 
  | "reverse curse"
  | "cursed core rebuild";

export type ExperienceLevel = 
  | "grade 4" 
  | "grade 3"
  | "semi-grade 2" 
  | "grade 2"
  | "grade 1" 
  | "special grade";

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
  | "full body curse mastery"
  | "binding vow phul"
  | "jujutsu circuit combat"
  | "black flash rotation"
  | "reverse cursed technique"
  | "shikigami flow";

export type IntensityTechnique = 
  | "domain expansion" 
  | "black flash" 
  | "simple domain" 
  | "binding vow" 
  | "maximum curse" 
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
  curseStyle?: string;
  spiritAnimal?: string;
  playlist?: string;
}

// New JJK theme-specific types
export type CurseTechnique = 
  | "close-range brute force"
  | "agile and ranged"
  | "power and precision"
  | "speed and finesse"
  | "flow-based sorcery";

export type SpiritAnimal = 
  | "panda"
  | "nue"
  | "divine dog"
  | "max elephant";

export type Playlist = 
  | "sukuna's rage"
  | "gojo's calm"
  | "yuta's redemption";

