
import { Exercise, Goal, ExperienceLevel, MuscleGroup } from "../types/workout";

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
    name: "Incline Smith Machine Press",
    muscleGroup: "chest",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain", "strength"],
    description: "A machine-guided chest press that hits the upper pecs with maximum stability."
  },
  {
    name: "Plate-Loaded Chest Press",
    muscleGroup: "chest",
    experience: ["intermediate", "advanced"],
    goals: ["muscle gain", "strength"],
    description: "A heavy compound movement for maximum chest recruitment and pump."
  },
  {
    name: "Dumbbell Flys",
    muscleGroup: "chest",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "An isolation exercise that focuses on chest contraction and stretching the pecs."
  },
  {
    name: "Weighted Dips",
    muscleGroup: "chest",
    experience: ["intermediate", "advanced"],
    goals: ["muscle gain", "strength"],
    description: "A bodyweight+ exercise that hits lower chest, triceps, and shoulders."
  },
  {
    name: "Cable Crossovers",
    muscleGroup: "chest",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain", "shredding"],
    description: "Perfect for peak contractions and maximum chest isolation."
  },
  
  // Back Exercises
  {
    name: "Deadlift",
    muscleGroup: "back",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain", "strength"],
    description: "The king of all exercises. Builds total body strength and thickness."
  },
  {
    name: "Barbell Rows",
    muscleGroup: "back",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain", "strength"],
    description: "A classic mass-builder for a thick, dense back."
  },
  {
    name: "Meadows Row",
    muscleGroup: "back",
    experience: ["intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "An advanced unilateral rowing variation for maximum lat engagement."
  },
  {
    name: "Weighted Pull-Ups",
    muscleGroup: "back",
    experience: ["intermediate", "advanced"],
    goals: ["muscle gain", "strength", "shredding"],
    description: "The ultimate test of strength-to-weight ratio for back development."
  },
  {
    name: "Rack Pulls",
    muscleGroup: "back",
    experience: ["intermediate", "advanced"],
    goals: ["muscle gain", "strength"],
    description: "A heavy partial deadlift variation for traps and upper back."
  },
  {
    name: "Lat Prayer Pull",
    muscleGroup: "back",
    experience: ["intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "An intense isolation exercise for maximum lat stretch and contraction."
  },
  
  // Shoulder Exercises
  {
    name: "Overhead Press",
    muscleGroup: "shoulders",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain", "strength"],
    description: "The fundamental overhead pressing movement for shoulder mass and strength."
  },
  {
    name: "Cable Lateral Raise",
    muscleGroup: "shoulders",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain", "shredding"],
    description: "Constant tension lateral raises for capped delts."
  },
  {
    name: "Machine Shoulder Press",
    muscleGroup: "shoulders",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "A controlled pressing movement for safely handling heavy weight."
  },
  {
    name: "Behind-the-Back Upright Row",
    muscleGroup: "shoulders",
    experience: ["intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "A unique variation that reduces wrist strain and hits the side delts hard."
  },
  {
    name: "Face Pulls",
    muscleGroup: "shoulders",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain", "strength"],
    description: "Essential for rear delt development and shoulder health."
  },
  
  // Arm Exercises
  {
    name: "Preacher Curls",
    muscleGroup: "biceps",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "Strict isolation exercise for maximum bicep peak development."
  },
  {
    name: "Cross-Body Hammer Curls",
    muscleGroup: "biceps",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "Hits the brachialis and forearms while focusing on the biceps."
  },
  {
    name: "Spider Curls",
    muscleGroup: "biceps",
    experience: ["intermediate", "advanced"],
    goals: ["muscle gain", "shredding"],
    description: "Maximum contraction at peak position for detailed bicep development."
  },
  {
    name: "Skull Crushers",
    muscleGroup: "triceps",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "The classic tricep mass builder that targets all three heads."
  },
  {
    name: "Cable Pushdowns",
    muscleGroup: "triceps",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain", "shredding"],
    description: "Great isolation movement for constant tension on the triceps."
  },
  {
    name: "Close-Grip Bench Press",
    muscleGroup: "triceps",
    experience: ["intermediate", "advanced"],
    goals: ["muscle gain", "strength"],
    description: "Heavy compound movement primarily for tricep mass and strength."
  },
  
  // Leg Exercises
  {
    name: "Safety Bar Squats",
    muscleGroup: "legs",
    experience: ["intermediate", "advanced"],
    goals: ["muscle gain", "strength"],
    description: "A squat variation that's easier on the shoulders while hitting the quads hard."
  },
  {
    name: "Bulgarian Split Squats",
    muscleGroup: "legs",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain", "strength", "shredding"],
    description: "Brutal unilateral exercise for quad development and stability."
  },
  {
    name: "Reverse Hack Squat",
    muscleGroup: "legs",
    experience: ["intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "Machine-based squat variation for quad isolation and growth."
  },
  {
    name: "Hip Thrusts",
    muscleGroup: "glutes",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain", "strength"],
    description: "The premier glute-building exercise for maximum activation."
  },
  {
    name: "Romanian Deadlift",
    muscleGroup: "hamstrings",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain", "strength"],
    description: "Targets the posterior chain, especially the hamstrings."
  },
  {
    name: "Leg Press",
    muscleGroup: "quads",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "Heavy quad-dominant exercise for leg mass."
  },
  {
    name: "Standing Calf Raise",
    muscleGroup: "calves",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "Targets the gastrocnemius for calf development."
  },
  {
    name: "Seated Calf Raise",
    muscleGroup: "calves",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "Focuses on the soleus muscle for complete calf development."
  },
  
  // Core Exercises
  {
    name: "Ab Rollouts",
    muscleGroup: "abs",
    experience: ["intermediate", "advanced"],
    goals: ["strength", "shredding"],
    description: "One of the most challenging and effective core exercises."
  },
  {
    name: "Weighted Planks",
    muscleGroup: "core",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["strength", "shredding"],
    description: "Builds core stability and endurance with added resistance."
  },
  {
    name: "Cable Crunches",
    muscleGroup: "abs",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain", "shredding"],
    description: "High-tension abdominal exercise for muscle development."
  },
  {
    name: "Hanging Leg Raises",
    muscleGroup: "abs",
    experience: ["intermediate", "advanced"],
    goals: ["strength", "shredding"],
    description: "Advanced core movement that engages the entire abdominal wall."
  },
  
  // Specialized Training
  {
    name: "Neck Curls",
    muscleGroup: "neck",
    experience: ["intermediate", "advanced"],
    goals: ["muscle gain", "strength"],
    description: "Targeted exercise for neck hypertrophy and strength."
  },
  {
    name: "Plate Pinches",
    muscleGroup: "grip",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["strength"],
    description: "Isometric hold for finger and grip strength development."
  },
  {
    name: "Farmers Carries",
    muscleGroup: "grip",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["strength", "muscle gain"],
    description: "Functional exercise that builds forearm and grip strength while challenging core stability."
  },
  {
    name: "Shrugs",
    muscleGroup: "traps",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "Isolation exercise specifically for trapezius development."
  },
  {
    name: "Wrist Curls",
    muscleGroup: "forearms",
    experience: ["beginner", "intermediate", "advanced"],
    goals: ["muscle gain"],
    description: "Isolation exercise for forearm flexor development."
  }
];

export const trenQuotes = [
  "YOU GOTTA LIFT HEAVY TO GET BIG!",
  "EAT LIKE A BEAST, TRAIN LIKE A SAVAGE!",
  "GO HARD OR GO HOME, NO HALF REPS!",
  "THE PAIN YOU FEEL TODAY WILL BE THE STRENGTH YOU FEEL TOMORROW!",
  "IF IT DOESN'T CHALLENGE YOU, IT WON'T CHANGE YOU!",
  "YOUR BODY CAN STAND ALMOST ANYTHING, IT'S YOUR MIND YOU HAVE TO CONVINCE!",
  "DON'T COUNT THE REPS, MAKE THE REPS COUNT!",
  "SHOCK THE MUSCLE, GROW THE MUSCLE!",
  "NOBODY CARES ABOUT YOUR EXCUSES, JUST YOUR RESULTS!",
  "THE WEIGHTS DON'T LIFT THEMSELVES!",
  "WHAT SEEMS IMPOSSIBLE TODAY WILL SOON BECOME YOUR WARM-UP!",
  "YOUR ONLY LIMIT IS YOUR MIND!",
  "EMBRACE THE SUFFERING!",
  "TRAIN INSANE OR REMAIN THE SAME!"
];

export const audioClips = [
  "/audio/lightweight-baby.mp3",
  "/audio/you-gotta-lift-heavy-bro.mp3"
];
