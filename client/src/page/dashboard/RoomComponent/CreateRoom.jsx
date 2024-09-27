import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"

import { motion, AnimatePresence } from 'framer-motion'
import { HexColorPicker } from "react-colorful"

import { Link, useNavigate, useRouteError } from 'react-router-dom'
import axiosInstance from '@/hooks/axiosInstance'

const themeImages = [
  { name: 'Nature', url: '/assets/wallpaper/1.jpg' },
  { name: 'Nature1', url: '/assets/wallpaper/background.gif' },
  { name: 'Nature2', url: '/assets/wallpaper/library.png' },
  { name: 'Nature3', url: '/assets/wallpaper/maxresdefault.jpg' },
  { name: 'Nature4', url: '/assets/wallpaper/thumbnail.jpg' },
  { name: 'Urban', url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2l0eXxlbnwwfHwwfHx8MA%3D%3D' },
  { name: 'Abstract', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWJzdHJhY3R8ZW58MHx8MHx8fDA%3D' },
  { name: 'Tech', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D' },
]

export default function Component() {
  const [isOpen, setIsOpen] = useState(false)
  const [roomData, setRoomData] = useState({
    title: '',
    description: '',
    themeType: 'color',
    themeColor: '#3b82f6',
    themeImage: themeImages[0].url,
    roomType: 'public',
    passcode: '',
    maxParticipants: 10
  })
  const [showColorPicker, setShowColorPicker] = useState(false)
  const router = useRouteError()
  const navigate = useNavigate();

  useEffect(() => {
    if (roomData.themeType === 'color') {
      document.body.style.setProperty('--theme-color', roomData.themeColor)
    } else {
      document.body.style.setProperty('--theme-image', `url(${roomData.themeImage})`)
    }
  }, [roomData.themeColor, roomData.themeImage, roomData.themeType])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setRoomData(prev => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked) => {
    setRoomData(prev => ({ ...prev, roomType: checked ? 'private' : 'public' }))
  }

  const handleSliderChange = (value) => {
    setRoomData(prev => ({ ...prev, maxParticipants: value[0] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (roomData.roomType === 'private' && !roomData.passcode.trim()) {
      toast({
        title: "Error",
        description: "Passcode is required for private rooms.",
        variant: "destructive",
      });
      return;
    }
  
    // Prepare data to submit
    const roomDataToSubmit = {
      title: roomData.title,
      description: roomData.description,
      theme: roomData.themeType === 'color' ? [roomData.themeColor] : [roomData.themeImage],
      roomType: roomData.roomType,
      maxParticipants: roomData.maxParticipants,
    };
  
    // Include passcode only if roomType is private
    if (roomData.roomType === 'private') {
      roomDataToSubmit.passcode = roomData.passcode;
    }
  
    try {
      const response = await axiosInstance.post('/rooms', roomDataToSubmit);
      if (response.data.success) {
        toast({
          title: "Success",
          description: "Virtual room created successfully!",
        });
        setIsOpen(false);
        // setTimeout(() => {
        //   navigate(`/room/${response.data.room.roomId}`);
        // }, 1000);
      }
      console.log("Room Detail", response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred while creating the room.",
        variant: "destructive",
      });
    }
  };
  
  

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white border-none"
        >
          Create Virtual Room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            Create a Vibrant Virtual Room
          </DialogTitle>
          <DialogDescription>
            Design your perfect virtual space with vivid colors, exciting images, and features!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Label htmlFor="title" className="text-lg font-semibold">Room Title</Label>
            <Input 
              id="title" 
              name="title" 
              value={roomData.title} 
              onChange={handleInputChange} 
              required 
              className="border-2 border-gray-300 focus:border-blue-500 transition-all duration-300"
            />
          </motion.div>
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Label htmlFor="description" className="text-lg font-semibold">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={roomData.description} 
              onChange={handleInputChange} 
              required 
              className="border-2 border-gray-300 focus:border-blue-500 transition-all duration-300"
            />
          </motion.div>
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Label className="text-lg font-semibold">Theme Type</Label>
            <RadioGroup 
              defaultValue={roomData.themeType} 
              onValueChange={(value) => setRoomData(prev => ({ ...prev, themeType: value }))}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="color" id="theme-color" />
                <Label htmlFor="theme-color">Color</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="image" id="theme-image" />
                <Label htmlFor="theme-image">Image</Label>
              </div>
            </RadioGroup>
          </motion.div>
          <AnimatePresence>
            {roomData.themeType === 'color' ? (
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Label htmlFor="themeColor" className="text-lg font-semibold">Theme Color</Label>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300"
                    style={{ backgroundColor: roomData.themeColor }}
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  />
                  <span>{roomData.themeColor}</span>
                </div>
                {showColorPicker && (
                  <HexColorPicker 
                    color={roomData.themeColor} 
                    onChange={(color) => setRoomData(prev => ({ ...prev, themeColor: color }))} 
                  />
                )}
              </motion.div>
            ) : (
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Label htmlFor="themeImage" className="text-lg font-semibold">Theme Image</Label>
                <Select 
                  onValueChange={(value) => setRoomData(prev => ({ ...prev, themeImage: value }))}
                  defaultValue={roomData.themeImage}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a theme image" />
                  </SelectTrigger>
                  <SelectContent>
                    {themeImages.map((image) => (
                      <SelectItem key={image.name} value={image.url}>
                        <div className="flex items-center space-x-2">
                          <img src={image.url} alt={image.name} width={50} height={50} className="rounded-md" />
                          <span>{image.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-2">
                  <img src={roomData.themeImage} alt="Selected theme" width={200} height={100} className="rounded-md object-cover" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Switch 
              id="roomType" 
              checked={roomData.roomType === 'private'} 
              onCheckedChange={handleSwitchChange}
              className="data-[state=checked]:bg-green-500"
            />
            <Label htmlFor="roomType" className="text-lg font-semibold">Private Room</Label>
          </motion.div>
          <AnimatePresence>
            {roomData.roomType === 'private' && (
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Label htmlFor="passcode" className="text-lg font-semibold">Passcode</Label>
                <Input 
                  id="passcode" 
                  name="passcode" 
                  type="password" 
                  value={roomData.passcode} 
                  onChange={handleInputChange}
                  className="border-2 border-gray-300 focus:border-blue-500 transition-all duration-300"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Label htmlFor="maxParticipants" className="text-lg font-semibold">
              Max Participants: {roomData.maxParticipants}
            </Label>
            <Slider
              id="maxParticipants"
              min={0}
              max={50}
              step={1}
              value={[roomData.maxParticipants]}
              onValueChange={handleSliderChange}
              className="[&_[role=slider]]:bg-blue-500"
            />
          </motion.div>
          <DialogFooter>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
            >
              Create Room
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}