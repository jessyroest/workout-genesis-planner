
import { useState } from "react";
import { FormData, Goal, ExperienceLevel, MuscleGroup, BodySplit } from "../types/workout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Flame, User, Calendar, CheckSquare, X } from "lucide-react";
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
  { value: "glutes", label: "Glutes" }
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
          <h3 className="text-2xl font-bold mb-3 uppercase text-white">WHAT'S YOUR GOAL, BEAST?</h3>
          <Tabs
            defaultValue={formData.goal}
            className="w-full"
            onValueChange={(value) => setFormData({
              ...formData,
              goal: value as Goal
            })}
          >
            <TabsList className="grid w-full grid-cols-3 bg-gray-900 h-auto">
              <TabsTrigger 
                value="muscle gain" 
                className="flex flex-col py-6 px-2 items-center gap-2 font-bold text-lg h-full data-[state=active]:bg-red-600"
                onClick={() => playAudio("/audio/you-gotta-lift-heavy-bro.mp3")}
              >
                <Dumbbell className="h-8 w-8" />
                <span className="uppercase">MASS BUILDER</span>
              </TabsTrigger>
              <TabsTrigger 
                value="shredding" 
                className="flex flex-col py-6 px-2 items-center gap-2 font-bold text-lg h-full data-[state=active]:bg-red-600"
                onClick={() => playAudio("/audio/lightweight-baby.mp3")}
              >
                <Flame className="h-8 w-8" />
                <span className="uppercase">GET SHREDDED</span>
              </TabsTrigger>
              <TabsTrigger 
                value="strength" 
                className="flex flex-col py-6 px-2 items-center gap-2 font-bold text-lg h-full data-[state=active]:bg-red-600"
              >
                <User className="h-8 w-8" />
                <span className="uppercase">PURE STRENGTH</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Experience Level Selection */}
        <div>
          <h3 className="text-2xl font-bold mb-3 uppercase text-white">EXPERIENCE LEVEL</h3>
          <div className="grid grid-cols-3 gap-4">
            {["beginner", "intermediate", "advanced"].map((level) => (
              <Card 
                key={level}
                className={`cursor-pointer transition-all border-2 ${
                  formData.experienceLevel === level 
                    ? 'border-red-600 bg-red-900/30' 
                    : 'border-gray-700 hover:border-red-600/50 bg-gray-900'
                }`}
                onClick={() => setFormData({
                  ...formData,
                  experienceLevel: level as ExperienceLevel
                })}
              >
                <CardContent className="flex items-center justify-center p-6">
                  <p className="font-bold uppercase text-xl">{level}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Body Split Selection */}
        <div>
          <h3 className="text-2xl font-bold mb-3 uppercase text-white">TRAINING SPLIT</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "push/pull/legs", label: "PUSH/PULL/LEGS" },
              { value: "upper/lower", label: "UPPER/LOWER" },
              { value: "bro split", label: "BRO SPLIT" },
              { value: "full body", label: "FULL BODY" }
            ].map((split) => (
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
                <CardContent className="flex items-center justify-center p-6">
                  <p className="font-bold uppercase text-xl">{split.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Days Per Week Selection */}
        <div>
          <h3 className="text-2xl font-bold mb-3 uppercase text-white">HOW MANY DAYS CAN YOU TRAIN?</h3>
          <div className="grid grid-cols-7 gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((days) => (
              <Card 
                key={days}
                className={`cursor-pointer transition-all border-2 ${
                  formData.daysPerWeek === days 
                    ? 'border-red-600 bg-red-900/30' 
                    : 'border-gray-700 hover:border-red-600/50 bg-gray-900'
                }`}
                onClick={() => setFormData({
                  ...formData,
                  daysPerWeek: days
                })}
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
          <h3 className="text-2xl font-bold mb-3 uppercase text-white">PRIORITY MUSCLE GROUPS</h3>
          
          {/* 3D Muscle Visualization */}
          <div className="mb-6">
            <MuscleVisualization priorityMuscles={formData.priorityMuscles} />
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {muscleOptions.map((muscle) => (
              <div 
                key={muscle.value}
                className={`flex items-center space-x-2 p-3 border-2 rounded-md cursor-pointer ${
                  formData.priorityMuscles.includes(muscle.value) 
                    ? 'border-red-600 bg-red-900/30 shadow-[0_0_15px_rgba(239,68,68,0.7)]' 
                    : 'border-gray-700 hover:border-red-600/50 bg-gray-900'
                } transition-all duration-200`}
                onClick={() => togglePriorityMuscle(muscle.value)}
              >
                <Checkbox 
                  id={`muscle-${muscle.value}`}
                  checked={formData.priorityMuscles.includes(muscle.value)} 
                  onCheckedChange={() => togglePriorityMuscle(muscle.value)}
                  className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                />
                <Label 
                  htmlFor={`muscle-${muscle.value}`}
                  className="font-medium cursor-pointer uppercase"
                >
                  {muscle.label}
                </Label>
              </div>
            ))}
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
