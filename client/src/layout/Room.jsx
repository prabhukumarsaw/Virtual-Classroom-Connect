import React from "react";
import { Link, Outlet } from "react-router-dom";
import AllUsers from "../page/dashboard/AllUsers";
import UserVideo from "../page/classroom/UserVideo";

const Room = () => {
  return (
    <div>
      <div className=" dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
        <div className="bg-slate-900 dark:bg-gray-900 dark:border-gray-800 w-32 flex-shrink-0 border-r border-gray-200 flex-col hidden sm:flex ">
          <div className="h-16 text-blue-500 flex items-center justify-center">
            <svg
              className="w-9"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 54 33"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div
            className="flex mx-auto flex-grow flex-col text-gray-400 space-y-4"
            style={{
              overflowY: "auto",
              overflowX: "hidden", // Stop horizontal scrolling
              scrollbarWidth: "thin",
              
    scrollbarColor: 'transparent transparent',
              WebkitOverflowScrolling: "touch", // Add this for smooth scrolling on iOS
            }}
          >
            <UserVideo />
          </div>
        </div>

        <div className="flex-grow overflow-hidden h-full flex flex-col ">
          <div className="flex-grow flex overflow-x-hidden">
            <div className="flex-grow  dark:bg-gray-900 overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
