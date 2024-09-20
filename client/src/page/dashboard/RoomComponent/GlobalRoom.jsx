import React, { useState, useEffect } from "react";
import Card from "@/components/Card.jsx";
import AllFriendList from "../CommunityComponent/AllFriendList";
import axiosInstance from "@/hooks/axiosInstance.jsx";

const Home = () => {
  const [roomsData, setRoomsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/rooms");
        setRoomsData(response.data.rooms);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("An error occurred while fetching users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      
        {/* Left Side: Product List */}
        <div className="flex-1 lg:w-4/5 overflow-y-auto">
          <div className="container flex flex-col ">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
                {roomsData.map((room) => (
                  <Card key={room._id} room={room} />
                ))}
              </div>
            )}
          </div>
          
        </div>

        {/* Right Side: Cart Component */}
        <div className=" hidden lg:flex lg:flex-col lg:w-1/5 border">
          <AllFriendList />
        </div>
    </>
  );
};

export default Home;
