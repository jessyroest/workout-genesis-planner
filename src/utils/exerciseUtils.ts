
import { exercises } from "../data/exercises";
import { Exercise, ExperienceLevel, Goal, MuscleGroup } from "../types/workout";

// Helper function to get exercises by muscle group, experience level, and goal
export const getExercisesFor = (muscleGroup: MuscleGroup, experienceLevel: ExperienceLevel, goal: Goal): Exercise[] => {
  return exercises.filter(
    (exercise) => 
      exercise.muscleGroup === muscleGroup && 
      exercise.experience.includes(experienceLevel) && 
      exercise.goals.includes(goal)
  );
};

// Helper function to get random exercises from a list
export const getRandomExercises = (exerciseList: Exercise[], count: number): Exercise[] => {
  const shuffled = [...exerciseList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
};
