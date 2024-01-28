import React from 'react';

const WallpaperControl = ({ selectedWallpaper, handleWallpaperSelect, handleWallpaperUpload,defaultWallpapers, isDrawerOpen, handleCloseDrawer }) => {
  return (
    <div>
      {isDrawerOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={handleCloseDrawer}></div>
          <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-screen-sm px-4 sm:w-auto sm:max-w-none sm:px-0 sm:flex sm:justify-center z-50">
            <div className="bg-gray-800 bg-opacity-30 p-4 rounded-md backdrop-filter backdrop-blur-md">
              <div className="max-w-sm">
                <div className="relative mt-2">
                  <input
                    type="file"
                    onChange={(e) => handleWallpaperUpload(e.target.files[0])}
                    className="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm"
                  />
                </div>
                <div className="mt-3 flex flex-wrap justify-around sm:justify-between">
                  {/* Use selectedWallpaper from props */}
                  {defaultWallpapers.map((wallpaper, index) => (
                    <div
                      key={index}
                      className={`w-12 h-12 bg-cover bg-center rounded-md cursor-pointer mb-2 ${
                        selectedWallpaper === wallpaper ? 'border-2 border-blue-500' : ''
                      }`}
                      style={{ backgroundImage: `url(${wallpaper})`, objectFit: 'cover' }}
                      onClick={() => handleWallpaperSelect(wallpaper)}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WallpaperControl;
