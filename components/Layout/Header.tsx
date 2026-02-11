import React from 'react';
import { Menu, Battery, Bluetooth } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuClick, showBackButton, onBack }) => {
  return (
    <div className="relative flex justify-between items-center px-6 pt-2 pb-2">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={showBackButton ? onBack : onMenuClick}
        className="relative z-10 p-2 bg-white rounded-2xl shadow-sm text-gray-700"
      >
        {showBackButton ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        ) : (
          <Menu size={20} />
        )}
      </motion.button>
      
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-[#2E4028] tracking-tight whitespace-nowrap">
        {title}
      </h1>
      
      <div className="relative z-10 flex items-center gap-3">
        <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm">
           <Bluetooth size={14} className="text-[#B2D85D] fill-current" />
           <div className="h-3 w-[1px] bg-gray-200 mx-1"></div>
           <div className="flex items-center gap-1">
             <span className="text-xs font-semibold text-gray-600">85%</span>
             <div className="relative w-4 h-2.5 border border-[#B2D85D] rounded-[2px] p-[1px] overflow-hidden">
                <div className="h-full bg-[#B2D85D] rounded-[1px]" style={{ width: '85%' }} />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Header;