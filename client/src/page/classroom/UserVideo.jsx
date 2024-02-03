import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Peer from "simple-peer";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-145%, -60%)",
    background: "none",
    border: "none",
  },
};

const UserVideo = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const { roomId } = useParams();
  const socket = useRef();
  const myVideo = useRef();
  const peers = useRef([]);

  const openModal = (user) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalIsOpen(false);
  };

  useEffect(() => {
    socket.current = io.connect("http://localhost:5555");

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        myVideo.current.srcObject = stream;
        socket.current.emit("join-room", roomId);

        socket.current.on("user-connected", (userId) => {
          console.log("User connected:", userId);
          window.alert(`User ${userId} has joined the room!`);
          if (userId !== socket.current.id) {
            connectToNewUser(userId, stream);
          }
        });
      })
      .catch((error) => {
        console.error("Error accessing media:", error);
      });

    socket.current.on("user-disconnected", (userId) => {
      console.log("User disconnected:", userId);
      const peer = peers.current.find((p) => p.id === userId);
      if (peer) {
        peer.peer.destroy();
        peers.current = peers.current.filter((p) => p.id !== userId);
      }
    });

    return () => {
      socket.current.disconnect();
    };
  }, [roomId]);

  const userVideos = useRef({});

  const connectToNewUser = (userId, stream) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
  
    peer.on("signal", (data) => {
      socket.current.emit("new-peer", { userId, signalData: data });
    });
  
    socket.current.on("signal", (data) => {
      if (data.userId === userId) {
        peer.signal(data.signalData);
      }
    });
  
    peer.on("stream", (userVideoStream) => {
      addVideoStream(userVideoStream, userId);
    });
  
    peers.current.push({ id: userId, peer });
  };
  

  const addVideoStream = (stream, userId) => {
    const videoContainer = document.createElement("div");
    videoContainer.className = "relative w-32 h-32";

    const video = document.createElement("video");
    video.srcObject = stream;
    video.setAttribute("playsinline", "true");
    video.play();

    videoContainer.appendChild(video);

    userVideos.current[userId] = video;

    const videoGrid = document.getElementById("video-grid");
    videoGrid.appendChild(videoContainer);
  };

  return (
    <>
      <div className="bg-slate-900 dark:bg-gray-900 dark:border-gray-800 w-32 flex-shrink-0 border-r border-gray-200 flex-col hidden sm:flex">
        <div className="h-16 text-blue-500 flex items-center justify-center">
          <svg
            className="w-9"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 54 33"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div
          className="flex mx-auto flex-grow flex-col text-gray-400 space-y-4"
          style={{
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "thin",
            scrollbarColor: "transparent transparent",
            WebkitOverflowScrolling: "touch",
          }}
        >
          
          <div className="w-28 h-20 bg-gray-300 rounded-2xl overflow-hidden transition duration-300 transform hover:scale-105 cursor-pointer">
            <video ref={myVideo} autoPlay playsInline muted></video>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="User Details Modal"
        style={customStyles}
      >
        {selectedUser && (
          <>
            {/* Add more details as needed */}
            <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-gray-200 shadow-xl rounded-lg text-gray-900">
              <div className="rounded-t-lg h-32 overflow-hidden">
                <img
                  className="object-cover object-top w-full"
                  src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                  alt="Mountain"
                />
              </div>
              <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                <img
                  className="object-cover object-center h-32"
                  src={selectedUser.imageUrl}
                  alt="Woman looking front"
                />
              </div>
              <div className="text-center mt-2">
                <h3 className="font-semibold">
                  {selectedUser.name}, {selectedUser.age}
                </h3>
                <p className="text-gray-500">
                  {selectedUser.education}, {selectedUser.location}
                </p>
              </div>
              <div className="text-left mx-3">
                <h3 className="text-xs font-bold">ABOUT ME</h3>
                <p className="text-gray-500 text-xs font-regular">
                  {selectedUser.about}
                </p>
              </div>
              <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
                <li className="flex flex-col items-center justify-around">
                  <svg
                    className="w-4 fill-current text-blue-900"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <div>{selectedUser.kudos}</div>
                </li>
                <li className="flex flex-col items-center justify-between">
                  <svg
                    className="w-4 fill-current text-blue-900"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
                  </svg>
                  <div>{selectedUser.friends}</div>
                </li>
                <li className="flex flex-col items-center justify-around">
                  <svg
                    className="w-4 fill-current text-blue-900"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                  </svg>
                  <div>{selectedUser.focus_time}</div>
                </li>
              </ul>
              <div className="text-left mx-3">
                <h3 className="text-xs font-bold p-1">INTERESTS</h3>
                {selectedUser.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 text-white py-1 px-2 m-1 rounded-md text-xs "
                  >
                    {interest}
                  </span>
                ))}
              </div>
              <div className="p-3 border-t text-center ">
                <button className="rounded-md bg-gray-900 hover:shadow-lg font-semibold text-white py-1 px-2 m-1 ">
                  Send Kudos
                </button>
                <button className="rounded-md bg-gray-900 hover:shadow-lg font-semibold text-white py-1 px-2 m-1 ">
                  + Add Friend
                </button>
              </div>
              <div className="p-2 text-center border-t ">
                <button className="rounded-md bg-gray-900 hover:shadow-lg font-semibold text-white py-1 px-24 mx-4 ">
                  Send Message
                </button>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default UserVideo;
