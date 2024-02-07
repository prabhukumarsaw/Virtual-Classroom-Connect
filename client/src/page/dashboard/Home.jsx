import React, { useEffect, useState } from 'react';
import { userData } from "../../assets/data.jsx";
import AllUsers from '../dashboard/AllUsers';
import HeroDashboard from '../../components/HeroDashboard.jsx';
import RecentRoom from '../../components/RecentRoom.jsx';
import TabNavigation from '../../components/TabNavigation.jsx';
import AllFriendList from './AllFriendList.jsx';

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
        {/* Display All User Types */}
        <AllFriendList />
      </div>
    </>
  );
};

export default Home;
