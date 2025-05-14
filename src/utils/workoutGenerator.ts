
import { exercises } from "../data/exercises";
import { 
  Exercise, 
  ExperienceLevel, 
  FormData, 
  Goal, 
  MuscleGroup, 
  WorkoutDay, 
  WorkoutPlan, 
  WorkoutSet
} from "../types/workout";

// Helper function to get exercises by muscle group, experience level, and goal
const getExercisesFor = (muscleGroup: MuscleGroup, experienceLevel: ExperienceLevel, goal: Goal): Exercise[] => {
  return exercises.filter(
    (exercise) => 
      exercise.muscleGroup === muscleGroup && 
      exercise.experience.includes(experienceLevel) && 
      exercise.goals.includes(goal)
  );
};

// Helper function to get random exercises from a list
const getRandomExercises = (exerciseList: Exercise[], count: number): Exercise[] => {
  const shuffled = [...exerciseList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Helper function to determine sets and reps based on goal and experience
const getSetsAndReps = (goal: Goal, experienceLevel: ExperienceLevel): { sets: number; reps: string; rest: number } => {
  switch(goal) {
    case "muscle gain":
      if (experienceLevel === "beginner") return { sets: 3, reps: "8-12", rest: 60 };
      if (experienceLevel === "intermediate") return { sets: 4, reps: "8-12", rest: 90 };
      return { sets: 5, reps: "8-12", rest: 90 };
    
    case "strength":
      if (experienceLevel === "beginner") return { sets: 3, reps: "5-8", rest: 120 };
      if (experienceLevel === "intermediate") return { sets: 4, reps: "3-6", rest: 180 };
      return { sets: 5, reps: "1-5", rest: 240 };
    
    case "fat loss":
      if (experienceLevel === "beginner") return { sets: 3, reps: "12-15", rest: 30 };
      if (experienceLevel === "intermediate") return { sets: 3, reps: "15-20", rest: 45 };
      return { sets: 4, reps: "15-20", rest: 45 };
    
    default:
      return { sets: 3, reps: "8-12", rest: 60 };
  }
};

// Generate different workout splits based on days per week
const generateWorkoutSplit = (daysPerWeek: number): { day: number; focus: MuscleGroup | MuscleGroup[] }[] => {
  switch(daysPerWeek) {
    case 1:
      return [{ day: 1, focus: "full body" }];
    
    case 2:
      return [
        { day: 1, focus: ["chest", "back", "shoulders"] },
        { day: 2, focus: ["legs", "arms", "core"] }
      ];
    
    case 3:
      return [
        { day: 1, focus: ["chest", "shoulders", "triceps"] },
        { day: 2, focus: ["back", "biceps"] },
        { day: 3, focus: ["legs", "core"] }
      ];
    
    case 4:
      return [
        { day: 1, focus: "chest" },
        { day: 2, focus: "back" },
        { day: 3, focus: ["shoulders", "arms"] },
        { day: 4, focus: ["legs", "core"] }
      ];
    
    case 5:
      return [
        { day: 1, focus: "chest" },
        { day: 2, focus: "back" },
        { day: 3, focus: "shoulders" },
        { day: 4, focus: ["arms", "core"] },
        { day: 5, focus: "legs" }
      ];
    
    case 6:
      return [
        { day: 1, focus: "chest" },
        { day: 2, focus: "back" },
        { day: 3, focus: "shoulders" },
        { day: 4, focus: "arms" },
        { day: 5, focus: "legs" },
        { day: 6, focus: "core" }
      ];
    
    case 7:
      return [
        { day: 1, focus: "chest" },
        { day: 2, focus: "back" },
        { day: 3, focus: "shoulders" },
        { day: 4, focus: "arms" },
        { day: 5, focus: "legs" },
        { day: 6, focus: "core" },
        { day: 7, focus: "full body" }
      ];
    
    default:
      return [{ day: 1, focus: "full body" }];
  }
};

// Function to generate workout notes based on goal
const generateWorkoutNotes = (goal: Goal, experienceLevel: ExperienceLevel): string => {
  switch(goal) {
    case "muscle gain":
      return "Focus on progressive overload by increasing weight or reps over time. Rest 1-2 minutes between sets.";
    
    case "strength":
      return "Focus on lifting heavy with proper form. Rest 2-5 minutes between sets for full recovery.";
    
    case "fat loss":
      return "Keep rest periods short (30-60 seconds) to maintain elevated heart rate. Consider adding cardio after your workout.";
    
    default:
      return "";
  }
};

// Main function to generate a workout plan
export const generateWorkoutPlan = (formData: FormData): WorkoutPlan => {
  const { goal, experienceLevel, daysPerWeek } = formData;
  const workoutSplit = generateWorkoutSplit(daysPerWeek);
  
  // Generate workout days
  const workoutDays: WorkoutDay[] = workoutSplit.map((day) => {
    const workoutSets: WorkoutSet[] = [];
    const { sets, reps, rest } = getSetsAndReps(goal, experienceLevel);
    
    // Handle different focus types (string or array)
    if (typeof day.focus === "string") {
      // For single muscle group focus
      const focusExercises = getExercisesFor(day.focus as MuscleGroup, experienceLevel, goal);
      const exerciseCount = day.focus === "full body" ? 1 : (experienceLevel === "beginner" ? 2 : 3);
      
      // Get exercises for this muscle group
      const selectedExercises = getRandomExercises(focusExercises.length > 0 ? focusExercises : exercises.filter(e => e.muscleGroup === day.focus), exerciseCount);
      
      selectedExercises.forEach(exercise => {
        workoutSets.push({
          exercise,
          sets,
          reps,
          rest
        });
      });

      if (day.focus === "full body") {
        // Add exercises for major muscle groups for a full body day
        const muscleGroups: MuscleGroup[] = ["chest", "back", "shoulders", "legs", "arms", "core"];
        muscleGroups.forEach(group => {
          const groupExercises = getExercisesFor(group, experienceLevel, goal);
          const exercise = getRandomExercises(groupExercises.length > 0 ? groupExercises : exercises.filter(e => e.muscleGroup === group), 1)[0];
          if (exercise) {
            workoutSets.push({
              exercise,
              sets,
              reps,
              rest
            });
          }
        });
      }
    } else {
      // For multiple muscle group focus
      (day.focus as MuscleGroup[]).forEach(muscleGroup => {
        const focusExercises = getExercisesFor(muscleGroup, experienceLevel, goal);
        const exerciseCount = experienceLevel === "beginner" ? 1 : 2;
        
        const selectedExercises = getRandomExercises(focusExercises.length > 0 ? focusExercises : exercises.filter(e => e.muscleGroup === muscleGroup), exerciseCount);
        
        selectedExercises.forEach(exercise => {
          workoutSets.push({
            exercise,
            sets,
            reps,
            rest
          });
        });
      });
    }

    return {
      day: day.day,
      focus: day.focus,
      workoutSets,
      notes: generateWorkoutNotes(goal, experienceLevel)
    };
  });

  return {
    goal,
    experienceLevel,
    daysPerWeek,
    workoutDays
  };
};
