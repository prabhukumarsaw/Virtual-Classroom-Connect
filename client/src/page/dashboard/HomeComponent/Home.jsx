import React, { useEffect, useState } from "react";
import HeroDashboard from "@/components/HeroDashboard.jsx";
import AllFriendList from "../CommunityComponent/AllFriendList";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CreateRoom from "../RoomComponent/CreateRoom";

const Home = () => {
 
  return (
    <>
      {/* Left Side: Product List */}
      <div className="flex-1 lg:w-4/5 overflow-y-auto">
        <div className="container flex flex-col ">
          <HeroDashboard />
        </div>

        <div className="container  ">
          <Card className="flex flex-col justify-center  rounded-xl border sm:mx-8">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                Create a Vibrant Virtual Room
              </CardTitle>

              <div className=" flex justify-between">
                <CardDescription className="hidden md:flex">
                  Design your perfect virtual space with vivid colors, exciting
                  images, and features!
                </CardDescription>

                <CreateRoom />
              </div>
            </CardHeader>
          </Card>
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
