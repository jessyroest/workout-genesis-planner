
import { 
  Exercise, 
  ExperienceLevel, 
  FormData, 
  Goal, 
  MuscleGroup, 
  WorkoutDay, 
  WorkoutPlan, 
  BodySplit
} from "../types/workout";
import { generateWorkoutSplit } from "./workoutSplitUtils";
import { getExercisesFor, getRandomExercises } from "./exerciseUtils";
import { getSetsAndReps, getIntensityTechnique } from "./intensityUtils";
import { generateWorkoutNotes, getRandomQuote } from "./workoutTextUtils";

// Main function to generate a workout plan
export const generateWorkoutPlan = (formData: FormData): WorkoutPlan => {
  const { goal, experienceLevel, daysPerWeek } = formData;
  const bodySplit = formData.bodySplit || "zenin style";
  const priorityMuscles = formData.priorityMuscles || [];
  const limitations = formData.limitations || [];
  
  const workoutSplit = generateWorkoutSplit(daysPerWeek, bodySplit);
  
  // Generate workout days
  const workoutDays: WorkoutDay[] = workoutSplit.map((day) => {
    const workoutSets: any[] = [];
    const { sets, reps, rest } = getSetsAndReps(goal, experienceLevel);
    
    // Handle different focus types (string or array)
    if (typeof day.focus === "string") {
      // For single muscle group focus
      const focusExercises = getExercisesFor(day.focus as MuscleGroup, experienceLevel, goal);
      const exerciseCount = experienceLevel === "grade 4" ? 2 : (experienceLevel === "grade 3" ? 3 : 4);
      
      // Get exercises for this muscle group - if none found, use any that match the muscle group
      const availableExercises = focusExercises.length > 0 ? focusExercises : [];
      const selectedExercises = getRandomExercises(availableExercises, exerciseCount);
      
      // Check if this is a priority muscle group
      const isPriority = priorityMuscles.includes(day.focus as MuscleGroup);
      
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
        const availableExercises = focusExercises.length > 0 ? focusExercises : [];
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
