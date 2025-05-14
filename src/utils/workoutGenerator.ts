
import { exercises, trenQuotes } from "../data/exercises";
import { 
  Exercise, 
  ExperienceLevel, 
  FormData, 
  Goal, 
  MuscleGroup, 
  WorkoutDay, 
  WorkoutPlan, 
  WorkoutSet,
  BodySplit,
  IntensityTechnique
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
      return { sets: 5, reps: "2-5", rest: 240 };
    
    case "shredding":
    case "fat loss":
      if (experienceLevel === "beginner") return { sets: 3, reps: "12-15", rest: 30 };
      if (experienceLevel === "intermediate") return { sets: 3, reps: "15-20", rest: 45 };
      return { sets: 4, reps: "15-20", rest: 30 };
    
    default:
      return { sets: 3, reps: "8-12", rest: 60 };
  }
};

// Generate different workout splits based on days per week and split preference
const generateWorkoutSplit = (daysPerWeek: number, bodySplit: BodySplit): { day: number; focus: MuscleGroup | MuscleGroup[] }[] => {
  // Push/Pull/Legs Split
  if (bodySplit === "push/pull/legs") {
    const basePPL = [
      { focus: ["chest", "shoulders", "triceps"] as MuscleGroup[] },  // Push
      { focus: ["back", "biceps"] as MuscleGroup[] },               // Pull
      { focus: ["legs", "core"] as MuscleGroup[] },                 // Legs
    ];
    
    // Add days based on frequency
    const workoutSplit: { day: number; focus: MuscleGroup | MuscleGroup[] }[] = [];
    
    for (let i = 0; i < daysPerWeek; i++) {
      workoutSplit.push({
        day: i + 1,
        focus: basePPL[i % 3].focus,
      });
    }
    
    return workoutSplit;
  }
  
  // Upper/Lower Split
  if (bodySplit === "upper/lower") {
    const baseUL = [
      { focus: ["chest", "back", "shoulders", "arms"] as MuscleGroup[] },  // Upper
      { focus: ["legs", "core"] as MuscleGroup[] },                      // Lower
    ];
    
    const workoutSplit: { day: number; focus: MuscleGroup | MuscleGroup[] }[] = [];
    
    for (let i = 0; i < daysPerWeek; i++) {
      workoutSplit.push({
        day: i + 1,
        focus: baseUL[i % 2].focus,
      });
    }
    
    return workoutSplit;
  }
  
  // Bro Split (body part per day)
  if (bodySplit === "bro split") {
    const baseBroSplit = [
      { focus: "chest" as MuscleGroup },
      { focus: "back" as MuscleGroup },
      { focus: "shoulders" as MuscleGroup },
      { focus: "arms" as MuscleGroup },
      { focus: "legs" as MuscleGroup },
    ];
    
    // Add core and rest day for 6-7 day splits
    if (daysPerWeek >= 6) {
      baseBroSplit.push({ focus: "core" as MuscleGroup });
    }
    
    const workoutSplit: { day: number; focus: MuscleGroup | MuscleGroup[] }[] = [];
    
    for (let i = 0; i < daysPerWeek; i++) {
      workoutSplit.push({
        day: i + 1,
        focus: baseBroSplit[i % baseBroSplit.length].focus,
      });
    }
    
    return workoutSplit;
  }
  
  // Full Body
  if (bodySplit === "full body") {
    const workoutSplit: { day: number; focus: MuscleGroup | MuscleGroup[] }[] = [];
    
    for (let i = 0; i < daysPerWeek; i++) {
      workoutSplit.push({
        day: i + 1,
        focus: "full body" as MuscleGroup,
      });
    }
    
    return workoutSplit;
  }
  
  // Default to PPL if something goes wrong
  return generateWorkoutSplit(daysPerWeek, "push/pull/legs");
};

// Get an intensity technique based on experience level
const getIntensityTechnique = (experienceLevel: ExperienceLevel): IntensityTechnique | undefined => {
  if (experienceLevel === "beginner") {
    return Math.random() > 0.7 ? "superset" : undefined;
  }
  
  const techniques: IntensityTechnique[] = ["drop set", "superset", "rest-pause"];
  
  if (experienceLevel === "advanced") {
    techniques.push("forced reps", "negative reps", "partials", "giant set");
  }
  
  return techniques[Math.floor(Math.random() * techniques.length)];
};

// Function to generate workout notes based on goal
const generateWorkoutNotes = (goal: Goal, experienceLevel: ExperienceLevel): string => {
  switch(goal) {
    case "muscle gain":
      return "Focus on progressive overload by increasing weight or reps over time. Control the eccentric portion of each rep for maximum muscle damage.";
    
    case "strength":
      return "Lift HEAVY! Rest 2-5 minutes between sets for full recovery. Focus on perfect form and full-body tension.";
    
    case "fat loss":
    case "shredding":
      return "Keep rest periods short (30-60 seconds) to maintain elevated heart rate. Superset exercises when possible for maximum caloric burn.";
    
    default:
      return "";
  }
};

