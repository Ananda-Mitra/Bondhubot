
import React from 'react';
import { Plus, MessageSquare, Heart, Share2, MapPin } from 'lucide-react';
import { MOCK_HELP } from '../constants';

const HelpCircle: React.FC = () => {
  return (
    <div className="p-4 mb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">সহায়তা সার্কেল</h1>
        <button className="bg-[#FFA000] text-white p-2 rounded-full shadow-lg active:scale-95 transition-transform">
          <Plus size={24} />
        </button>
      </div>

      <div className="space-y-4">
        {MOCK_HELP.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-[#2E7D32]">
                {post.user[0]}
              </div>
              <div>
                <h4 className="font-bold text-sm">{post.user}</h4>
                <div className="flex items-center text-[10px] text-gray-400">
                  <MapPin size={10} className="mr-1" /> {post.location} • {post.time}
                </div>
              </div>
              <div className={`ml-auto px-2 py-1 rounded text-[10px] font-bold uppercase ${post.type === 'request' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                {post.type === 'request' ? 'প্রয়োজন' : 'সহায়তা'}
              </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              {post.content}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
              <button className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors text-xs font-medium">
                <Heart size={16} /> লাইক
              </button>
              <button className="flex items-center gap-1.5 text-gray-400 hover:text-blue-500 transition-colors text-xs font-medium">
                <MessageSquare size={16} /> কমেন্ট
              </button>
              <button className="flex items-center gap-1.5 text-gray-400 hover:text-[#2E7D32] transition-colors text-xs font-medium">
                <Share2 size={16} /> শেয়ার
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpCircle;
