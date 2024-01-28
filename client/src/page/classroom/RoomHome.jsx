import React, { useState } from 'react';
import wallpaper_1 from '../../assets/wallpaper/1.jpg';
import wallpaper_2 from '../../assets/wallpaper/background.gif';
import wallpaper_3 from '../../assets/wallpaper/library.png';
import wallpaper_4 from '../../assets/wallpaper/maxresdefault.jpg';
import wallpaper_5 from '../../assets/wallpaper/thumbnail.jpg';
import RoomNav from './RoomNav';
import Timer from '../../components/TimerWidget';
import WidgetNav from '../../components/WidgetNav'
import TaskWidget from '../../components/TaskWidget';
import GlobalChat from './GlobalChat';

const defaultWallpapers = [
  wallpaper_1,
  wallpaper_2,
  wallpaper_3,
  wallpaper_4,
  wallpaper_5,
  // Add more default wallpapers as needed
];

const RoomHome = () => {
  const [selectedWallpaper, setSelectedWallpaper] = useState(defaultWallpapers[0]);
  const [isWidgetHidden, setIsWidgetHidden] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleToggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleWallpaperSelect = (wallpaper) => {
    setSelectedWallpaper(wallpaper);
  };

  const handleWallpaperUpload = (event) => {
    const uploadedWallpaper = event.target.files[0];
    setSelectedWallpaper(URL.createObjectURL(uploadedWallpaper));
  };

  

  const handleShowWidget = () => {
    setIsWidgetHidden(false);
  };

  const handleHideWidget = () => {
    setIsWidgetHidden(true);
  };

  return (
    <div className="flex-grow flex flex-col h-screen p-0 sm:flex-row overflow-hidden relative bg-cover  bg-center"  style={{
        backgroundImage: selectedWallpaper ? `url(${selectedWallpaper})` : 'none',
        backgroundAttachment: 'fixed',
      }}>
      <div
        className="flex-grow dark:bg-gray-900 overflow-y-auto sm:w-3/4 "
       
      >
        {/* Content of the virtual classroom */}
        {/* ... */}
        mgos_dns_sd_advertisedc
      </div>
      <div className="xl:w-72 w-full sm:w-1/4 flex-shrink-0 border-r  p-5">
        <div className="text-xs text-gray-400 tracking-wider">
          <WidgetNav handleShowWidget={handleShowWidget} handleHideWidget={handleHideWidget} handleToggleDrawer={handleToggleDrawer}/>
        </div>
       
        <Timer isHidden={isWidgetHidden}  />
        <GlobalChat isHidden={isWidgetHidden}  />

        <TaskWidget isDrawerOpen={isDrawerOpen} handleToggleDrawer={handleToggleDrawer} size={96}/>
      </div>

      


      <RoomNav selectedWallpaper={selectedWallpaper}
            handleWallpaperSelect={handleWallpaperSelect}
            handleWallpaperUpload={handleWallpaperUpload}
            defaultWallpapers={defaultWallpapers}
            />
    </div>
  );
};

export default RoomHome;
