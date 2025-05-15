
import { useState } from "react";
import WorkoutForm from "@/components/WorkoutForm";
import WorkoutPlan from "@/components/WorkoutPlan";
import { FormData, WorkoutPlan as WorkoutPlanType } from "@/types/workout";
import { generateWorkoutPlan } from "@/utils/workoutGenerator";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlanType | null>(null);
  const { toast } = useToast();

  const handleFormSubmit = (formData: FormData) => {
    const generatedPlan = generateWorkoutPlan(formData);
    setWorkoutPlan(generatedPlan);
    
    toast({
      title: "DOMAIN EXPANDED!",
      description: `YOUR ${formData.daysPerWeek}-DAY ${formData.goal.toUpperCase()} JUJUTSU PLAN IS READY. EMBRACE THE CURSE! 🔮`,
      variant: "destructive"
    });
    
    // Play motivation audio
    const audioClips = [
      "/audio/lightweight-baby.mp3",
      "/audio/you-gotta-lift-heavy-bro.mp3"
    ];
    const randomClip = audioClips[Math.floor(Math.random() * audioClips.length)];
    const audio = new Audio(randomClip);
    audio.play();
  };

  const resetWorkoutPlan = () => {
    setWorkoutPlan(null);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background texture/pattern */}
      <div 
        className="absolute inset-0 opacity-10 z-0" 
        style={{ 
          backgroundImage: `url('/images/gym-texture.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'contrast(1.2) brightness(0.7)'
        }}
      ></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <header className="text-center mb-12">
          <div className="flex flex-col items-center">
            <h1 className="text-6xl md:text-7xl font-black mb-4 uppercase bg-gradient-to-r from-blue-600 via-purple-500 to-white inline-block text-transparent bg-clip-text tracking-tight">
              Jujutsu Fitness
            </h1>
            <div className="w-24 h-2 bg-blue-600 my-2"></div>
            <p className="text-2xl font-bold uppercase tracking-wide text-gray-300 mt-2">
              Sorcery Training Program
            </p>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto mt-6 font-bold">
            Build your cursed technique through physical training that will push your limits beyond human potential.
            No binding vows. No compromises. UNLIMITED VOID.
          </p>
        </header>

        <main>
          {workoutPlan ? (
            <WorkoutPlan workoutPlan={workoutPlan} onReset={resetWorkoutPlan} />
          ) : (
            <WorkoutForm onSubmit={handleFormSubmit} />
          )}
        </main>
        
        <footer className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p className="text-sm">© 2025 Jujutsu Fitness Workout Generator | <span className="text-blue-500">POWERED BY CURSED ENERGY</span></p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
