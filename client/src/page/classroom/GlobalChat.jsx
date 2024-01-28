import React, { useState, useEffect } from 'react';
import { IoSend } from "react-icons/io5";

const GlobalChat = ({ isHidden }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { user: 'You', text: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div className={`container mx-auto mt-8 p-4 bg-gray-100 border rounded-lg shadow-md ${isHidden ? 'hidden' : 'block'}`}>
      <div className="h-64 overflow-y-auto border mb-4 p-2">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            <span className="font-bold">{message.user}:</span> {message.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 border rounded-l-md"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-r-md"
        >
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default GlobalChat;
