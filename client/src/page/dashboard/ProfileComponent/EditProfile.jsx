"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import axiosInstance from "@/hooks/axiosInstance";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .optional(),
  address: z
    .string()
    .min(5, {
      message: "Address must be at least 5 characters.",
    })
    .optional(),
  country: z
    .string()
    .min(2, {
      message: "Please select a country.",
    })
    .optional(),
  education: z
    .string()
    .min(2, {
      message: "Education must be at least 2 characters.",
    })
    .optional(),
  interests: z
    .array(z.string())
    .min(1, {
      message: "Please add at least one interest.",
    })
    .optional(),
  designation: z
    .string()
    .min(2, {
      message: "Designation must be at least 2 characters.",
    })
    .optional(),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .optional(),
  profileImage: z
    .string()
    .url({
      message: "Please enter a valid URL for the profile image.",
    })
    .optional(),
  bannerImage: z
    .string()
    .refine(
      (value) => {
        return value.startsWith("/") || value.startsWith("http"); // Accepts both relative and absolute URLs
      },
      {
        message:
          "Please enter a valid relative path or URL for the banner image.",
      }
    )
    .optional(),
});

export default function AdvancedUserForm({ user }) {
  const [open, setOpen] = useState(false);
  const [interests, setInterests] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      country: "",
      education: "",
      interests: [],
      designation: "",
      description: "",
      profileImage: "",
      bannerImage: "",
    },
  });

  console.log("sjac", user._id);

  const { handleSubmit, control, setValue } = form;

  // Fetch user data when form is opened
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/users/${user._id}`); // Adjust the endpoint as needed
        const userData = response.data.user;
        console.log("sjauserDatac", userData.user);

        // Set form values and interests
        setInterests(userData.interests || []);
        form.reset({
          name: userData.name || "",
          address: userData.address || "",
          country: userData.country || "",
          education: userData.education || "",
          interests: userData.interests || [],
          designation: userData.designation || "",
          description: userData.description || "",
          profileImage: userData.profileImage || "",
          bannerImage: userData.bannerImage || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Error fetching user data.");
      }
    };

    if (open) {
      fetchUserData();
    }
  }, [open]);

  const onSubmit = async (values) => {
    try {
      // Convert relative path to full URL
      if (values.bannerImage) {
        values.bannerImage = `${window.location.origin}${values.bannerImage}`;
      }

      console.log(values); // Debugging to see what values are being sent
      await axiosInstance.put(`/users/${user._id}`, values);
      alert("Profile updated successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile.");
    }
  };

  const addInterest = (interest) => {
    if (interest && !interests.includes(interest)) {
      const updatedInterests = [...interests, interest];
      setInterests(updatedInterests);
      setValue("interests", updatedInterests);
    }
  };

  const removeInterest = (interest) => {
    const updatedInterests = interests.filter((i) => i !== interest);
    setInterests(updatedInterests);
    setValue("interests", updatedInterests);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="absolute top-2 right-2 p-2 bg-white text-black rounded-full shadow-md hover:bg-gray-200"
          onClick={() => console.log("Edit Banner Image Clicked")}
        >
          ✏️
        </button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-sm w-full overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit User Profile</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Main St, City, Country"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Bachelor's in Computer Science"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interests</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2 h-auto p-0"
                            onClick={() => removeInterest(interest)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                      <Input
                        placeholder="Add interest"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addInterest(e.currentTarget.value);
                            e.currentTarget.value = "";
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Press Enter to add an interest
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="profileImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/profile.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="bannerImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner Image</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a banner image" />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="grid grid-cols-3">
                          {/* Provide predefined banner image options */}
                          {[
                            { src: "/bannerImg/1.jpg", alt: "Banner 1" },
                            { src: "/bannerImg/2.jpg", alt: "Banner 2" },
                            { src: "/bannerImg/3.jpg", alt: "Banner 3" },
                            { src: "/bannerImg/4.png", alt: "Banner 4" },
                            { src: "/bannerImg/5.png", alt: "Banner 5" },
                            { src: "/bannerImg/6.png", alt: "Banner 6" },
                          ].map((image) => (
                            <SelectItem key={image.alt} value={image.src}>
                              <div className="flex flex-col items-center transition-transform duration-200 hover:scale-105 cursor-pointer rounded-lg border">
                                <img
                                  src={image.src}
                                  alt={image.alt}
                                  className="w-16 h-16 object-cover  rounded-lg"
                                />
                                
                              </div>
                            </SelectItem>
                          ))}
                        </div>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Save changes</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
