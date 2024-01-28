import React from 'react'

const VideoCard = ({user, openModal}) => {
  return (

    <div
        onClick={openModal}
        className="w-28 h-20 bg-gray-300 rounded-2xl overflow-hidden transition duration-300 transform hover:scale-105 cursor-pointer"
      >
    <img src={user.imageUrl} className="w-full h-full object-cover" alt="Online Avatar" />
    <div className="w-3 h-3 bg-green-500 border-2 border-white rounded-full absolute top-1 left-2"></div>
  </div>
  )
}

export default VideoCard