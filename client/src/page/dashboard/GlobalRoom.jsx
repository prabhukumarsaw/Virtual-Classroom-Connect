import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from '../../components/Card.jsx';
import AllFriendList from "./AllFriendList.jsx";

const Home = () => {
  const [roomsData, setRoomsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access-token");
        const response = await axios.get("http://localhost:5555/rooms/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRoomsData(response.data.rooms);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setError("Error fetching rooms. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  

  return (
    <>
      <div className="flex-grow flex overflow-x-hidden">
        <div className="flex-grow dark:bg-gray-900 overflow-y-auto bg-cover bg-center">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 m-4">
              {roomsData.map((room) => (
                <Card key={room._id} room={room}  />
              ))}
            </div>
          )}
        </div>
        <AllFriendList />
      </div>
    </>
  );
};

export default Home;
