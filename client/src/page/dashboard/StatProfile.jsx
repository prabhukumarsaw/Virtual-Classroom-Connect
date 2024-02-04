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
      <div className="overflow-y-auto ">
        <div className="flex-grow dark:bg-gray-900 bg-cover bg-center  items-center justify-center  bg-gray-900">
          <div className="grid grid-cols-1 md:grid-cols-3 ">
            <div className="md:col-span-1 my-4 px-4   z-10">
              {/* <!-- Left side content --> */}
              <div className="flex flex-col ">
                <div className="bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl p-4">
                  <div className="flex sm:flex">
                    <div className=" relative h-32 w-32  sm:mb-0 mb-3">
                      <img
                        src={userData.imageUrl}
                        alt="aji"
                        className=" w-32 h-32 object-cover rounded-2xl"
                      />
                      <Link
                        to="/editProfile"
                        className="absolute -right-2 bottom-2   -ml-3  text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-4 w-4"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                        </svg>
                      </Link>
                    </div>
                    <div className="flex-auto sm:ml-5 justify-evenly">
                      <div className="flex items-center justify-between sm:mt-2">
                        <div className="flex items-center">
                          <div className="flex flex-col px-2">
                            <div className="w-full flex-none text-lg text-gray-200 font-bold leading-none">
                              {userData.name}, {userData.age}
                            </div>
                            <div className="flex-auto text-gray-400 my-2">
                              <span className="mr-3 ">
                                🧑‍🎓{userData.educationLevel}
                              </span>
                              <span className="mr-3 border-r border-gray-600  max-h-0"></span>
                              <span>{userData.address}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex pt-2  text-sm text-gray-400">
                        <div className="flex-1 inline-flex items-center">
                          <p className="px-2">✌️ {userData.gender}</p>
                        </div>
                      </div>
                      <div className="flex pt-2  text-sm text-gray-400">
                        <div className="flex-1 inline-flex items-center">
                          <p className="px-2">✌️ {userData.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center my-4 p-4 bg-gray-800 border-gray-800 shadow-md hover:shadow-lg rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <div className="text-md text-gray-100 font-medium leading-8 pb-2">
                        INTERESTS
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {" "}
                        {/* Adjust the number of columns based on your preference */}
                        {userData.interests && userData.interests.length > 0 ? (
                          userData.interests.map((interest, index) => (
                            <span
                              key={index}
                              className="select-none rounded-lg border border-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:opacity-75 focus:ring focus:ring-pink-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                              data-ripple-dark="true"
                            >
                              {interest}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">
                            No interests selected
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 my-4 px-4  ">
              {/* <!-- Right side content --> */}
              <div className="h-screen ">
                <div className=" w-full mx-auto grid gap-4 grid-cols-1">
                  <div className="flex flex-col justify-center p-4 bg-gray-800 border-gray-800 shadow-md hover:shodow-lg rounded-2xl">
                    <div className="text-md text-gray-100 font-medium leading-8 mt-1">
                      ABOUT ME
                    </div>
                    <div className=" text-gray-400 flex items-center ">
                      <p>{userData.description} </p>
                    </div>
                  </div>

                  {/* <!---stats--> */}
                  <div className="grid grid-cols-12 gap-4 ">
                    <div className="col-span-12 sm:col-span-4">
                      <div className="p-4 relative  bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-14 w-14  absolute bottom-4 right-3 text-red-500"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <div className="text-2xl text-gray-100 font-medium leading-8 mt-5">
                          20
                        </div>
                        <div className="text-sm text-gray-500">❤️Like</div>
                      </div>
                    </div>
                    <div className="col-span-12 sm:col-span-4">
                      <div className="p-4 relative  bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-14 w-14  absolute bottom-4 right-3 text-blue-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                        <div className="flex justify-between items-center ">
                          <i className="fab fa-behance text-xl text-gray-400"></i>
                        </div>
                        <div className="text-2xl text-gray-100 font-medium leading-8 mt-5">
                          99
                        </div>
                        <div className="text-sm text-gray-500">
                          ⌛Focus Time
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 sm:col-span-4">
                      <div className="p-4 relative  bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-14 w-14  absolute bottom-4 right-3 text-blue-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                        </svg>
                        <div className="flex justify-between items-center ">
                          <i className="fab fa-codepen text-xl text-gray-400"></i>
                        </div>
                        <div className="text-2xl text-gray-100 font-medium leading-8 mt-5">
                          50
                        </div>
                        <div className="text-sm text-gray-500">Friends</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    {/* <!--confirm modal--> */}
                    <div className="flex flex-col p-3  relative items-start justify-start bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl">
                      <div className="flex flex-col w-full justify-center items-center overflow-y-displayScroll  gap-4">


                     <div className="flex flex-col p-1 bg-white shadow-md hover:shodow-lg rounded-2xl">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                              <div className="flex flex-col ml-3">
                                <div className="font-medium leading-none">
                                  Delete Your Acccount ?
                                </div>
                                <p className="text-sm text-gray-600 leading-none mt-1">
                                  By deleting your account you will lose your
                                  all data
                                </p>
                              </div>
                            </div>
                            <button className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col p-1 bg-white shadow-md hover:shodow-lg rounded-2xl">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                              <div className="flex flex-col ml-3">
                                <div className="font-medium leading-none">
                                  Delete Your Acccount ?
                                </div>
                                <p className="text-sm text-gray-600 leading-none mt-1">
                                  By deleting your account you will lose your
                                  all data
                                </p>
                              </div>
                            </div>
                            <button className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">
                              Delete
                            </button>
                          </div>
                        </div>
                     
                      </div>
                    </div>
                    {/* <!--elements--> */}
                    <div className="flex flex-col space-y-4">
                      {/* <!-- elements 1 --> */}

                      <div className="text-md text-gray-100 font-medium leading-8 ">
                        Leaderboard (Current rank)
                      </div>
                      <div className="flex flex-col p-4 bg-gray-800 border-gray-800 shadow-md hover:shodow-lg rounded-2xl cursor-pointer transition ease-in duration-500  transform hover:scale-105">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center mr-auto">
                            <div className="inline-flex w-12 h-12">
                              <img
                                src="https://tailwindcomponents.com/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg"
                                alt="aji"
                                className=" relative w-12 h-12 object-cover rounded-2xl"
                              />

                              <span></span>
                            </div>

                            <div className="flex flex-col ml-3">
                              <div className="font-medium leading-none text-gray-100">
                                Aji
                              </div>
                              <p className="text-sm text-gray-500 leading-none mt-1">
                                UI/UX Designer
                              </p>
                            </div>
                          </div>
                          <a
                            href="#"
                            className="flex-no-shrink text-xs  font-medium tracking-wider  text-gray-400 hover:text-green-400 transition ease-in duration-300 mr-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </a>
                          <a className="flex-no-shrink text-xs  font-medium tracking-wider  text-gray-400 hover:text-green-400 transition ease-in duration-300 ml-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </a>
                        </div>
                      </div>
                      {/* <!--elements 2--> */}
                      <div className="flex flex-col p-4 bg-gray-800 border-gray-800 shadow-md hover:shodow-lg rounded-2xl cursor-pointer transition ease-in duration-500  transform hover:scale-105">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center mr-auto">
                            <div className="inline-flex w-12 h-12">
                              <img
                                src="https://tailwindcomponents.com/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg"
                                alt="aji"
                                className=" relative p-1 w-12 h-12 object-cover rounded-2xl"
                              />
                              <span className="absolute w-12 h-12 inline-flex border-2 rounded-2xl border-green-400 opacity-75"></span>
                              <span></span>
                            </div>

                            <div className="flex flex-col ml-3 min-w-0">
                              <div className="font-medium leading-none text-gray-100">
                                Groupname
                              </div>
                              <p className="text-sm text-gray-500 leading-none mt-1 truncate">
                                Beautiful hand-crafted SVG icons
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col ml-3 min-w-0">
                            <span className="text-xs text-gray-500 text-right mb-1">
                              9:02pm
                            </span>
                            <div className="flex">
                              <a className="flex-no-shrink text-xs  font-medium tracking-wider  text-gray-400 hover:text-green-400 transition ease-in duration-300 mr-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </a>
                              <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-100 bg-green-400 rounded-full ml-2">
                                99
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!--elements 2--> */}
                      <div className="flex flex-col p-4 bg-gray-800 border-gray-800 shadow-md hover:shodow-lg rounded-2xl cursor-pointer transition ease-in duration-500  transform hover:scale-105">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center mr-auto">
                            <div className="inline-flex w-12 h-12">
                              <img
                                src="https://tailwindcomponents.com/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg"
                                alt="aji"
                                className=" relative p-1 w-12 h-12 object-cover rounded-2xl"
                              />
                              <span className="absolute w-12 h-12 inline-flex border-2 rounded-2xl border-gray-600 opacity-75"></span>
                              <span></span>
                            </div>

                            <div className="flex flex-col ml-3 min-w-0">
                              <div className="font-medium leading-none text-gray-100">
                                Ajimon
                              </div>
                              <p className="text-sm text-gray-500 leading-none mt-1 truncate">
                                Jul 066, 2021, 8.25 PM
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col ml-3 min-w-0">
                            <div className="flex">
                              <h5 className="flex items-center font-medium text-gray-300 mr-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>{" "}
                                1800
                              </h5>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-green-400 ml-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col p-4 bg-gray-800 border border-gray-800 shadow-md hover:text-green-500 text-gray-400 hover:shodow-lg rounded-2xl transition ease-in duration-500  transform hover:scale-105 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center mr-auto">
                            <div className="-space-x-5 flex ">
                              <img
                                src="https://tailwindcomponents.com/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg"
                                alt="aji"
                                className=" relative p-1 w-12 h-12 object-cover rounded-2xl border-2 border-gray-600 bg-gray-800"
                              />
                              <img
                                src="https://tailwindcomponents.com/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg"
                                alt="aji"
                                className=" relative p-1 w-12 h-12 object-cover rounded-2xl border-2 border-gray-600 bg-gray-800 shadow"
                              />
                            </div>

                            <div className="flex flex-col ml-3 min-w-0">
                              <div className="font-medium leading-none text-gray-100">
                                Pending Request{" "}
                              </div>
                              <p className="text-sm text-gray-500 leading-none mt-1 truncate">
                                Jul 066, 2021, 8.25 PM
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col ml-3 min-w-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 ml-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container  m-4"></div>
        </div>
      </div>
    </>
  );
};

export default StatProfile;
