
import React, { useState } from 'react';
import { ChevronLeft, Shield, TrendingUp, Users, Database, Save, CheckCircle, XCircle } from 'lucide-react';
import { MOCK_MARKET, MOCK_WORKERS } from '../constants';

const AdminDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'market' | 'workers' | 'system'>('market');
  const [marketData, setMarketData] = useState(MOCK_MARKET);
  const [workerData, setWorkerData] = useState(MOCK_WORKERS);
  const [showToast, setShowToast] = useState(false);

  const handleUpdatePrice = (id: string, newPrice: string) => {
    const price = parseInt(newPrice) || 0;
    setMarketData(prev => prev.map(item => 
      item.id === id ? { ...item, price, trend: price > item.prevPrice ? 'up' : 'down' } : item
    ));
  };

  const toggleVerify = (id: string) => {
    setWorkerData(prev => prev.map(w => 
      w.id === id ? { ...w, verified: !w.verified } : w
    ));
  };

  const saveChanges = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 animate-in fade-in duration-500 pb-24">
      {/* Admin Header */}
      <div className="bg-slate-900 text-white p-6 rounded-b-[32px] shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-white/10">
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-amber-400" />
            <span className="font-bold uppercase tracking-wider text-sm">প্রশাসক প্যানেল</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold">সিস্টেম কন্ট্রোল</h1>
      </div>

      {/* Tabs */}
      <div className="flex p-4 gap-2 overflow-x-auto">
        {[
          { id: 'market', label: 'বাজার দাম', icon: TrendingUp },
          { id: 'workers', label: 'কর্মী ব্যবস্থাপনা', icon: Users },
          { id: 'system', label: 'সিস্টেম', icon: Database },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all shrink-0 ${
              activeTab === tab.id ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 border border-slate-200'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4">
        {activeTab === 'market' && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-lg mb-4 text-slate-800">বাজার দাম আপডেট করুন</h3>
            <div className="space-y-4">
              {marketData.map(item => (
                <div key={item.id} className="flex items-center justify-between gap-4 p-3 bg-slate-50 rounded-2xl">
                  <span className="font-bold text-slate-700">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">৳</span>
                    <input 
                      type="number"
                      value={item.price}
                      onChange={(e) => handleUpdatePrice(item.id, e.target.value)}
                      className="w-20 bg-white border border-slate-200 rounded-lg px-2 py-1 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'workers' && (
          <div className="space-y-3">
            {workerData.map(worker => (
              <div key={worker.id} className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={worker.image} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">{worker.name}</h4>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">{worker.type}</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleVerify(worker.id)}
                  className={`p-2 rounded-xl transition-colors ${
                    worker.verified ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {worker.verified ? <CheckCircle size={20} /> : <XCircle size={20} />}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'system' && (
          <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-2xl">
                <p className="text-[10px] uppercase font-bold opacity-50">মোট ব্যবহারকারী</p>
                <p className="text-2xl font-bold">১,২৪২</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl">
                <p className="text-[10px] uppercase font-bold opacity-50">সক্রিয় কর্মী</p>
                <p className="text-2xl font-bold">{workerData.length}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs font-bold opacity-50 mb-2">সার্ভার স্ট্যাটাস</p>
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                সচল আছে (Online)
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={saveChanges}
          className="w-full bg-slate-900 text-white py-4 rounded-3xl font-bold flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
        >
          <Save size={20} /> পরিবর্তনগুলো সংরক্ষণ করুন
        </button>
      </div>

      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl animate-in slide-in-from-bottom-10 text-sm font-bold flex items-center gap-2">
          <CheckCircle size={18} className="text-green-400" />
          সফলভাবে আপডেট করা হয়েছে!
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
