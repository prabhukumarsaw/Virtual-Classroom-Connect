import React, { useState } from "react";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const [previewImage, setPreviewImage] = useState("");

  const handleFileChange = (event) => {
    const input = event.target;
    const file = input.files[0];

    setPreviewImage(URL.createObjectURL(file));

    // Free up memory when the component unmounts
    URL.revokeObjectURL(previewImage);
  };

  return (
    <div className=" container bg-gray-900 ">
    <div className="ml-8 py-16">
    <Link to='/main/StatProfile' className="bg-blue-900  text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline">
        🔙
      </Link>
    </div>
      
      <div className="max-w-md mx-auto  mt shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
          Edit Profile
        </div>
        <form className="py-4 px-6" action="" method="POST">
          <div className="flex items-center space-x-6">
            <div className="shrink-0">
              <img
                id="preview_img"
                className="h-16 w-16 object-cover rounded-full"
                src={
                  previewImage ||
                  "https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c"
                }
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
              hover:file:bg-violet-100
            "
              />
            </label>
          </div>
          <br />
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Display Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="message"
            >
              About Me
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              rows="4"
              placeholder="Enter any additional information"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Age
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="service"
            >
              Gender
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="service"
              name="service"
            >
              <option value="boy">Boy</option>
              <option value="girl">Girl</option>
              <option value="non-binary">Non-binary</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phone"
            >
              Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter your Address"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="service"
            >
              School Level
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="service"
              name="service"
            >
              <option value="haircut">College</option>
              <option value="coloring">High School</option>
              <option value="styling">Middle School</option>
              <option value="facial">Postgraduate</option>
              <option value="facial">Professional</option>
            </select>
          </div>

          <div className="flex items-center justify-center mb-4">
            <button className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline">
              update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
