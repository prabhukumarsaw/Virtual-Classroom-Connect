import React, { useEffect, useState } from 'react';
import { userData } from "../../assets/data.jsx";
import AllUsers from '../dashboard/AllUsers';
import HeroDashboard from '../../components/HeroDashboard.jsx';
import RecentRoom from '../../components/RecentRoom.jsx';
import TabNavigation from '../../components/TabNavigation.jsx';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    // Fetch rooms from the server
    // Example: fetchRooms().then(data => setRooms(data));
    // Make sure to handle errors in the fetchRooms function
  }, []); // Include an empty dependency array to run the effect only once on mount

  const handleCreateRoom = async (roomData) => {
    try {
      // Create a new room on the server
      // Example: createRoom(roomData).then(data => setRooms([...rooms, data]));
      // Make sure to handle errors in the createRoom function
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleJoinRoom = (roomId) => {
    // Set the selected room for video conference
    setSelectedRoom(roomId);
  };

  const handleLeaveRoom = () => {
    // Leave the current room
    setSelectedRoom(null);
  };

  return (
    <>
      <div className="flex-grow flex overflow-x-hidden">
        <div className="flex-grow dark:bg-gray-900 overflow-y-auto bg-cover bg-center">
          <HeroDashboard handleCreateRoom={handleCreateRoom} />
          <TabNavigation />
          {!selectedRoom ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 m-4">
              {rooms.map((room) => (
                <RecentRoom
                  key={room._id}
                  name={room.name}
                  description={room.description}
                  maxParticipants={room.maxParticipants}
                  onJoinRoom={() => handleJoinRoom(room._id)}
                />
              ))}
            </div>
          ) : (
            " "
          )}
        </div>
        <div className="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto lg:block hidden p-5">
          <div className="text-xs text-gray-400 tracking-wider">Users Community</div>
          <div className="relative mt-2">
            <input
              type="text"
              className="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm"
              placeholder="Search"
            />
            <svg
              viewBox="0 0 24 24"
              className="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-2"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <div className="space-y-4 mt-3">
            <AllUsers userData={userData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
