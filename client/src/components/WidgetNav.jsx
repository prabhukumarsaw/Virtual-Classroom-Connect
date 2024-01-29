import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import UtilDialog from '../components/UtilDialog';


const WidgetNav = ({
  handleShowWidget,
  handleHideWidget,
  handleToggleDrawer,
  YouTube,
  handleVideoSelect,
}) => {
  const [isToggleOpen, setToggleOpen] = useState(false);
  const [isToggleOpenYt, setToggleOpenYt] = useState(false);

  const toggleToggle = () => {
    setToggleOpen(!isToggleOpen);
    // Close YouTube toggle if open
    setToggleOpenYt(false);
  };

  const toggleYoutube = () => {
    setToggleOpenYt(!isToggleOpenYt);
    // Close regular toggle if open
    setToggleOpen(false);
  };

  return (
    <div className="hidden md:block relative">
      <div className="mb-0 bg-opacity-30 bg-gray-800 p-2 flex justify-start items-center backdrop-filter backdrop-blur-md rounded-2xl ">
        {/* Toggle button */}
        <button
          onClick={handleShowWidget}
          className="p-2 bg-green-500 hover:bg-green-700 text-white rounded"
        >
          <FaEye />
        </button>
        <button
          onClick={handleHideWidget}
          className="p-2 bg-red-500 hover:bg-red-700 text-white rounded ml-2"
        >
          <FaEyeSlash />
        </button>
        <button
          onClick={handleToggleDrawer}
          className="p-2 bg-yellow-500 hover:bg-yellow-700 text-white rounded ml-2"
        >
          <GiNotebook />
        </button>
        
        <button
          onClick={toggleToggle}
          className={`p-2 h-8 w-8 ml-2 dark:text-blue-500 rounded-md flex items-center justify-center hover:text-blue-700 relative ${
            isToggleOpen ? "bg-blue-600" : "bg-gray-600"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </button>

        {/* YouTube toggle button */}
        <button
          onClick={toggleYoutube}
          className="p-2  bg-red-600 hover:bg-red-900 text-white rounded ml-2"
        >
          YouTube
        </button>

        {/* Toggle component */}
        {isToggleOpen && (
          <div className="absolute top-full h-screen -left-5 bg-white border border-gray-300 shadow-lg mt-2 rounded-xl p-4 mb-10">
            {/* Content of the toggle component goes here */}
            <UtilDialog toggleYoutube={toggleYoutube} />
          </div>
        )}

        {/* YouTube toggle component */}
        {isToggleOpenYt && (
          <div className="absolute top-full w-[18rem] mr-5  -left-8 bg-white border border-gray-300 shadow-lg mt-2 rounded-md p-1">
            {/* Content of the YouTube toggle component goes here */}
            <YouTube handleVideoSelect={handleVideoSelect} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetNav;