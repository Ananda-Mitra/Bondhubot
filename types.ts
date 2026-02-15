
export type AppScreen = 'home' | 'voice' | 'workers' | 'transport' | 'market' | 'community' | 'settings' | 'admin' | 'admin-login' | 'onboarding';

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  nid: string;
  password?: string; // Added password field
  registeredAt: string;
}

export interface Worker {
  id: string;
  name: string;
  type: string;
  rating: number;
  distance: string;
  phone: string;
  image: string;
  verified: boolean;
}

export interface TransportRoute {
  id: string;
  from: string;
  to: string;
  mode: 'Bus' | 'Rickshaw' | 'Easy-Bike';
  fare: string;
  time: string;
}

export interface MarketItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  prevPrice: number;
}

export interface HelpPost {
  id: string;
  user: string;
  content: string;
  type: 'request' | 'offer';
  time: string;
  location: string;
}
