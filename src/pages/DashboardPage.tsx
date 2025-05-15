
import Dashboard from "@/components/Dashboard";
import { useEffect, useRef } from "react";

const DashboardPage = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Load background music
    audioRef.current = new Audio("/audio/bg-music.mp3");
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
      audioRef.current.loop = true;
      
      // Try to play music automatically
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

  return (
    <div className="relative">
      <Dashboard />
      
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
    </div>
  );
};

export default DashboardPage;
