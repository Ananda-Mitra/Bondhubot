
import React from 'react';
import { TrendingUp, TrendingDown, Minus, ChevronLeft, ShoppingCart } from 'lucide-react';
import { MOCK_MARKET } from '../constants';

const MarketPrices: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="p-4 animate-in slide-in-from-right duration-300 mb-20">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-200">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold ml-2 text-gray-800">বাজার দাম (আজ)</h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {MOCK_MARKET.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-green-50 rounded-lg">
                  <ShoppingCart size={20} className="text-[#2E7D32]" />
                </div>
                {item.trend === 'up' && <TrendingUp size={18} className="text-red-500" />}
                {item.trend === 'down' && <TrendingDown size={18} className="text-green-500" />}
                {item.trend === 'stable' && <Minus size={18} className="text-gray-400" />}
              </div>
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-gray-500 text-xs">প্রতি {item.unit}</p>
            </div>
            
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900">৳{item.price}</span>
              <p className={`text-[10px] mt-1 ${item.trend === 'up' ? 'text-red-500' : item.trend === 'down' ? 'text-green-500' : 'text-gray-400'}`}>
                গতকাল: ৳{item.prevPrice}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-[#FFA000]/10 p-4 rounded-2xl border border-[#FFA000]/20">
        <h4 className="font-bold text-[#FFA000] mb-1">সতর্কবার্তা</h4>
        <p className="text-xs text-gray-700 leading-relaxed">এই দামগুলো ঢাকার কারওয়ান বাজারের গড় খুচরা দামের ওপর ভিত্তি করে। এলাকাভেদে দামের কিছুটা পার্থক্য হতে পারে।</p>
      </div>
    </div>
  );
};

export default MarketPrices;
