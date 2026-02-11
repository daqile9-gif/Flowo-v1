import React from 'react';
import { motion } from 'framer-motion';

const CMFPage: React.FC = () => {
  const cushionVariants = [
    { name: '薰衣紫', src: 'https://foruda.gitee.com/images/1770744311105959316/004b03c5_16642231.png' },
    { name: '晨曦粉', src: 'https://foruda.gitee.com/images/1770744425065543259/e20b292b_16642231.png' },
    { name: '深空灰', src: 'https://foruda.gitee.com/images/1770744460375618499/4285b48c_16642231.png' },
    { name: '薄荷绿', src: 'https://foruda.gitee.com/images/1770744495064620480/bc04a551_16642231.png' },
    { name: '星云银', src: 'https://foruda.gitee.com/images/1770744518990424219/253dc5b5_16642231.png' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA] overflow-y-auto no-scrollbar pb-10">
      <div className="px-6 py-6">
        <h2 className="text-2xl font-bold text-[#2E4028] mb-6">我的设备</h2>
        <div className="bg-[#B2D85D] rounded-[40px] p-8 aspect-square flex items-center justify-center relative overflow-hidden shadow-xl">
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
           <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src="https://foruda.gitee.com/images/1770744398251306560/cd3d7c0f_16642231.png" 
              className="w-full h-auto drop-shadow-2xl z-10" 
           />
           <div className="absolute bottom-6 left-8">
              <span className="text-white text-sm font-medium">Flowow Air</span>
              <p className="text-white/60 text-xs">当前选择：经典绿</p>
           </div>
        </div>
      </div>

      <div className="px-6 mt-4">
        <h3 className="text-lg font-bold text-[#2E4028] mb-6">更多配色选择</h3>
        <div className="grid grid-cols-2 gap-4">
          {cushionVariants.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[32px] p-4 shadow-sm border border-gray-100 flex flex-col items-center"
            >
              <div className="w-full aspect-square bg-[#F8F9FA] rounded-[24px] mb-3 flex items-center justify-center overflow-hidden">
                <img src={item.src} className="w-[85%] h-auto drop-shadow-md object-contain" />
              </div>
              <span className="text-sm font-semibold text-[#2E4028]">{item.name}</span>
              <button className="mt-3 w-full py-2 bg-[#F8F9FA] rounded-full text-xs font-bold text-[#B2D85D] border border-[#B2D85D]/20">
                查看详情
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CMFPage;