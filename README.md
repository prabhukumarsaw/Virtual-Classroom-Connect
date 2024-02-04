
# AUNTHICATION SYSTEM

## SERVER SETUP
    - npm init
    - setup server syntax 
    - connect mongodb

## setup folder structure
    [create model, router, controller]

    - auth model Schema [username, email, password]
    -setup as middleware in server.js [app.use('/api/auth', router)] ::import router defines route of signup & login
    -in auth-router: import auth-controller and [router.route('/register').post(authController.register)]
    - authController import[user-model]

    ------register-----

    const register = async (req, res) => {
        try{

            1. get all data from req.body
            2. validate data
            3. cheack user already exist or not based on -email
            4. hash password X do in model schema
            5. save user data in db
            6.send data and token



        } catch(error) {
            console.log(error);
        }
    }


    ------login-----

    const login = async (req, res) => {
        try{

            1. get all data from req.body
            2. validate data
            3. find user already exist or not based on -email
            4. hash password X do in model schema
            5. save user data in db
            6.send data and token



        } catch(error) {
            console.log(error);
        }
    }

AIzaSyA1-3516ZvB44BaJgHBk8gyOMgTJUEMTNk
Replace with your YouTube API key= AIzaSyC4p0VSyGIrFXAybEzh5jJbXGHCrSMo0js

AIzaSyDLdJewZrbuhtfd9YGhCX1uQhchH2w2Tdc





