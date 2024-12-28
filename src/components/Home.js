import React, { useState, useEffect } from 'react';

const Home = () => {
  const [loading, setLoading] = useState(true);

  // Simulate a loading time, e.g., fetching data or waiting for something to load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-2000" style={{ backgroundColor: '#f8f8f8' }}>
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
          <span className="text-lg text-gray-700">Loading...</span>
        </div>
      ) : (
        <div className="text-2xl text-gray-800">Home page is under construction</div>
      )}
    </div>
  );
};

export default Home;
