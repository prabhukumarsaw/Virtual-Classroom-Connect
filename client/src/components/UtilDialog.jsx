import React from "react";

const DialogCard = ({ onClose, onButtonClick }) => {
  return (
    <div className="bg-white border border-gray-300 shadow-lg rounded-md p-4">
      {/* Dialog content goes here */}
      <p>This is the dialog content</p>
      <button
        onClick={onButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white rounded px-4 py-2 mt-2"
      >
        Dialog Button
      </button>
      <button
        onClick={onClose}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded px-4 py-2 ml-2 mt-2"
      >
        Close
      </button>
    </div>
  );
};

export default DialogCard;
