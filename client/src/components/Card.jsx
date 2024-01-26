// Card.js
import React from "react";

// eslint-disable-next-line react/prop-types
const Card = ({ imageUrl, title }) => {
  return (
    <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-4 bg-white shadow-xl rounded-lg text-gray-900">
      <div className="relative rounded-t-lg h-32 overflow-hidden">
        <img
          className="object-cover object-top w-full"
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          alt="Mountain"
        />
        <div className="absolute top-0 left-0 p-4">
        <span className="ml-auto text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-green-100 text-grey-300 rounded-md hover:bg-slate-200"> Live</span>
        </div>
        <div className="absolute top-0 right-0 p-4">
          <div className="flex rounded-md mx-auto bg-gradient-to-tr from-violet-400 to-green-400 p-1 shadow-lg">
            <span className="flex font-mono  bg-white px-1 py-1 rounded-md ">
              👻12/30
            </span>
          </div>
        </div>
      </div>
      <div className="ml-4 w-12 h-12 relative -mt-8 border-2 border-white rounded-full overflow-hidden">
        <img
          className="object-cover object-center h-12"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          alt="Woman looking front"
        />
      </div>

      <div className="p-3 flex items-center justify-between ">
        <div className="flex items-center ">
          <div className="ml-2 flex flex-col">
            <div className="leading-snug text-sm text-gray-900 font-bold">
              Jane doe
            </div>
            <div className="leading-snug text-xs text-gray-600 pr-1">
              Join my study room to boost your focus & get stuff done together!
              📚
            </div>
          </div>
        </div>
        <button className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-md hover:bg-blue-100">
          Join
        </button>
      </div>
    </div>
  );
};

export default Card;
