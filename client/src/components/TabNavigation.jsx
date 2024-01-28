// TabNavigation.js

import React, { useState } from 'react';

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className="flex mx-4">
      <button
        className={`${
          activeTab === 1 ? 'bg-blue-200' : 'border border-neutral-300'
        } text-white px-4 py-2 rounded-l`}
        onClick={() => handleTabClick(1)}
      >
        Tab 1
      </button>
      <button
        className={`${
          activeTab === 2 ? 'bg-blue-200' : 'border border-neutral-300'
        } text-white px-4 py-2`}
        onClick={() => handleTabClick(2)}
      >
        Tab 2
      </button>
      <button
        className={`${
          activeTab === 3 ? 'bg-blue-200' : 'border border-neutral-300'
        } text-white px-4 py-2 rounded-r`}
        onClick={() => handleTabClick(3)}
      >
        favourite (0)
      </button>
    </div>
  );
};

export default TabNavigation;
