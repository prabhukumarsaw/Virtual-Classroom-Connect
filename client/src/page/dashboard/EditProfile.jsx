import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";

const EditProfile = () => {
  const [previewImage, setPreviewImage] = useState("");
  const { user, updateUserProfile } = useContext(AuthContext);
  
  const [userData, setUserData] = useState({
    name: "",
    description: "",
    age: "",
    gender: "boy",
    address: "",
    educationLevel: "college",
    interests: [],
  });

  const navigate = useNavigate();

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/api/auth/users/${user.uid}`
        ); // Replace with your actual API endpoint
        setUserData(response.data); // Assuming the response contains user data
        setPreviewImage(response.data.profileImage); // Assuming the response contains the image URL
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleFileChange = (event) => {
    const input = event.target;
    const file = input.files[0];
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleChange = (event) => {
    const { name, value, type } = event.target;
  
    if (type === "checkbox") {
      // For checkboxes (interests)
      setUserData((prevUserData) => ({
        ...prevUserData,
        interests: event.target.checked
          ? [...prevUserData.interests, value]
          : prevUserData.interests.filter((interest) => interest !== value),
      }));
    } else {
      // For other input types
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   

    try {
      // Add logic to send the updated user data to the server
      await axios.put(
        `http://localhost:5555/api/auth/users/${user.uid}`,
        userData
      ); // Replace with your actual update API endpoint
      // Update user profile on Firebase
    await updateUserProfile(name);
      console.log("User data updated successfully!");
      navigate('/main/StatProfile')
      alert("User data updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="bg-gray-900">
      <div className="ml-8 py-16">
        <Link
          to="/main/StatProfile"
          className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
        >
          🔙
        </Link>
      </div>

      <div className="max-w-md mx-auto mt shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
          Edit Profile
        </div>
        <form className="py-4 px-6" onSubmit={handleSubmit}>
          {/* Image Upload Section */}
          <div className="flex items-center space-x-6">
            <div className="shrink-0">
              <img
                id="preview_img"
                className="h-16 w-16 object-cover rounded-full"
                src={previewImage || user.imageUrl}
                alt="Current profile photo"
              />
            </div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
              />
            </label>
          </div>
          <br />

          {/* Display Name Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Display Name
            </label>
            <input
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter your Display Name"
            />
          </div>

          {/* About Me Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="about"
            >
              About Me
            </label>
            <textarea
              name="description"
              value={userData.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
              placeholder="Enter something about yourself"
            ></textarea>
          </div>

          {/* Age Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="age">
              Age
            </label>
            <input
              name="age"
              value={userData.age}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Enter your age"
            />
          </div>

          {/* Gender Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="boy">Boy</option>
              <option value="girl">Girl</option>
              <option value="non-binary">Non-Binary</option>
            </select>
          </div>

          {/* Address Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="address"
            >
              City
            </label>
            <input
              name="address"
              value={userData.address}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter your address"
            />
          </div>

      {/* Education Level Input */}
<div className="mb-4">
  <label className="block text-gray-700 font-bold mb-2" htmlFor="educationLevel">
    Education Level
  </label>
  <select
    name="educationLevel"
    value={userData.educationLevel}
    onChange={handleChange}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  >
    <option value="High School">High School</option>
    <option value="Middle School">Middle School</option>
    <option value="Postgraduate">Postgraduate</option>
    <option value="Professional">Professional</option>
  </select>
</div>


          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="interests"
            >
              Interests
            </label>
            <div className="text-white">
              {["Music", "Sports", "Reading", "Gaming", "Travel"].map(
                (interest) => (
                  <label key={interest} className="mr-4">
                    <input
                      type="checkbox"
                      name="interests"
                      value={interest}
                      checked={userData.interests.includes(interest)}
                      onChange={handleChange}
                      className="mr-1"
                    />
                    {interest}
                  </label>
                )
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center mb-4">
            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
