import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Droplets, Leaf, Watch } from 'lucide-react';

const Focus: React.FC = () => {
  const [mode, setMode] = useState<'countdown' | 'stopwatch'>('countdown');
  const [isActive, setIsActive] = useState(false);
  const [targetDuration, setTargetDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showReminder, setShowReminder] = useState(false);
  const [reminderDismissed, setReminderDismissed] = useState(false);
  const [mood, setMood] = useState<number>(3);

  useEffect(() => {
    if (!isActive && mode === 'countdown') {
      setTimeLeft(targetDuration * 60);
    }
  }, [targetDuration, isActive, mode]);

  useEffect(() => {
    let interval: number | null = null;
    if (isActive) {
      interval = setInterval(() => {
        if (mode === 'countdown') {
          setTimeLeft((prev) => {
             if (prev <= 1) {
                 setIsActive(false);
                 return 0;
             }
             return prev - 1;
          });
        } else {
          setElapsedTime((prev) => {
              const newValue = prev + 1;
              if (newValue === 5400 && !reminderDismissed) {
                  setShowReminder(true);
              }
              return newValue;
          });
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, mode, reminderDismissed]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
        return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'countdown') {
        setTimeLeft(targetDuration * 60);
    } else {
        setElapsedTime(0);
        setReminderDismissed(false);
    }
  };

  const moods = ['🌱', '🌿', '🪴', '🌸', '🌳'];

  return (
    <div className="flex flex-col h-full px-6 space-y-6 pb-32 overflow-y-auto no-scrollbar relative">
      <AnimatePresence>
        {showReminder && (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
            >
                <div className="bg-white w-full max-w-sm rounded-[32px] p-6 shadow-2xl flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-[#B2D85D]/20 rounded-full flex items-center justify-center mb-4">
                        <Watch size={32} className="text-[#2E4028]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#2E4028] mb-2">休息一下？</h3>
                    <p className="text-gray-500 mb-6">您已连续专注了 90 分钟，起身活动一下，放松身体吧！</p>
                    <div className="flex flex-col gap-3 w-full">
                        <button 
                            onClick={() => { setShowReminder(false); setIsActive(false); }}
                            className="w-full py-3 bg-[#B2D85D] text-[#2E4028] font-bold rounded-xl"
                        >
                            好的，去休息
                        </button>
                        <button 
                            onClick={() => { setShowReminder(false); setReminderDismissed(true); }}
                            className="w-full py-3 bg-gray-100 text-gray-500 font-medium rounded-xl"
                        >
                            本次不需要提醒
                        </button>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 min-h-[300px] relative flex flex-col items-center justify-center pb-10">
        <div className="relative w-full flex items-center justify-center">
            {/* Background Glow */}
            <motion.div
                animate={{ scale: isActive ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-64 h-64 bg-gradient-to-br from-[#B2D85D]/20 to-[#B2D85D]/5 rounded-full blur-3xl absolute z-0 top-4"
            />
            
            {/* Plant Emoji */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-64 h-64 relative flex items-center justify-center z-10"
            >
                <span className="text-[160px] drop-shadow-2xl filter">
                    {moods[mood]}
                </span>
            </motion.div>

             {/* Interaction Buttons - Positioned on the right side */}
             <div className="absolute right-2 flex flex-col gap-4 z-20 top-1/2 -translate-y-1/2">
               <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 rounded-full bg-[#B2D85D]/20 backdrop-blur-sm flex flex-col items-center justify-center shadow-sm text-[#2E4028] border border-[#B2D85D]/30"
              >
                  <Droplets size={20} className="text-[#2E4028] drop-shadow-sm" />
                  <span className="text-[10px] font-bold mt-0.5">浇水</span>
              </motion.button>
              
              <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 rounded-full bg-[#B2D85D]/20 backdrop-blur-sm flex flex-col items-center justify-center shadow-sm text-[#2E4028] border border-[#B2D85D]/30"
              >
                  <Leaf size={20} className="text-[#2E4028] drop-shadow-sm" />
                  <span className="text-[10px] font-bold mt-0.5">施肥</span>
              </motion.button>
            </div>
        </div>
        
        <div className="mt-4 bg-[#B2D85D]/10 px-4 py-1.5 rounded-full border border-[#B2D85D]/20 z-10">
            <span className="text-xs font-bold text-[#2E4028]">生长阶段：茂盛期</span>
        </div>
      </div>

      {/* Lifted Timer Module - added mb-10 for extra clearance */}
      <div className="bg-[#2E4028] rounded-[32px] p-6 text-white shadow-xl relative overflow-hidden z-10 mb-10">
        <div className="flex p-1 bg-black/20 rounded-xl mb-6 relative">
             <div className="absolute inset-y-1 rounded-lg bg-[#B2D85D] transition-all duration-300"
                  style={{ width: 'calc(50% - 4px)', left: mode === 'countdown' ? '4px' : '50%' }} 
             />
             <button onClick={() => { setMode('countdown'); setIsActive(false); }}
                className={`flex-1 relative z-10 py-2 text-sm font-bold transition-colors ${mode === 'countdown' ? 'text-[#2E4028]' : 'text-white/60'}`}>
                倒计时
             </button>
             <button onClick={() => { setMode('stopwatch'); setIsActive(false); }}
                className={`flex-1 relative z-10 py-2 text-sm font-bold transition-colors ${mode === 'stopwatch' ? 'text-[#2E4028]' : 'text-white/60'}`}>
                正计时
             </button>
        </div>

        <div className="flex flex-col items-center mb-6">
            <span className="text-[64px] font-bold tracking-tighter tabular-nums leading-none">
                {mode === 'countdown' ? formatTime(timeLeft) : formatTime(elapsedTime)}
            </span>
            <span className="text-white/60 text-sm mt-2">
                {mode === 'countdown' ? '剩余时间' : '专注时长'}
            </span>
        </div>

        {mode === 'countdown' && !isActive && (
            <motion.div className="mb-8 px-4">
                <input type="range" min="5" max="120" step="5" value={targetDuration}
                    onChange={(e) => setTargetDuration(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#B2D85D]" />
                <div className="flex justify-between text-xs text-white/40 mt-2">
                    <span>5min</span>
                    <span>{targetDuration}min</span>
                    <span>120min</span>
                </div>
            </motion.div>
        )}

        <div className="flex justify-center gap-6 mb-6">
            <button onClick={toggleTimer}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-[#2E4028] shadow-lg transition-colors ${isActive ? 'bg-[#FF9F43]' : 'bg-[#B2D85D]'}`}>
                {isActive ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
            </button>
            <button onClick={resetTimer}
                className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <RotateCcw size={24} />
            </button>
        </div>
        
        <div className="bg-black/20 rounded-2xl p-4">
            <p className="text-xs text-center text-white/60 mb-3">植物生长状态</p>
            <div className="flex justify-between px-2">
                {moods.map((emoji, index) => (
                    <motion.button key={index} onClick={() => setMood(index)}
                        className={`text-2xl transition-transform ${mood === index ? 'scale-125 opacity-100' : 'opacity-40'}`}
                        whileTap={{ scale: 1.4 }}>
                        {emoji}
                    </motion.button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Focus;