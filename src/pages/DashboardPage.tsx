
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Sun, Moon, Volume2, VolumeX, Menu, ChevronRight, BarChart2, Award, Calendar, Settings, LogOut } from "lucide-react";
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
    
    // Check system preference for theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme("light");
      document.documentElement.classList.add("light");
    }
    
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
        });
      }
      setAudioEnabled(!audioEnabled);
    }
  };
  
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("light");
    
    toast({
      title: `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} Mode Activated`,
      description: `Switched to ${newTheme} mode theme`,
    });
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Animated background elements for a subtle effect
  const particles = [...Array(8)].map((_, i) => ({
    size: Math.random() * 200 + 100,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 40 + 20,
    delay: Math.random() * 10,
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-primary rounded-full border-t-transparent"></div>
      </div>
    );
  }
  
  const navItems = [
    { icon: <BarChart2 className="h-5 w-5" />, label: "Dashboard", active: true },
    { icon: <Award className="h-5 w-5" />, label: "Workouts", active: false },
    { icon: <Calendar className="h-5 w-5" />, label: "Schedule", active: false },
    { icon: <Settings className="h-5 w-5" />, label: "Settings", active: false },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5 blur-3xl"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{ scale: 0.5, opacity: 0.05 }}
            animate={{
              scale: [0.5, Math.random() * 0.4 + 0.8, 0.5],
              opacity: [0.05, Math.random() * 0.15 + 0.05, 0.05],
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
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
      
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.div 
            className="bg-card border-r border-border h-full w-64 p-4 flex flex-col"
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Logo */}
            <div className="flex items-center mb-8">
              <div className="h-8 w-8 bg-primary rounded flex items-center justify-center mr-2">
                <span className="text-primary-foreground font-bold">V</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-brand-cyan bg-clip-text text-transparent">
                VoltFit
              </h1>
            </div>
            
            {/* Nav Menu */}
            <nav className="flex-1">
              <ul className="space-y-1">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition duration-150 ${
                        item.active 
                          ? 'bg-primary/10 text-primary' 
                          : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {item.active && <ChevronRight className="h-4 w-4 ml-auto" />}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* User section */}
            <div className="border-t border-border pt-4 mt-4">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  {user?.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="ml-3">
                  <p className="font-medium text-sm">{user?.email?.split('@')[0] || 'User'}</p>
                  <p className="text-xs text-muted-foreground">Premium Member</p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full justify-start text-muted-foreground" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center px-4 shrink-0">
          <Button 
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-4"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <h1 className="text-xl font-semibold">Dashboard</h1>
          
          <div className="ml-auto flex items-center space-x-2">
            <Button 
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            <Button 
              onClick={toggleAudio}
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label={audioEnabled ? "Mute background music" : "Play background music"}
            >
              {audioEnabled ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
          </div>
        </header>
        
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto space-y-6"
          >
            {/* Welcome message */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-2">
                Welcome back, <span className="text-primary">{user?.email?.split('@')[0] || 'Athlete'}</span>
              </h2>
              <p className="text-muted-foreground">Track your progress and crush your fitness goals.</p>
            </section>
            
            {/* Main Dashboard Grid */}
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
      </div>
    </div>
  );
};

export default DashboardPage;
