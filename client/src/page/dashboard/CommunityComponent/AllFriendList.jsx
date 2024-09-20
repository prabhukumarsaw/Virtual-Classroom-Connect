import React, { useState } from "react";
import AllUsers from "./AllUsers";
import Friends from "./FriendData";
import Follower from "./FollowerData";

const AllFriendList = () => {
  const [activeTab, setActiveTab] = useState("allUsers");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="inset-y right-0 z-20 flex h-full flex-col lg:w-72 w-full lg:flex-shrink-0  border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header */}
     

      {/* Tabs and Search */}
      <div className="hidden lg:block p-2 flex-shrink-0 border-b border-gray-200 dark:border-gray-800">
        <div className="text-xs text-gray-400 tracking-wider">Community</div>
        <div className="grid grid-cols-3 pt-2 gap-2">
          <div
            className={`cursor-pointer text-xs font-medium  text-center py-2 ${
              activeTab === "allUsers" ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => handleTabChange("allUsers")}
          >
            👨‍👩‍👧‍👦All
          </div>
          <div
            className={`cursor-pointer text-xs font-medium  text-center py-2 ${
              activeTab === "friends" ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => handleTabChange("friends")}
          >
            💖Friends
          </div>
          <div
            className={`cursor-pointer text-xs font-medium text-center py-2 ${
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
      </div>

      {/* Mobile View: Tabs and Search */}
      <div className="lg:hidden p-4 border-b border-gray-200 dark:border-gray-800">
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
        <div className="flex justify-around mt-2">
          <div
            className={`cursor-pointer ${
              activeTab === "allUsers" ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => handleTabChange("allUsers")}
          >
            👨‍👩‍👧‍👦 All
          </div>
          <div
            className={`cursor-pointer ${
              activeTab === "friends" ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => handleTabChange("friends")}
          >
            💖 Friends
          </div>
          <div
            className={`cursor-pointer ${
              activeTab === "follower" ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => handleTabChange("follower")}
          >
            🙏 Followers
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-2">
        {activeTab === "allUsers" && <AllUsers />}
        {activeTab === "friends" && <Friends />}
        {activeTab === "follower" && <Follower />}
      </div>
    </div>
  );
};

export default AllFriendList;
