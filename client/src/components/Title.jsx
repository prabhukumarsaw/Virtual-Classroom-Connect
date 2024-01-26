import React from "react";
import SoloCard from "./SoloCard";
import CreateCard from "./CreateCard";

const Title = () => {
  return (
    <div className="mx-auto mt-16 mb-20 text-center p-6">
      <h2 className=" mb-12 text-center block w-full bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-4xl sm:text-4xl">
        ALONE, BUT NEVER LONELY
      </h2>
      <div className="mx-auto max-w-3xl items-stretch space-y-4 text-left sm:flex sm:space-y-0 sm:space-x-8 sm:text-center">
        
        <div
          className="flex w-full items-center"
        >
          <CreateCard/>
        </div>
        <div
          className="flex w-full items-center "
        
        >
          <SoloCard/>
        </div>
        
       
      </div>
    </div>
  );
};

export default Title;
