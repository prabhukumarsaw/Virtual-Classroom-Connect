// Card.js
import React from "react";

// eslint-disable-next-line react/prop-types
const SoloCard = ({ imageUrl, title }) => {
  return (
    <div className="max-w-2xl h-32 mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-4 bg-white shadow-xl rounded-lg text-gray-900 group overflow-hidden relative">
    <img
      className="object-cover object-top w-full transition-transform transform group-hover:scale-105"
      src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
      alt="Mountain"
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        
        <h2 className="text-2xl font-bold mt-2">Join Solo</h2>
      </div>
    </div>
  </div>
 
  );
};

export default SoloCard;
