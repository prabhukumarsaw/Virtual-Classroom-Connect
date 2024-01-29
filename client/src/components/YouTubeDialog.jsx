// YouTube.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import YouTubePlayer from "react-youtube";
import { FaSearch, FaBackward, FaStop } from "react-icons/fa";

const YouTube = ({handleVideoSelect}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 15;

  useEffect(() => {
    const fetchYouTubeData = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              part: "snippet",
              q: searchQuery,
              type: "video",
              maxResults: 20,
              key: "AIzaSyA1-3516ZvB44BaJgHBk8gyOMgTJUEMTNk", // Replace with your YouTube API key 
            },
          }
        );

        setSearchResults(response.data.items);
      } catch (error) {
        console.error("Error fetching YouTube data:", error);
      }
    };

    fetchYouTubeData();
  }, [searchQuery]);

  const handleSearch = () => {
    setCurrentPage(1);
  };



  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = searchResults.slice(indexOfFirstVideo, indexOfLastVideo);

  const renderVideoList = currentVideos.map((result) => (
    <div
      key={result.id.videoId}
      className="search-result cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center"
      onClick={() => handleVideoSelect(result)}
    >
      <img
        src={result.snippet.thumbnails.default.url}
        alt={result.snippet.title}
        className="mr-2 w-auto h-auto"
      />
      <p className="truncate whitespace-normal overflow-hidden text-pretty mt-1">
        {result.snippet.title}
      </p>
    </div>
  ));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(searchResults.length / videosPerPage); i++) {
    pageNumbers.push(i);
  }

 

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-4">
      <div className="flex-grow lg:w-1/2">
        <div className="flex items-stretch my-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search YouTube..."
            className="flex-grow p-2 border rounded-l-md focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-r-md focus:outline-none"
          >
            <FaSearch />
          </button>
        </div>
        <hr/>

        <div className="search-results overflow-y-auto max-h-[32rem] mt-4">
          {renderVideoList}
          {/* Pagination */}
          <div className="flex mt-4">
            {pageNumbers.map((number) => (
              <div
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`cursor-pointer p-2 mx-1 rounded-md ${
                  number === currentPage ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`}
              >
                {number}
              </div>
            ))}
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default YouTube;
