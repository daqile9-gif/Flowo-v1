import React from 'react';
import { User, Settings, Download, Heart, ChevronRight, ToggleRight } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="flex flex-col h-full px-6 space-y-6 pb-24 overflow-y-auto no-scrollbar">
      
      {/* Header Card */}
      <div className="bg-white/50 backdrop-blur-md border border-white rounded-[32px] p-6 flex items-center gap-4 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-md">
            <img src="https://picsum.photos/200" alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div>
            <h2 className="text-xl font-bold text-[#2E4028]">刘女士</h2>
            <div className="flex items-center gap-2 mt-1">
                <span className="bg-[#B2D85D] text-[#2E4028] text-[10px] font-bold px-2 py-0.5 rounded-full">Lv. 5</span>
                <span className="text-xs text-gray-500">脊柱守护者</span>
            </div>
        </div>
      </div>

      {/* Settings List */}
      <div className="bg-white rounded-[32px] p-2 shadow-sm">
        {[
            { icon: Download, label: '导出数据 (PDF/CSV)', action: 'arrow' },
            { icon: Heart, label: '同步 Apple Health', action: 'toggle' },
            { icon: Settings, label: '通用设置', action: 'arrow' },
            { icon: User, label: '账户详情', action: 'arrow' }
        ].map((item, i) => (
            <div key={i} className={`flex items-center justify-between p-4 ${i !== 3 ? 'border-b border-gray-50' : ''}`}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
                        <item.icon size={16} />
                    </div>
                    <span className="font-medium text-[#2E4028] text-sm">{item.label}</span>
                </div>
                {item.action === 'arrow' ? (
                    <ChevronRight size={18} className="text-gray-300" />
                ) : (
                    <ToggleRight size={24} className="text-[#B2D85D]" />
                )}
            </div>
        ))}
      </div>
      
      <button className="w-full py-4 text-[#FF9F43] font-medium text-sm bg-white rounded-[24px] shadow-sm">
        退出登录
      </button>

    </div>
  );
};

export default Profile;