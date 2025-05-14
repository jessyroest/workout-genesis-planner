
import { WorkoutPlan as WorkoutPlanType } from "../types/workout";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface WorkoutPlanProps {
  workoutPlan: WorkoutPlanType;
  onReset: () => void;
}

const WorkoutPlan: React.FC<WorkoutPlanProps> = ({ workoutPlan, onReset }) => {
  const { goal, experienceLevel, daysPerWeek, workoutDays } = workoutPlan;

  // Helper to format the muscle group focus
  const formatFocus = (focus: string | string[]) => {
    if (Array.isArray(focus)) {
      return focus.map(f => f.charAt(0).toUpperCase() + f.slice(1)).join(" & ");
    }
    return focus.charAt(0).toUpperCase() + focus.slice(1);
  };

  // Helper to add the day suffix (1st, 2nd, etc.)
  const getDaySuffix = (day: number) => {
    if (day === 1) return "st";
    if (day === 2) return "nd";
    if (day === 3) return "rd";
    return "th";
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">Your Personalized Workout Plan</h2>
          <p className="text-muted-foreground mt-1">
            Based on your {goal} goal, {experienceLevel} level, and {daysPerWeek} days per week
          </p>
        </div>
        <Button variant="outline" onClick={onReset}>Create New Plan</Button>
      </div>

      <Tabs defaultValue={`day-1`} className="w-full">
        <div className="flex items-center mb-4">
          <Calendar className="mr-2 h-5 w-5" />
          <h3 className="text-xl font-semibold">Weekly Schedule</h3>
        </div>
        
        <TabsList className="grid grid-cols-7 h-auto mb-4">
          {workoutDays.map((day) => (
            <TabsTrigger
              key={`day-${day.day}`}
              value={`day-${day.day}`}
              className="py-3"
            >
              Day {day.day}
            </TabsTrigger>
          ))}
        </TabsList>

        {workoutDays.map((day) => (
          <TabsContent key={`day-${day.day}`} value={`day-${day.day}`} className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Day {day.day}: {formatFocus(day.focus)} Focus</CardTitle>
                <CardDescription>{day.notes}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {day.workoutSets.map((workout, i) => (
                    <Card key={`workout-${day.day}-${i}`} className="overflow-hidden">
                      <div className="bg-primary/10 p-3 border-b">
                        <h4 className="font-semibold">{workout.exercise.name}</h4>
                        <p className="text-sm text-muted-foreground capitalize">{workout.exercise.muscleGroup}</p>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-3 gap-2 text-center mb-3">
                          <div className="bg-secondary p-2 rounded-md">
                            <p className="text-sm text-muted-foreground">Sets</p>
                            <p className="font-bold">{workout.sets}</p>
                          </div>
                          <div className="bg-secondary p-2 rounded-md">
                            <p className="text-sm text-muted-foreground">Reps</p>
                            <p className="font-bold">{workout.reps}</p>
                          </div>
                          <div className="bg-secondary p-2 rounded-md">
                            <p className="text-sm text-muted-foreground">Rest</p>
                            <p className="font-bold">{workout.rest}s</p>
                          </div>
                        </div>
                        {workout.exercise.description && (
                          <p className="text-sm text-muted-foreground">{workout.exercise.description}</p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default WorkoutPlan;
