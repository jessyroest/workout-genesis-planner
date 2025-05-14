
import { useState } from "react";
import WorkoutForm from "@/components/WorkoutForm";
import WorkoutPlan from "@/components/WorkoutPlan";
import { FormData, WorkoutPlan as WorkoutPlanType } from "@/types/workout";
import { generateWorkoutPlan } from "@/utils/workoutGenerator";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlanType | null>(null);
  const { toast } = useToast();

  const handleFormSubmit = (formData: FormData) => {
    const generatedPlan = generateWorkoutPlan(formData);
    setWorkoutPlan(generatedPlan);
    
    toast({
      title: "BEAST MODE PLAN GENERATED!",
      description: `YOUR ${formData.daysPerWeek}-DAY ${formData.goal.toUpperCase()} PLAN IS READY. LET'S CRUSH IT! 💪`,
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
            <h1 className="text-6xl md:text-7xl font-black mb-4 uppercase bg-gradient-to-r from-red-600 via-red-500 to-white inline-block text-transparent bg-clip-text tracking-tight">
              Tren Twins
            </h1>
            <div className="w-24 h-2 bg-red-600 my-2"></div>
            <p className="text-2xl font-bold uppercase tracking-wide text-gray-300 mt-2">
              Workout Generator
            </p>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto mt-6 font-bold">
            Build a hypertrophy-focused training program that will push your limits and maximize your gains.
            No excuses. No compromises. JUST RESULTS.
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
          <p className="text-sm">© 2025 Tren Twins Workout Generator | <span className="text-red-500">ALL KINDS OF GAINZ</span></p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
