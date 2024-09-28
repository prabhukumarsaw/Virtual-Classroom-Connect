"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Drawer } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  X,
  Menu,
  Upload,
  Image as ImageIcon,
  Youtube,
  Clock,
  MessageSquare,
  ListTodo,
  Music,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  BookOpen,
  Users,
  Video,
  Settings,
  Sun,
  Moon,
  LayoutPanelLeft,
  Wallpaper,
} from "lucide-react";

// Assuming these components exist in your project
import Timer from "@/components/TimerWidget";
import MusicNav from "./RoomNav";
import GlobalChat from "./GlobalChat";
import TaskWidget from "@/components/TaskWidget";
import YouTube from "@/components/YouTubeDialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "postcss";

const defaultWallpapers = [
  "/assets/wallpaper/1.jpg?height=1080&width=1920",
  "/assets/wallpaper/background.gif?height=1080&width=1920",
  "/assets/wallpaper/library.png?height=1080&width=1920",
  "/assets/wallpaper/maxresdefault.jpg?height=1080&width=1920",
  "/assets/wallpaper/thumbnail.jpg?height=1080&width=1920",
];

export default function Component(participants) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedWallpaper, setSelectedWallpaper] = useState(
    defaultWallpapers[0]
  );
  const [isWidgetHidden, setIsWidgetHidden] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("timer");

  const [isDarkMode, setIsDarkMode] = useState(false);

  const [isWidgetPanelOpen, setIsWidgetPanelOpen] = useState(false);
  const [activeWidget, setActiveWidget] = useState("timer");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleToggleDrawer = () => setDrawerOpen(!isDrawerOpen);
  const handleWallpaperSelect = (wallpaper) => setSelectedWallpaper(wallpaper);
  const handleWallpaperUpload = (event) =>
    setSelectedWallpaper(URL.createObjectURL(event.target.files[0]));
  const handleShowWidget = () => setIsWidgetHidden(false);
  const handleHideWidget = () => setIsWidgetHidden(true);
  const handleVideoSelect = (video) => setSelectedVideo(video);
  const handleStop = () => setSelectedVideo(null);

  const toggleWidgetPanel = () => {
    setIsWidgetPanelOpen(!isWidgetPanelOpen);
  };

  return (
    <div
      className="flex flex-col h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${selectedWallpaper})` }}
    >
      <div className="absolute inset-0 " />
      <header className="relative z-10 p-4 flex justify-between items-center">
        <div></div>

        <nav className="flex space-x-2">
          <Sheet open={isWidgetPanelOpen} onOpenChange={setIsWidgetPanelOpen}>
            <SheetTrigger asChild>
              <Button
                onClick={toggleWidgetPanel}
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary/20"
              >
                <BookOpen className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Widgets</SheetTitle>
                <SheetDescription>
                  Access your productivity tools here.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4">
                <Tabs value={activeWidget} onValueChange={setActiveWidget}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="timer">Timer</TabsTrigger>
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                    <TabsTrigger value="youtube">YouTube</TabsTrigger>
                  </TabsList>
                  <TabsContent value="timer">
                    <Card>
                      <CardContent>ds</CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="tasks">
                    <Card>
                      <CardContent>sda</CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="notes">
                    <Card>
                      <CardContent>sad</CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="youtube">
                    <Card>
                      <CardContent>
                        <div className="flex space-x-2 mb-4">
                          <Input
                            type="text"
                            placeholder="Search YouTube"
                            className="flex-grow"
                          />
                          <Button
                            onClick={() =>
                              handleVideoSelect({
                                id: { videoId: "dQw4w9WgXcQ" },
                                snippet: { title: "Never Gonna Give You Up" },
                              })
                            }
                          >
                            Search
                          </Button>
                        </div>
                        {selectedVideo && (
                          <div className="mt-4">
                            <div className="aspect-video">
                              <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                              <h4 className="text-lg font-semibold">
                                {selectedVideo.snippet.title}
                              </h4>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={handleStop}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </SheetContent>
          </Sheet>
          <Drawer open={isDrawerOpen} onOpenChange={setDrawerOpen} side="right">
            <div className="p-4   h-full">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-[300px]"
              >
                <TabsList className="grid w-full grid-cols-5 bg-primary/10">
                  <TabsTrigger
                    value="timer"
                    className="data-[state=active]:bg-primary/20"
                  >
                    <Clock className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="chat"
                    className="data-[state=active]:bg-primary/20"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="notes"
                    className="data-[state=active]:bg-primary/20"
                  >
                    <BookOpen className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="wallpaper"
                    className="data-[state=active]:bg-primary/20"
                  >
                    <Wallpaper className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="youtube"
                    className="data-[state=active]:bg-primary/20"
                  >
                    <Youtube className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="timer">
                  <Card className=" bg-transparent border-transparent">
                    <CardContent className="p-4">
                      <Timer isHidden={isWidgetHidden} />
                    </CardContent>
                    <CardContent className="p-4">
                      <GlobalChat isHidden={isWidgetHidden} participants={participants} />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notes">
                  <Card className="bg-card/50 backdrop-blur-md">
                    <CardContent className="p-4">
                      <TaskWidget
                        isDrawerOpen={isDrawerOpen}
                        handleToggleDrawer={handleToggleDrawer}
                      
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="wallpaper">
                  <Card className="bg-card/50 backdrop-blur-md">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-3 gap-4">
                        {defaultWallpapers.map((wallpaper, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            onClick={() => handleWallpaperSelect(wallpaper)}
                            className="p-0 h-auto aspect-video overflow-hidden rounded-md"
                          >
                            <img
                              src={wallpaper}
                              alt={`Wallpaper ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </Button>
                        ))}
                      </div>
                      <div className="relative mt-2">
                      <Button
                        variant="outline"
                        className="w-full mt-4 bg-primary/10 text-primary-foreground hover:bg-primary/20"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleWallpaperUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Custom Wallpaper
                      </Button>
                   </div>
                   
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="youtube">
                  <Card className="bg-card/50 backdrop-blur-md">
                    <CardContent className="p-4">
                      <YouTube handleVideoSelect={handleVideoSelect} />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </Drawer>
        </nav>
      </header>
      <main className="relative z-10 flex-grow flex overflow-hidden">
        <ScrollArea className="flex-grow p-6">
          <AnimatePresence>
            {selectedVideo && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="w-full max-w-3xl mx-auto bg-card/80 backdrop-blur-md rounded-lg overflow-hidden shadow-lg"
              >
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-primary-foreground">
                    {selectedVideo.snippet.title}
                  </h3>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={handleStop}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </main>
      {/* <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="absolute top-4 left-4 bg-primary/10 text-primary-foreground hover:bg-primary/20"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change Wallpaper
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-background/80 backdrop-blur-xl">
          <div className="grid grid-cols-3 gap-4">
            {defaultWallpapers.map((wallpaper, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => handleWallpaperSelect(wallpaper)}
                className="p-0 h-auto aspect-video overflow-hidden rounded-md"
              >
                <img
                  src={wallpaper}
                  alt={`Wallpaper ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            className="w-full mt-4 bg-primary/10 text-primary-foreground hover:bg-primary/20"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleWallpaperUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Upload className="h-4 w-4 mr-2" />
            Upload Custom Wallpaper
          </Button>
        </DialogContent>
      </Dialog> */}
      <footer className="relative z-10 p-4 ">
        <MusicNav
          selectedWallpaper={selectedWallpaper}
          handleWallpaperSelect={handleWallpaperSelect}
          handleWallpaperUpload={handleWallpaperUpload}
          defaultWallpapers={defaultWallpapers}
        />{" "}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className=" absolute bottom-4 right-4 text-primary-foreground hover:bg-primary/20"
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6" />
          ) : (
            <Moon className="h-6 w-6" />
          )}
        </Button>
      </footer>
    </div>
  );
}
