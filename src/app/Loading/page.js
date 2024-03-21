// LoadingScreen.js
import React from 'react';

const Loading = () => {
  return (
    <div className="flex h-screen justify-center items-center w-full bg-white">
      <div className="animate-pulse rounded-full h-20 w-20 border-4 border-t-4 border-gray-900"></div>
    </div>
  );
};

export default Loading;
