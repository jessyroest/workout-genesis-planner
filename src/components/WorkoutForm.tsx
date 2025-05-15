
import { useState } from "react";
import { FormData, Goal, ExperienceLevel, MuscleGroup, BodySplit, CurseTechnique, SpiritAnimal, Playlist } from "../types/workout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, User, Calendar, CheckSquare, Activity, Dumbbell, Zap, Heart, Shield, Award, Timer, Sword } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MuscleVisualization from "./MuscleVisualization";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface WorkoutFormProps {
  onSubmit: (formData: FormData) => void;
}

const muscleOptions: { value: MuscleGroup; label: string }[] = [
  { value: "demonic chest", label: "Demonic Chest" },
  { value: "titanic back", label: "Titanic Back" },
  { value: "shoulder domination", label: "Shoulder Domination" },
  { value: "arm control", label: "Arm Control" },
  { value: "legs of steel", label: "Legs of Steel" },
  { value: "core seal", label: "Core Seal" },
  { value: "v-taper lats", label: "V-Taper Lats" },
  { value: "mountain traps", label: "Mountain Traps" },
  { value: "explosive glutes", label: "Explosive Glutes" },
  { value: "unshakeable calves", label: "Unshakeable Calves" },
  { value: "grip of a curse user", label: "Grip of a Curse User" },
  { value: "posture stabilizers", label: "Posture Stabilizers" },
  { value: "mobility and flexibility", label: "Mobility + Flexibility" },
  { value: "cardio conditioning", label: "Cardio Conditioning" },
  { value: "recovery and regeneration", label: "Recovery and Regeneration" }
];

// Define goals with icons and descriptions
const goalOptions = [
  { value: "cursed mass gain", icon: Dumbbell, label: "CURSED MASS GAIN", description: "Channel your cursed energy to build monstrous size" },
  { value: "domain expansion shred", icon: Flame, label: "DOMAIN EXPANSION SHRED", description: "Get insanely lean — like slicing through fat with Red" },
  { value: "heavenly pact strength", icon: Award, label: "HEAVENLY PACT STRENGTH", description: "Unlock raw, unstoppable brute power" },
  { value: "speed-type fighter", icon: Zap, label: "SPEED-TYPE FIGHTER", description: "Flash-step through enemies with high agility & explosiveness" },
  { value: "balanced sorcerer", icon: Activity, label: "BALANCED SORCERER", description: "Master technique, strength, AND endurance" },
  { value: "jujutsu athlete", icon: Sword, label: "JUJUTSU ATHLETE", description: "Train for real-world combat and functional performance" },
  { value: "reverse curse", icon: Heart, label: "REVERSE CURSE", description: "Restore your physical form and mobility" },
  { value: "cursed core rebuild", icon: Shield, label: "CURSED CORE REBUILD", description: "Master your body after setbacks or injuries" }
];

// Define experience levels with descriptions
const experienceLevels = [
  { value: "grade 4", label: "GRADE 4", description: "New to the world, still discovering your cursed techniques" },
  { value: "grade 3", label: "GRADE 3", description: "Getting stronger, beginning to learn your innate talent" },
  { value: "semi-grade 2", label: "SEMI-GRADE 2", description: "Solid foundation, working on mastery and discipline" },
  { value: "grade 2", label: "GRADE 2", description: "Seasoned, disciplined, and structured" },
  { value: "grade 1", label: "GRADE 1", description: "Elite among sorcerers — power meets wisdom" },
  { value: "special grade", label: "SPECIAL GRADE", description: "Limitless — strength forged by your own Domain" }
];

// Define body splits with descriptions
const bodySplits = [
  { value: "zenin style", label: "ZEN'IN STYLE", description: "Push / Pull / Legs – Classic and brutal" },
  { value: "inverted spear protocol", label: "INVERTED SPEAR PROTOCOL", description: "Upper / Lower with a cursed twist" },
  { value: "domain split", label: "DOMAIN SPLIT", description: "Bro split with hyperfocus — one zone at a time" },
  { value: "full body curse mastery", label: "FULL BODY CURSE MASTERY", description: "Train everything, every session, like Yuta" },
  { value: "binding vow phul", label: "BINDING VOW PHUL", description: "Power + Hypertrophy training" },
  { value: "jujutsu circuit combat", label: "JUJUTSU CIRCUIT COMBAT", description: "Athletic, explosive, and high tempo" },
  { value: "black flash rotation", label: "BLACK FLASH ROTATION", description: "Custom 3-day on/off rotation — high impact" },
  { value: "reverse cursed technique", label: "REVERSE CURSED TECHNIQUE", description: "Recovery + tension focused" },
  { value: "shikigami flow", label: "SHIKIGAMI FLOW", description: "Functional + bodyweight calisthenics" }
];

