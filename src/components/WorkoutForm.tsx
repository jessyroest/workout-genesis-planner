
import { useState } from "react";
import { FormData, Goal, ExperienceLevel } from "../types/workout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Weight, User } from "lucide-react";

interface WorkoutFormProps {
  onSubmit: (formData: FormData) => void;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    goal: "muscle gain",
    experienceLevel: "beginner",
    daysPerWeek: 3
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-lg w-full mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Create Your Workout Plan</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Fitness Goal Selection */}
          <div>
            <h3 className="text-xl font-semibold mb-3">What's your fitness goal?</h3>
            <Tabs
              defaultValue={formData.goal}
              className="w-full"
              onValueChange={(value) => setFormData({
                ...formData,
                goal: value as Goal
              })}
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="muscle gain" className="flex flex-col py-3 px-2 items-center gap-2">
                  <Dumbbell className="h-5 w-5" />
                  <span>Muscle Gain</span>
                </TabsTrigger>
                <TabsTrigger value="fat loss" className="flex flex-col py-3 px-2 items-center gap-2">
                  <Weight className="h-5 w-5" />
                  <span>Fat Loss</span>
                </TabsTrigger>
                <TabsTrigger value="strength" className="flex flex-col py-3 px-2 items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>Strength</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Experience Level Selection */}
          <div>
            <h3 className="text-xl font-semibold mb-3">What's your experience level?</h3>
            <div className="grid grid-cols-3 gap-3">
              {["beginner", "intermediate", "advanced"].map((level) => (
                <Card 
                  key={level}
                  className={`cursor-pointer transition-all ${
                    formData.experienceLevel === level 
                      ? 'border-2 border-primary bg-primary/10' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setFormData({
                    ...formData,
                    experienceLevel: level as ExperienceLevel
                  })}
                >
                  <CardContent className="flex items-center justify-center p-4">
                    <p className="font-medium capitalize">{level}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Days Per Week Selection */}
          <div>
            <h3 className="text-xl font-semibold mb-3">How many days can you train per week?</h3>
            <div className="grid grid-cols-7 gap-1">
              {[1, 2, 3, 4, 5, 6, 7].map((days) => (
                <Card 
                  key={days}
                  className={`cursor-pointer transition-all ${
                    formData.daysPerWeek === days 
                      ? 'border-2 border-primary bg-primary/10' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setFormData({
                    ...formData,
                    daysPerWeek: days
                  })}
                >
                  <CardContent className="flex items-center justify-center p-4">
                    <p className="font-medium">{days}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full py-6 text-lg">
            Generate My Workout Plan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WorkoutForm;
