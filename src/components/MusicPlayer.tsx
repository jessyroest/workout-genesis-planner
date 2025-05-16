
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { formatTime } from '@/utils/aiUtils';

interface Song {
  title: string;
  artist: string;
  duration: number;
  cover: string;
  url: string;
  category: string;
}

interface MusicPlayerProps {
  workoutType?: string; // e.g. "cardio", "strength", "cooldown"
}

// Sample song data - in a real app, this would come from an API
const SONGS: Song[] = [
  {
    title: "Warrior Spirit",
    artist: "Power Training",
    duration: 218,
    cover: "/images/workout-music-1.jpg",
    url: "/audio/bg-music.mp3", // Using the existing audio file
    category: "strength"
  },
  {
    title: "Ultimate Pump",
    artist: "Gym Heroes",
    duration: 195,
    cover: "/images/workout-music-1.jpg",
    url: "/audio/bg-music.mp3",
    category: "strength"
  },
  {
    title: "Maximum Effort",
    artist: "Iron Will",
    duration: 203,
    cover: "/images/workout-music-1.jpg",
    url: "/audio/bg-music.mp3",
    category: "cardio"
  },
  {
    title: "Zen Flow",
    artist: "Mind & Muscle",
    duration: 265,
    cover: "/images/workout-music-1.jpg",
    url: "/audio/bg-music.mp3",
    category: "cooldown"
  }
];

const MusicPlayer = ({ workoutType = "strength" }: MusicPlayerProps) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Filter songs by workout type
    const filteredSongs = SONGS.filter(song => 
      song.category === workoutType || workoutType === "all"
    );
    
    if (filteredSongs.length > 0) {
      setSongs(filteredSongs);
      setCurrentSongIndex(0);
    } else {
      setSongs(SONGS);
    }
    
    // Initialize audio element
    audioRef.current = new Audio(SONGS[0].url);
    audioRef.current.volume = volume;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [workoutType]);

  useEffect(() => {
    if (!audioRef.current) return;
    
    const handleEnded = () => {
      // Go to next song when current song ends
      if (currentSongIndex < songs.length - 1) {
        setCurrentSongIndex(prev => prev + 1);
      } else {
        setCurrentSongIndex(0); // Loop back to the first song
      }
    };
    
    audioRef.current.addEventListener('ended', handleEnded);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, [currentSongIndex, songs]);

  // When song changes, update the audio source
  useEffect(() => {
    if (!audioRef.current || songs.length === 0) return;
    
    audioRef.current.src = songs[currentSongIndex].url;
    audioRef.current.load();
    
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentSongIndex, songs]);

  // Start/stop the timer when playing state changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play();
      
      intervalRef.current = window.setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      }, 1000);
    } else {
      audioRef.current.pause();
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(prev => prev - 1);
    } else {
      setCurrentSongIndex(songs.length - 1); // Go to the last song
    }
  };

  const handleNextSong = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(prev => prev + 1);
    } else {
      setCurrentSongIndex(0); // Loop back to the first song
    }
  };

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return;
    
    const newTime = value[0];
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Current song info
  const currentSong = songs[currentSongIndex] || {
    title: "No song available",
    artist: "",
    duration: 0,
    cover: "/images/workout-music-1.jpg"
  };

  return (
    <Card className="bg-black/50 border-purple-800/30 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <span className="bg-purple-900 p-2 rounded-md mr-2">🎵</span>
          Workout Music
        </CardTitle>
        <CardDescription className="text-gray-400">
          Music to power your training
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          {/* Album Cover */}
          <div className="flex-shrink-0 w-16 h-16 relative">
            <img 
              src={currentSong.cover}
              alt="Album cover"
              className="w-full h-full object-cover rounded-md"
              onError={(e) => {
                e.currentTarget.src = '/images/ronnie-coleman.jpg'; // Fallback image
              }}
            />
            <div className={`absolute inset-0 flex items-center justify-center bg-black/50 rounded-md ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
              <Play className="h-8 w-8" />
            </div>
          </div>
          
          {/* Song Info and Controls */}
          <div className="flex-grow">
            <div className="mb-1">
              <div className="font-bold truncate">{currentSong.title}</div>
              <div className="text-xs text-gray-400 truncate">{currentSong.artist}</div>
            </div>
            
            {/* Progress Bar */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">
                {formatTime(Math.floor(currentTime))}
              </span>
              <Slider
                defaultValue={[0]}
                value={[currentTime]}
                max={currentSong.duration}
                step={1}
                onValueChange={handleSeek}
                className="flex-grow h-1"
              />
              <span className="text-xs text-gray-400">
                {formatTime(currentSong.duration)}
              </span>
            </div>
            
            {/* Controls */}
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 hover:bg-gray-800"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Slider
                  defaultValue={[0.7]}
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.01}
                  onValueChange={(value) => setVolume(value[0])}
                  className="w-16 h-1"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 hover:bg-gray-800"
                  onClick={handlePrevSong}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  variant="default"
                  size="icon"
                  className="rounded-full h-10 w-10 bg-purple-800 hover:bg-purple-700"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 hover:bg-gray-800"
                  onClick={handleNextSong}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="w-[72px]"></div> {/* Empty div to balance the layout */}
            </div>
          </div>
        </div>
        
        {/* Playlist */}
        <div className="mt-4">
          <h4 className="font-medium text-sm text-gray-400 mb-2">Recommended Tracks</h4>
          <div className="space-y-1 max-h-32 overflow-y-auto custom-scrollbar">
            {songs.map((song, index) => (
              <div
                key={`${song.title}-${index}`}
                className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-800/50 ${
                  currentSongIndex === index ? 'bg-purple-900/30 border border-purple-800/50' : ''
                }`}
                onClick={() => {
                  setCurrentSongIndex(index);
                  setIsPlaying(true);
                }}
              >
                <div className="flex-shrink-0 w-8 h-8 mr-2">
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-full h-full object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = '/images/ronnie-coleman.jpg';
                    }}
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="font-medium text-sm truncate">{song.title}</div>
                  <div className="text-xs text-gray-500 truncate">{song.artist}</div>
                </div>
                <div className="text-xs text-gray-500">
                  {formatTime(song.duration)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicPlayer;
