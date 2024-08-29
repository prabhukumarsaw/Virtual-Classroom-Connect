import React, { useState } from "react";
import wallpaper_1 from "../../assets/wallpaper/1.jpg";
import wallpaper_2 from "../../assets/wallpaper/background.gif";
import wallpaper_3 from "../../assets/wallpaper/library.png";
import wallpaper_4 from "../../assets/wallpaper/maxresdefault.jpg";
import wallpaper_5 from "../../assets/wallpaper/thumbnail.jpg";
import RoomNav from "./RoomNav";
import Timer from "../../components/TimerWidget";
import WidgetNav from "../../components/WidgetNav";
import TaskWidget from "../../components/TaskWidget";
import GlobalChat from "./GlobalChat";
import YouTubePlayer from "react-youtube";
import YouTube from "../../components/YouTubeDialog";
import { FaBackward, FaStop } from "react-icons/fa";



const defaultWallpapers = [
  wallpaper_1,
  wallpaper_2,
  wallpaper_3,
  wallpaper_4,
  wallpaper_5,
  // Add more default wallpapers as needed
];

const RoomHome = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedWallpaper, setSelectedWallpaper] = useState(
    defaultWallpapers[0]
  );
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

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleStop = () => {
    setSelectedVideo(null);
  };

  const handleGoBack = ( ) => {
    // Implement go back functionality
  };

  return (
    <div
      className="flex-grow flex flex-col h-full m rounded-xl p-0 sm:flex-row overflow-hidden relative bg-cover  bg-center"
      style={{
        backgroundImage: selectedWallpaper
          ? `url(${selectedWallpaper})`
          : "none",
        backgroundAttachment: "fixed",
      }}
    >
      
      <div className="flex-grow mx-8  overflow-y-auto sm:w-3/4 ">
      <div>
  {/* Add youtube Dialog */}
  {selectedVideo && (
    <div className="youtube-player w-full lg:w-1/2 mt-4 lg:mt-0">
      <div className="flex justify-end my-4">
        <button
          onClick={handleStop}
          className="bg-red-500 text-white p-2 rounded-md mr-2"
        >
          <FaStop />
        </button>
        {/* <button
          onClick={handleGoBack}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          <FaBackward /> Go Back
        </button> */}
      </div>
      <YouTubePlayer
        videoId={selectedVideo.id.videoId}
        // Set specific width and height for the player
        opts={{ width: '200%', height: '500px' }}
      />
      {/* <div className="mt-2">
        <p className="truncate whitespace-normal overflow-hidden text-pretty">
          {selectedVideo.snippet.title}
        </p>
      </div> */}
    </div>
  )}
</div>

      </div>
      <div className="xl:w-72 w-full sm:w-1/4 flex-shrink-0 border-r  p-5">
        <div className="text-xs text-gray-400 tracking-wider">
          <WidgetNav
            YouTube={YouTube}
            handleVideoSelect={handleVideoSelect}
            handleShowWidget={handleShowWidget}
            handleHideWidget={handleHideWidget}
            handleToggleDrawer={handleToggleDrawer}
          />
        </div>

        <Timer isHidden={isWidgetHidden} />
        <GlobalChat isHidden={isWidgetHidden} />

        <TaskWidget
          isDrawerOpen={isDrawerOpen}
          handleToggleDrawer={handleToggleDrawer}
          size={96}
        />
      </div>

      <RoomNav
        selectedWallpaper={selectedWallpaper}
        handleWallpaperSelect={handleWallpaperSelect}
        handleWallpaperUpload={handleWallpaperUpload}
        defaultWallpapers={defaultWallpapers}
      />
    </div>
  );
};

export default RoomHome;
