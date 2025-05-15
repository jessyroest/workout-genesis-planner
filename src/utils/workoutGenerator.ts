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

// Generate different workout splits based on days per week and split preference
const generateWorkoutSplit = (daysPerWeek: number, bodySplit: BodySplit): { day: number; focus: MuscleGroup | MuscleGroup[] }[] => {
  // Zenin Style (Push/Pull/Legs)
  if (bodySplit === "zenin style") {
    const basePPL = [
      { focus: ["demonic chest", "shoulder domination", "arm control"] as MuscleGroup[] },  // Push
      { focus: ["titanic back", "arm control"] as MuscleGroup[] },               // Pull
      { focus: ["legs of steel", "core seal"] as MuscleGroup[] },                 // Legs
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
  
  // Inverted Spear Protocol (Upper/Lower)
  if (bodySplit === "inverted spear protocol") {
    const baseUL = [
      { focus: ["demonic chest", "titanic back", "shoulder domination", "arm control"] as MuscleGroup[] },  // Upper
      { focus: ["legs of steel", "core seal"] as MuscleGroup[] },                      // Lower
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
  
  // Domain Split (Bro Split - body part per day)
  if (bodySplit === "domain split") {
    const baseBroSplit = [
      { focus: "demonic chest" as MuscleGroup },
      { focus: "titanic back" as MuscleGroup },
      { focus: "shoulder domination" as MuscleGroup },
      { focus: "arm control" as MuscleGroup },
      { focus: "legs of steel" as MuscleGroup },
    ];
    
    // Add core and rest day for 6-7 day splits
    if (daysPerWeek >= 6) {
      baseBroSplit.push({ focus: "core seal" as MuscleGroup });
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
  
  // Full Body Curse Mastery
  if (bodySplit === "full body curse mastery") {
    const workoutSplit: { day: number; focus: MuscleGroup | MuscleGroup[] }[] = [];
    
    for (let i = 0; i < daysPerWeek; i++) {
      // Use different focus for variety but still full body
      const fullBodyFocus: MuscleGroup[] = ["demonic chest", "titanic back", "shoulder domination", "arm control", "legs of steel", "core seal"];
      
      workoutSplit.push({
        day: i + 1,
        focus: fullBodyFocus,
      });
    }
    
    return workoutSplit;
  }
  
  // Default to Zenin Style if something goes wrong
  return generateWorkoutSplit(daysPerWeek, "zenin style");
};

// Get an intensity technique based on experience level
const getIntensityTechnique = (experienceLevel: ExperienceLevel): IntensityTechnique | undefined => {
  if (experienceLevel === "grade 4") {
    return Math.random() > 0.7 ? "black flash" : undefined;
  }
  
  const techniques: IntensityTechnique[] = ["domain expansion", "black flash", "simple domain"];
  
  if (experienceLevel === "grade 1" || experienceLevel === "special grade") {
    techniques.push("maximum curse", "binding vow", "reversed curse", "hollow technique");
  }
  
  return techniques[Math.floor(Math.random() * techniques.length)];
};

// Function to generate workout notes based on goal
const generateWorkoutNotes = (goal: Goal, experienceLevel: ExperienceLevel): string => {
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
const getRandomQuote = (): string => {
  return trenQuotes[Math.floor(Math.random() * trenQuotes.length)];
};

// Main function to generate a workout plan
export const generateWorkoutPlan = (formData: FormData): WorkoutPlan => {
  const { goal, experienceLevel, daysPerWeek } = formData;
  const bodySplit = formData.bodySplit || "zenin style";
  const priorityMuscles = formData.priorityMuscles || [];
  const limitations = formData.limitations || [];
  
  const workoutSplit = generateWorkoutSplit(daysPerWeek, bodySplit);
  
  // Generate workout days
  const workoutDays: WorkoutDay[] = workoutSplit.map((day) => {
    const workoutSets: WorkoutSet[] = [];
    const { sets, reps, rest } = getSetsAndReps(goal, experienceLevel);
    
    // Handle different focus types (string or array)
    if (typeof day.focus === "string") {
      // For single muscle group focus
      const focusExercises = getExercisesFor(day.focus as MuscleGroup, experienceLevel, goal);
      const exerciseCount = experienceLevel === "grade 4" ? 2 : (experienceLevel === "grade 3" ? 3 : 4);
      
      // Get exercises for this muscle group - if none found, use any that match the muscle group
      const availableExercises = focusExercises.length > 0 ? focusExercises : exercises.filter(e => e.muscleGroup === day.focus);
      const selectedExercises = getRandomExercises(availableExercises, exerciseCount);
      
      // Check if this is a priority muscle group
      const isPriority = priorityMuscles.includes(day.focus);
      
      selectedExercises.forEach((exercise, i) => {
        // Add more sets for priority muscles or primary exercises
        const extraSets = isPriority ? 1 : 0;
        const primaryExercise = i === 0 ? 1 : 0; // Add extra sets for the first exercise
        
        // Add intensity techniques for intermediate and advanced lifters
        const intensityTechnique = experienceLevel !== "grade 4" && i === 0 ? getIntensityTechnique(experienceLevel) : undefined;
        
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
    } else {
      // For multiple muscle group focus
      (day.focus as MuscleGroup[]).forEach(muscleGroup => {
        const focusExercises = getExercisesFor(muscleGroup, experienceLevel, goal);
        const exerciseCount = experienceLevel === "grade 4" ? 1 : (experienceLevel === "grade 3" ? 2 : 2);
        
        // Handle potential empty exercise list
        const availableExercises = focusExercises.length > 0 ? focusExercises : exercises.filter(e => e.muscleGroup === muscleGroup);
        const selectedExercises = getRandomExercises(availableExercises, exerciseCount);
        
        // Check if this is a priority muscle
        const isPriority = priorityMuscles.includes(muscleGroup);
        
        selectedExercises.forEach((exercise, i) => {
          // Add more sets for priority muscles
          const extraSets = isPriority ? 1 : 0;
          
          // Add intensity techniques for intermediate and advanced lifters
          const intensityTechnique = experienceLevel !== "grade 4" && Math.random() > 0.6 ? getIntensityTechnique(experienceLevel) : undefined;
          
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
      quote: getRandomQuote(),
      name: `Day ${day.day}`,
      exercises: []
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
        moreIntenseSet.intensityTechnique = getIntensityTechnique(workoutPlan.experienceLevel as ExperienceLevel);
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
