
import React from 'react';
import StatusBar from './StatusBar';

interface AndroidFrameProps {
  children: React.ReactNode;
}

const AndroidFrame: React.FC<AndroidFrameProps> = ({ children }) => {
  return (
    <div className="w-[360px] h-[740px] bg-black rounded-[32px] shadow-2xl p-3 border-4 border-gray-700 overflow-hidden flex flex-col">
      <div className="w-full h-full bg-gray-900 rounded-[20px] overflow-hidden flex flex-col relative">
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AndroidFrame;
