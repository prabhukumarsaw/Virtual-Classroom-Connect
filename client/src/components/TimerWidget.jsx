// ResponsiveTimerWidget.js

import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaRedo, FaEyeSlash } from 'react-icons/fa';

const ResponsiveTimerWidget = ({ isHidden }) => {
  const [duration, setDuration] = useState(25 * 60); // 25 minutes default duration
  const [isActive, setIsActive] = useState(false);

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setDuration(25 * 60);
  };

  const handleSetTime = () => {
    const newTime = parseInt(prompt('Enter custom time in minutes'), 10);
    if (!isNaN(newTime) && newTime > 0) {
      setDuration(newTime * 60);
    }
  };

  const handleToggleVisibility = () => {
    setIsActive(false); // Pause the timer if it's running when hiding
    setIsHidden(!isHidden);
  };

  useEffect(() => {
    let interval;

    if (isActive && duration > 0) {
      interval = setInterval(() => {
        setDuration((prevDuration) => prevDuration - 1);
      }, 1000);
    }

    if (duration === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, duration]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  return (
    <div className={`container  p-4 bg-card/50 backdrop-blur-md rounded-lg shadow-md ${isHidden ? 'hidden' : 'block'}`}>
      
      <div className={`text-center text-4xl font-bold mb-4`}>
        {formatTime(duration)}
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4">
        <button
          onClick={handleStartPause}
          className={`text-white p-2 rounded ${isActive ? 'bg-pink-500 hover:bg-pink-700' : 'bg-blue-500 hover:bg-blue-700'}`}
        >
          {isActive ? <FaPause /> : <FaPlay />}
        </button>
        <button
          onClick={handleReset}
          className="text-white p-2 bg-red-500 hover:bg-red-700 rounded"
        >
          <FaRedo />
        </button>
        <button
          onClick={handleSetTime}
          className="text-white p-2 bg-green-500 hover:bg-green-700 rounded"
        >
          Set Time
        </button>
      </div>
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>{isActive ? 'Timer is running' : 'Timer is paused'}</p>
      </div>
    </div>
  );
};

export default ResponsiveTimerWidget;
