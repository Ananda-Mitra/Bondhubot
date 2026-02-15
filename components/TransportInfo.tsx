
import React, { useState } from 'react';
import { Bus, Bike, MapPin, ChevronLeft, Search, Clock } from 'lucide-react';
import { MOCK_TRANSPORT } from '../constants';

const TransportInfo: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = MOCK_TRANSPORT.filter(t => 
    t.from.includes(searchTerm) || t.to.includes(searchTerm)
  );

  return (
    <div className="p-4 animate-in slide-in-from-right duration-300 mb-20">
      <div className="flex items-center mb-4">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-200">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold ml-2 text-gray-800">যাতায়াত তথ্য</h1>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="কোথা থেকে বা কোথায় যাবেন?"
          className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent outline-none text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filtered.map((route) => (
          <div key={route.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  {route.mode === 'Bus' ? <Bus size={20} className="text-blue-600" /> : <Bike size={20} className="text-amber-600" />}
                </div>
                <span className="font-bold text-gray-700">{route.mode}</span>
              </div>
              <span className="text-[#2E7D32] font-bold text-lg">{route.fare}</span>
            </div>

            <div className="flex items-center gap-3 ml-1">
              <div className="flex flex-col items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#2E7D32]" />
                <div className="w-0.5 h-6 bg-gray-200" />
                <div className="w-2 h-2 rounded-full bg-red-500" />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium">{route.from}</span>
                <span className="text-sm font-medium">{route.to}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2 text-xs text-gray-400">
              <Clock size={14} />
              গড় সময়: {route.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransportInfo;
