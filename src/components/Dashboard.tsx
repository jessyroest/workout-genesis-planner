
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import WorkoutForm from "@/components/WorkoutForm";
import WorkoutPlan from "@/components/WorkoutPlan";
import { FormData, WorkoutPlan as WorkoutPlanType } from "@/types/workout";
import { generateWorkoutPlan } from "@/utils/workoutGenerator";
import { User } from "@supabase/supabase-js";
import { UserWorkout } from "@/types/user";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlanType | null>(null);
  const [savedWorkouts, setSavedWorkouts] = useState<UserWorkout[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const setupAuth = async () => {
      setLoading(true);
      
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }
      
      setUser(session.user);
      
      // Load saved workouts
      await loadSavedWorkouts(session.user.id);
      
      // Set up auth state change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_OUT') {
            navigate('/auth');
          } else if (session?.user) {
            setUser(session.user);
            await loadSavedWorkouts(session.user.id);
          }
        }
      );
      
      setLoading(false);
      
      return () => {
        subscription.unsubscribe();
      };
    };
    
    setupAuth();
  }, [navigate]);
  
  const loadSavedWorkouts = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('workouts')
        .select(`
          id, 
          name,
          goal,
          experience_level,
          created_at,
          workout_days (
            id,
            day,
            exercises
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      if (data) {
        setSavedWorkouts(data as UserWorkout[]);
      }
    } catch (error) {
      console.error("Error loading workouts:", error);
      toast({
        title: "Error",
        description: "Failed to load your saved workouts",
        variant: "destructive",
      });
    }
  };
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };
  
  const handleFormSubmit = async (formData: FormData) => {
    // Generate workout plan
    const generatedPlan = generateWorkoutPlan(formData);
    setWorkoutPlan(generatedPlan);
    
    // Play audio
    const audioClips = [
      "/audio/lightweight-baby.mp3",
      "/audio/you-gotta-lift-heavy-bro.mp3"
    ];
    const randomClip = audioClips[Math.floor(Math.random() * audioClips.length)];
    const audio = new Audio(randomClip);
    audio.play();
    
    toast({
      title: "DOMAIN EXPANDED!",
      description: `YOUR ${formData.daysPerWeek}-DAY ${formData.goal.toUpperCase()} JUJUTSU PLAN IS READY. EMBRACE THE CURSE! 🔮`,
      variant: "destructive"
    });
  };

  const saveWorkoutPlan = async () => {
    if (!user || !workoutPlan) return;
    
    try {
      // Save main workout record
      const { data: workoutData, error: workoutError } = await supabase
        .from('workouts')
        .insert([
          { 
            user_id: user.id,
            name: `${workoutPlan.goal} Plan`,
            goal: workoutPlan.goal,
            experience_level: workoutPlan.experienceLevel
          }
        ])
        .select();
        
      if (workoutError) throw workoutError;
      
      if (workoutData && workoutData[0]) {
        const workoutId = workoutData[0].id;
        
        // Save each workout day
        const workoutDaysToInsert = workoutPlan.days.map(day => ({
          workout_id: workoutId,
          day: day.name,
          exercises: day.exercises
        }));
        
        const { error: daysError } = await supabase
          .from('workout_days')
          .insert(workoutDaysToInsert);
          
        if (daysError) throw daysError;
        
        toast({
          title: "Workout Saved!",
          description: "Your workout plan has been saved to your account.",
          variant: "destructive",
        });
        
        // Refresh the saved workouts list
        loadSavedWorkouts(user.id);
      }
    } catch (error: any) {
      console.error("Error saving workout:", error);
      toast({
        title: "Error",
        description: "Failed to save your workout plan",
        variant: "destructive",
      });
    }
  };
  
  const loadWorkout = (workout: UserWorkout) => {
    // Convert the saved workout format to the WorkoutPlan format
    const days = workout.workout_days.map(day => ({
      name: day.day,
      exercises: day.exercises
    }));
    
    setWorkoutPlan({
      goal: workout.goal,
      experienceLevel: workout.experience_level,
      days: days
    });
    
    toast({
      title: "Workout Loaded",
      description: `${workout.name} has been loaded.`,
      variant: "destructive",
    });
  };

  const resetWorkoutPlan = () => {
    setWorkoutPlan(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-purple-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden pb-20">
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
      
      <ParticleBackground />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <header className="flex flex-wrap justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-500 to-white inline-block text-transparent bg-clip-text">
              JUJUTSU FITNESS
            </h1>
            <p className="text-lg text-gray-400">Welcome back, {user?.user_metadata?.username || 'Sorcerer'}</p>
          </div>
          
          <Button 
            onClick={handleSignOut} 
            variant="outline" 
            className="mt-4 sm:mt-0 border-red-800 text-red-500 hover:bg-red-950 hover:text-red-400"
          >
            Sign Out
          </Button>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {workoutPlan ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Your Workout Plan</h2>
                  <div className="flex space-x-3">
                    <Button 
                      onClick={saveWorkoutPlan}
                      className="bg-blue-700 hover:bg-blue-600 text-white"
                    >
                      Save Plan
                    </Button>
                    <Button 
                      onClick={resetWorkoutPlan}
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-900"
                    >
                      Create New Plan
                    </Button>
                  </div>
                </div>
                <WorkoutPlan workoutPlan={workoutPlan} onReset={resetWorkoutPlan} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="bg-black/50 border-purple-800/30 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-white">Create New Workout</CardTitle>
                    <CardDescription className="text-gray-400">
                      Customize your training plan based on your goals and schedule
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WorkoutForm onSubmit={handleFormSubmit} />
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <Card className="bg-black/50 border-purple-800/30 backdrop-blur sticky top-4">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Saved Workouts</CardTitle>
                <CardDescription className="text-gray-400">
                  Your previously created plans
                </CardDescription>
              </CardHeader>
              <CardContent className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                {savedWorkouts.length > 0 ? (
                  <div className="space-y-3">
                    {savedWorkouts.map((workout) => (
                      <div 
                        key={workout.id} 
                        className="flex flex-col p-3 bg-black/50 rounded-lg border border-purple-800/20 cursor-pointer hover:bg-purple-900/20 transition-colors"
                        onClick={() => loadWorkout(workout)}
                      >
                        <div className="font-bold">{workout.name}</div>
                        <div className="text-sm text-gray-400">
                          {workout.goal} • {workout.experience_level}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(workout.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    No saved workouts yet
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Animated background component
const ParticleBackground = () => {
  const particles = [...Array(10)].map((_, i) => ({
    size: Math.random() * 300 + 100,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 40 + 20,
    delay: Math.random() * 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple-600/10 blur-3xl"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            zIndex: -1,
          }}
          initial={{ scale: 0.5, opacity: 0.1 }}
          animate={{
            scale: [0.5, Math.random() * 0.4 + 0.8, 0.5],
            opacity: [0.1, Math.random() * 0.3 + 0.1, 0.1],
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default Dashboard;
