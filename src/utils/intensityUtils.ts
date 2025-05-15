
import { ExperienceLevel, Goal, IntensityTechnique } from "../types/workout";

// Helper function to determine sets and reps based on goal and experience
export const getSetsAndReps = (goal: Goal, experienceLevel: ExperienceLevel): { sets: number; reps: string; rest: number } => {
  switch(goal) {
    case "cursed mass gain":
      if (experienceLevel === "grade 4") return { sets: 3, reps: "8-12", rest: 60 };
      if (experienceLevel === "grade 3") return { sets: 4, reps: "8-12", rest: 90 };
      return { sets: 5, reps: "8-12", rest: 90 };
    
    case "heavenly pact strength":
      if (experienceLevel === "grade 4") return { sets: 3, reps: "5-8", rest: 120 };
      if (experienceLevel === "grade 3") return { sets: 4, reps: "3-6", rest: 180 };
      return { sets: 5, reps: "2-5", rest: 240 };
    
    case "domain expansion shred":
    case "speed-type fighter":
      if (experienceLevel === "grade 4") return { sets: 3, reps: "12-15", rest: 30 };
      if (experienceLevel === "grade 3") return { sets: 3, reps: "15-20", rest: 45 };
      return { sets: 4, reps: "15-20", rest: 30 };
    
    default:
      return { sets: 3, reps: "8-12", rest: 60 };
  }
};

// Get an intensity technique based on experience level
export const getIntensityTechnique = (experienceLevel: ExperienceLevel): IntensityTechnique | undefined => {
  if (experienceLevel === "grade 4") {
    return Math.random() > 0.7 ? "black flash" : undefined;
  }
  
  const techniques: IntensityTechnique[] = ["domain expansion", "black flash", "simple domain"];
  
  if (experienceLevel === "grade 1" || experienceLevel === "special grade") {
    techniques.push("maximum curse", "binding vow", "reversed curse", "hollow technique");
  }
  
  return techniques[Math.floor(Math.random() * techniques.length)];
};
