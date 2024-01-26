// // components/ImageCardList.js

// import React from 'react';

// const ImageCardList = ({ imageCards }) => {

    
//   return (
//     <div className="flex flex-wrap justify-center">
//       {imageCards.map((card, index) => (
//         <div
//           key={index}
//           className="w-48 h-64 m-4 bg-cover bg-center relative"
//           style={{ backgroundImage: `url(${card.imageUrl})` }}
//         >
//           <div className="absolute inset-0 bg-black opacity-50"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <p className="text-white text-lg font-bold">{card.title}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ImageCardList;
// <div className="text-left mx-3 my-2">
// <h3 className="text-xs font-bold p-2">Select Image *</h3>

// {/* Include the ImageCardList component here */}
// <ImageCardList imageCards={imageCards} />

// {/* Add file input if necessary */}
// <label
//   htmlFor="image"
//   className="cursor-pointer border-2 border-gray-300 p-4 rounded-md flex items-center justify-center"
// >
//   <svg
//     className="w-6 h-6 text-gray-500"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth="2"
//       d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//     ></path>
//   </svg>
//   <span className="ml-2 text-sm leading-5 font-medium text-gray-700">
//     Choose an image
//   </span>
//   <input
//     id="image"
//     name="image"
//     type="file"
//     className="hidden"
//     // Add any additional attributes or event handlers as needed
//   />
// </label>
// </div>