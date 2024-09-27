"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Mic, MicOff, Video, VideoOff, Pin, PinOff, MoreVertical, MessageSquare, Crown, Hand, BadgeInfo } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const participants = [
  { id: 1, name: "John Doe", avatar: "/placeholder.svg?height=100&width=100", muted: false, videoOff: false, role: "Host", email: "john@example.com", handRaised: false, speaking: true },
  { id: 2, name: "Jane Smith", avatar: "/placeholder.svg?height=100&width=100", muted: true, videoOff: false, role: "Participant", email: "jane@example.com", handRaised: true, speaking: false },
  { id: 3, name: "Alice Johnson", avatar: "/placeholder.svg?height=100&width=100", muted: false, videoOff: true, role: "Participant", email: "alice@example.com", handRaised: false, speaking: false },
  { id: 4, name: "John Doe", avatar: "/placeholder.svg?height=100&width=100", muted: false, videoOff: false, role: "Host", email: "john@example.com", handRaised: false, speaking: true },
  { id: 5, name: "Jane Smith", avatar: "/placeholder.svg?height=100&width=100", muted: true, videoOff: false, role: "Participant", email: "jane@example.com", handRaised: true, speaking: false },
  { id: 6, name: "Alice Johnson", avatar: "/placeholder.svg?height=100&width=100", muted: false, videoOff: true, role: "Participant", email: "alice@example.com", handRaised: false, speaking: false },
  { id: 7, name: "Bob Brown", avatar: "/placeholder.svg?height=100&width=100", muted: false, videoOff: false, role: "Participant", email: "bob@example.com", handRaised: false, speaking: false },

  { id: 4, name: "Bob Brown", avatar: "/placeholder.svg?height=100&width=100", muted: false, videoOff: false, role: "Participant", email: "bob@example.com", handRaised: false, speaking: false },
]

const VideoCard = ({ participant, onClick, isPinned, onPin, onHandRaise }) => {
  const [isHovered, setIsHovered] = useState(false)
  const audioLevel = useMotionValue(0)
  const audioLevelHeight = useTransform(audioLevel, [0, 100], [0, 32])

  useEffect(() => {
    if (participant.speaking) {
      const interval = setInterval(() => {
        audioLevel.set(Math.random() * 100)
      }, 100)
      return () => clearInterval(interval)
    } else {
      audioLevel.set(0)
    }
  }, [participant.speaking, audioLevel])

  return (
    <motion.div
      layoutId={`participant-${participant.id}`}
      className="relative group mb-4"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div 
        className="w-full h-32 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-lg overflow-hidden shadow-lg cursor-pointer"
        onClick={onClick}
      >
        {participant.videoOff ? (
          <div className="w-full h-full flex items-center justify-center">
            <Avatar className="h-16 w-16">
              <AvatarImage src={participant.avatar} alt={participant.name} />
              <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <video autoPlay playsInline muted className="w-full h-full object-cover"></video>
        )}
        <motion.div
          className="absolute bottom-0 left-0 w-1 bg-green-500"
          style={{ height: audioLevelHeight }}
        />
      </div>
      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
        <span className="text-white text-xs font-medium truncate bg-black bg-opacity-50 px-2 py-1 rounded-full">
          {participant.name}
          {participant.role === "Host" && (
            <Crown className="inline-block ml-1 h-3 w-3 text-yellow-400" />
          )}
        </span>
        <div className="flex space-x-1">
          {participant.handRaised && <BadgeInfo className="text-yellow-400 h-4 w-4" />}
  
          {participant.videoOff ? <VideoOff className="text-red-500 h-4 w-4" /> : <Video className="text-green-500 h-4 w-4" />}
        </div>
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-2 right-2 flex space-x-1"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-black bg-opacity-50 hover:bg-opacity-75"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPin(participant.id);
                    }}
                  >
                    {isPinned ? <PinOff className="h-4 w-4 text-white" /> : <Pin className="h-4 w-4 text-white" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isPinned ? "Unpin participant" : "Pin participant"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
         
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const ParticipantDetails = ({ participant, onClose }) => {
  return (
    <Dialog open={!!participant} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Participant Details</DialogTitle>
          <DialogDescription>View information about {participant?.name}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={participant?.avatar} alt={participant?.name} />
              <AvatarFallback>{participant?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{participant?.name}</h3>
              <Badge variant={participant?.role === "Host" ? "default" : "secondary"}>{participant?.role}</Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-sm">{participant?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <div className="flex items-center space-x-2">
                {participant?.muted ? <MicOff className="text-red-500 h-4 w-4" /> : <Mic className="text-green-500 h-4 w-4" />}
                {participant?.videoOff ? <VideoOff className="text-red-500 h-4 w-4" /> : <Video className="text-green-500 h-4 w-4" />}
                {participant?.handRaised && <Hand className="text-yellow-400 h-4 w-4" />}
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Connection Quality</p>
            <Progress value={66} className="w-full" />
          </div>
        </div>
        <DialogClose asChild>
          <Button type="button" variant="secondary">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

const AdvancedVideoCardList = () => {
  const [selectedParticipant, setSelectedParticipant] = useState(null)
  const [pinnedParticipant, setPinnedParticipant] = useState(null)
  const [localParticipants, setLocalParticipants] = useState(participants)
  const scrollAreaRef = useRef(null)

  const handlePin = (participantId) => {
    setPinnedParticipant(pinnedParticipant === participantId ? null : participantId)
  }

  const handleHandRaise = (participantId) => {
    setLocalParticipants(prevParticipants =>
      prevParticipants.map(p =>
        p.id === participantId ? { ...p, handRaised: !p.handRaised } : p
      )
    )
  }

  const sortedParticipants = [...localParticipants].sort((a, b) => {
    if (a.id === pinnedParticipant) return -1
    if (b.id === pinnedParticipant) return 1
    if (a.handRaised && !b.handRaised) return -1
    if (!a.handRaised && b.handRaised) return 1
    return 0
  })

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0
    }
  }, [pinnedParticipant])

  return (
    <div className="h-full flex">
     
      <ScrollArea className="flex-grow" ref={scrollAreaRef}>
        <div className="space-y-2">
          {sortedParticipants.map((participant) => (
            <VideoCard
              key={participant.id}
              participant={participant}
              onClick={() => setSelectedParticipant(participant)}
              isPinned={participant.id === pinnedParticipant}
              onPin={handlePin}
              onHandRaise={handleHandRaise}
            />
          ))}
        </div>
      </ScrollArea>
      <AnimatePresence>
        {selectedParticipant && (
          <ParticipantDetails
            participant={selectedParticipant}
            onClose={() => setSelectedParticipant(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdvancedVideoCardList