
import React from 'react';
import { Star, Phone, ShieldCheck, MapPin, ChevronLeft } from 'lucide-react';
import { MOCK_WORKERS } from '../constants';

const WorkerFinder: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="p-4 animate-in slide-in-from-right duration-300 mb-20">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-200">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold ml-2 text-gray-800">কাজের লোক খুঁজুন</h1>
      </div>

      <div className="grid gap-4">
        {MOCK_WORKERS.map((worker) => (
          <div key={worker.id} className="bg-white rounded-2xl shadow-sm p-4 flex gap-4 border border-gray-100 hover:shadow-md transition-shadow">
            <img 
              src={worker.image} 
              alt={worker.name} 
              className="w-20 h-20 rounded-xl object-cover bg-gray-100" 
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-gray-900">{worker.name}</h3>
                {worker.verified && <ShieldCheck size={18} className="text-[#2E7D32]" />}
              </div>
              <p className="text-gray-600 text-sm">{worker.type}</p>
              
              <div className="flex items-center mt-1 gap-4">
                <div className="flex items-center text-amber-500">
                  <Star size={14} fill="currentColor" />
                  <span className="ml-1 text-xs font-bold">{worker.rating}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin size={14} />
                  <span className="ml-1 text-xs">{worker.distance}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <a 
                  href={`tel:${worker.phone}`}
                  className="flex-1 bg-[#2E7D32] text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-bold active:scale-95 transition-transform"
                >
                  <Phone size={14} /> কল করুন
                </a>
                <button className="flex-1 border border-[#2E7D32] text-[#2E7D32] py-2 rounded-lg text-sm font-bold active:scale-95 transition-transform">
                  বুক করুন
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkerFinder;
