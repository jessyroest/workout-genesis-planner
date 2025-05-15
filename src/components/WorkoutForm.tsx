
import { useState } from "react";
import { FormData, Goal, ExperienceLevel, CurseTechnique, SpiritAnimal, Playlist } from "../types/workout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

interface WorkoutFormProps {
  onSubmit: (data: FormData) => void;
}

const WorkoutForm = ({ onSubmit }: WorkoutFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    goal: "muscleGain",
    experienceLevel: "beginner",
    curseTechnique: "domain",
    daysPerWeek: 3,
    spiritAnimal: "gorilla",
    playlist: "metal",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoalChange = (value: Goal) => {
    setFormData((prev) => ({ ...prev, goal: value }));
  };

  const handleExperienceChange = (value: ExperienceLevel) => {
    setFormData((prev) => ({ ...prev, experienceLevel: value }));
  };

  const handleDaysPerWeekChange = (days: number) => {
    setFormData((prev) => ({ ...prev, daysPerWeek: days }));
  };

  const handleCurseTechniqueChange = (value: CurseTechnique) => {
    setFormData((prev) => ({ ...prev, curseTechnique: value }));
  };

  const handleSpiritAnimalChange = (value: SpiritAnimal) => {
    setFormData((prev) => ({ ...prev, spiritAnimal: value }));
  };

  const handlePlaylistChange = (value: Playlist) => {
    setFormData((prev) => ({ ...prev, playlist: value }));
  };

  // Animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <motion.div variants={item} className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            {/* Goal section */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white flex items-center">
                <span className="mr-2 text-purple-400 text-2xl">🎯</span> TRAINING GOAL
              </h3>
              <p className="text-gray-400 text-sm">Select your primary objective</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <GoalCard
                  goal="muscleGain"
                  title="Gain Muscle"
                  description="Build size & strength"
                  selected={formData.goal === "muscleGain"}
                  onClick={handleGoalChange}
                />
                <GoalCard
                  goal="fatLoss"
                  title="Fat Loss"
                  description="Shed weight & define"
                  selected={formData.goal === "fatLoss"}
                  onClick={handleGoalChange}
                />
                <GoalCard
                  goal="strength"
                  title="Strength"
                  description="Max power output"
                  selected={formData.goal === "strength"}
                  onClick={handleGoalChange}
                />
                <GoalCard
                  goal="endurance"
                  title="Endurance"
                  description="Improve stamina"
                  selected={formData.goal === "endurance"}
                  onClick={handleGoalChange}
                />
                <GoalCard
                  goal="tone"
                  title="Toning"
                  description="Define muscles"
                  selected={formData.goal === "tone"}
                  onClick={handleGoalChange}
                />
                <GoalCard
                  goal="general"
                  title="General"
                  description="Overall fitness"
                  selected={formData.goal === "general"}
                  onClick={handleGoalChange}
                />
              </div>
            </div>

            {/* Experience Level section */}
            <motion.div variants={item} className="space-y-3">
              <h3 className="text-xl font-bold text-white flex items-center">
                <span className="mr-2 text-purple-400 text-2xl">💪</span> CURSE GRADE
              </h3>
              <p className="text-gray-400 text-sm">Your current training experience</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <ExperienceCard
                  level="beginner"
                  title="Grade 3"
                  description="New to training"
                  selected={formData.experienceLevel === "beginner"}
                  onClick={handleExperienceChange}
                />
                <ExperienceCard
                  level="intermediate"
                  title="Grade 2"
                  description="1-3 years experience"
                  selected={formData.experienceLevel === "intermediate"}
                  onClick={handleExperienceChange}
                />
                <ExperienceCard
                  level="advanced"
                  title="Grade 1"
                  description="3+ years experience"
                  selected={formData.experienceLevel === "advanced"}
                  onClick={handleExperienceChange}
                />
              </div>
            </motion.div>
            
            {/* Days per week section */}
            <motion.div variants={item} className="space-y-3">
              <h3 className="text-xl font-bold text-white flex items-center">
                <span className="mr-2 text-purple-400 text-2xl">📅</span> TRAINING DAYS
              </h3>
              <p className="text-gray-400 text-sm">How many days will you train?</p>
              
              <div className="flex flex-wrap gap-2">
                {[2, 3, 4, 5, 6].map((days) => (
                  <Button
                    key={days}
                    type="button"
                    variant="outline"
                    size="lg"
                    className={`${
                      formData.daysPerWeek === days
                        ? "bg-gradient-to-r from-purple-900 to-blue-900 border-purple-500 text-white"
                        : "bg-black/30 border-gray-700 hover:bg-purple-900/30 text-gray-300"
                    } font-bold text-lg px-6`}
                    onClick={() => handleDaysPerWeekChange(days)}
                  >
                    {days} Days
                  </Button>
                ))}
              </div>
            </motion.div>

            {/* Curse Technique section */}
            <motion.div variants={item} className="space-y-3">
              <h3 className="text-xl font-bold text-white flex items-center">
                <span className="mr-2 text-purple-400 text-2xl">✨</span> CURSE TECHNIQUE
              </h3>
              <p className="text-gray-400 text-sm">Choose your innate power</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {[
                  { value: "domain", label: "Domain Expansion" },
                  { value: "reversal", label: "Reverse Cursed Technique" },
                  { value: "manipulation", label: "Curse Manipulation" },
                  { value: "restriction", label: "Binding Vow" },
                  { value: "innate", label: "Innate Technique" }
                ].map((technique) => (
                  <Button
                    key={technique.value}
                    type="button"
                    variant="outline"
                    className={`${
                      formData.curseTechnique === technique.value
                        ? "bg-gradient-to-r from-purple-900 to-blue-900 border-purple-500 text-white"
                        : "bg-black/30 border-gray-700 hover:bg-purple-900/30 text-gray-300"
                    }`}
                    onClick={() => handleCurseTechniqueChange(technique.value as CurseTechnique)}
                  >
                    {technique.label}
                  </Button>
                ))}
              </div>
            </motion.div>

            {/* ADDITIONAL TABS SECTION */}
            <motion.div variants={item} className="pt-2">
              <Tabs defaultValue="spirit" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-purple-800/30">
                  <TabsTrigger value="spirit" className="data-[state=active]:bg-purple-900">Spirit Guide</TabsTrigger>
                  <TabsTrigger value="music" className="data-[state=active]:bg-purple-900">Training Music</TabsTrigger>
                </TabsList>
                <TabsContent value="spirit" className="border border-purple-800/30 rounded-b-lg p-4 bg-black/20">
                  <h4 className="font-bold mb-2 text-white">Choose Your Spirit Animal</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      { value: "gorilla", label: "Silverback" },
                      { value: "wolf", label: "Wolf" },
                      { value: "lion", label: "Lion" },
                      { value: "bear", label: "Bear" },
                      { value: "eagle", label: "Eagle" },
                      { value: "tiger", label: "Tiger" }
                    ].map((animal) => (
                      <Button
                        key={animal.value}
                        type="button"
                        variant="outline"
                        className={`${
                          formData.spiritAnimal === animal.value
                            ? "bg-gradient-to-r from-purple-900 to-blue-900 border-purple-500 text-white"
                            : "bg-black/30 border-gray-700 hover:bg-purple-900/30 text-gray-300"
                        }`}
                        onClick={() => handleSpiritAnimalChange(animal.value as SpiritAnimal)}
                      >
                        {animal.label}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="music" className="border border-purple-800/30 rounded-b-lg p-4 bg-black/20">
                  <h4 className="font-bold mb-2 text-white">Choose Your Training Playlist</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      { value: "metal", label: "Heavy Metal" },
                      { value: "rap", label: "Rap" },
                      { value: "rock", label: "Rock" },
                      { value: "electronic", label: "Electronic" },
                      { value: "anime", label: "Anime OST" },
                      { value: "jazz", label: "Jazz" }
                    ].map((playlist) => (
                      <Button
                        key={playlist.value}
                        type="button"
                        variant="outline"
                        className={`${
                          formData.playlist === playlist.value
                            ? "bg-gradient-to-r from-purple-900 to-blue-900 border-purple-500 text-white"
                            : "bg-black/30 border-gray-700 hover:bg-purple-900/30 text-gray-300"
                        }`}
                        onClick={() => handlePlaylistChange(playlist.value as Playlist)}
                      >
                        {playlist.label}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div variants={item}>
          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-700 to-purple-800 hover:from-blue-600 hover:to-purple-700 text-white font-extrabold text-lg py-6"
          >
            UNLEASH DOMAIN EXPANSION
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

const GoalCard = ({ 
  goal, 
  title, 
  description, 
  selected, 
  onClick 
}: { 
  goal: Goal; 
  title: string; 
  description: string; 
  selected: boolean; 
  onClick: (goal: Goal) => void 
}) => {
  return (
    <div 
      className={`
        p-3 rounded-lg cursor-pointer transition-all
        ${selected ? 
          'bg-gradient-to-br from-blue-900/80 to-purple-900/80 border-2 border-purple-500 shadow-lg shadow-purple-600/20' : 
          'bg-black/30 border border-gray-800 hover:bg-black/50'}
      `}
      onClick={() => onClick(goal)}
    >
      <div className="font-bold text-white">{title}</div>
      <div className="text-xs text-gray-400">{description}</div>
    </div>
  );
};

const ExperienceCard = ({ 
  level, 
  title, 
  description, 
  selected, 
  onClick 
}: { 
  level: ExperienceLevel; 
  title: string; 
  description: string; 
  selected: boolean; 
  onClick: (level: ExperienceLevel) => void 
}) => {
  return (
    <div 
      className={`
        p-4 rounded-lg cursor-pointer transition-all
        ${selected ? 
          'bg-gradient-to-br from-blue-900/80 to-purple-900/80 border-2 border-purple-500 shadow-lg shadow-purple-600/20' : 
          'bg-black/30 border border-gray-800 hover:bg-black/50'}
      `}
      onClick={() => onClick(level)}
    >
      <div className="font-bold text-lg text-white">{title}</div>
      <div className="text-sm text-gray-400">{description}</div>
    </div>
  );
};

export default WorkoutForm;
