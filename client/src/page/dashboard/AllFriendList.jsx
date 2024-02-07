import React, { useState } from 'react'
import AllUsers from './AllUsers.jsx'
import Friends from './FriendData.jsx'
import Follower from './FollowerData'

const AllFriendList = () => {
    const [activeTab, setActiveTab] = useState("allUsers");
    const handleTabChange = (tab) => {
        setActiveTab(tab);
      };
  return (
    <>
        <div className="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto lg:block hidden p-5">
      <div className="text-xs text-gray-400 tracking-wider">Users Community</div>
      <div className="grid grid-cols-3 pt-2 mx-1">
        <div
          className={`cursor-pointer ${
            activeTab === "allUsers" ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => handleTabChange("allUsers")}
        >
          👨‍👩‍👧‍👦All
        </div>
        <div
          className={`cursor-pointer ${
            activeTab === "friends" ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => handleTabChange("friends")}
        >
          💖Friends
        </div>
        <div
          className={`cursor-pointer ${
            activeTab === "follower" ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => handleTabChange("follower")}
        >
          🙏Followers
        </div>
      </div>
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
      

      {/* Render the content based on the active tab */}
      {activeTab === "allUsers" && <AllUsers />}
      {activeTab === "friends" && <Friends />}
      {activeTab === "follower" && <Follower />}
    </div>
    </>
  )
}

export default AllFriendList