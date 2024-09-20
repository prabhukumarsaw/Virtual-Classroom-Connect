import React, { useContext, useEffect, useRef, useState } from "react";
import { FaMicrophone, FaVideo, FaDesktop, FaUserFriends, FaEllipsisH, FaTimes } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { AuthContext } from "../../context/AuthContext";

const Video = ({ peer, userVideo, videoRef }) => {
    const ref = useRef();
  
    useEffect(() => {
      const currentRef = userVideo ? videoRef : ref;
      if (peer && currentRef.current) {
        peer.on("stream", (stream) => {
          currentRef.current.srcObject = stream;
        });
      }
    }, [userVideo, peer, videoRef]);
  
    return <video playsInline autoPlay ref={userVideo ? videoRef : ref} />;
  };
  
  

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const Onlinemeet = () => {
  const [peers, setPeers] = useState([]);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [screenShareEnabled, setScreenShareEnabled] = useState(false);

  const socketRef = useRef();
  const userVideo = useRef();
  const screenCapture = useRef();
  const peersRef = useRef([]);
  const { roomId } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const roomID = roomId;
    socketRef.current = io('http://localhost:5555/');
    console.log("Socket connected:", socketRef.current.connected);
  
    navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        console.log("initiated socket", roomID);
  
        socketRef.current.emit("join room", {
          roomID,
          username: user.email,
          userProfilePic: user.PhotoURL,
        });
  
        socketRef.current.on("all users", (users) => {
          console.log("All users:", users);
          const newPeers = users.map((user) => {
            const peer = createPeer(user.socketID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: user.socketID,
              peer,
            });
            return { ...user, peer };
          });
  
          setPeers(newPeers);
        });
  
        socketRef.current.on("user joined", (payload) => {
          console.log("User joined:", payload);
          const peer = addPeer(payload.signal, payload.callerID, stream);
  
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });
  
          setPeers((users) => [...users, { peer, ...payload.userInfo }]);
        });
  
        socketRef.current.on("receiving returned signal", (payload) => {
          console.log("Receiving returned signal:", payload);
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
  
        socketRef.current.on("user left", (socketID) => {
          console.log("User left:", socketID);
          const peerToRemove = peersRef.current.find((p) => p.peerID === socketID);
          if (peerToRemove) peerToRemove.peer.destroy();
  
          const updatedPeersRef = peersRef.current.filter((p) => p.peerID !== socketID);
          peersRef.current = updatedPeersRef;
  
          setPeers(updatedPeersRef.map(({ peer, ...userInfo }) => ({ peer, ...userInfo })));
        });
      })
      .catch((error) => {
        console.error("Error accessing user media:", error);
      });
  
    return () => {
      // Cleanup logic (disconnect socket, stop tracks, etc.)
      socketRef.current.disconnect();
      userVideo.current.srcObject.getTracks().forEach((track) => track.stop());
    };
  }, [roomId, user.email, user.PhotoURL]);
  
  const createPeer = (userToSignal, callerID, stream) => {
    console.log("Creating peer:", userToSignal, callerID);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
        console.log("Creating peer:", signal);
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerID, stream) => {
    console.log("Adding peer:", incomingSignal, callerID, stream);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  const muteUnmuteAudio = () => {
    const enabled = userVideo.current.srcObject.getAudioTracks()[0].enabled;
    userVideo.current.srcObject.getAudioTracks()[0].enabled = !enabled;
    setAudioEnabled(!enabled);
  };

  const muteUnmuteVideo = () => {
    const enabled = userVideo.current.srcObject.getVideoTracks()[0].enabled;
    userVideo.current.srcObject.getVideoTracks()[0].enabled = !enabled;
    setVideoEnabled(!enabled);
  };

  const toggleScreenSharing = async () => {
    if (!screenShareEnabled) {
      try {
        screenCapture.current = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        screenCapture.current.getTracks()[0].onended = switchBackToUserVideo;
        userVideo.current.srcObject = screenCapture.current;
        setScreenShareEnabled(true);

        peersRef.current.forEach(({ peer }) => {
          peer.streams[0].getVideoTracks()[0].stop();
          peer.replaceTrack(
            peer.streams[0].getVideoTracks()[0],
            screenCapture.current.getVideoTracks()[0],
            peer.streams[0]
          );
        });
      } catch (err) {
        console.error("Error occurred when trying to get screen sharing stream", err);
      }
    } else {
      screenCapture.current.getTracks().forEach((track) => track.stop());
      switchBackToUserVideo();
    }
  };

  const switchBackToUserVideo = async () => {
    console.log("Switching back to user video");
    setScreenShareEnabled(false);
    userVideo.current.srcObject = await navigator.mediaDevices.getUserMedia({
      video: videoConstraints,
      audio: true,
    });
    if (!audioEnabled)
      userVideo.current.srcObject.getAudioTracks()[0].enabled = false;
    if (!videoEnabled)
      userVideo.current.srcObject.getVideoTracks()[0].enabled = false;

    peersRef.current.forEach(({ peer }) => {
      peer.streams[0].getVideoTracks()[0].stop();
      peer.replaceTrack(
        peer.streams[0].getVideoTracks()[0],
        userVideo.current.srcObject.getVideoTracks()[0],
        peer.streams[0]
      );
    });
  };

  const leaveMeeting = () => {
    socketRef.current.disconnect();
    userVideo.current.srcObject.getTracks().forEach((track) => track.stop());
  };

  return (
    <div className="onlinemeet">
      <div className="wrapper">
        <div className="video-section">
          <Video userVideo muted videoRef={userVideo} autoPlay playsInline />

          <div className="controls gap-4 m-4">
            <button className={`btn ${audioEnabled ? 'active' : ''}`} onClick={muteUnmuteAudio}>
              <FaMicrophone />
            </button>
            <button className={`btn ${videoEnabled ? 'active' : ''}`} onClick={muteUnmuteVideo}>
              <FaVideo />
            </button>
            <button className={`btn mobile-hide ${screenShareEnabled ? 'active' : ''}`} onClick={toggleScreenSharing}>
              <FaDesktop />
            </button>
            <button className="btn mobile-hide rounded-md bg-red-900 hover:shadow-lg font-semibold text-white py-1 px-4 mx-4">
              <FaUserFriends />
            </button>
            <button className="btn mobile-hide rounded-md bg-red-900 hover:shadow-lg font-semibold text-white py-1 px-4 mx-4">
              <FaEllipsisH />
            </button>
            <button className="leaveBtn rounded-md bg-red-900 hover:shadow-lg font-semibold text-white py-1 px-4 mx-4 " onClick={leaveMeeting}>
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="screens-section">
          

          <div className="screens-section">
          <div className="heading">
            <FaUserFriends /> ({peers.length}) All Screens
          </div>

          <div className="screens">
            {peers.map(({ username, socketID, peer }) => (
              <div className="screen" key={socketID}>
                <Video key={socketID} peer={peer} />
                <p>{username.split(" ")[0]}</p>
              </div>
            ))}
          </div>
        </div>
        </div>

        <div className="right-panel" id="rightPanel">
          {/* Right panel content */}
        </div>
      </div>
    </div>
  );
};

export default Onlinemeet;
