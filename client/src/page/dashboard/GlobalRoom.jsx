import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from '../../components/Card.jsx'
import { userData } from "../../assets/data.jsx";
import AllUsers from './AllUsers.jsx'

const Home = () => {
  const [roomsData, setRoomsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5555/rooms/all");
        setRoomsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setError("Error fetching rooms. Please try again."); // Set error state
      setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component mounts




  return (
    <>

    
    
    <div className="flex-grow flex overflow-x-hidden">
    
    <div className="flex-grow dark:bg-gray-900 overflow-y-auto bg-cover bg-center" >
    
    {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-4 m-4">
    { roomsData.map((room) => (
          <Card key={room._id} room={room}  />
        ))}
      </div>
      )}
      </div>
      <div className="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto lg:block hidden p-5">
      

        <div className="text-xs text-gray-400 tracking-wider">Users Community</div>
        <div className="relative mt-2">
          <input type="text" className="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm" placeholder="Search" />
          <svg viewBox="0 0 24 24" className="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <div className="space-y-4 mt-3">
          <AllUsers userData={userData}/>
          
        </div>
      </div>
      </div>
    </>
   
     
  )
}

export default Home