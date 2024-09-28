import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VirtualRoom from "../page/classroom/RoomHome";
import UserVideo from "../page/classroom/UserVideo";
import { AuthContext } from "../context/AuthContext";
import { RoomContext } from "../context/RoomContext";
import Spinner from "../components/Spinner";
import { motion } from "framer-motion";
import { useSocket } from "../hooks/useSocket";
import { toast } from "sonner"

const Room = () => {
  const { user } = useContext(AuthContext);
  const { loading, leaveRoom } = useContext(RoomContext);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const socket = useSocket("http://localhost:5555");
  const [participants, setParticipants] = useState([]);

  const { _id, name } = user || {};

  const handleExitRoom = async () => {
    const confirmExit = window.confirm(
      "Are you sure you want to leave the room?"
    );
    if (!confirmExit) return;

    try {
      await leaveRoom(roomId);
      socket.emit("leaveRoom", { roomId, userId: _id });
      navigate("/main");
    } catch (error) {
      console.error("Error leaving room:", error);
    }
  };

  useEffect(() => {
    if (user && _id) {
      socket.emit("joinRoom", { roomId, userId: _id });

      // Listen for updated participant list
      socket.on("participantList", (updatedParticipants) => {
        setParticipants(updatedParticipants);
      });

      // Listen for user leaving
      socket.on("userLeft", (data) => {
        setParticipants((prev) =>
          prev.filter((participant) => participant._id !== data.userId)
        );
      });

      return () => {
        socket.emit("leaveRoom", { roomId, userId: _id });
      };
    }
  }, [roomId, user, socket, _id]);

  
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-1 overflow-hidden">
            <motion.aside
              className="w-full lg:w-[10%] xl:w-[10%] 2xl:w-[10%] bg-white dark:bg-gray-800 shadow-lg overflow-hidden"
              initial={{ x: "1%" }}
              animate={{ x: "1%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="h-full flex flex-col p-1">
                <UserVideo />
                
              </div>
            </motion.aside>
            <motion.main
              className="flex-1 "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
            
              <VirtualRoom participants={participants}/>
            </motion.main>
          
          </div>
        </>
      )}
    </div>
  );
};

export default Room;
