import React from "react";
import VirtualRoom from '../page/classroom/RoomHome'
import UserVideo from "../page/classroom/UserVideo";
const Room = () => {
  return (
    <div>
      <div className=" dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
      <UserVideo/>
        <div className="flex-grow overflow-hidden h-full flex flex-col ">
          <div className="flex-grow flex overflow-x-hidden">
            <div className="flex-grow  dark:bg-gray-900 overflow-y-auto">
              <VirtualRoom/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
