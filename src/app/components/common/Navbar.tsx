'use client';

import React from 'react';
import { useAppStore, CategoryType } from '@/store/useAppStore';
import { Hotel, Wifi, Car, MapPin, Compass } from 'lucide-react';

const categories: { id: CategoryType; label: string; icon: React.ReactNode }[] = [
  { id: 'hotels', label: 'โรงแรม', icon: <Hotel className="w-5 h-5" /> },
  { id: 'esim', label: 'eSIM', icon: <Wifi className="w-5 h-5" /> },
  { id: 'taxis', label: 'เรียกรถ', icon: <Car className="w-5 h-5" /> },
  { id: 'tours', label: 'ไกด์/กิจกรรม', icon: <Compass className="w-5 h-5" /> },
  { id: 'cars', label: 'เช่ารถ', icon: <MapPin className="w-5 h-5" /> },
];

export const Navbar = () => {
  const { currentCategory, setCategory, currency, setCurrency } = useAppStore();

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-black text-orange-600">TripPulse</span>
        </div>

        <div className="flex items-center space-x-4">
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm bg-gray-50 focus:outline-none"
          >
            <option value="THB">THB (฿)</option>
            <option value="USD">USD ($)</option>
            <option value="JPY">JPY (¥)</option>
          </select>
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-orange-700 transition">
            เข้าสู่ระบบ
          </button>
        </div>
      </div>

      {/* Main Category Tabs */}
      <div className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex space-x-8 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex items-center space-x-2 py-3 border-b-2 font-medium text-sm whitespace-nowrap transition ${
                currentCategory === cat.id
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
