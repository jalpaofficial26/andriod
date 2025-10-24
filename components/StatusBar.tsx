
import React, { useState, useEffect } from 'react';

const StatusBar: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className="w-full h-6 bg-gray-900 text-white flex items-center justify-between px-3 text-xs font-sans font-bold z-10">
      <div>{formatTime(time)}</div>
      <div className="flex items-center space-x-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.562A4.002 4.002 0 014.5 12.552M8.111 16.562a4.002 4.002 0 003.39 0M4.5 12.552a4.002 4.002 0 013.611-3.996.75.75 0 01.556.666v1.986m0 0a4.002 4.002 0 013.39 0m-3.39 0a4.002 4.002 0 00-3.39 0" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5a6 6 0 00-6-6v-1.5a6 6 0 00-6 6v1.5a6 6 0 006 6v-1.5z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.75 2.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" />
            <path fillRule="evenodd" d="M3.25 5.25a.75.75 0 01.75-.75h12a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-12a.75.75 0 01-.75-.75V5.25zM4.75 6.5v8h10.5v-8H4.75z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default StatusBar;
