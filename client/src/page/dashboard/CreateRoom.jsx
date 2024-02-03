import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Make sure to set appElement to satisfy accessibility requirements
Modal.setAppElement("#root");

const roomStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "none",
    border: "none",
  },
};


// eslint-disable-next-line react/prop-types
const CreateRoom = ({ isModalOpen, setModalOpen, onSubmit }) => {
  const [roomData, setRoomData] = useState({
    name: "",
    description: "",
    maxParticipants: 15,
  });

  const navigate = useNavigate();

  const { name, description, maxParticipants } = roomData;

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setRoomData({ ...roomData, [name]: value });
  };

  const createRoom = async () => {

    console.log("all Data", roomData);
    try {
      const response = await axios.post(
        "http://localhost:5555/rooms/create",
        roomData
      );

      // Handle the response as needed (e.g., show a success message)
      console.log("Room created successfully:", response.data);
      alert("Room created successfully");
        
      navigate(`/room/${response.data._id}`);
      // Close the modal
      setModalOpen(false);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.log("Error creating room:", error);
      alert("Error");
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setModalOpen(false)}
      contentLabel="Create Room Modal"
      style={roomStyles}
    >
      <>
        {/* Add more details as needed */}

        <div className="max-w-full mx-4 sm:max-w-sm md:max-w-sm lg:max-w-full xl:max-w-full sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-gray-200 shadow-xl rounded-lg text-gray-900">
          <div className="rounded-t-lg h-14 overflow-hidden">
            <div className="px-6 py-2 bg-gray-900 text-white">
              <h1 className="text-lg font-bold"> Create your room</h1>
            </div>
          </div>

          <div className="text-center p-4">
            <p className="text-gray-500 text-sm">Hello Prabhu</p>
          </div>
            <div className="text-left mx-3 my-2">
              <h3 className="text-xs font-bold p-2">Room name *</h3>
              <input
                type="text"
                name="name" // Change to 'name'
                id="roomName"
                value={name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
                placeholder="alpha study room ✨"
                required
              />
            </div>

            <div className="text-left mx-3 my-2">
              <h3 className="text-xs font-bold p-2">
                Number of participants *
              </h3>

              <input
                type="number"
                name="maxParticipants"
                id="maxParticipants"
                value={maxParticipants}
                onChange={handleChange}
                required
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="text-left mx-3 my-2">
              <h3 className="text-xs font-bold p-2">
                Room description(optional)
              </h3>
              <input
                type="text"
                name="description" // Change to 'description'
                id="roomDescription"
                value={description}
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
                placeholder="alpha study room ✨"
              />
            </div>

            <div className="py-4 text-center border-t ">
              <button
                onClick={createRoom}
                className=" rounded-md bg-gray-900 hover:shadow-lg font-semibold text-white py-1 px-24 mx-4 "
              >
                Create Room
              </button>
            </div>
        </div>
      </>
    </Modal>
  );
};

export default CreateRoom;
