
import { trenQuotes } from "../data/exercises";
import { Goal, ExperienceLevel } from "../types/workout";

// Function to generate workout notes based on goal
export const generateWorkoutNotes = (goal: Goal, experienceLevel: ExperienceLevel): string => {
  switch(goal) {
    case "cursed mass gain":
      return "Focus on progressive overload by increasing weight or reps over time. Control the eccentric portion of each rep for maximum muscle damage.";
    
    case "heavenly pact strength":
      return "Lift HEAVY! Rest 2-5 minutes between sets for full recovery. Focus on perfect form and full-body tension.";
    
    case "domain expansion shred":
    case "speed-type fighter":
      return "Keep rest periods short (30-60 seconds) to maintain elevated heart rate. Superset exercises when possible for maximum caloric burn.";
    
    default:
      return "";
  }
};

// Get a random Tren Twins style motivational quote
export const getRandomQuote = (): string => {
  return trenQuotes[Math.floor(Math.random() * trenQuotes.length)];
};
