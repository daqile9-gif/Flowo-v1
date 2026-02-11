import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Palette, BookOpen, Headphones, ChevronRight } from 'lucide-react';
import { Tab } from '../../types';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToCMF: () => void;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose, onNavigateToCMF }) => {
  const menuItems = [
    { icon: Package, label: '我的订单', badge: true, action: null },
    { icon: Palette, label: '个性化定制', badge: false, action: onNavigateToCMF },
    { icon: BookOpen, label: '使用指南', badge: false, action: null },
    { icon: Headphones, label: '帮助与支持', badge: false, action: null },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm z-[70]"
          />
          
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-y-0 left-0 w-[80%] max-w-[300px] bg-[#F8F9FA]/95 backdrop-blur-xl z-[80] shadow-2xl p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#B2D85D] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  F
                </div>
                <div>
                   <h2 className="font-bold text-[#2E4028]">Flowow</h2>
                   <p className="text-xs text-gray-500">v2.1.0</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="bg-white rounded-[24px] p-4 shadow-sm mb-8 flex items-center gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#B2D85D]/10 rounded-bl-[32px]" />
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
                    {/* Updated image */}
                    <img src="https://foruda.gitee.com/images/1770744361487109110/0a1290d4_16642231.jpeg" alt="Flowow Air" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="font-semibold text-sm text-black">Flowow Air</h3>
                    <p className="text-xs text-[#B2D85D] font-medium">已连接</p>
                </div>
            </div>

            <div className="flex-1 space-y-2">
              {menuItems.map((item, index) => (
                <motion.button
                    key={item.label}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (item.action) {
                        item.action();
                        onClose();
                      }
                    }}
                    className="w-full flex items-center justify-between p-4 bg-white rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-50 rounded-xl">
                            <item.icon size={18} className="text-gray-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {item.badge && <div className="w-2 h-2 bg-red-400 rounded-full" />}
                        <ChevronRight size={16} className="text-gray-300" />
                    </div>
                </motion.button>
              ))}
            </div>
            
            <div className="mt-auto pt-6 border-t border-gray-100">
                <p className="text-xs text-center text-gray-400">科技疗愈身心</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideDrawer;