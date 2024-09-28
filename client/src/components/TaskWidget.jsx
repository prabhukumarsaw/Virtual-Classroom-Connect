import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ScrollArea } from "./ui/scroll-area";

const ResponsiveDrawerButton = ({ isDrawerOpen, handleToggleDrawer }) => {
  const [text, setText] = useState("");

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      handleToggleDrawer();
    }
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div>
      {/* Drawer Content */}
      <ScrollArea className="flex-grow">
      {/* Quill Editor */}
      <div className=" h-[550px] w-full overflow-y-auto">
        <ReactQuill
          theme="snow"
          value={text}
          onChange={(value) => setText(value)}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
            ],
          }}
          formats={formats}
          placeholder="Write your note here..."
        />
      </div>
    </ScrollArea>
    </div>
  );
};

export default ResponsiveDrawerButton;
