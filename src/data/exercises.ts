
import { Exercise, Goal, ExperienceLevel, MuscleGroup, IntensityTechnique } from "../types/workout";

export const exercises: Exercise[] = [
  // Chest Exercises
  {
    name: "Bench Press",
    muscleGroup: "demonic chest",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain", "heavenly pact strength"],
    description: "The classic chest-building exercise that targets the pectoral muscles and triceps."
  },
  {
    name: "Incline Smith Machine Press",
    muscleGroup: "demonic chest",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain", "heavenly pact strength"],
    description: "A machine-guided chest press that hits the upper pecs with maximum stability."
  },
  {
    name: "Plate-Loaded Chest Press",
    muscleGroup: "demonic chest",
    experience: ["grade 3", "grade 2"],
    goals: ["cursed mass gain", "heavenly pact strength"],
    description: "A heavy compound movement for maximum chest recruitment and pump."
  },
  {
    name: "Dumbbell Flys",
    muscleGroup: "demonic chest",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain"],
    description: "An isolation exercise that focuses on chest contraction and stretching the pecs."
  },
  {
    name: "Weighted Dips",
    muscleGroup: "demonic chest",
    experience: ["grade 3", "grade 2"],
    goals: ["cursed mass gain", "heavenly pact strength"],
    description: "A bodyweight+ exercise that hits lower chest, triceps, and shoulders."
  },
  {
    name: "Cable Crossovers",
    muscleGroup: "demonic chest",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain", "domain expansion shred"],
    description: "Perfect for peak contractions and maximum chest isolation."
  },
  
  // Back Exercises
  {
    name: "Deadlift",
    muscleGroup: "titanic back",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain", "heavenly pact strength"],
    description: "The king of all exercises. Builds total body strength and thickness."
  },
  {
    name: "Barbell Rows",
    muscleGroup: "titanic back",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain", "heavenly pact strength"],
    description: "A classic mass-builder for a thick, dense back."
  },
  {
    name: "Meadows Row",
    muscleGroup: "titanic back",
    experience: ["grade 3", "grade 2"],
    goals: ["cursed mass gain"],
    description: "An advanced unilateral rowing variation for maximum lat engagement."
  },
  {
    name: "Weighted Pull-Ups",
    muscleGroup: "titanic back",
    experience: ["grade 3", "grade 2"],
    goals: ["cursed mass gain", "heavenly pact strength", "domain expansion shred"],
    description: "The ultimate test of strength-to-weight ratio for back development."
  },
  {
    name: "Rack Pulls",
    muscleGroup: "titanic back",
    experience: ["grade 3", "grade 2"],
    goals: ["cursed mass gain", "heavenly pact strength"],
    description: "A heavy partial deadlift variation for traps and upper back."
  },
  {
    name: "Lat Prayer Pull",
    muscleGroup: "titanic back",
    experience: ["grade 3", "grade 2"],
    goals: ["cursed mass gain"],
    description: "An intense isolation exercise for maximum lat stretch and contraction."
  },
  
  // Shoulder Exercises
  {
    name: "Overhead Press",
    muscleGroup: "shoulder domination",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain", "heavenly pact strength"],
    description: "The fundamental overhead pressing movement for shoulder mass and strength."
  },
  {
    name: "Cable Lateral Raise",
    muscleGroup: "shoulder domination",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain", "domain expansion shred"],
    description: "Constant tension lateral raises for capped delts."
  },
  {
    name: "Machine Shoulder Press",
    muscleGroup: "shoulder domination",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain"],
    description: "A controlled pressing movement for safely handling heavy weight."
  },
  {
    name: "Behind-the-Back Upright Row",
    muscleGroup: "shoulder domination",
    experience: ["grade 3", "grade 2"],
    goals: ["cursed mass gain"],
    description: "A unique variation that reduces wrist strain and hits the side delts hard."
  },
  {
    name: "Face Pulls",
    muscleGroup: "shoulder domination",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain", "heavenly pact strength"],
    description: "Essential for rear delt development and shoulder health."
  },
  
  // Arm Exercises - Converting to use the proper muscle groups
  {
    name: "Preacher Curls",
    muscleGroup: "arm control",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain"],
    description: "Strict isolation exercise for maximum bicep peak development."
  },
  {
    name: "Cross-Body Hammer Curls",
    muscleGroup: "arm control",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain"],
    description: "Hits the brachialis and forearms while focusing on the biceps."
  },
  {
    name: "Spider Curls",
    muscleGroup: "arm control",
    experience: ["grade 3", "grade 2"],
    goals: ["cursed mass gain", "domain expansion shred"],
    description: "Maximum contraction at peak position for detailed bicep development."
  },
  {
    name: "Skull Crushers",
    muscleGroup: "arm control",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain"],
    description: "The classic tricep mass builder that targets all three heads."
  },
  {
    name: "Cable Pushdowns",
    muscleGroup: "arm control",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain", "domain expansion shred"],
    description: "Great isolation movement for constant tension on the triceps."
  },
  {
    name: "Close-Grip Bench Press",
    muscleGroup: "arm control",
    experience: ["grade 3", "grade 2"],
    goals: ["cursed mass gain", "heavenly pact strength"],
    description: "Heavy compound movement primarily for tricep mass and strength."
  },
  
  // Leg Exercises
  {
    name: "Safety Bar Squats",
    muscleGroup: "legs of steel",
    experience: ["grade 3", "grade 2"],
    goals: ["cursed mass gain", "heavenly pact strength"],
    description: "A squat variation that's easier on the shoulders while hitting the quads hard."
  },
  {
    name: "Bulgarian Split Squats",
    muscleGroup: "legs of steel",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain", "heavenly pact strength", "domain expansion shred"],
    description: "Brutal unilateral exercise for quad development and stability."
  },
  {
    name: "Reverse Hack Squat",
    muscleGroup: "legs of steel",
    experience: ["grade 3", "grade 2"],
    goals: ["cursed mass gain"],
    description: "Machine-based squat variation for quad isolation and growth."
  },
  {
    name: "Hip Thrusts",
    muscleGroup: "explosive glutes",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain", "heavenly pact strength"],
    description: "The premier glute-building exercise for maximum activation."
  },
  {
    name: "Romanian Deadlift",
    muscleGroup: "legs of steel",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain", "heavenly pact strength"],
    description: "Targets the posterior chain, especially the hamstrings."
  },
  {
    name: "Leg Press",
    muscleGroup: "legs of steel",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain"],
    description: "Heavy quad-dominant exercise for leg mass."
  },
  {
    name: "Standing Calf Raise",
    muscleGroup: "unshakeable calves",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain"],
    description: "Targets the gastrocnemius for calf development."
  },
  {
    name: "Seated Calf Raise",
    muscleGroup: "unshakeable calves",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain"],
    description: "Focuses on the soleus muscle for complete calf development."
  },
  
  // Core Exercises
  {
    name: "Ab Rollouts",
    muscleGroup: "core seal",
    experience: ["grade 3", "grade 2"],
    goals: ["heavenly pact strength", "domain expansion shred"],
    description: "One of the most challenging and effective core exercises."
  },
  {
    name: "Weighted Planks",
    muscleGroup: "core seal",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["heavenly pact strength", "domain expansion shred"],
    description: "Builds core stability and endurance with added resistance."
  },
  {
    name: "Cable Crunches",
    muscleGroup: "core seal",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain", "domain expansion shred"],
    description: "High-tension abdominal exercise for muscle development."
  },
  {
    name: "Hanging Leg Raises",
    muscleGroup: "core seal",
    experience: ["grade 3", "grade 2"],
    goals: ["heavenly pact strength", "domain expansion shred"],
    description: "Advanced core movement that engages the entire abdominal wall."
  },
  
  // Specialized Training
  {
    name: "Neck Curls",
    muscleGroup: "posture stabilizers",
    experience: ["grade 3", "grade 2"],
    goals: ["cursed mass gain", "heavenly pact strength"],
    description: "Targeted exercise for neck hypertrophy and strength."
  },
  {
    name: "Plate Pinches",
    muscleGroup: "grip of a curse user",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["heavenly pact strength"],
    description: "Isometric hold for finger and grip strength development."
  },
  {
    name: "Farmers Carries",
    muscleGroup: "grip of a curse user",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["heavenly pact strength", "cursed mass gain"],
    description: "Functional exercise that builds forearm and grip strength while challenging core stability."
  },
  {
    name: "Shrugs",
    muscleGroup: "mountain traps",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain"],
    description: "Isolation exercise specifically for trapezius development."
  },
  {
    name: "Wrist Curls",
    muscleGroup: "grip of a curse user",
    experience: ["grade 4", "grade 3", "grade 2"],
    goals: ["cursed mass gain"],
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
