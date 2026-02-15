
import { Worker, TransportRoute, MarketItem, HelpPost } from './types';

export const COLORS = {
  primary: '#2E7D32', // Green
  secondary: '#FFA000', // Orange
  background: '#F8F9FA',
};

export const MOCK_WORKERS: Worker[] = [
  { id: '1', name: 'আব্দুর রহিম', type: 'ইলেকট্রিশিয়ান', rating: 4.8, distance: '০.৫ কি.মি.', phone: '01700000001', image: 'https://picsum.photos/seed/p1/200', verified: true },
  { id: '2', name: 'সেলিম মিয়া', type: 'প্লাম্বার', rating: 4.5, distance: '১.২ কি.মি.', phone: '01700000002', image: 'https://picsum.photos/seed/p2/200', verified: true },
  { id: '3', name: 'মনিরা বেগম', type: 'শিক্ষক', rating: 4.9, distance: '০.৮ কি.মি.', phone: '01700000003', image: 'https://picsum.photos/seed/p3/200', verified: true },
  { id: '4', name: 'কারিম শেখ', type: 'রিকশাচালক', rating: 4.2, distance: '০.৩ কি.মি.', phone: '01700000004', image: 'https://picsum.photos/seed/p4/200', verified: false },
];

export const MOCK_MARKET: MarketItem[] = [
  // Fix: Use standard numeric digits (0-9) instead of Bengali digits (০-৯) for numeric types
  { id: '1', name: 'আলু', price: 45, unit: 'কেজি', trend: 'up', prevPrice: 40 },
  { id: '2', name: 'পিঁয়াজ', price: 100, unit: 'কেজি', trend: 'down', prevPrice: 110 },
  { id: '3', name: 'রুই মাছ', price: 350, unit: 'কেজি', trend: 'stable', prevPrice: 350 },
  { id: '4', name: 'ব্রয়লার মুরগি', price: 180, unit: 'কেজি', trend: 'up', prevPrice: 170 },
];

export const MOCK_TRANSPORT: TransportRoute[] = [
  { id: '1', from: 'উত্তরা', to: 'মতিঝিল', mode: 'Bus', fare: '৬০ টাকা', time: '১ ঘণ্টা' },
  { id: '2', from: 'বনানী', to: 'গুলশান', mode: 'Rickshaw', fare: '৫০ টাকা', time: '১৫ মিনিট' },
  { id: '3', from: 'মিরপুর ১০', to: 'ফার্মগেট', mode: 'Easy-Bike', fare: '২৫ টাকা', time: '২০ মিনিট' },
];

export const MOCK_HELP: HelpPost[] = [
  { id: '1', user: 'আরিফ', content: 'জরুরি রক্তের প্রয়োজন (ও পজিটিভ), ঢাকা মেডিকেল।', type: 'request', time: '১০ মিনিট আগে', location: 'ঢাকা' },
  { id: '2', user: 'মৌরিন', content: 'আমার কাছে কিছু বাড়তি আম আছে, কেউ নিতে চাইলে যোগাযোগ করুন।', type: 'offer', time: '৩০ মিনিট আগে', location: 'রাজশাহী' },
];
