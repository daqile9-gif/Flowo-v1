import React from 'react';
import { Wifi, Battery } from 'lucide-react';

const StatusBar: React.FC = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="h-[44px] px-8 flex items-center justify-between bg-transparent z-50">
      <span className="text-[14px] font-semibold text-gray-800">{currentTime}</span>
      <div className="flex items-center gap-1.5">
        <Wifi size={14} className="text-gray-800" />
        <div className="flex items-center gap-0.5">
          <span className="text-[10px] font-bold text-gray-800 mr-0.5">100%</span>
          <div className="relative w-[22px] h-[11px] border border-gray-400 rounded-sm p-[1px]">
             <div className="w-full h-full bg-black rounded-[1px]" />
             <div className="absolute -right-[3px] top-[3px] w-[2px] h-[4px] bg-gray-400 rounded-r-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;