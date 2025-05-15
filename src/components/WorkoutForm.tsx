
import { useState } from "react";
import { FormData, Goal, ExperienceLevel, MuscleGroup, BodySplit } from "../types/workout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Flame, User, Calendar, CheckSquare, X, Zap, Heart, Timer, Award, Activity } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MuscleVisualization from "./MuscleVisualization";

interface WorkoutFormProps {
  onSubmit: (formData: FormData) => void;
}

const muscleOptions: { value: MuscleGroup; label: string }[] = [
  { value: "chest", label: "Chest" },
  { value: "back", label: "Back" },
  { value: "shoulders", label: "Shoulders" },
  { value: "arms", label: "Arms" },
  { value: "legs", label: "Legs" },
  { value: "core", label: "Core" },
  { value: "biceps", label: "Biceps" },
  { value: "triceps", label: "Triceps" },
  { value: "calves", label: "Calves" },
  { value: "traps", label: "Traps" },
  { value: "lats", label: "Lats" },
  { value: "glutes", label: "Glutes" },
  { value: "forearms", label: "Forearms" },
  { value: "neck", label: "Neck" },
  { value: "hamstrings", label: "Hamstrings" },
  { value: "quads", label: "Quads" },
  { value: "abs", label: "Abs" }
];

// Define goals with icons and descriptions
const goalOptions = [
  { value: "muscle gain", icon: Dumbbell, label: "MASS BUILDER", description: "Build serious size and muscle density" },
  { value: "shredding", icon: Flame, label: "GET SHREDDED", description: "Lose fat while maintaining muscle definition" },
  { value: "strength", icon: Award, label: "PURE STRENGTH", description: "Maximize your lifts and raw strength output" },
  { value: "athletic performance", icon: Zap, label: "ATHLETIC PERFORMANCE", description: "Train for speed, agility, and endurance" },
  { value: "body recomposition", icon: Activity, label: "BODY RECOMP", description: "Build muscle and lose fat simultaneously" },
  { value: "improve conditioning", icon: Timer, label: "CONDITIONING", description: "Boost stamina and cardiovascular health" },
  { value: "powerbuilding", icon: Award, label: "POWERBUILDING", description: "Mix of strength and size goals" },
  { value: "endurance training", icon: Activity, label: "ENDURANCE", description: "Focus on long-term stamina" },
  { value: "aesthetic physique", icon: Heart, label: "AESTHETICS", description: "Train for symmetry and proportions" },
  { value: "rehabilitation", icon: Activity, label: "REHAB/MOBILITY", description: "Recover from injury, improve movement" }
];

// Define experience levels with descriptions
const experienceLevels = [
  { value: "beginner", label: "BEGINNER", description: "0-6 months of consistent training" },
  { value: "lower intermediate", label: "LOWER INTERMEDIATE", description: "6-12 months, still learning" },
  { value: "intermediate", label: "INTERMEDIATE", description: "1-2 years of serious training" },
  { value: "upper intermediate", label: "UPPER INTERMEDIATE", description: "2-3 years, consistent" },
  { value: "advanced", label: "ADVANCED", description: "3+ years with structure" },
  { value: "elite", label: "ELITE", description: "Competitive level training" }
];

