
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
      title: "Workout plan generated!",
      description: `Your ${formData.daysPerWeek}-day ${formData.goal} plan is ready.`,
    });
  };

  const resetWorkoutPlan = () => {
    setWorkoutPlan(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 inline-block text-transparent bg-clip-text">
            Fit Plan Generator
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Create a personalized workout plan tailored to your fitness goals, 
            experience level, and schedule.
          </p>
        </header>

        <main>
          {workoutPlan ? (
            <WorkoutPlan workoutPlan={workoutPlan} onReset={resetWorkoutPlan} />
          ) : (
            <WorkoutForm onSubmit={handleFormSubmit} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
