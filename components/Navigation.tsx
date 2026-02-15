
import React from 'react';
import { Mic, ClipboardList, Users, Settings, Home } from 'lucide-react';
import { AppScreen } from '../types';

interface NavigationProps {
  currentScreen: AppScreen;
  setScreen: (screen: AppScreen) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentScreen, setScreen }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'হোম' },
    { id: 'voice', icon: Mic, label: 'ভয়েস' },
    { id: 'community', icon: Users, label: 'কমিউনিটি' },
    { id: 'settings', icon: Settings, label: 'সেটিংস' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 safe-area-inset-bottom shadow-lg z-50">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setScreen(item.id as AppScreen)}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            currentScreen === item.id ? 'text-[#2E7D32]' : 'text-gray-500 hover:text-[#2E7D32]'
          }`}
        >
          <item.icon size={24} className={currentScreen === item.id ? 'scale-110' : ''} />
          <span className="text-[10px] mt-1 font-bold">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