// Define body splits with descriptions
const bodySplits = [
  { value: "push/pull/legs", label: "PUSH/PULL/LEGS", description: "3-6 day rotation focusing on movement patterns" },
  { value: "upper/lower", label: "UPPER/LOWER", description: "Split between upper and lower body workouts" },
  { value: "bro split", label: "BRO SPLIT", description: "1 muscle group per day" },
  { value: "full body", label: "FULL BODY", description: "Train the entire body each workout" },
  { value: "phul", label: "PHUL", description: "Power Hypertrophy Upper Lower" },
  { value: "phat", label: "PHAT", description: "Power Hypertrophy Adaptive Training" },
  { value: "5x5", label: "5×5 STRENGTH", description: "Focus on compound lifts for strength" },
  { value: "calisthenics", label: "CALISTHENICS", description: "Bodyweight training focus" },
  { value: "hybrid", label: "HYBRID", description: "Mix of strength, hypertrophy & conditioning" },
  { value: "custom", label: "CUSTOM", description: "Customized rotational split" }
];

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    goal: "muscle gain",
    experienceLevel: "beginner",
    daysPerWeek: 4,
    bodySplit: "push/pull/legs",
    priorityMuscles: [],
    limitations: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const togglePriorityMuscle = (muscle: MuscleGroup) => {
    setFormData(prev => {
      if (prev.priorityMuscles.includes(muscle)) {
        return {
          ...prev,
          priorityMuscles: prev.priorityMuscles.filter(m => m !== muscle)
        };
      } else {
        return {
          ...prev,
          priorityMuscles: [...prev.priorityMuscles, muscle]
        };
      }
    });
  };

  // Audio effect
  const playAudio = (clip: string) => {
    const audio = new Audio(clip);
    audio.play();
  };

  return (
    <div className="max-w-3xl w-full mx-auto bg-black text-white">
      <h2 className="text-5xl font-black text-center mb-6 uppercase tracking-tight text-red-600 animate-pulse">
        BUILD YOUR BEAST MODE PLAN
      </h2>
      
      <div className="mb-6">
        <div className="h-1 bg-red-600 w-full"></div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8 bg-black p-6 border-2 border-red-600 rounded-lg">
        {/* Fitness Goal Selection */}
        <div>
          <h3 className="text-2xl font-bold mb-3 uppercase text-white">💪 WHAT'S YOUR GOAL, BEAST?</h3>
          <Tabs
            defaultValue={formData.goal}
            className="w-full"
            onValueChange={(value) => setFormData({
              ...formData,
              goal: value as Goal
            })}
          >
            <TabsList className="grid grid-cols-2 lg:grid-cols-5 bg-gray-900 h-auto">
              {goalOptions.slice(0, 5).map(option => (
                <TabsTrigger 
                  key={option.value}
                  value={option.value} 
                  className="flex flex-col py-6 px-2 items-center gap-2 font-bold text-lg h-full data-[state=active]:bg-red-600"
                  onClick={() => playAudio("/audio/you-gotta-lift-heavy-bro.mp3")}
                >
                  <option.icon className="h-8 w-8" />
                  <span className="uppercase text-center text-sm">{option.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="mt-2">
              <TabsList className="grid grid-cols-2 lg:grid-cols-5 bg-gray-900 h-auto">
                {goalOptions.slice(5).map(option => (
                  <TabsTrigger 
                    key={option.value}
                    value={option.value} 
                    className="flex flex-col py-6 px-2 items-center gap-2 font-bold text-lg h-full data-[state=active]:bg-red-600"
                    onClick={() => playAudio("/audio/lightweight-baby.mp3")}
                  >
                    <option.icon className="h-8 w-8" />
                    <span className="uppercase text-center text-sm">{option.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-400">
              {goalOptions.find(g => g.value === formData.goal)?.description}
            </div>
          </Tabs>
        </div>

        {/* Experience Level Selection */}
        <div>
          <h3 className="text-2xl font-bold mb-3 uppercase text-white">🧠 EXPERIENCE LEVEL</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {experienceLevels.map((level) => (
              <Card 
                key={level.value}
                className={`cursor-pointer transition-all border-2 ${
                  formData.experienceLevel === level.value 
                    ? 'border-red-600 bg-red-900/30' 
                    : 'border-gray-700 hover:border-red-600/50 bg-gray-900'
                }`}
                onClick={() => setFormData({
                  ...formData,
                  experienceLevel: level.value as ExperienceLevel
                })}
              >
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <p className="font-bold uppercase text-xl mt-2">{level.label}</p>
                  <p className="text-xs text-gray-400 mt-1 text-center">{level.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Body Split Selection */}
        <div>
          <h3 className="text-2xl font-bold mb-3 uppercase text-white">🔄 TRAINING SPLIT</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {bodySplits.map((split) => (
              <Card 
                key={split.value}
                className={`cursor-pointer transition-all border-2 ${
                  formData.bodySplit === split.value 
                    ? 'border-red-600 bg-red-900/30' 
                    : 'border-gray-700 hover:border-red-600/50 bg-gray-900'
                }`}
                onClick={() => setFormData({
                  ...formData,
                  bodySplit: split.value as BodySplit
                })}
              >
                <CardContent className="flex flex-col items-center justify-center p-3">
                  <p className="font-bold uppercase text-sm text-center">{split.label}</p>
                  <p className="text-xs text-gray-400 mt-1 text-center">{split.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Days Per Week Selection */}
        <div>
          <h3 className="text-2xl font-bold mb-3 uppercase text-white">🗓️ HOW MANY DAYS CAN YOU TRAIN?</h3>
          <div className="grid grid-cols-9 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, "2x", "Flex"].map((days, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all border-2 ${
                  (typeof days === 'number' && formData.daysPerWeek === days) 
                    ? 'border-red-600 bg-red-900/30' 
                    : 'border-gray-700 hover:border-red-600/50 bg-gray-900'
                }`}
                onClick={() => {
                  if (typeof days === 'number') {
                    setFormData({
                      ...formData,
                      daysPerWeek: days
                    });
                  } else {
                    // Handle special cases (default to 4 days for now)
                    setFormData({
                      ...formData,
                      daysPerWeek: 4
                    });
                  }
                }}
              >
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <Calendar className="h-5 w-5 mb-1" />
                  <p className="font-bold">{days}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Priority Muscle Groups */}
        <div>
          <h3 className="text-2xl font-bold mb-3 uppercase text-white">🏆 PRIORITY MUSCLE GROUPS</h3>
          
          {/* 3D Muscle Visualization */}
          <div className="mb-6">
            <MuscleVisualization priorityMuscles={formData.priorityMuscles} />
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {muscleOptions.map((muscle) => {
              const isChecked = formData.priorityMuscles.includes(muscle.value);
              return (
                <div 
                  key={muscle.value}
                  className={`flex items-center space-x-2 p-3 border-2 rounded-md cursor-pointer ${
                    isChecked 
                      ? 'border-red-600 bg-red-900/30 shadow-[0_0_15px_rgba(239,68,68,0.7)]' 
                      : 'border-gray-700 hover:border-red-600/50 bg-gray-900'
                  } transition-all duration-200`}
                  onClick={() => togglePriorityMuscle(muscle.value)}
                >
                  <div className="flex-shrink-0">
                    <Checkbox 
                      id={`muscle-${muscle.value}`}
                      checked={isChecked}
                      className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                      // Don't use onCheckedChange here to avoid conflicting state updates
                      // The state change is handled in the parent div's onClick
                    />
                  </div>
                  <Label 
                    htmlFor={`muscle-${muscle.value}`}
                    className="font-medium cursor-pointer uppercase"
                  >
                    {muscle.label}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Injuries/Limitations */}
        <div>
          <h3 className="text-2xl font-bold mb-3 uppercase text-white">ANY INJURIES OR LIMITATIONS?</h3>
          <Textarea 
            placeholder="e.g., Shoulder pain, knee issues, etc."
            className="bg-gray-900 border-gray-700 focus:border-red-600 h-24"
            value={formData.limitations}
            onChange={(e) => setFormData({...formData, limitations: e.target.value})}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full py-8 text-2xl bg-red-600 hover:bg-red-700 border-2 border-white font-black tracking-wider uppercase"
          onClick={() => playAudio("/audio/lightweight-baby.mp3")}
        >
          BUILD MY BEAST MODE PLAN
        </Button>
      </form>
    </div>
  );
};

export default WorkoutForm;
