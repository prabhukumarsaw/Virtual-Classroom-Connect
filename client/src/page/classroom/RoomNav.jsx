import React, { useState } from 'react';
import { FaPlay, FaPause, FaCog, FaChevronLeft, FaChevronRight, FaVideo, FaShareSquare } from 'react-icons/fa';
import WallpaperControl from '../../components/WallpaperControl';
import WallpaperCardList from '../../components/WallpaperCardList';

const RoomNav = ({selectedWallpaper,handleWallpaperSelect,handleWallpaperUpload,defaultWallpapers}) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggleMusic = () => {
    setIsMusicPlaying((prev) => !prev);
  };

  const handleNavigateLeft = () => {
    // Implement your logic for navigating left
  };

  const handleNavigateRight = () => {
    // Implement your logic for navigating right
  };

  const handleOpenVideoSettings = () => {
    // Implement your logic for opening video settings
  };

  const handleScreenShare = () => {
    // Implement your logic for screen sharing
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
  {/* Your content here */}{/* Music Play/Stop Button */}
  <button onClick={handleToggleMusic} className="text-white p-2">
    {isMusicPlaying ? <FaPause /> : <FaPlay />}
  </button>
  {/* Navigation Controls */}
  <div className="flex items-center space-x-4">
  <WallpaperCardList/>
  </div>
  {/* Video Settings Button */}
  <button onClick={handleOpenVideoSettings} className="text-white p-2">
    <FaVideo />
  </button>
  {/* Screen Share Button */}
  <button onClick={handleScreenShare} className="text-white p-2">
    <FaShareSquare />
  </button>
  {/* General Settings Button with Drawer */}
  <button onClick={handleOpenSettings} className="text-white p-2">
    <FaCog />
  </button>
</div>


<WallpaperControl isDrawerOpen={isDrawerOpen} handleCloseDrawer={handleCloseDrawer} selectedWallpaper={selectedWallpaper}
            handleWallpaperSelect={handleWallpaperSelect}
            handleWallpaperUpload={handleWallpaperUpload}
            defaultWallpapers={defaultWallpapers}
            />
     

    
    </>
  );
};

export default RoomNav;



