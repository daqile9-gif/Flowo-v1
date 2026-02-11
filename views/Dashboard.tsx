import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Waves, Zap, RefreshCw, X, PlayCircle } from 'lucide-react';
import { PostureState } from '../types';

const Dashboard: React.FC = () => {
  const [posture, setPosture] = useState<PostureState>(PostureState.GOOD);
  const [isBreathing, setIsBreathing] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Simulate posture change and toast
  useEffect(() => {
    const timer = setTimeout(() => {
      setPosture(PostureState.LEANING_LEFT);
      setShowToast(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleBreathing = () => {
    setIsBreathing(!isBreathing);
  };

  return (
    <div className="flex flex-col h-full px-6 pb-24 space-y-6 overflow-y-auto no-scrollbar">
      
      {/* Hero Section: Posture Visualizer */}
      <div className="relative w-full aspect-[4/3] bg-white rounded-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col items-center justify-center">
        {/* Animated Background Gradients */}
        <motion.div
          animate={{
            scale: isBreathing ? [1, 1.1, 1] : 1,
            opacity: isBreathing ? 0.8 : 0.5,
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-br from-[#F8F9FA] to-white z-0"
        />
        
        {/* Heatmap Blobs */}
        <div className="relative z-10 w-48 h-48">
            {/* Center Core */}
            <motion.div 
                animate={{
                    x: posture === PostureState.LEANING_LEFT ? -30 : posture === PostureState.LEANING_RIGHT ? 30 : 0,
                    scale: posture === PostureState.SLOUCHING ? 0.8 : 1
                }}
                className="absolute inset-0 m-auto w-32 h-32 bg-[#B2D85D] rounded-full blur-2xl opacity-40"
            />
            {/* Pressure Points */}
            <motion.div 
                 animate={{
                    x: posture === PostureState.LEANING_LEFT ? -40 : 0,
                    opacity: posture === PostureState.LEANING_LEFT ? 0.8 : 0.2
                }}
                className="absolute left-0 bottom-10 w-20 h-20 bg-[#FF9F43] rounded-full blur-xl mix-blend-multiply"
            />
             <motion.div 
                 animate={{
                    x: posture === PostureState.LEANING_RIGHT ? 40 : 0,
                    opacity: posture === PostureState.LEANING_RIGHT ? 0.8 : 0.2
                }}
                className="absolute right-0 bottom-10 w-20 h-20 bg-[#FF9F43] rounded-full blur-xl mix-blend-multiply"
            />
            
            {/* Grid Lines for "Tech" feel */}
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" />
            </svg>
        </div>

        {/* Status Text */}
        <div className="absolute bottom-6 flex flex-col items-center z-20">
            <motion.h2 
                key={posture}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-2xl font-bold ${posture === PostureState.GOOD ? 'text-[#2E4028]' : 'text-[#FF9F43]'}`}
            >
                {posture}
            </motion.h2>
            <p className="text-xs text-gray-400 mt-1">实时监测中</p>
        </div>
      </div>

      {/* Control Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Vibrate Toggle */}
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsVibrating(!isVibrating)}
            className={`p-5 rounded-[24px] flex flex-col justify-between h-32 shadow-sm transition-colors duration-300 ${isVibrating ? 'bg-white border-2 border-[#B2D85D]' : 'bg-white'}`}
        >
            <div className={`p-2 rounded-full w-fit ${isVibrating ? 'bg-[#B2D85D]/20 text-[#2E4028]' : 'bg-gray-100 text-gray-400'}`}>
                <Zap size={20} className={isVibrating ? 'fill-current' : ''} />
            </div>
            <div className="text-left">
                <p className="font-semibold text-[#2E4028]">震动反馈</p>
                <p className="text-xs text-gray-400">{isVibrating ? '已开启' : '已关闭'}</p>
            </div>
        </motion.button>

        {/* Breathing Rhythm */}
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleBreathing}
            className={`p-5 rounded-[24px] flex flex-col justify-between h-32 shadow-sm transition-colors duration-500 ${isBreathing ? 'bg-[#2E4028] text-white' : 'bg-white text-[#2E4028]'}`}
        >
            <div className={`p-2 rounded-full w-fit ${isBreathing ? 'bg-white/20' : 'bg-[#B2D85D]/20'}`}>
                <Waves size={20} className={isBreathing ? 'animate-pulse' : ''} />
            </div>
            <div className="text-left">
                <p className="font-semibold">呼吸练习</p>
                <p className={`text-xs ${isBreathing ? 'text-white/60' : 'text-gray-400'}`}>
                    {isBreathing ? '吸气...' : '开始练习'}
                </p>
            </div>
        </motion.button>
        
        {/* Calibrate */}
        <motion.button
            whileTap={{ scale: 0.95 }}
            className="col-span-2 p-4 rounded-[24px] border-2 border-dashed border-gray-200 flex items-center justify-center gap-2 text-gray-400 hover:border-[#B2D85D] hover:text-[#B2D85D] transition-colors"
        >
            <RefreshCw size={18} />
            <span className="font-medium text-sm">重新校准传感器</span>
        </motion.button>
      </div>

      {/* Intervention Toast - Moved up to bottom-36 (approx 144px) to clear bottom nav */}
      <AnimatePresence>
        {showToast && (
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-36 left-6 right-6 bg-[#2E4028] rounded-[24px] p-4 shadow-xl z-50 flex items-center justify-between"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FF9F43] rounded-full flex items-center justify-center text-white">
                        !
                    </div>
                    <div className="text-white">
                        <p className="font-semibold text-sm">已保持不良坐姿 15 分钟</p>
                        <p className="text-xs text-white/60">起来活动一下？</p>
                    </div>
                </div>
                <button 
                    onClick={() => setShowToast(false)}
                    className="flex items-center gap-1 bg-[#B2D85D] text-[#2E4028] px-3 py-1.5 rounded-full text-xs font-bold"
                >
                    <PlayCircle size={14} />
                    查看引导
                </button>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;