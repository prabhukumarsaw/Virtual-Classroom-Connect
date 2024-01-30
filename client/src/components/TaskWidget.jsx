import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ResponsiveDrawerButton = ({ isDrawerOpen, handleToggleDrawer }) => {
  const [text, setText] = useState('');

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('overlay')) {
      handleToggleDrawer();
    }
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  return (
    <div>
      {/* Drawer Content */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overlay" onClick={handleOverlayClick}>
          {/* Drawer Menu */}
          <div className="fixed inset-y-0 left-0 max-w-md w-full shadow-lg" style={{ backgroundColor: '#FFE8D2' }}>
            <div className="p-4">
              {/* Quill Editor */}
              <div className="max-w-full h-screen overflow-y-auto">
                <ReactQuill 
                  theme='snow'
                  value={text}
                  onChange={(value) => setText(value)}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link', 'image'],
                    ],
                  }}
                  formats={formats}
                  placeholder="Write your note here..."
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveDrawerButton;
