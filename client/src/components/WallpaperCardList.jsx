import React from 'react';

const WallpaperCardList = () => {
  return (
    <>
      <div className="ml-2.5 mr-2 hover:!scale-105 xl:mr-0 flex h-[30px] items-center justify-center rounded-full text-white group cursor-pointer transition duration-150 hover:scale-110 hover:bg-primary">
        <div className="flex w-full items-center">
          <div className="relative h-[30px] w-[30px] shrink-0 animate-spin-slow overflow-hidden rounded-full border-2 border-white md:h-[28px] md:w-[28px] xl:h-[30px] xl:w-[30px]">
            <span style={{
              boxSizing: 'border-box',
              display: 'block',
              overflow: 'hidden',
              width: 'initial',
              height: 'initial',
              background: 'none',
              opacity: 1,
              border: '0px',
              margin: '0px',
              padding: '0px',
              position: 'absolute',
              inset: '0px',
            }}>
              <img
                src="https://imagedelivery.net/URWwH1XbHXrZ6YK63EZXdw/7348beb1-8b42-4486-e409-acb500457900/thumbnail"
                decoding="async"
                data-nimg="fill"
                style={{
                  position: 'absolute',
                  inset: '0px',
                  boxSizing: 'border-box',
                  padding: '0px',
                  border: 'none',
                  margin: 'auto',
                  display: 'block',
                  width: '0px',
                  height: '0px',
                  minWidth: '100%',
                  maxWidth: '100%',
                  minHeight: '100%',
                  maxHeight: '100%',
                  objectFit: 'cover',
                }}
              />
            </span>
          </div>
          <div className="relative mx-2 hidden max-w-[170px] overflow-hidden truncate text-sm text-white xs:block md:hidden xl:block">
            follow your heart. 👒 studio ghibli lofi mix
          </div>
        </div>
      </div>
      
    </>
  );
};

export default WallpaperCardList;
