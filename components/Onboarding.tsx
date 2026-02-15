
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Bot, ChevronRight, Phone, Mail, CreditCard, User, CheckCircle2, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    nid: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const validate = () => {
    if (step === 1 && !formData.name.trim()) return 'আপনার নাম লিখুন';
    if (step === 2) {
      if (formData.phone.length !== 11) return 'সঠিক মোবাইল নম্বর দিন (১১ ডিজিট)';
      if (!formData.email.includes('@')) return 'সঠিক ইমেইল এড্রেস দিন';
    }
    if (step === 3) {
      const nidLen = formData.nid.length;
      if (![10, 13, 17].includes(nidLen)) return 'সঠিক এনআইডি নম্বর দিন (১০, ১৩ বা ১৭ ডিজিট)';
    }
    if (step === 4) {
      if (formData.password.length < 6) return 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে';
      if (formData.password !== formData.confirmPassword) return 'পাসওয়ার্ড দুটি মেলেনি';
    }
    return '';
  };

  const handleNext = async () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError('');

    // Simulate NID Database Verification
    if (step === 3) {
      setIsVerifying(true);
      // In a real app, this is where you would call:
      // await fetch('https://api.porichoy.gov.bd/v1/verify', { ... })
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      setIsVerifying(false);
    }

    if (step < 4) {
      setStep(step + 1);
    } else {
      const { confirmPassword, ...profileData } = formData;
      onComplete({
        ...profileData,
        registeredAt: new Date().toISOString()
      });
    }
  };

  const progress = (step / 4) * 100;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col animate-in fade-in duration-500">
      {/* Top Decoration */}
      <div className="h-2 bg-gray-200">
        <div 
          className="h-full bg-[#2E7D32] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-center mb-8">
          <div className="bg-[#2E7D32]/10 p-4 rounded-3xl">
            <Bot size={48} className="text-[#2E7D32]" />
          </div>
        </div>

        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold text-gray-800">বন্ধুবট-এ স্বাগতম!</h1>
          <p className="text-gray-500 mt-2">অ্যাপটি ব্যবহার করতে আপনার তথ্য দিয়ে নিবন্ধন করুন।</p>
        </div>

        <div className="flex-1 space-y-6">
          {step === 1 && (
            <div className="animate-in slide-in-from-right duration-300">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <User size={16} /> আপনার পূর্ণ নাম
              </label>
              <input 
                autoFocus
                type="text"
                placeholder="যেমন: আব্দুর রহমান"
                className="w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#2E7D32] transition-all shadow-sm"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}

          {step === 2 && (
            <div className="animate-in slide-in-from-right duration-300 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Phone size={16} /> মোবাইল নম্বর
                </label>
                <input 
                  autoFocus
                  type="tel"
                  maxLength={11}
                  placeholder="01XXXXXXXXX"
                  className="w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#2E7D32] transition-all shadow-sm"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Mail size={16} /> ইমেইল এড্রেস
                </label>
                <input 
                  type="email"
                  placeholder="example@mail.com"
                  className="w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#2E7D32] transition-all shadow-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in slide-in-from-right duration-300">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <CreditCard size={16} /> এনআইডি (NID) নম্বর
              </label>
              <input 
                autoFocus
                disabled={isVerifying}
                type="tel"
                placeholder="আপনার পরিচয়পত্র নম্বর"
                className={`w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#2E7D32] transition-all shadow-sm ${isVerifying ? 'opacity-50' : ''}`}
                value={formData.nid}
                onChange={(e) => setFormData({ ...formData, nid: e.target.value.replace(/\D/g, '') })}
              />
              {isVerifying ? (
                <div className="mt-4 flex items-center gap-3 text-[#2E7D32] font-bold text-sm bg-green-50 p-4 rounded-2xl border border-green-100">
                  <Loader2 size={20} className="animate-spin" />
                  সরকারি ডেটাবেস থেকে তথ্য যাচাই করা হচ্ছে...
                </div>
              ) : (
                <p className="text-[10px] text-gray-400 mt-3 leading-relaxed">
                  আপনার এনআইডি নম্বরটি সরকারি ডেটাবেসের সাথে যাচাই করা হবে। এটি নিরাপদ।
                </p>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="animate-in slide-in-from-right duration-300 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Lock size={16} /> নতুন পাসওয়ার্ড দিন
                </label>
                <div className="relative">
                  <input 
                    autoFocus
                    type={showPassword ? "text" : "password"}
                    placeholder="পাসওয়ার্ড লিখুন"
                    className="w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#2E7D32] transition-all shadow-sm"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Lock size={16} /> পাসওয়ার্ড নিশ্চিত করুন
                </label>
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="আবার পাসওয়ার্ড লিখুন"
                  className="w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#2E7D32] transition-all shadow-sm"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-shake">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> {error}
            </div>
          )}
        </div>

        <button 
          onClick={handleNext}
          disabled={isVerifying}
          className={`w-full bg-[#2E7D32] text-white py-5 rounded-3xl font-bold flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] transition-all mt-6 ${isVerifying ? 'opacity-50' : ''}`}
        >
          {isVerifying ? (
            <>যাচাই করা হচ্ছে...</>
          ) : (
            <>
              {step === 4 ? 'নিবন্ধন সম্পন্ন করুন' : 'পরবর্তী ধাপ'}
              {step === 4 ? <CheckCircle2 size={20} /> : <ChevronRight size={20} />}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
