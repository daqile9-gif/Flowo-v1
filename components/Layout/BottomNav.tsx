import React from 'react';
import { LayoutGrid, BrainCircuit, Activity, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tab } from '../../types';

interface BottomNavProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const navItems = [
    { id: Tab.DASHBOARD, icon: LayoutGrid, label: '主页' },
    { id: Tab.FOCUS, icon: BrainCircuit, label: '专注' },
    { id: Tab.INSIGHTS, icon: Activity, label: '健康' },
    { id: Tab.PROFILE, icon: User, label: '我的' },
  ];

  return (
    <div className="absolute bottom-8 left-0 right-0 px-6 z-40 flex justify-center">
      <div className="bg-white/90 backdrop-blur-lg rounded-[32px] px-6 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-white/20 w-full max-w-sm flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              whileTap={{ scale: 0.8 }}
              className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-colors duration-300`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#B2D85D]/10 rounded-2xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <item.icon
                size={24}
                className={`z-10 transition-colors duration-300 ${
                  isActive ? 'text-[#2E4028]' : 'text-gray-400'
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-1 w-1 h-1 bg-[#B2D85D] rounded-full"
                />
              )}
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-[#2E4028]' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;