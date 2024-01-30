import React from "react";
import PropTypes from "prop-types";

const Card = ({ room }) => {
  const { _id, name, description, participants, maxParticipants, active, } = room;

  return (
    <div key={_id} className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-4 bg-white shadow-xl rounded-lg text-gray-900">
      <div className="relative rounded-t-lg h-32 overflow-hidden">
        <img
          className="object-cover object-top w-full"
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          alt="Mountain"
        />
        <div className="absolute top-0 left-0 p-4">
          {active && (
            <span className="ml-auto text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-green-100 text-grey-300 rounded-md hover:bg-slate-200">
              Live
            </span>
          )}
        </div>
        <div className="absolute top-0 right-0 p-4">
          <div className="flex rounded-md mx-auto bg-gradient-to-tr from-violet-400 to-green-400 p-1 shadow-lg">
            <span className="flex font-mono  bg-white px-1 py-1 rounded-md ">
              👻{participants.length}/{maxParticipants}
            </span>
          </div>
        </div>
      </div>

      
      {participants.map((participant) => (
        
        <div key={participant.user._id} className="ml-4 w-12 h-12 relative -mt-8 border-2 border-white rounded-full overflow-hidden">
        <img
                className="object-cover object-center h-8 w-8 rounded-full"
                src={participant.imageUrl || "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_640.png"}
                alt={participant.fullname}
              />
              <div className="leading-snug text-xs text-gray-600 pr-1"> {participant.username}
              </div>
        </div>

        
      ))}

      <div className="p-3 flex items-center justify-between ">
        <div className="flex items-center ">
          <div className="ml-2 flex flex-col">
            <div className="leading-snug text-sm text-gray-900 font-bold">{name}</div>
            <div className="leading-snug text-xs text-gray-600 pr-1">{description}</div>
          </div>
        </div>
        <button className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-md hover:bg-blue-100">
          Join
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  room: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    description: PropTypes.string.isRequired,
    participants: PropTypes.array.isRequired,
    maxParticipants: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Card;
