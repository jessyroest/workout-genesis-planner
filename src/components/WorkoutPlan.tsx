
import { useState } from "react";
import { WorkoutPlan as WorkoutPlanType, IntensityTechnique } from "../types/workout";
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
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Flame, Dumbbell, Clock, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { makeWorkoutMoreIntense } from "@/utils/workoutGenerator";
import { useToast } from "@/hooks/use-toast";

interface WorkoutPlanProps {
  workoutPlan: WorkoutPlanType;
  onReset: () => void;
}

// Bodybuilder icons based on muscle group focus
const bodybuilderIcons = {
  "demonic chest": "/images/kevin-levrone.jpg",
  "titanic back": "/images/ronnie-coleman.jpg", 
  "shoulder domination": "/images/kevin-levrone.jpg",
  "arm control": "/images/lee-priest.jpg",
  "legs of steel": "/images/ronnie-coleman.jpg",
  "core seal": "/images/lee-priest.jpg",
  default: "/images/ronnie-coleman.jpg"
};

const WorkoutPlan: React.FC<WorkoutPlanProps> = ({ workoutPlan: initialWorkoutPlan, onReset }) => {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlanType>(initialWorkoutPlan);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const { toast } = useToast();

  // Helper to format the muscle group focus
  const formatFocus = (focus: string | string[]) => {
    if (Array.isArray(focus)) {
      return focus.map(f => f.charAt(0).toUpperCase() + f.slice(1)).join(" & ");
    }
    return focus.charAt(0).toUpperCase() + focus.slice(1);
  };

  // Helper to describe intensity techniques
  const describeIntensityTechnique = (technique: IntensityTechnique) => {
    switch (technique) {
      case "domain expansion":
        return "After reaching failure, immediately drop the weight by ~20% and continue until failure again";
      case "black flash":
        return "Perform this exercise back-to-back with the next exercise with minimal rest";
      case "maximum curse":
        return "Have a spotter help you complete 2-3 additional reps after reaching failure";
      case "simple domain":
        return "After reaching failure, rest 15-20 seconds and continue for more reps";
      case "binding vow":
        return "Perform this exercise as part of a sequence of 3+ exercises without rest";
      case "reversed curse":
        return "Focus on a slow (3-5 second) eccentric/lowering phase for each rep";
      case "hollow technique":
        return "After reaching failure, perform partial range-of-motion reps until full failure";
      default:
        return "";
    }
  };

  // Make the workout more intense
  const makeMoreIntense = () => {
    const moreIntensePlan = makeWorkoutMoreIntense(workoutPlan);
    setWorkoutPlan(moreIntensePlan);
    
    toast({
      title: "INTENSITY INCREASED!",
      description: "YOUR WORKOUT JUST GOT MORE HARDCORE! NO PAIN NO GAIN!",
      variant: "destructive"
    });
    
    // Play audio if enabled
    if (audioEnabled) {
      const audio = new Audio("/audio/you-gotta-lift-heavy-bro.mp3");
      audio.play();
    }
  };

  // Toggle audio
  const toggleAudio = () => {
    setAudioEnabled(prev => !prev);
    toast({
      title: audioEnabled ? "AUDIO MUTED" : "AUDIO ENABLED",
      description: audioEnabled ? "Silence mode activated." : "BEAST MODE SOUNDS ACTIVATED!",
    });
  };

  // Play audio clips
  const playAudio = (clip: string) => {
    if (audioEnabled) {
      const audio = new Audio(clip);
      audio.play();
    }
  };

  // Helper to get bodybuilder icon based on focus
  const getBodybuilderIcon = (focus: string | string[]) => {
    if (typeof focus === 'string') {
      return bodybuilderIcons[focus as keyof typeof bodybuilderIcons] || bodybuilderIcons.default;
    }
    
    // If it's an array, use the first focus
    if (Array.isArray(focus) && focus.length > 0) {
      return bodybuilderIcons[focus[0] as keyof typeof bodybuilderIcons] || bodybuilderIcons.default;
    }
    
    return bodybuilderIcons.default;
  };

  const { goal, experienceLevel, daysPerWeek, bodySplit, workoutDays, priorityMuscles } = workoutPlan;

  return (
    <div className="max-w-5xl mx-auto w-full bg-black text-white pb-12">
      <div className="bg-gradient-to-r from-red-900 to-black mb-8 p-6 border-b-4 border-red-600">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">YOUR BEAST MODE PLAN</h2>
            <p className="text-gray-300 mt-2 font-bold">
              {goal.toUpperCase()} | {experienceLevel.toUpperCase()} | {daysPerWeek} DAYS | {bodySplit.toUpperCase()} SPLIT
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={toggleAudio} 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black"
              title={audioEnabled ? "Mute sounds" : "Enable sounds"}
            >
              {audioEnabled ? <Volume2 /> : <VolumeX />}
            </Button>
            <Button 
              variant="outline" 
              onClick={onReset} 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> NEW PLAN
            </Button>
            <Button 
              variant="destructive" 
              onClick={makeMoreIntense}
              className="bg-red-600 hover:bg-red-700 border-2 border-white font-bold"
            >
              <Flame className="mr-2 h-4 w-4" /> MAX IT OUT
            </Button>
          </div>
        </div>
      </div>

      {/* Priority muscles section */}
      {priorityMuscles.length > 0 && (
        <div className="mb-8 px-6">
          <h3 className="text-xl font-bold mb-2 text-red-500">PRIORITY MUSCLES:</h3>
          <div className="flex flex-wrap gap-2">
            {priorityMuscles.map(muscle => (
              <span 
                key={muscle} 
                className="bg-red-900/50 border border-red-500 px-3 py-1 rounded-full text-sm font-bold uppercase"
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>
      )}

      <Tabs defaultValue={`day-1`} className="w-full">
        <div className="flex items-center mb-4 px-6">
          <Calendar className="mr-2 h-6 w-6 text-red-500" />
          <h3 className="text-2xl font-black uppercase">WEEKLY SCHEDULE</h3>
        </div>
        
        <TabsList className="grid grid-cols-7 h-auto mb-6 bg-gray-900">
          {workoutDays.map((day) => (
            <TabsTrigger
              key={`day-${day.day}`}
              value={`day-${day.day}`}
              className="py-4 font-bold text-lg uppercase data-[state=active]:bg-red-600"
            >
              Day {day.day}
            </TabsTrigger>
          ))}
        </TabsList>

        {workoutDays.map((day) => (
          <TabsContent key={`day-${day.day}`} value={`day-${day.day}`} className="mt-4 px-4">
            <Card className="border-2 border-red-600 bg-black">
              <CardHeader className="border-b border-red-600 bg-gradient-to-r from-red-900 to-black">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    {/* Bodybuilder Icon */}
                    <div className="hidden md:block h-16 w-16 rounded-full overflow-hidden border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.7)]">
                      <img 
                        src={getBodybuilderIcon(day.focus)} 
                        alt="Bodybuilder Icon" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image doesn't load
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <CardTitle className="text-3xl font-black text-white uppercase">
                      Day {day.day}: {formatFocus(day.focus)} Focus
                    </CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => playAudio("/audio/lightweight-baby.mp3")}
                    className="rounded-full bg-red-600 hover:bg-red-700 text-white"
                    disabled={!audioEnabled}
                  >
                    <Volume2 className="h-6 w-6" />
                  </Button>
                </div>
                <CardDescription className="text-lg text-gray-300">{day.notes}</CardDescription>
              </CardHeader>
              
              {/* Motivational Quote */}
              {day.quote && (
                <div className="bg-red-600 text-white p-4 font-black text-center text-xl uppercase animate-pulse">
                  {day.quote}
                </div>
              )}
              
              <CardContent className="p-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {day.workoutSets.map((workout, i) => (
                    <Card key={`workout-${day.day}-${i}`} className="overflow-hidden border-2 border-gray-700 bg-gray-900">
                      <div className={`p-4 border-b ${
                        workout.exercise.isPriority ? 'bg-red-900/50 border-red-500' : 'bg-gray-800 border-gray-700'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-xl">{workout.exercise.name}</h4>
                            <p className="text-sm text-gray-300 capitalize">{workout.exercise.muscleGroup}</p>
                          </div>
                          
                          {/* Priority indicator */}
                          {workout.exercise.isPriority && (
                            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold uppercase">
                              Priority
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="p-4 space-y-4">
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="bg-gray-800 p-3 rounded-md">
                            <p className="text-sm text-gray-400 mb-1 uppercase">Sets</p>
                            <p className="font-black text-xl">{workout.sets}</p>
                          </div>
                          <div className="bg-gray-800 p-3 rounded-md">
                            <p className="text-sm text-gray-400 mb-1 uppercase">Reps</p>
                            <p className="font-black text-xl">{workout.reps}</p>
                          </div>
                          <div className="bg-gray-800 p-3 rounded-md">
                            <p className="text-sm text-gray-400 mb-1 uppercase">Rest</p>
                            <p className="font-black text-xl">{workout.rest}s</p>
                          </div>
                        </div>
                        
                        {/* Description */}
                        {workout.exercise.description && (
                          <p className="text-sm text-gray-300">{workout.exercise.description}</p>
                        )}
                        
                        {/* Intensity Technique */}
                        {workout.intensityTechnique && (
                          <div className="bg-red-900/30 border border-red-600 p-3 rounded-md mt-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Flame className="h-5 w-5 text-red-500" />
                              <span className="font-bold uppercase text-red-500">
                                {workout.intensityTechnique}
                              </span>
                            </div>
                            <p className="text-sm text-gray-300">
                              {describeIntensityTechnique(workout.intensityTechnique)}
                            </p>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between border-t border-gray-800 py-4 px-6">
                <div className="flex items-center">
                  <Dumbbell className="mr-2 h-5 w-5 text-red-500" />
                  <span className="font-bold">{day.workoutSets.length} exercises</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-red-500" />
                  <span className="font-bold">~{Math.round(day.workoutSets.length * 10)} min</span>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Toggle the dark mode in a joking way */}
      <div className="mt-8 px-6">
        <Button 
          variant="outline"
          className="w-full bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
          onClick={() => {
            toast({
              title: "NAH BRO, THERE'S ONLY BEAST MODE HERE!",
              description: "Natty mode not available in the Tren Twins' universe!",
            });
            playAudio("/audio/you-gotta-lift-heavy-bro.mp3");
          }}
        >
          TOGGLE NATTY / TREN MODE
        </Button>
      </div>
    </div>
  );
};

export default WorkoutPlan;
