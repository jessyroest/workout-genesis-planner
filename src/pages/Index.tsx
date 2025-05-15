
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [session, setSession] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(!!data.session);
    };
    checkSession();
    
    // Load background music
    audioRef.current = new Audio("/audio/bg-music.mp3");
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
      audioRef.current.loop = true;
      
      // Add a play button for mobile devices
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Auto-play was prevented, we'll need user interaction
          console.log("Audio play prevented, needs user interaction");
        });
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  
  const showToast = () => {
    toast({
      title: "DOMAIN EXPANDED!",
      description: "Welcome to the world of Jujutsu Kaisen Fitness.",
      variant: "destructive"
    });
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
            <motion.h1 
              className="text-6xl md:text-7xl font-black mb-4 uppercase bg-gradient-to-r from-blue-600 via-purple-500 to-white inline-block text-transparent bg-clip-text tracking-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Jujutsu Fitness
            </motion.h1>
            <motion.div 
              className="w-24 h-2 bg-blue-600 my-2"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            ></motion.div>
            <motion.p 
              className="text-2xl font-bold uppercase tracking-wide text-gray-300 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Sorcery Training Program
            </motion.p>
          </div>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto mt-6 font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Build your cursed technique through physical training that will push your limits beyond human potential.
            No binding vows. No compromises. UNLIMITED VOID.
          </motion.p>
        </header>

        <main>
          <motion.div 
            className="flex flex-col items-center justify-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-600/20 blur-3xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.img 
                src="/images/ronnie-coleman.jpg" 
                alt="Bodybuilder" 
                className="w-full h-full object-cover rounded-full border-4 border-purple-600/50 shadow-lg shadow-purple-500/30"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              />
            </div>
            
            <div className="mt-12 space-y-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <Link to={session ? "/dashboard" : "/auth"}>
                  <Button 
                    className="bg-gradient-to-br from-blue-700 to-purple-800 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-xl font-black rounded-xl shadow-lg shadow-purple-800/20"
                    size="lg"
                    onClick={showToast}
                  >
                    {session ? "ENTER YOUR DOMAIN" : "JOIN THE CURSE"}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </main>
        
        <motion.footer 
          className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <p className="text-sm">© 2025 Jujutsu Fitness Workout Generator | <span className="text-blue-500">POWERED BY CURSED ENERGY</span></p>
        </motion.footer>
      </div>
      
      {/* Play music button that appears only on mobile or if autoplay is disabled */}
      <button 
        onClick={startMusic}
        className="fixed bottom-4 right-4 z-50 flex items-center justify-center p-3 rounded-full bg-purple-900/80 hover:bg-purple-800 transition-colors"
        aria-label="Play background music"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-white" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" 
          />
        </svg>
      </button>
      
      {/* 3D Particles */}
      <ParticleBackground />
    </div>
  );
};

// Animated background component
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple-600/20 blur-xl"
          style={{
            width: Math.random() * 300 + 50,
            height: Math.random() * 300 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            zIndex: -1,
          }}
          initial={{
            scale: 0.5,
            opacity: 0.1,
          }}
          animate={{
            scale: [0.5, Math.random() * 0.3 + 0.7, 0.5],
            opacity: [0.1, Math.random() * 0.2 + 0.2, 0.1],
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default Index;
