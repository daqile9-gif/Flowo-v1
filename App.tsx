import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tab } from './types';
import Header from './components/Layout/Header';
import BottomNav from './components/Layout/BottomNav';
import SideDrawer from './components/Layout/SideDrawer';
import StatusBar from './components/Layout/StatusBar';
import Dashboard from './views/Dashboard';
import Focus from './views/Focus';
import Insights from './views/Insights';
import Profile from './views/Profile';
import CMFPage from './views/CMFPage';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.DASHBOARD);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (currentTab) {
      case Tab.DASHBOARD: return <Dashboard />;
      case Tab.FOCUS: return <Focus />;
      case Tab.INSIGHTS: return <Insights />;
      case Tab.PROFILE: return <Profile />;
      case Tab.CMF: return <CMFPage />;
      default: return <Dashboard />;
    }
  };

  const getTitle = () => {
    switch (currentTab) {
      case Tab.DASHBOARD: return '我的靠枕';
      case Tab.FOCUS: return '专注模式';
      case Tab.INSIGHTS: return '健康数据';
      case Tab.PROFILE: return '个人中心';
      case Tab.CMF: return '个性化定制';
      default: return 'Flowow';
    }
  };

  // Dimensions for Vivo X300 Pro approx 6.78 inch (using typical 428x926 viewport for large phones)
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="relative w-[428px] h-[926px] bg-[#F8F9FA] overflow-hidden flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.3)] rounded-[50px] border-[8px] border-black transform transition-all">
        
        <StatusBar />

        <AnimatePresence>
          {showSplash && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-[100] bg-white flex items-center justify-center flex-col"
            >
              <motion.img 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                src="https://foruda.gitee.com/images/1770745555815585923/156e1aa8_16642231.png" 
                alt="Flowow Logo"
                className="w-48 h-auto" 
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Header 
          title={getTitle()} 
          onMenuClick={() => setIsDrawerOpen(true)}
          showBackButton={currentTab === Tab.CMF}
          onBack={() => setCurrentTab(Tab.DASHBOARD)}
        />

        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full w-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {currentTab !== Tab.CMF && (
          <BottomNav 
            currentTab={currentTab} 
            onTabChange={setCurrentTab} 
          />
        )}

        <SideDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)}
          onNavigateToCMF={() => setCurrentTab(Tab.CMF)}
        />
        
        {/* iOS Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/10 rounded-full z-50" />
      </div>
    </div>
  );
};

export default App;