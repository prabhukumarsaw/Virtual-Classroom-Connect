import React, { useState } from "react";
import SoloCard from "./SoloCard";
import CreateRoom from "../page/dashboard/CreateRoom";
import { Link } from "react-router-dom";

const Title = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div className="mx-auto mt-16 mb-20 text-center p-6">
      <h2 className=" mb-12 text-center block w-full bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-4xl sm:text-4xl">
        ALONE, BUT NEVER LONELY
      </h2>
      <div className="mx-auto max-w-3xl items-stretch space-y-4 text-left sm:flex sm:space-y-0 sm:space-x-8 sm:text-center">
        <Link onClick={() => setModalOpen(true)} className="flex w-full items-center">
          <div className="max-w-2xl h-32 mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-4 bg-white shadow-xl rounded-lg text-gray-900 group overflow-hidden relative">
            <img
              className="object-cover object-top w-full transition-transform transform group-hover:scale-105"
              src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="Mountain"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-bold mt-2">Create Room</h2>
              </div>
            </div>
          </div>
        </Link>
        <CreateRoom isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
        <div className="flex w-full items-center ">
          <SoloCard />
        </div>
      </div>
    </div>
  );
};

export default Title;
