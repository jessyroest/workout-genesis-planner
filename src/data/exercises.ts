
import { Exercise, Goal, ExperienceLevel } from "../types/workout";

export const exercises: Exercise[] = [
  // Chest Exercises
  {
    name: "Bench Press",
    muscleGroup: "chest",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain", "strength"],
    description: "The classic chest-building exercise that targets the pectoral muscles and triceps."
  },
  {
    name: "Push-Ups",
    muscleGroup: "chest",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain", "fat loss"],
    description: "A bodyweight exercise that works the chest, shoulders, and triceps."
  },
  {
    name: "Incline Dumbbell Press",
    muscleGroup: "chest",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain", "strength"],
    description: "Targets the upper chest muscles for balanced development."
  },
  {
    name: "Cable Fly",
    muscleGroup: "chest",
    experience: ["intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "Isolates the chest muscles through a full range of motion."
  },
  
  // Back Exercises
  {
    name: "Pull-Ups",
    muscleGroup: "back",
    experience: ["intermediate", "advanced"],
    goals: ["muscle gain", "strength"],
    description: "One of the best exercises for building a strong back and biceps."
  },
  {
    name: "Lat Pulldown",
    muscleGroup: "back",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "Targets the latissimus dorsi muscles of the back."
  },
  {
    name: "Bent-Over Rows",
    muscleGroup: "back",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain", "strength"],
    description: "Builds thickness in the middle back and lats."
  },
  {
    name: "Deadlift",
    muscleGroup: "back",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain", "strength"],
    description: "A compound exercise that builds overall strength and muscle mass."
  },
  
  // Shoulder Exercises
  {
    name: "Overhead Press",
    muscleGroup: "shoulders",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain", "strength"],
    description: "Builds strong, well-developed shoulders and upper body strength."
  },
  {
    name: "Lateral Raises",
    muscleGroup: "shoulders",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "Isolates the side deltoids for broader shoulders."
  },
  {
    name: "Face Pulls",
    muscleGroup: "shoulders",
    experience: ["intermediate", "advanced"],
    goals: ["muscle gain", "strength"],
    description: "Targets the rear deltoids and upper back for balanced development."
  },
  {
    name: "Shrugs",
    muscleGroup: "shoulders",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "Builds the trapezius muscles for a strong-looking upper body."
  },
  
  // Leg Exercises
  {
    name: "Squats",
    muscleGroup: "legs",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain", "strength", "fat loss"],
    description: "The king of leg exercises that builds overall lower body strength and size."
  },
  {
    name: "Leg Press",
    muscleGroup: "legs",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "Allows for heavy loading of the quadriceps, hamstrings and glutes."
  },
  {
    name: "Romanian Deadlift",
    muscleGroup: "legs",
    experience: ["intermediate", "advanced"],
    goals: ["muscle gain", "strength"],
    description: "Targets the hamstrings and glutes while strengthening the lower back."
  },
  {
    name: "Lunges",
    muscleGroup: "legs",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain", "fat loss"],
    description: "Builds unilateral leg strength, balance, and coordination."
  },
  
  // Arm Exercises
  {
    name: "Bicep Curls",
    muscleGroup: "arms",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "Directly targets the biceps for arm development."
  },
  {
    name: "Tricep Pushdowns",
    muscleGroup: "arms",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "Isolates the triceps for arm definition and size."
  },
  {
    name: "Skull Crushers",
    muscleGroup: "arms",
    experience: ["intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "Effectively targets the triceps for growth."
  },
  {
    name: "Hammer Curls",
    muscleGroup: "arms",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "Targets the biceps and forearms for balanced arm development."
  },
  
  // Core Exercises
  {
    name: "Plank",
    muscleGroup: "core",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["strength", "fat loss"],
    description: "Builds core stability and endurance."
  },
  {
    name: "Russian Twists",
    muscleGroup: "core",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["strength", "fat loss"],
    description: "Works the obliques and rotational strength."
  },
  {
    name: "Hanging Leg Raises",
    muscleGroup: "core",
    experience: ["intermediate", "advanced"],
    goals: ["strength", "fat loss"],
    description: "Challenges the lower abs and hip flexors."
  },
  {
    name: "Ab Wheel Rollout",
    muscleGroup: "core",
    experience: ["intermediate", "advanced"],
    goals: ["strength"],
    description: "One of the most challenging and effective core exercises."
  },
  
  // Full Body Exercises
  {
    name: "Burpees",
    muscleGroup: "full body",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["fat loss"],
    description: "A high-intensity exercise that works the entire body and elevates heart rate."
  },
  {
    name: "Kettlebell Swings",
    muscleGroup: "full body",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["fat loss", "strength"],
    description: "Builds power, conditions the body, and burns calories."
  },
  {
    name: "Turkish Get-Up",
    muscleGroup: "full body",
    experience: ["intermediate", "advanced"],
    goals: ["strength"],
    description: "A complex movement that builds total-body coordination and strength."
  },
  {
    name: "Mountain Climbers",
    muscleGroup: "full body",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["fat loss"],
    description: "A dynamic exercise that builds core strength and cardiovascular fitness."
  }
];