// Get a random Tren Twins style motivational quote
const getRandomQuote = (): string => {
  return trenQuotes[Math.floor(Math.random() * trenQuotes.length)];
};

// Main function to generate a workout plan
export const generateWorkoutPlan = (formData: FormData): WorkoutPlan => {
  const { goal, experienceLevel, daysPerWeek, bodySplit, priorityMuscles, limitations } = formData;
  const workoutSplit = generateWorkoutSplit(daysPerWeek, bodySplit);
  
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
      
      // Check if this is a priority muscle group
      const isPriority = priorityMuscles.includes(day.focus);
      
      selectedExercises.forEach((exercise, i) => {
        // Add more sets for priority muscles or primary exercises
        const extraSets = isPriority ? 1 : 0;
        const primaryExercise = i === 0 ? 1 : 0; // Add extra sets for the first exercise
        
        // Add intensity techniques for intermediate and advanced lifters
        const intensityTechnique = experienceLevel !== "beginner" && i === 0 ? getIntensityTechnique(experienceLevel) : undefined;
        
        workoutSets.push({
          exercise: {
            ...exercise,
            isPriority
          },
          sets: sets + extraSets + primaryExercise,
          reps,
          rest,
          intensityTechnique
        });
      });

      if (day.focus === "full body") {
        // Add exercises for major muscle groups for a full body day
        const muscleGroups: MuscleGroup[] = ["chest", "back", "shoulders", "legs", "arms", "core"];
        muscleGroups.forEach(group => {
          const groupExercises = getExercisesFor(group, experienceLevel, goal);
          const exercise = getRandomExercises(groupExercises.length > 0 ? groupExercises : exercises.filter(e => e.muscleGroup === group), 1)[0];
          
          // Check if this is a priority muscle
          const isPriority = priorityMuscles.includes(group);
          
          // Add more sets for priority muscles
          const extraSets = isPriority ? 1 : 0;
          
          // Add intensity techniques for some exercises
          const intensityTechnique = Math.random() > 0.7 ? getIntensityTechnique(experienceLevel) : undefined;
          
          if (exercise) {
            workoutSets.push({
              exercise: {
                ...exercise,
                isPriority
              },
              sets: sets + extraSets,
              reps,
              rest,
              intensityTechnique
            });
          }
        });
      }
    } else {
      // For multiple muscle group focus
      (day.focus as MuscleGroup[]).forEach(muscleGroup => {
        const focusExercises = getExercisesFor(muscleGroup, experienceLevel, goal);
        const exerciseCount = experienceLevel === "beginner" ? 1 : (experienceLevel === "intermediate" ? 2 : 3);
        
        const selectedExercises = getRandomExercises(focusExercises.length > 0 ? focusExercises : exercises.filter(e => e.muscleGroup === muscleGroup), exerciseCount);
        
        // Check if this is a priority muscle
        const isPriority = priorityMuscles.includes(muscleGroup);
        
        selectedExercises.forEach((exercise, i) => {
          // Add more sets for priority muscles
          const extraSets = isPriority ? 1 : 0;
          
          // Add intensity techniques for intermediate and advanced lifters
          const intensityTechnique = experienceLevel !== "beginner" && Math.random() > 0.6 ? getIntensityTechnique(experienceLevel) : undefined;
          
          workoutSets.push({
            exercise: {
              ...exercise,
              isPriority
            },
            sets: sets + extraSets,
            reps,
            rest,
            intensityTechnique
          });
        });
      });
    }

    return {
      day: day.day,
      focus: day.focus,
      workoutSets,
      notes: generateWorkoutNotes(goal, experienceLevel),
      quote: getRandomQuote()
    };
  });

  return {
    goal,
    experienceLevel,
    daysPerWeek,
    bodySplit,
    priorityMuscles,
    limitations,
    workoutDays
  };
};

// Function to make a workout more intense (for the "Not Hardcore Enough" button)
export const makeWorkoutMoreIntense = (workoutPlan: WorkoutPlan): WorkoutPlan => {
  const { workoutDays } = workoutPlan;
  
  const moreIntenseDays = workoutDays.map(day => {
    const intenseSets = day.workoutSets.map(set => {
      // Add more sets and/or intensity techniques
      const moreIntenseSet = { 
        ...set,
        sets: set.sets + 1, // Add one more set
      };
      
      // Add an intensity technique if none exists
      if (!set.intensityTechnique) {
        moreIntenseSet.intensityTechnique = getIntensityTechnique(workoutPlan.experienceLevel);
      }
      
      return moreIntenseSet;
    });
    
    return {
      ...day,
      workoutSets: intenseSets,
      quote: "GO HARDER! NO PAIN, NO GAIN! LIGHTWEIGHT BABY!",
    };
  });
  
  return {
    ...workoutPlan,
    workoutDays: moreIntenseDays
  };
};
