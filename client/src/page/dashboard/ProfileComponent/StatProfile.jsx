"use client";

import React, { useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Flag,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Edit,
} from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import EditProfile from "./EditProfile";

const Dashboard = () => {
  const { user, loading, error } = useContext(AuthContext);
  console.log("userrr", user);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    // User is not signed in
    return <p>Please sign in to view your profile.</p>;
  }

  return (
    <>
      {user && (
        <div className="flex flex-col bg-gray-100 dark:bg-gray-900  w-full">
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="container mx-auto px-4 py-8">
                <Card className="mb-8 overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="relative h-48 md:h-64">
                      <img
                        src={user.bannerImage}
                        alt="Cover Image"
                        className="w-full h-full object-cover object-center"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                      {/* Edit Button */}
                      <EditProfile user={user} />
                     

                      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 flex items-end">
                        <Avatar className="w-24 h-24 border-4 border-white md:w-32 md:h-32">
                          <AvatarImage
                            src={user.profileImage}
                            alt={user.name}
                          />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 text-white">
                          <h1 className="text-2xl md:text-3xl font-bold">
                            {user.name}
                          </h1>
                          <p className="text-sm md:text-base">
                            {user.designation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6 pb-8 px-4 md:px-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <MapPin className="w-3 h-3" />
                        {user.address}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Flag className="w-3 h-3" />
                        {user.country}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <GraduationCap className="w-3 h-3" />
                        {user.education}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-6">
                    
                      <Button variant="ghost" size="icon">
                        <Github className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Twitter className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {user.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Followers
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">850</div>
                          <Progress value={85} className="mt-2" />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Following
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">18K</div>
                          <Progress value={90} className="mt-2" />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Posts
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">250</div>
                          <Progress value={25} className="mt-2" />
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Globe className="w-4 h-4 mr-2" />
                          <span>{user.website}</span>
                        </div>
                        <Separator />
                        <div className="flex items-center">
                          <Github className="w-4 h-4 mr-2" />
                          <span>{user.github}</span>
                        </div>
                        <div className="flex items-center">
                          <Linkedin className="w-4 h-4 mr-2" />
                          <span>{user.linkedin}</span>
                        </div>
                        <div className="flex items-center">
                          <Twitter className="w-4 h-4 mr-2" />
                          <span>{user.twitter}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Interests & Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {user.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
