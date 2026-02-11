import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';

const Insights: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'Day' | 'Week' | 'Month'>('Day');

  // Mock Data
  const data = [
    { time: '9:00', score: 60 },
    { time: '11:00', score: 85 },
    { time: '13:00', score: 70 },
    { time: '15:00', score: 40 }, // Slump
    { time: '17:00', score: 80 },
    { time: '19:00', score: 90 },
  ];

  const pieData = [
    { name: 'Proper', value: 72, color: '#B2D85D' },
    { name: 'Crossed Legs', value: 18, color: '#FF9F43' },
    { name: 'Slouching', value: 10, color: '#2E4028' },
  ];

  return (
    <div className="flex flex-col h-full px-6 space-y-6 pb-24 overflow-y-auto no-scrollbar">
      
      {/* Timeframe Switcher */}
      <div className="bg-gray-100 p-1 rounded-xl flex">
        {[
            { id: 'Day', label: '日' }, 
            { id: 'Week', label: '周' }, 
            { id: 'Month', label: '月' }
        ].map((t) => (
            <button
                key={t.id}
                onClick={() => setTimeframe(t.id as any)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                    timeframe === t.id ? 'bg-white shadow-sm text-[#2E4028]' : 'text-gray-400'
                }`}
            >
                {t.label}
            </button>
        ))}
      </div>

      {/* Main Chart Card */}
      <div className="bg-white rounded-[32px] p-6 shadow-sm">
        <div className="flex justify-between items-start mb-6">
            <div>
                <h3 className="text-gray-500 text-sm">坐姿评分</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[#2E4028]">72%</span>
                    <span className="text-xs text-[#B2D85D] font-bold bg-[#B2D85D]/10 px-2 py-0.5 rounded-full">+2%</span>
                </div>
            </div>
        </div>
        
        <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#B2D85D" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#B2D85D" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis 
                        dataKey="time" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#9CA3AF', fontSize: 12}} 
                        dy={10}
                    />
                    <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        cursor={{ stroke: '#B2D85D', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#B2D85D" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorScore)" 
                        animationDuration={1500}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-[24px] p-5 shadow-sm flex flex-col items-center justify-center">
             <div className="relative w-24 h-24">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            innerRadius={30}
                            outerRadius={40}
                            paddingAngle={5}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={4} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-xs text-gray-400">正确坐姿</span>
                </div>
             </div>
             <p className="mt-2 text-sm font-semibold text-[#2E4028]">坐姿分布</p>
        </div>

        <div className="bg-[#2E4028] rounded-[24px] p-5 shadow-sm text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#B2D85D] opacity-20 rounded-bl-full" />
            <div>
                <p className="text-white/60 text-xs">久坐时长</p>
                <p className="text-2xl font-bold mt-1">6h 12m</p>
            </div>
            <div className="mt-4">
                 <div className="flex items-center gap-2 text-xs text-[#B2D85D]">
                    <span className="w-2 h-2 rounded-full bg-[#B2D85D]" />
                    <span>健康范围</span>
                 </div>
            </div>
        </div>
      </div>

      {/* AI Bubble */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-[#F0FDF4] to-white border border-[#B2D85D]/20 rounded-[24px] p-4 relative shadow-sm"
      >
        <div className="absolute -top-3 -left-2 bg-white rounded-xl shadow-sm p-1">
             <div className="bg-[#B2D85D] rounded-lg p-1">
                <MessageCircle size={16} className="text-white" />
             </div>
        </div>
        <p className="text-sm text-[#2E4028] leading-relaxed pt-2">
            "晚上好，亲爱的刘女士。今日小淮监测到您在下午 3-4 点频繁前倾，姿势的不正确通常也伴随着眼部的疲劳，我已稍微调硬了腰部支撑，希望明天您能感到更舒适。详细分析可见完整报告，祝您今夜好眠~"
        </p>
        <div className="flex justify-end mt-2">
            <button className="text-xs font-bold text-[#2E4028] flex items-center gap-1 hover:text-[#B2D85D]">
                完整报告 <ArrowRight size={12} />
            </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Insights;