
import React, { useState, useEffect } from 'react';
import { AppScreen, UserProfile } from './types';
import Navigation from './components/Navigation';
import WorkerFinder from './components/WorkerFinder';
import MarketPrices from './components/MarketPrices';
import TransportInfo from './components/TransportInfo';
import HelpCircle from './components/HelpCircle';
import VoiceInterface from './components/VoiceInterface';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import Onboarding from './components/Onboarding';
import { Bot, Wrench, Bus, ShoppingCart, Megaphone, Info, Wifi, WifiOff, Smartphone, Download, Shield, UserCheck } from 'lucide-react';

const HomeScreen: React.FC<{ onScreenChange: (screen: AppScreen) => void, isAdmin: boolean, profile: UserProfile | null }> = ({ onScreenChange, isAdmin, profile }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [logoClicks, setLogoClicks] = useState(0);

  const categories = [
    { id: 'workers', label: 'কাজের লোক', sub: 'প্লাম্বার, ইলেকট্রিশিয়ান', icon: Wrench, color: 'bg-orange-50 text-orange-600' },
    { id: 'transport', label: 'যাতায়াত', sub: 'বাস, রিকশা, ভাড়া', icon: Bus, color: 'bg-blue-50 text-blue-600' },
    { id: 'market', label: 'বাজার দাম', sub: 'শাকসবজি, মাছ, মাংস', icon: ShoppingCart, color: 'bg-green-50 text-green-600' },
    { id: 'community', label: 'সহায়তা', sub: 'সাহায্য চান বা দিন', icon: Megaphone, color: 'bg-red-50 text-red-600' },
  ];

  const handleLogoClick = () => {
    const newCount = logoClicks + 1;
    if (newCount === 5) {
      onScreenChange('admin-login');
      setLogoClicks(0);
    } else {
      setLogoClicks(newCount);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLogoClicks(0), 3000);
    return () => clearTimeout(timer);
  }, [logoClicks]);

  return (
    <div className="pb-24">
      <header className="p-6 bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-white rounded-b-[40px] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="flex justify-between items-center mb-8 relative z-10">
          <div className="flex items-center gap-2">
            <button 
              onClick={handleLogoClick}
              className="bg-white p-2 rounded-xl shadow-lg active:scale-90 transition-transform"
            >
              <Bot className="text-[#2E7D32]" size={32} />
            </button>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-2xl font-bold">বন্ধুবট</h1>
                {isAdmin && <Shield size={14} className="text-amber-400" />}
              </div>
              <p className="text-[10px] opacity-80 uppercase font-bold tracking-widest">BondhuBot AI Assistant</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOnline(!isOnline)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${
              isOnline ? 'bg-green-400/20 text-green-200' : 'bg-red-400/20 text-red-200'
            }`}
          >
            {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
            {isOnline ? 'অনলাইন' : 'অফলাইন'}
          </button>
        </div>
        
        <div className="relative z-10 bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10">
          <p className="text-sm italic leading-relaxed">
            "আসসালামু আলাইকুম {profile?.name}! আমি আপনার বন্ধু। আজকে আমি আপনাকে কীভাবে সাহায্য করতে পারি?"
          </p>
          <button 
            onClick={() => onScreenChange('voice')}
            className="mt-4 w-full bg-white text-[#2E7D32] py-3 rounded-2xl font-bold text-sm shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            কথা বলতে চাপ দিন
          </button>
        </div>
      </header>

      <section className="p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          আপনার কী প্রয়োজন? <Info size={16} className="text-gray-300" />
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onScreenChange(cat.id as AppScreen)}
              className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start gap-2 hover:shadow-md active:scale-[0.96] transition-all text-left group"
            >
              <div className={`${cat.color} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
                <cat.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{cat.label}</h3>
                <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{cat.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 mb-4">
        <div className="bg-[#FFA000]/10 border border-[#FFA000]/20 p-4 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 bg-[#FFA000] rounded-2xl flex items-center justify-center text-white shrink-0">
            <Megaphone size={24} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-800">আজকের টিপস</h4>
            <p className="text-xs text-gray-600">বাজারে আলু ও পিঁয়াজের দাম কিছুটা কমেছে। আপনার স্থানীয় প্লাম্বার এখন ব্যস্ত থাকতে পারেন।</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const SettingsScreen: React.FC<{ onAdminClick: () => void, isAdmin: boolean, profile: UserProfile | null }> = ({ onAdminClick, isAdmin, profile }) => (
  <div className="p-6 mb-20 overflow-y-auto h-full">
    <h1 className="text-2xl font-bold mb-6">সেটিংস</h1>
    
    <div className="space-y-4">
      {/* Profile Card */}
      {profile && (
        <div className="bg-[#2E7D32] text-white p-5 rounded-3xl shadow-lg mb-6 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <UserCheck size={120} />
          </div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center font-bold text-2xl">
              {profile.name[0]}
            </div>
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                {profile.name} <UserCheck size={18} className="text-green-300" />
              </h3>
              <p className="text-xs opacity-70">{profile.phone}</p>
              <p className="text-[10px] opacity-50">NID: ****{profile.nid.slice(-4)}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
        <span>ভাষা (Language)</span>
        <span className="text-[#2E7D32] font-bold">বাংলা</span>
      </div>
      
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
        <span>ডার্ক মোড</span>
        <div className="w-10 h-5 bg-gray-200 rounded-full" />
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
        <span>অফলাইন ডেটা ডাউনলোড</span>
        <span className="text-xs text-gray-400">৮ মেগাবাইট</span>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-bold text-gray-400 mb-3 px-1 uppercase tracking-wider">মোবাইল অভিজ্ঞতা</h3>
        <div className="bg-[#2E7D32]/5 border border-[#2E7D32]/10 p-5 rounded-3xl">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-[#2E7D32] p-2.5 rounded-xl text-white">
              <Smartphone size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm">হোম স্ক্রিনে যোগ করুন</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                আপনার অ্যান্ড্রয়েড ফোনে অ্যাপটির মতো অভিজ্ঞতা পেতে ব্রাউজার মেনু থেকে "Add to Home Screen" অপশনটি ব্যবহার করুন।
              </p>
            </div>
          </div>
          <button className="w-full bg-[#2E7D32] text-white py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all">
            <Download size={18} /> ইনস্টল নির্দেশিকা
          </button>
        </div>
      </div>

      {isAdmin && (
        <button 
          onClick={onAdminClick}
          className="w-full mt-4 bg-slate-900 text-white py-4 rounded-3xl font-bold flex items-center justify-center gap-2 shadow-lg"
        >
          <Shield size={20} /> অ্যাডমিন ড্যাশবোর্ড
        </button>
      )}

      <div className="mt-10 pt-6 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">BondhuBot v1.0.0 (Web/PWA)</p>
        <p className="text-[10px] text-gray-300 mt-1">Made with ❤️ for Bangladesh</p>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Check registration status on load
  useEffect(() => {
    const saved = localStorage.getItem('bondhubot_profile');
    if (saved) {
      setProfile(JSON.parse(saved));
    } else {
      setScreen('onboarding');
    }
  }, []);

  const handleAdminSuccess = () => {
    setIsAdmin(true);
    setScreen('admin');
  };

  const handleOnboardingComplete = (newProfile: UserProfile) => {
    localStorage.setItem('bondhubot_profile', JSON.stringify(newProfile));
    setProfile(newProfile);
    setScreen('home');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'onboarding': return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'home': return <HomeScreen onScreenChange={setScreen} isAdmin={isAdmin} profile={profile} />;
      case 'voice': return <VoiceInterface />;
      case 'workers': return <WorkerFinder onBack={() => setScreen('home')} />;
      case 'market': return <MarketPrices onBack={() => setScreen('home')} />;
      case 'transport': return <TransportInfo onBack={() => setScreen('home')} />;
      case 'community': return <HelpCircle />;
      case 'settings': return <SettingsScreen onAdminClick={() => setScreen('admin')} isAdmin={isAdmin} profile={profile} />;
      case 'admin-login': return <AdminLogin onBack={() => setScreen('home')} onSuccess={handleAdminSuccess} />;
      case 'admin': return <AdminDashboard onBack={() => setScreen('home')} />;
      default: return <HomeScreen onScreenChange={setScreen} isAdmin={isAdmin} profile={profile} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col bg-[#F8F9FA] overflow-x-hidden select-none">
      <main className="flex-1 overflow-hidden">
        {renderScreen()}
      </main>
      {screen !== 'onboarding' && screen !== 'admin' && screen !== 'admin-login' && (
        <Navigation currentScreen={screen} setScreen={setScreen} />
      )}
    </div>
  );
};

export default App;