/project-root
|-- client
|   |-- src
|   |   |-- components
|   |   |   |-- CreateRoom.js
|   |   |   |-- ConferenceRoom.js
|   |   |   |-- ViewRoom.js
|   |   |   |-- VideoControl.js
|   |   |-- pages
|   |   |   |-- CreateRoomPage.js
|   |   |   |-- ConferenceRoomPage.js
|   |   |   |-- ViewRoomPage.js
|   |   |-- App.js
|   |   |-- index.js
|   |   |-- socket.js
|-- server
|   |-- controllers
|   |   |-- roomController.js
|   |-- routes
|   |   |-- roomRoutes.js
|   |-- sockets
|   |   |-- roomSocket.js
|   |-- app.js
|-- .env
|-- package.json
|-- tailwind.config.js


   <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="User Details Modal"
        style={customStyles}
      >
        {selectedUser && (
          <>
            {/* Add more details as needed */}

            <div className=" max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-gray-200 shadow-xl rounded-lg text-gray-900">
              <div className="rounded-t-lg h-32 overflow-hidden">
                <img
                  className="object-cover object-top w-full"
                  src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                  alt="Mountain"
                />
              </div>
              <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                <img
                  className="object-cover object-center h-32"
                  src={selectedUser.imageUrl}
                  alt="Woman looking front"
                />
              </div>
              <div className="text-center mt-2">
                <h3 className="font-semibold">
                  {selectedUser.name}, {selectedUser.age}
                </h3>
                <p className="text-gray-500">
                  {selectedUser.education}, {selectedUser.location}
                </p>
              </div>
              <div className="text-left mx-3">
                <h3 className="text-xs font-bold">ABOUT ME</h3>
                <p className="text-gray-500 text-xs font-regular">
                  {selectedUser.about}
                </p>
              </div>
              <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
                <li className="flex flex-col items-center justify-around">
                  <svg
                    className="w-4 fill-current text-blue-900"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <div>{selectedUser.kudos}</div>
                </li>
                <li className="flex flex-col items-center justify-between">
                  <svg
                    className="w-4 fill-current text-blue-900"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
                  </svg>
                  <div>{selectedUser.friends}</div>
                </li>
                <li className="flex flex-col items-center justify-around">
                  <svg
                    className="w-4 fill-current text-blue-900"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                  </svg>
                  <div>{selectedUser.focus_time}</div>
                </li>
              </ul>
              <div className="text-left mx-3">
                <h3 className="text-xs font-bold p-1">INTERESTS</h3>
                {selectedUser.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 text-white py-1 px-2 m-1 rounded-md text-xs "
                  >
                    {interest}
                  </span>
                ))}
              </div>
              <div className="p-3 border-t text-center ">
                <button className="  rounded-md bg-gray-900 hover:shadow-lg font-semibold text-white py-1 px-2 m-1 ">
                  Send Kudos
                </button>
                <button className="   rounded-md bg-gray-900 hover:shadow-lg font-semibold text-white py-1 px-2 m-1 ">
                  + Add Friend
                </button>
              </div>
              <div className="p-2 text-center border-t ">
                <button className="  rounded-md bg-gray-900 hover:shadow-lg font-semibold text-white py-1 px-24 mx-4 ">
                  Send Message
                </button>
              </div>
            </div>
          </>
        )}
      </Modal>









      import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const StatProfile = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState("");

  console.log("user uid", user.uid);
  useEffect(() => {
    // Fetch user data from your backend API
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/api/auth/users/${user.uid}`
        ); // Adjust the endpoint
        setUserData(response.data);
        console.log("res", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle errors as needed
      }
    };

    if (user) {
      fetchUserData();
    }
  }, []); // Trigger the effect when the user object changes

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
        <div className="col-span-1 sm:col-span-3 mb-8">
            <div className=" bg-white bg-opacity-80 z-50 overlay shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <img
                  src={userData.imageUrl}
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                />

                <h1 className="text-xl font-bold">
                  {userData.name}, {userData.age}
                </h1>

                <p className="text-gray-700">
                  {userData.educationLevel}, {userData.address}
                </p>
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <a
                    href="#"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  >
                    Contact
                  </a>

                  <Link
                    to="/editProfile"
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                  >
                    Edit{" "}
                  </Link>
                </div>
              </div>
              <hr className="my-2 border-t border-gray-300" />
              <div className="text-center"></div>
              <hr className="my-6 border-t border-gray-300" />
              <div className="">
                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                  INTERESTS
                </span>
                {userData.interests && userData.interests.length > 0 ? (
                  userData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded-full mr-2"
                    >
                    
                      {interest}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">No interests selected</span>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-1 sm:col-span-9">
            <div className=" bg-white bg-opacity-80 z-50 overlay shadow rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">About Me</h2>
              {userData.description && userData.description.length > 0 ? (
                <p className="text-gray-700">{userData.description}</p>
              ) : (
                <p className="text-gray-700">
                  Uh oh, there’s nothing here yet 😅
                </p>
              )}

              <h3 className="font-semibold text-center mt-3 -mb-2">
                Find me on
              </h3>
              <div className="flex justify-center items-center gap-6 my-6">
                <a
                  className="text-gray-700 hover:text-orange-600"
                  aria-label="Visit TrendyMinds LinkedIn"
                  href=""
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="h-6"
                  >
                    <path
                      fill="currentColor"
                      d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                    ></path>
                  </svg>
                </a>
                <a
                  className="text-gray-700 hover:text-orange-600"
                  aria-label="Visit TrendyMinds YouTube"
                  href=""
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    className="h-6"
                  >
                    <path
                      fill="currentColor"
                      d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                    ></path>
                  </svg>
                </a>
                <a
                  className="text-gray-700 hover:text-orange-600"
                  aria-label="Visit TrendyMinds Facebook"
                  href=""
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    className="h-6"
                  >
                    <path
                      fill="currentColor"
                      d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                    ></path>
                  </svg>
                </a>
                <a
                  className="text-gray-700 hover:text-orange-600"
                  aria-label="Visit TrendyMinds Instagram"
                  href=""
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="h-6"
                  >
                    <path
                      fill="currentColor"
                      d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                    ></path>
                  </svg>
                </a>
                <a
                  className="text-gray-700 hover:text-orange-600"
                  aria-label="Visit TrendyMinds Twitter"
                  href=""
                  target="_blank"
                >
                  <svg
                    className="h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                    ></path>
                  </svg>
                </a>
              </div>

              <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
              <div className="mb-6">
                <div className="flex justify-between flex-wrap gap-2 w-full">
                  <span className="text-gray-700 font-bold">Web Developer</span>
                  <p>
                    <span className="text-gray-700 mr-2">at ABC Company</span>
                    <span className="text-gray-700">2017 - 2019</span>
                  </p>
                </div>
                <p className="mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  finibus est vitae tortor ullamcorper, ut vestibulum velit
                  convallis. Aenean posuere risus non velit egestas suscipit.
                </p>
              </div>
              <div className="mb-6">
                <div className="flex justify-between flex-wrap gap-2 w-full">
                  <span className="text-gray-700 font-bold">Web Developer</span>
                  <p>
                    <span className="text-gray-700 mr-2">at ABC Company</span>
                    <span className="text-gray-700">2017 - 2019</span>
                  </p>
                </div>
                <p className="mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  finibus est vitae tortor ullamcorper, ut vestibulum velit
                  convallis. Aenean posuere risus non velit egestas suscipit.
                </p>
              </div>
              <div className="mb-6">
                <div className="flex justify-between flex-wrap gap-2 w-full">
                  <span className="text-gray-700 font-bold">Web Developer</span>
                  <p>
                    <span className="text-gray-700 mr-2">at ABC Company</span>
                    <span className="text-gray-700">2017 - 2019</span>
                  </p>
                </div>
                <p className="mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  finibus est vitae tortor ullamcorper, ut vestibulum velit
                  convallis. Aenean posuere risus non velit egestas suscipit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default StatProfile;
