
import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  Music,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Track {
  title: string;
  artist: string;
  duration: string;
  category: "workout" | "cardio" | "cooldown" | "focus";
  energy: "high" | "medium" | "low";
}

const workoutTracks: Track[] = [
  { title: "Beast Mode", artist: "Heavy Lifters", duration: "3:45", category: "workout", energy: "high" },
  { title: "Iron Paradise", artist: "Gym Titans", duration: "4:12", category: "workout", energy: "high" },
  { title: "Pump It Up", artist: "Fitness Crew", duration: "3:30", category: "workout", energy: "high" },
  { title: "Zen Flow", artist: "Mind Masters", duration: "5:20", category: "cooldown", energy: "low" },
  { title: "Cardio Blast", artist: "Run Squad", duration: "3:58", category: "cardio", energy: "high" },
  { title: "Focus Zone", artist: "Mental Edge", duration: "4:05", category: "focus", energy: "medium" },
  { title: "Power Hour", artist: "Strength Syndicate", duration: "3:22", category: "workout", energy: "high" },
  { title: "Recovery Beat", artist: "Rest & Repair", duration: "4:45", category: "cooldown", energy: "low" },
];

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [category, setCategory] = useState<Track["category"] | "all">("all");
  const { toast } = useToast();

  // Filter tracks based on selected category
  const filteredTracks = category === "all" 
    ? workoutTracks 
    : workoutTracks.filter(track => track.category === category);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    
    toast({
      description: isPlaying ? "Paused" : `Now playing: ${filteredTracks[currentTrackIndex].title}`,
    });
  };

  const handleNext = () => {
    if (shuffle) {
      // Random track excluding current one
      const availableTracks = filteredTracks.length > 1 
        ? [...Array(filteredTracks.length).keys()].filter(i => i !== currentTrackIndex)
        : [0];
      const randomIndex = Math.floor(Math.random() * availableTracks.length);
      setCurrentTrackIndex(availableTracks[randomIndex]);
    } else {
      setCurrentTrackIndex((prev) => 
        prev === filteredTracks.length - 1 ? 0 : prev + 1
      );
    }
    
    if (isPlaying) {
      toast({
        description: `Now playing: ${filteredTracks[currentTrackIndex].title}`,
      });
    }
  };

  const handlePrevious = () => {
    setCurrentTrackIndex((prev) => 
      prev === 0 ? filteredTracks.length - 1 : prev - 1
    );
    
    if (isPlaying) {
      toast({
        description: `Now playing: ${filteredTracks[currentTrackIndex].title}`,
      });
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleRepeatToggle = () => {
    setRepeat(!repeat);
    toast({
      description: !repeat ? "Repeat enabled" : "Repeat disabled",
    });
  };

  const handleShuffleToggle = () => {
    setShuffle(!shuffle);
    toast({
      description: !shuffle ? "Shuffle enabled" : "Shuffle disabled",
    });
  };

  // Calculate progress for the fake progress bar
  const progressPercent = isPlaying ? 45 : 0; // Just a static value for visual

  // Get current track
  const currentTrack = filteredTracks[
    currentTrackIndex < filteredTracks.length ? currentTrackIndex : 0
  ];

  const categoryButtons = [
    { value: "all", label: "All" },
    { value: "workout", label: "Workout" },
    { value: "cardio", label: "Cardio" },
    { value: "cooldown", label: "Cooldown" },
  ];

  return (
    <Card className="bg-black/50 border-purple-800/30 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <span className="bg-purple-900 p-2 rounded-md mr-2">🎵</span>
          Music Player
        </CardTitle>
        <CardDescription className="text-gray-400">
          Workout playlists to boost your performance
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-center mb-4">
          {/* Track visualization */}
          <div className="w-full h-2 bg-gray-800 rounded-full mb-4 overflow-hidden">
            <div 
              className="h-full bg-purple-600 transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          
          {/* Track info */}
          <div className="w-full text-center mb-6">
            <h3 className="text-xl font-bold text-white">
              {currentTrack?.title || "No Track Selected"}
            </h3>
            <p className="text-gray-400">
              {currentTrack?.artist || "Unknown Artist"}
            </p>
            <div className="flex justify-center mt-1">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  currentTrack?.energy === "high" 
                    ? "bg-red-900/50 text-red-400" 
                    : currentTrack?.energy === "medium" 
                    ? "bg-yellow-900/50 text-yellow-400"
                    : "bg-blue-900/50 text-blue-400"
                }`}
              >
                {currentTrack?.energy === "high" 
                  ? "High Energy" 
                  : currentTrack?.energy === "medium" 
                  ? "Medium Energy" 
                  : "Low Energy"}
              </span>
            </div>
          </div>
          
          {/* Player controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button 
              onClick={handlePrevious} 
              variant="outline" 
              size="icon"
              className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button 
              onClick={handlePlay} 
              variant="default" 
              size="icon"
              className="bg-purple-700 hover:bg-purple-600 h-12 w-12 rounded-full"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-1" />
              )}
            </Button>
            
            <Button 
              onClick={handleNext} 
              variant="outline" 
              size="icon"
              className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Additional controls */}
          <div className="flex items-center mt-4 space-x-2 w-full max-w-md">
            <Button 
              onClick={handleRepeatToggle} 
              variant="outline" 
              size="icon"
              className={`border-gray-700 ${repeat ? 'text-purple-500' : 'text-gray-400'} hover:bg-gray-800 hover:text-white`}
            >
              <Repeat className="h-4 w-4" />
            </Button>
            
            <Button 
              onClick={handleShuffleToggle} 
              variant="outline" 
              size="icon"
              className={`border-gray-700 ${shuffle ? 'text-purple-500' : 'text-gray-400'} hover:bg-gray-800 hover:text-white`}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center flex-1 space-x-2 ml-2">
              <Button 
                onClick={handleMuteToggle} 
                variant="ghost" 
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              
              <div className="w-full">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Category filter */}
        <div className="flex justify-center space-x-2 mb-4">
          {categoryButtons.map((btn) => (
            <Button
              key={btn.value}
              variant="outline"
              size="sm"
              className={`text-xs ${
                category === btn.value
                  ? "bg-purple-900 border-purple-700 text-white"
                  : "bg-transparent border-gray-700 text-gray-400 hover:bg-gray-800"
              }`}
              onClick={() => setCategory(btn.value as Track["category"] | "all")}
            >
              {btn.label}
            </Button>
          ))}
        </div>
        
        {/* Playlist */}
        <div className="max-h-48 overflow-y-auto custom-scrollbar">
          {filteredTracks.map((track, index) => (
            <div
              key={`${track.title}-${index}`}
              className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                index === currentTrackIndex
                  ? "bg-purple-900/30 border-l-4 border-purple-500"
                  : "hover:bg-gray-800/50"
              }`}
              onClick={() => {
                setCurrentTrackIndex(index);
                if (!isPlaying) {
                  setIsPlaying(true);
                }
              }}
            >
              <div className="flex items-center">
                <div className="mr-3">
                  {index === currentTrackIndex && isPlaying ? (
                    <div className="flex space-x-0.5">
                      <div className="w-1 h-3 bg-purple-500 animate-pulse"></div>
                      <div className="w-1 h-3 bg-purple-500 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-1 h-3 bg-purple-500 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  ) : (
                    <Music className="h-4 w-4 text-gray-500" />
                  )}
                </div>
                <div>
                  <p className={`text-sm font-medium ${index === currentTrackIndex ? "text-white" : "text-gray-300"}`}>
                    {track.title}
                  </p>
                  <p className="text-xs text-gray-500">{track.artist}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    track.category === "workout" 
                      ? "bg-red-900/50 text-red-400" 
                      : track.category === "cardio" 
                      ? "bg-orange-900/50 text-orange-400"
                      : track.category === "cooldown"
                      ? "bg-blue-900/50 text-blue-400"
                      : "bg-purple-900/50 text-purple-400"
                  }`}
                >
                  {track.category}
                </span>
                <span className="text-xs text-gray-500">{track.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicPlayer;
