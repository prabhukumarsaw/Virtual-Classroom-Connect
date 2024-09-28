import React, { useRef, useState, useEffect } from "react";
import { FaCog, FaShareSquare } from "react-icons/fa";
import WallpaperControl from "../../components/WallpaperControl";
import WallpaperCardList from "../../components/WallpaperCardList";
import { Button } from "@/components/ui/button";
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const musicTracks = [
  {
    title: "Lofi Study Beats",
    artist: "Chillhop Music",
    src: "/music/lofi-study-beats.mp3",
  },
  {
    title: "Relaxing White Noise",
    artist: "Relaxing White Noise",
    src: "/music/abcd.mp3",
  },
  {
    title: "Classical Piano",
    artist: "Mozart",
    src: "/music/classical-piano.mp3",
  },
];

const RoomNav = ({
  selectedWallpaper,
  handleWallpaperSelect,
  handleWallpaperUpload,
  defaultWallpapers,
}) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // Start playing automatically
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.05); // Initial volume at 5%
  const audioRef = useRef(null);

  // Effect to handle play/pause when isPlaying changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Effect to handle track change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = musicTracks[currentTrack].src; // Ensure the correct track is loaded
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);

  // Set volume initially
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const changeTrack = (direction) => {
    let newTrack = currentTrack + direction;
    if (newTrack < 0) newTrack = musicTracks.length - 1;
    if (newTrack >= musicTracks.length) newTrack = 0;
    setCurrentTrack(newTrack);
    setIsPlaying(true); // Auto-play the new track
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume[0]);
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0];
    }
  };

  const handleVolumeToggle = () => {
    handleVolumeChange([volume === 0 ? 0.05 : 0]); // Toggle between mute and 5% volume
  };

  const handleOpenSettings = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 w-96 bg-opacity-30 bg-gray-800 p-2 flex justify-around items-center backdrop-filter backdrop-blur-md rounded-2xl">
        {/* Music Controls */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => changeTrack(-1)}
            className="text-primary-foreground hover:bg-primary/20"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            className="text-primary-foreground hover:bg-primary/20"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => changeTrack(1)}
            className="text-primary-foreground hover:bg-primary/20"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        {/* Track Info and Volume Controls */}
        <div className="flex items-center space-x-1">
          <div className="flex-1 mx-1">
            <p className="text-xs text-primary-foreground/70">
              {musicTracks[currentTrack].title}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleVolumeToggle}
              className="text-primary-foreground hover:bg-primary/20"
            >
              {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              className="w-24"
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
            />
          </div>
        </div>

        {/* Additional Controls */}
        <button onClick={handleOpenSettings} className="text-white p-2">
          <FaCog />
        </button>
      </div>

      <WallpaperControl
        isDrawerOpen={isDrawerOpen}
        handleCloseDrawer={handleCloseDrawer}
        selectedWallpaper={selectedWallpaper}
        handleWallpaperSelect={handleWallpaperSelect}
        handleWallpaperUpload={handleWallpaperUpload}
        defaultWallpapers={defaultWallpapers}
      />

      <audio ref={audioRef} src={musicTracks[currentTrack].src}>
        Your browser does not support the audio element.
      </audio>
    </>
  );
};

export default RoomNav;
