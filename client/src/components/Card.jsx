import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";




const Card = ({ room, creatorName }) => {
  const { _id, roomName, roomDescription ,selectedImage } = room;

  const {  user } = useContext(AuthContext);
  const { classId } = useParams();

  return (
    <div key={_id} className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-4 shadow-xl rounded-lg text-white-900"  style={{background:'#353D48'}}>
      <div className="relative rounded-t-lg h-32 overflow-hidden">
        <img
          className="object-cover object-top w-full"
          src={selectedImage}
          alt="Mountain"
        />
        {/* <div className="absolute top-0 left-0 p-4">
          {active && (
            <span className="ml-auto text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-green-100 text-grey-300 rounded-md hover:bg-slate-200">
              Live
            </span>
          )}
        </div> */}
        {/* <div className="absolute top-0 right-0 p-4">
          <div className="flex rounded-md mx-auto bg-gradient-to-tr from-violet-400 to-green-400 p-1 shadow-lg">
            <span className="flex font-mono  bg-white px-1 py-1 rounded-md ">
              👻{participants.length}/{maxParticipants}
            </span>
          </div>
        </div> */}
      </div>
      <div className="ml-4 w-12 h-12 relative -mt-8 border-2 border-white rounded-full overflow-hidden">
        <img
          className="object-cover object-center h-12"
          src={user.photoURL}
          alt=""
        />
      </div>
              

      <div className="p-3 flex items-center justify-between "  >
        <div className="flex items-center">
          <div className="ml-2 flex flex-col">
            <div className="leading-snug text-sm text-white  font-bold">{roomName}</div>
            <div className="leading-snug text-xs text-gray-400 pr-1">{roomDescription}</div>
          </div>
        </div>
        <Link to={`/virualroom/${room._id}`} className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-md hover:bg-blue-100">
          Join
        </Link>
      </div>
    </div>
  );
};



export default Card;
