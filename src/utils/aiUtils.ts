
import { Goal, ExperienceLevel } from "../types/workout";

// Motivational quotes based on user goals
const muscleGainQuotes = [
  "Pain is weakness leaving the body, gains are coming in!",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "The muscle grows through the night, not through the workout.",
  "Forget the glass ceiling, we're building muscle walls!",
  "When you feel like quitting, remember why you started.",
  "No pain. No gain. It's that simple.",
  "You don't find willpower, you create it."
];

const fatLossQuotes = [
  "Weight loss is not a physical challenge, it's a mental one.",
  "Sweat is just fat crying.",
  "Your body hears everything your mind says.",
  "The hardest lift of all is lifting your butt off the couch.",
  "It's not about having time, it's about making time.",
  "The only bad workout is the one that didn't happen.",
  "You're only one workout away from a good mood."
];

const strengthQuotes = [
  "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
  "Being strong is never a weakness.",
  "Strong people are harder to kill.",
  "If it doesn't challenge you, it won't change you.",
  "Your mind will quit 100 times before your body does.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "The iron never lies."
];

const animeQuotes = [
  "It's not about how hard you can hit; it's about how hard you can get hit and keep moving forward.",
  "The moment you think of giving up, think of the reason why you held on so long.",
  "To be stronger means to be greater than the version of yourself from yesterday.",
  "Don't give up, there's no shame in falling down! True shame is to not stand up again!",
  "Power comes in response to a need, not a desire.",
  "It's not a question of can or can't. Some things in life you just do.",
  "The world isn't perfect. But it's there for us, doing the best it can. That's what makes it so damn beautiful."
];

// AI recommendations based on user goal and experience
export const getMotivationalQuote = (goal: Goal, theme: "anime" | "regular" = "anime"): string => {
  const quotesList = theme === "anime" ? animeQuotes : 
    goal === "muscleGain" || goal === "cursed mass gain" ? muscleGainQuotes :
    goal === "fatLoss" || goal === "domain expansion shred" ? fatLossQuotes :
    strengthQuotes;
    
  return quotesList[Math.floor(Math.random() * quotesList.length)];
};

export const getWorkoutRecommendation = (
  goal: Goal,
  experienceLevel: ExperienceLevel,
  metric?: string,
  value?: number
): string => {
  // Base recommendations by goal
  if (goal === "muscleGain" || goal === "cursed mass gain") {
    if (metric === "protein" && value && value < 100) {
      return "Your protein intake is lower than optimal. Aim for 1.6-2.2g per kg of bodyweight to maximize muscle growth.";
    }
    
    if (experienceLevel === "beginner" || experienceLevel === "grade 4") {
      return "Focus on compound lifts (squats, deadlifts, bench press) and progressive overload. Eat in a slight caloric surplus.";
    } else {
      return "Consider implementing periodization in your training. Alternate between hypertrophy and strength phases for optimal gains.";
    }
  } else if (goal === "fatLoss" || goal === "domain expansion shred") {
    if (metric === "sleep" && value && value < 7) {
      return "Inadequate sleep can stall fat loss. Aim for 7-9 hours per night to optimize metabolism and recovery.";
    }
    
    if (experienceLevel === "beginner" || experienceLevel === "grade 4") {
      return "Prioritize a modest caloric deficit (300-500 calories) while maintaining protein intake to preserve muscle mass.";
    } else {
      return "Consider carb cycling or intermittent fasting to break through plateaus. Keep strength training to preserve muscle.";
    }
  } else {
    return "Keep consistent with your workouts and nutrition. Small improvements over time lead to significant progress.";
  }
};

export const getMealSuggestion = (
  goal: Goal,
  mealType: "breakfast" | "lunch" | "dinner" | "snack"
): string => {
  if (goal === "muscleGain" || goal === "cursed mass gain") {
    switch (mealType) {
      case "breakfast":
        return "Protein oatmeal with banana and peanut butter, 3 whole eggs, and a glass of milk.";
      case "lunch": 
        return "Chicken breast (8oz), 1 cup of rice, mixed vegetables, and avocado.";
      case "dinner":
        return "Steak (8oz), sweet potato, broccoli, and olive oil.";
      case "snack":
        return "Greek yogurt with honey and berries, or a protein shake with a banana.";
    }
  } else if (goal === "fatLoss" || goal === "domain expansion shred") {
    switch (mealType) {
      case "breakfast":
        return "Egg white omelet with spinach and bell peppers, and a slice of whole grain toast.";
      case "lunch": 
        return "Grilled chicken salad with mixed greens, cherry tomatoes, and balsamic vinaigrette.";
      case "dinner":
        return "Baked salmon, steamed asparagus, and cauliflower rice.";
      case "snack":
        return "Celery sticks with hummus, or a small apple with 1 tbsp of almond butter.";
    }
  } else {
    switch (mealType) {
      case "breakfast":
        return "Whole eggs with whole grain toast, avocado, and fruit.";
      case "lunch": 
        return "Turkey or chicken wrap with whole grain wrap, lettuce, tomato, and hummus.";
      case "dinner":
        return "Lean protein (chicken, fish, or tofu), quinoa, and roasted vegetables.";
      case "snack":
        return "Mixed nuts, fruit, or protein smoothie with spinach.";
    }
  }
};

// Format to minutes:seconds for display
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};
