import React, { useEffect, useState } from "react";
import UserCard from "@/components/UserCard.jsx";
import Modal from "react-modal";
import axiosInstance from "@/hooks/axiosInstance.jsx";

// Make sure to set appElement to satisfy accessibility requirements
Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(0%, -50%)",
    background: "none",
    border: "none",
  },
};

const AllUsers = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const openModal = (user) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalIsOpen(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users");
        setAllUsers(response.data.users);
        
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("An error occurred while fetching users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div>
        {/* Render all user cards */}
        {allUsers.length > 0 ? (
          allUsers.map((user) => (
            <div className="my-2" key={user._id}>
              <UserCard user={user} openModal={() => openModal(user)} />
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="User Details Modal"
        style={customStyles}
      >
        {selectedUser && (
          <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-gray-200 shadow-xl rounded-lg text-gray-900">
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
                src={selectedUser.imageUrl || "https://via.placeholder.com/150"}
                alt="User Avatar"
              />
            </div>
            <div className="text-center mt-2">
              <h3 className="font-semibold">
                {selectedUser.name}, {selectedUser.age}
              </h3>
              <p className="text-gray-500">
                {selectedUser.educationLevel} | {selectedUser.address}
              </p>
            </div>
            <div className="p-3 border-t text-center ">
              <button className="m-1 rounded-lg border border-red-500 py-1.5 px-1.5 text-center align-middle font-sans text-xs font-bold uppercase text-black-500 transition-all hover:opacity-75 focus:ring focus:ring-pink-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                ✌️Upvote
              </button>
              <button className="m-1 rounded-lg border border-blue-500 py-1.5 px-1.5 text-center align-middle font-sans text-xs font-bold uppercase text-black-500 transition-all hover:opacity-75 focus:ring focus:ring-pink-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                🙌Follow
              </button>
            </div>
            <div className="text-left mx-3">
              <h3 className="text-xs font-bold">ABOUT ME</h3>
              <p className="text-gray-500 text-xs font-regular">
                {selectedUser.description
                  ? selectedUser.description.split(" ").slice(0, 30).join(" ")
                  : "Dummy description goes here..."}
                {selectedUser.description &&
                selectedUser.description.split(" ").length > 30
                  ? "..."
                  : ""}
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
              <div className="grid grid-cols-4 gap-1">
                {selectedUser.interests && selectedUser.interests.length > 0 ? (
                  selectedUser.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="select-none rounded-lg border border-pink-500 py-1.5 px-1.5 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:opacity-75 focus:ring focus:ring-pink-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      data-ripple-dark="true"
                    >
                      {interest}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">No interests selected</span>
                )}
              </div>
            </div>
            <div className="p-2 text-center border-t ">
              <button className="rounded-md bg-gray-900 hover:shadow-lg font-semibold text-white py-1 px-24 mx-4">
                Send Message
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default AllUsers;
