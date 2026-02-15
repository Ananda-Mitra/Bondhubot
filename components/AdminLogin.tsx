
import React, { useState } from 'react';
import { Shield, Lock, Mail, ChevronLeft, AlertCircle, ArrowRight } from 'lucide-react';

interface AdminLoginProps {
  onBack: () => void;
  onSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onBack, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Hardcoded credentials as requested
    setTimeout(() => {
      if (email === 'fearlessananda@gmail.com' && password === '172002@Ff') {
        onSuccess();
      } else {
        setError('ভুল ইমেইল অথবা পাসওয়ার্ড। আবার চেষ্টা করুন।');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col p-6 text-white animate-in fade-in duration-500">
      <header className="flex items-center gap-4 mb-12">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10">
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
          <Shield className="text-amber-400" size={24} />
          <h1 className="text-xl font-bold uppercase tracking-widest">Admin Access</h1>
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-amber-400/10 rounded-3xl mb-4">
            <Lock className="text-amber-400" size={40} />
          </div>
          <h2 className="text-2xl font-bold">প্রবেশাধিকার সংরক্ষিত</h2>
          <p className="text-slate-400 text-sm mt-2">অ্যাডমিন প্যানেলে প্রবেশ করতে আপনার তথ্যাদি প্রদান করুন।</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="email"
              placeholder="ইমেইল এড্রেস"
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-amber-400 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="password"
              placeholder="পাসওয়ার্ড"
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-amber-400 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 p-3 rounded-xl border border-red-400/20">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-amber-400/10 transition-all active:scale-95 mt-6"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
            ) : (
              <>লগইন করুন <ArrowRight size={18} /></>
            )}
          </button>
        </form>
      </div>

      <footer className="text-center text-slate-500 text-[10px] pb-10">
        SECURITY PROTOCOL VERSION 2.4.1
      </footer>
    </div>
  );
};

export default AdminLogin;
