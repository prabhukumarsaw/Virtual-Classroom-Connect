// UtilDialog.js
import React from "react";
import { FaYoutube, FaGamepad, FaEye, FaChalkboard } from "react-icons/fa";
import { Link } from "react-router-dom";

const UtilDialog = ({toggleYoutube}) => {
  return (
    <div>
      <div className="py-2 mb-3">
        <div className="grid grid-cols-3 gap-4">
          <button onClick={toggleYoutube}>
            <div className=" hover:text-blue-800 overflow-hidden transition duration-300 transform hover:scale-105 cursor-pointer">
              <img
                src="https://www.iconpacks.net/icons/2/free-youtube-logo-icon-2431-thumb.png"
                className="w-16 h-16 object-cover"
                alt="Online Avatar"
              />
              <h4 className="text-center font-semibold text-black">YouTube</h4>
            </div>
          </button>
        </div>
      </div>

      <hr />
      <h3 className="text-left font-bold text-black text-sm mb-3">Games</h3>
      <hr />
      <div className="grid grid-cols-3 gap-4 mt-4 ">
        <div className="hover:text-blue-800 overflow-hidden transition duration-300 transform hover:scale-105 cursor-pointer">
          <a href="https://pizz.uno/" target="_blank" rel="noopener noreferrer">
            <img
              src="https://pizz.uno/folder.jpg"
              className="w-16 h-16 object-cover"
              alt="Online Avatar"
            />
            <h4 className="text-center font-semibold text-black">UNO</h4>
          </a>
        </div>

        <div className="hover:text-blue-800 overflow-hidden transition duration-300 transform hover:scale-105 cursor-pointer">
          <a href="https://jklm.fun/" target="_blank" rel="noopener noreferrer">
            <img
              src="https://jklm.fun/favicon.ico"
              className="w-16 h-16 object-cover"
              alt="Online Avatar"
            />
            <h4 className="text-center font-semibold text-black">JKLM</h4>
          </a>
        </div>

        <div className="hover:text-blue-800 overflow-hidden transition duration-300 transform hover:scale-105 cursor-pointer">
          <a
            href="https://skribbl.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://skribbl.io/favicon.png"
              className="w-16 h-16 object-cover"
              alt="Online Avatar"
            />
            <h4 className="text-center font-semibold text-black">Skribbl</h4>
          </a>
        </div>

        <div className="hover:text-blue-800 overflow-hidden transition duration-300 transform hover:scale-105 cursor-pointer">
          <a
            href="https://netgames.io/games/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://netgames.io/static/logo-192.png"
              className="w-16 h-16 object-cover"
              alt="Online Avatar"
            />
            <h4 className="text-center font-semibold text-black">Netgames</h4>
          </a>
        </div>

        <div className="hover:text-blue-800 overflow-hidden transition duration-300 transform hover:scale-105 cursor-pointer">
          <a
            href="https://codenames.game/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://codenames.game/icon_cn/favicon.ico"
              className="w-16 h-16 object-cover"
              alt="Online Avatar"
            />
            <h4 className="text-center font-semibold text-black">Codenames</h4>
          </a>
        </div>

        <div className="hover:text-blue-800 overflow-hidden transition duration-300 transform hover:scale-105 cursor-pointer roun">
          <a
            href="https://www.playok.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://www.playok.com/favicon.png"
              className="w-16 h-16 object-cover"
              alt="Online Avatar"
            />
            <p className="text-center text-black text-sm">Playok</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UtilDialog;
