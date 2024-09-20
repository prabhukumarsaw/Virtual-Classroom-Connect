import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Users, Lock, Unlock, Eye, EyeOff } from "lucide-react";
import { useInView } from "react-intersection-observer";

const EnhancedRoomCard = ({ room }) => {
  const {
    _id,
    title,
    description,
    theme,
    maxParticipants,
    participants = [],
    isActive,
    owner,
    roomType,
  } = room;

  const [isHovered, setIsHovered] = useState(false);
  const [participantProgress, setParticipantProgress] = useState(0);
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  });

  useEffect(() => {
    setParticipantProgress((participants.length / maxParticipants) * 100);
  }, [participants.length, maxParticipants]);

  const getBackgroundStyle = () => {
    if (Array.isArray(theme) && theme.length > 0) {
      const themeValue = theme[0];
      if (typeof themeValue === "string" && themeValue.startsWith("#")) {
        return { backgroundColor: themeValue };
      } else if (typeof themeValue === "string") {
        return {
          backgroundImage: `url(${themeValue})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        };
      }
    }
    return { backgroundColor: "#4a5568" }; // Default background color
  };

  const isImageTheme =
    Array.isArray(theme) &&
    theme.length > 0 &&
    typeof theme[0] === "string" &&
    !theme[0].startsWith("#");

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.03, transition: { duration: 0.3 } },
  };

  const handleJoin = () => {
    if (roomType === "private") {
      setIsJoining(true);
    } else {
      // Implement public room join logic here
      console.log("Joining public room:", _id);
    }
  };

  const handleSubmitPasscode = () => {
    if (passcode !== room.passcode) {
      alert("Incorrect passcode");
      return;
    }
    // Implement successful join logic here
    console.log("Joining private room:", _id);
    setIsJoining(false);
  };

  const passcodeInputVariants = {
    hidden: { opacity: 0, height: 0, y: -20 },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <TooltipProvider>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        whileHover="hover"
        variants={cardVariants}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="w-full max-w-sm mx-auto"
      >
        <Card className="overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl">
          <CardHeader
            className="relative p-0 h-24 md:h-32 lg:h-32"
            style={getBackgroundStyle()}
          >
            {isImageTheme && (
              <img
                src={theme[0]}
                alt={title}
                className="rounded-t-lg"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-30 " />
            <div className="absolute top-2 left-2 flex items-center space-x-2">
              <Badge
                variant={isActive ? "success" : "destructive"}
                className="text-xs font-bold"
              >
                {isActive ? "Active" : "Inactive"}
              </Badge>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="secondary" className="text-xs">
                    <Users className="w-3 h-3 mr-1" />
                    {participants.length}/{maxParticipants}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Current participants / Max participants</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute bottom-2 left-2 right-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Progress value={participantProgress} className="h-2" />
                </motion.div>
              )}
            </AnimatePresence>
          </CardHeader>
          <CardContent className="p-4 space-y-4">

          <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              {/* <p className="text-sm text-gray-300 line-clamp-2">
                {description}
              </p> */}
              <Tooltip>
                <TooltipTrigger>
                  {roomType === "private" ? (
                    <Lock className="w-5 h-5" />
                  ) : (
                    <Unlock className="w-5 h-5" />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {roomType === "private" ? "Private Room" : "Public Room"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="border-2 border-white">
                  <AvatarImage
                    src={owner.profileImage || "/default-avatar.png"}
                    alt={owner.name}
                  />
                  <AvatarFallback>{owner.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{owner.name}</p>
                  <p className="text-xs text-gray-400">Room Owner</p>
                </div>
              </div>
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-10">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-10">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-10">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content w-10">
                    <span>+99</span>
                  </div>
                </div>
              </div>
            </div>
         
            <div className="flex justify-between items-center text-xs text-gray-400">
              <div></div>
            </div>
          </CardContent>
          <CardFooter className="p-4 bg-gray-800 flex flex-col space-y-2">
            <AnimatePresence>
              {isJoining && (
                <motion.div
                  className="w-full"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={passcodeInputVariants}
                >
                  <div className="relative flex-grow mb-2">
                    <Input
                      type={showPasscode ? "text" : "password"}
                      placeholder="Enter passcode"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      className="w-full bg-gray-700 text-white pr-10"
                    />
                    <button
                      onClick={() => setShowPasscode(!showPasscode)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPasscode ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <Button
                    onClick={handleSubmitPasscode}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    Submit Passcode
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            {!isJoining && (
              <Button
                onClick={handleJoin}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Join Room
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
};

export default EnhancedRoomCard;