// Define curse technique styles
const curseTechniques = [
  { value: "close-range brute force", label: "CLOSE-RANGE BRUTE FORCE" },
  { value: "agile and ranged", label: "AGILE & RANGED", description: "like Inumaki or Mei Mei" },
  { value: "power and precision", label: "POWER & PRECISION", description: "like Nanami" },
  { value: "speed and finesse", label: "SPEED AND FINESSE", description: "like Maki" },
  { value: "flow-based sorcery", label: "FLOW-BASED SORCERY", description: "like Yuta or Todo" }
];

// Define spirit animals
const spiritAnimals = [
  { value: "panda", label: "PANDA", description: "for support + strength" },
  { value: "nue", label: "NUE", description: "for explosive speed" },
  { value: "divine dog", label: "DIVINE DOG", description: "discipline & tracking progress" },
  { value: "max elephant", label: "MAX ELEPHANT", description: "brutal hypertrophy phase" }
];

// Define playlists
const playlists = [
  { value: "sukuna's rage", label: "SUKUNA'S RAGE", description: "Heavy metal / trap" },
  { value: "gojo's calm", label: "GOJO'S CALM", description: "Lo-fi + progressive beats" },
  { value: "yuta's redemption", label: "YUTA'S REDEMPTION", description: "Emotional & epic orchestral" }
];

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    goal: "cursed mass gain",
    experienceLevel: "grade 4",
    daysPerWeek: 4,
    bodySplit: "zenin style",
    priorityMuscles: [],
    limitations: "",
    curseStyle: "close-range brute force",
    spiritAnimal: "panda",
    playlist: "sukuna's rage"
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
      <h2 className="text-5xl font-black text-center mb-6 uppercase tracking-tight text-blue-500 animate-pulse">
        FORGE YOUR JUJUTSU SORCERER PATH
      </h2>
      
      <div className="mb-6">
        <div className="h-1 bg-blue-600 w-full"></div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8 bg-black p-6 border-2 border-blue-600 rounded-lg">
        {/* Fitness Goal Selection */}
        <div>
          <h3 className="text-2xl font-bold mb-3 uppercase text-white">👊 WHAT TYPE OF SORCERER DO YOU WANT TO BECOME?</h3>
          <Tabs
            defaultValue={formData.goal}
            className="w-full"
            onValueChange={(value) => setFormData({
              ...formData,
              goal: value as Goal
            })}
          >
            <TabsList className="grid grid-cols-2 lg:grid-cols-4 bg-gray-900 h-auto">
              {goalOptions.slice(0, 4).map(option => (
                <TabsTrigger 
                  key={option.value}
                  value={option.value} 
                  className="flex flex-col py-6 px-2 items-center gap-2 font-bold text-lg h-full data-[state=active]:bg-blue-600"
                  onClick={() => playAudio("/audio/you-gotta-lift-heavy-bro.mp3")}
                >
                  <option.icon className="h-8 w-8" />
                  <span className="uppercase text-center text-sm">{option.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="mt-2">
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 bg-gray-900 h-auto">
                {goalOptions.slice(4).map(option => (
                  <TabsTrigger 
                    key={option.value}
                    value={option.value} 
                    className="flex flex-col py-6 px-2 items-center gap-2 font-bold text-lg h-full data-[state=active]:bg-blue-600"
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
          <h3 className="text-2xl font-bold mb-3 uppercase text-white">🧠 YOUR SORCERER RANK (EXPERIENCE LEVEL)</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {experienceLevels.map((level) => (
              <Card 
                key={level.value}
                className={`cursor-pointer transition-all border-2 ${
                  formData.experienceLevel === level.value 
                    ? 'border-blue-600 bg-blue-900/30' 
                    : 'border-gray-700 hover:border-blue-600/50 bg-gray-900'
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
          <h3 className="text-2xl font-bold mb-3 uppercase text-white">⚔️ YOUR TRAINING STYLE (FIGHTING STYLE SPLIT)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {bodySplits.map((split) => (
              <Card 
                key={split.value}
                className={`cursor-pointer transition-all border-2 ${
                  formData.bodySplit === split.value 
                    ? 'border-blue-600 bg-blue-900/30' 
                    : 'border-gray-700 hover:border-blue-600/50 bg-gray-900'
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
          <h3 className="text-2xl font-bold mb-3 uppercase text-white">📆 CURSED ENERGY AVAILABILITY (TRAINING DAYS PER WEEK)</h3>
          <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
            {[
              {days: 1, label: "Nanami in office mode"},
              {days: 2, label: "Low curse exposure"},
              {days: 3, label: "Beginner discipline"},
              {days: 4, label: "High sorcerer potential"},
              {days: 5, label: "Grade 2 consistency"},
              {days: 6, label: "Grade 1 daily refinement"},
              {days: 7, label: "Special grade obsession"},
              {days: 2, label: "Gojo-level ambition (2x/day)"},
              {days: 4, label: "Nomadic like Toji"}
            ].map((option, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all border-2 ${
                  formData.daysPerWeek === option.days && index !== 7 && index !== 8
                    ? 'border-blue-600 bg-blue-900/30' 
                    : 'border-gray-700 hover:border-blue-600/50 bg-gray-900'
                }`}
                onClick={() => {
                  setFormData({
                    ...formData,
                    daysPerWeek: option.days
                  });
                }}
              >
                <CardContent className="flex flex-col items-center justify-center p-2">
                  <Calendar className="h-5 w-5 mb-1" />
                  <p className="font-bold text-center text-xs">{option.days}x</p>
                  <p className="text-xs text-gray-400 text-center truncate">{option.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Priority Muscle Groups */}
        <div>
          <h3 className="text-2xl font-bold mb-3 uppercase text-white">🎯 TARGETED CURSED ZONES (MUSCLE GROUP FOCUS)</h3>
          
          {/* 3D Muscle Visualization */}
          <div className="mb-6">
            <MuscleVisualization priorityMuscles={formData.priorityMuscles} />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {muscleOptions.map((muscle) => {
              const isChecked = formData.priorityMuscles.includes(muscle.value);
              return (
                <div 
                  key={muscle.value}
                  className={`flex items-center space-x-2 p-3 border-2 rounded-md cursor-pointer ${
                    isChecked 
                      ? 'border-blue-600 bg-blue-900/30 shadow-[0_0_15px_rgba(59,130,246,0.7)]' 
                      : 'border-gray-700 hover:border-blue-600/50 bg-gray-900'
                  } transition-all duration-200`}
                  onClick={() => togglePriorityMuscle(muscle.value)}
                >
                  <div className="flex-shrink-0">
                    <Checkbox 
                      id={`muscle-${muscle.value}`}
                      checked={isChecked}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      // Removing onCheckedChange to prevent double state updates
                    />
                  </div>
                  <Label 
                    htmlFor={`muscle-${muscle.value}`}
                    className="font-medium cursor-pointer uppercase text-xs"
                  >
                    {muscle.label}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bonus JJK Elements */}
        <div>
          <h3 className="text-2xl font-bold mb-3 uppercase text-white">🔥 BONUS ADDITIONS</h3>
          
          {/* Curse Technique Style */}
          <div className="mb-6">
            <h4 className="text-lg font-bold mb-2">Curse Technique Style:</h4>
            <RadioGroup 
              defaultValue={formData.curseStyle} 
              onValueChange={(value) => setFormData({...formData, curseStyle: value})}
              className="grid grid-cols-2 md:grid-cols-5 gap-2"
            >
              {curseTechniques.map((technique) => (
                <div key={technique.value} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={technique.value} 
                    id={technique.value}
                    className="text-blue-600"
                  />
                  <Label htmlFor={technique.value} className="cursor-pointer text-sm">
                    {technique.label} 
                    {technique.description && <span className="text-xs text-gray-400 block">{technique.description}</span>}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          {/* Spirit Animal */}
          <div className="mb-6">
            <h4 className="text-lg font-bold mb-2">Training Spirit Animal / Partner:</h4>
            <RadioGroup 
              defaultValue={formData.spiritAnimal} 
              onValueChange={(value) => setFormData({...formData, spiritAnimal: value})}
              className="grid grid-cols-2 md:grid-cols-4 gap-2"
            >
              {spiritAnimals.map((animal) => (
                <div key={animal.value} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={animal.value} 
                    id={animal.value}
                    className="text-blue-600"
                  />
                  <Label htmlFor={animal.value} className="cursor-pointer text-sm">
                    {animal.label} 
                    <span className="text-xs text-gray-400 block">{animal.description}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          {/* Playlist */}
          <div className="mb-6">
            <h4 className="text-lg font-bold mb-2">Playlist Curse Boosters:</h4>
            <RadioGroup 
              defaultValue={formData.playlist} 
              onValueChange={(value) => setFormData({...formData, playlist: value})}
              className="grid grid-cols-1 md:grid-cols-3 gap-2"
            >
              {playlists.map((playlist) => (
                <div key={playlist.value} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={playlist.value} 
                    id={playlist.value}
                    className="text-blue-600"
                  />
                  <Label htmlFor={playlist.value} className="cursor-pointer text-sm">
                    {playlist.label} 
                    <span className="text-xs text-gray-400 block">{playlist.description}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* Injuries/Limitations */}
        <div>
          <h3 className="text-2xl font-bold mb-3 uppercase text-white">ANY CURSED LIMITATIONS OR INJURIES?</h3>
          <Textarea 
            placeholder="e.g., Incomplete domain, cursed energy problems, physical limitations..."
            className="bg-gray-900 border-gray-700 focus:border-blue-600 h-24"
            value={formData.limitations}
            onChange={(e) => setFormData({...formData, limitations: e.target.value})}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full py-8 text-2xl bg-blue-600 hover:bg-blue-700 border-2 border-white font-black tracking-wider uppercase"
          onClick={() => playAudio("/audio/lightweight-baby.mp3")}
        >
          FORGE MY JUJUTSU PATH
        </Button>
      </form>
    </div>
  );
};

export default WorkoutForm;
