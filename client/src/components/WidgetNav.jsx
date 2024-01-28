import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import UtilDialog from '../components/UtilDialog'

const WidgetNav = ({
  handleShowWidget,
  handleHideWidget,
  handleToggleDrawer,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="hidden md:block relative">
      <div className="mb-0 bg-opacity-30 bg-gray-800 p-2 flex justify-start items-center backdrop-filter backdrop-blur-md rounded-2xl ">
        {/* Existing buttons */}
        <button
          onClick={handleShowWidget}
          className="p-2 bg-green-500 hover:bg-green-700 text-white rounded"
        >
          <FaEye />
        </button>
        <button
          onClick={handleHideWidget}
          className="p-2 bg-red-500 hover:bg-red-700 text-white rounded ml-2"
        >
          <FaEyeSlash />
        </button>
        <button
          onClick={handleToggleDrawer}
          className="p-2 bg-yellow-500 hover:bg-yellow-700 text-white rounded ml-2"
        >
          <GiNotebook />
        </button>

        {/* Button to open the dialog */}
        <button
          onClick={openDialog}
          className="p-2 h-10 w-12 dark:text-gray-500 rounded-md flex items-center justify-center hover:text-blue-700 relative"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </button>

        <button
          className="p-2 w-24 bg-red-600 hover:bg-red-900 text-white rounded ml-2"
        >
          Leave
        </button>

        {/* Dialog rendering */}
        {isDialogOpen && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <UtilDialog onClose={closeDialog} onButtonClick={closeDialog} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetNav;
