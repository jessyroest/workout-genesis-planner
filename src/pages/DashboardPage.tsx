
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Sun, Moon, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Dashboard from "@/components/Dashboard";
import ProgressTracker from "@/components/ProgressTracker";
import HabitTracker from "@/components/HabitTracker";
import AiCoach from "@/components/AiCoach";
import MusicPlayer from "@/components/MusicPlayer";

const DashboardPage = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Load background music
    audioRef.current = new Audio("/audio/bg-music.mp3");
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
      audioRef.current.loop = true;
    }
    
    // Set up auth state change listener
    const setupAuth = async () => {
      setLoading(true);
      
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      
      setUser(session?.user || null);
      
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setUser(session?.user || null);
        }
      );
      
      setLoading(false);
      
      return () => {
        subscription.unsubscribe();
      };
    };
    
    setupAuth();
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioEnabled) {
        audioRef.current.pause();
        toast({
          title: "Music Disabled",
          description: "Background music has been turned off",
        });
      } else {
        audioRef.current.play()
          .catch(error => {
            console.log("Audio play prevented, needs user interaction");
          });
        toast({
          title: "Music Enabled",
          description: "Background music is now playing",
          variant: "destructive",
        });
      }
      setAudioEnabled(!audioEnabled);
    }
  };
  
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("light-mode");
    
    toast({
      title: `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} Mode Activated`,
      description: `Switched to ${newTheme} mode theme`,
    });
  };

  // Animated background particles
  const particles = [...Array(15)].map((_, i) => ({
    size: Math.random() * 300 + 100,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 40 + 20,
    delay: Math.random() * 10,
  }));

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
      
      {/* Animated background particles */}
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
      
      {/* App Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Original Dashboard */}
        <Dashboard />
        
        {/* New Feature Panels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-black mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
            YOUR FITNESS COMMAND CENTER
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Progress Tracker */}
            <div className="lg:col-span-8">
              <ProgressTracker user={user} />
            </div>
            
            {/* Habit Tracker */}
            <div className="lg:col-span-4">
              <HabitTracker user={user} />
            </div>
            
            {/* AI Coach */}
            <div className="lg:col-span-4">
              <AiCoach user={user} />
            </div>
            
            {/* Music Player */}
            <div className="lg:col-span-8">
              <MusicPlayer />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Floating Controls */}
      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        {/* Theme Toggle */}
        <Button 
          onClick={toggleTheme}
          className="flex items-center justify-center p-3 rounded-full bg-gray-900/80 hover:bg-gray-800 transition-colors"
          variant="ghost"
          size="icon"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-blue-400" />
          )}
        </Button>
        
        {/* Audio Toggle */}
        <Button 
          onClick={toggleAudio}
          className="flex items-center justify-center p-3 rounded-full bg-purple-900/80 hover:bg-purple-800 transition-colors"
          variant="ghost"
          size="icon"
          aria-label={audioEnabled ? "Mute background music" : "Play background music"}
        >
          {audioEnabled ? (
            <VolumeX className="h-5 w-5 text-white" />
          ) : (
            <Volume2 className="h-5 w-5 text-white" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;
