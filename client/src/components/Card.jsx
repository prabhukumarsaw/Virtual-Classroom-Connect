// Card.js
import React from 'react';

// eslint-disable-next-line react/prop-types
const Card = ({ imageUrl, title }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden  rounded-2xl ring-2 ring-blue-950 p-2 shadow-lg">
      <img className="w-full h-auto" src={imageUrl} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
      </div>
    </div>
  );
};

export default Card;
