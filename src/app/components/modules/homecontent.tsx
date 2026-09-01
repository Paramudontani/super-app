'use client';

import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

export const HomeContent = () => {
  const { currentCategory, currency } = useAppStore();
  const [mounted, setMounted] = useState(false);

  // ป้องกัน Hydration Error ระหว่าง Server กับ Client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Dynamic Search Box Header */}
      <div className="bg-orange-600 rounded-2xl p-6 text-white mb-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          {currentCategory === 'hotels' && 'ค้นหาที่พักและโรงแรมที่ดีที่สุด'}
          {currentCategory === 'esim' && 'แพ็กเกจ eSIM อินเทอร์เน็ตทั่วโลก'}
          {currentCategory === 'taxis' && 'จองรถรับ-ส่ง สนามบิน และเดินทางในเมือง'}
          {currentCategory === 'tours' && 'จองทัวร์ กิจกรรม และบัตรท่องเที่ยว'}
          {currentCategory === 'cars' && 'บริการเช่ารถเดินทางทั่วประเทศ'}
        </h1>
        <p className="opacity-90">ราคารวมภาษี ไม่มีค่าธรรมเนียมแอบแฝง (ชำระเป็น {currency})</p>

        {/* Universal Search Bar Form */}
        <div className="mt-6 bg-white rounded-xl p-3 text-gray-800 flex flex-col md:flex-row gap-3">
          <input 
            type="text" 
            placeholder={currentCategory === 'esim' ? "พิมพ์ชื่อประเทศที่ต้องการ..." : "จุดหมายปลายทาง, เมือง หรือ ชื่อที่พัก..."}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none"
          />
          <button className="bg-orange-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-orange-700 transition">
            ค้นหา
          </button>
        </div>
      </div>

      {/* Service Modular Display Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentCategory === 'esim' ? (
          <div className="border rounded-xl p-5 hover:shadow-md transition">
            <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded font-semibold">eSIM Japan</span>
            <h3 className="font-bold text-lg mt-2">Japan Unlimited Data 7 Days</h3>
            <p className="text-sm text-gray-500 mt-1">ใช้งาน 4G/5G ไม่ลดสปีด ครอบคลุมทั่วญี่ปุ่น</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="font-bold text-orange-600 text-lg">390 {currency}</span>
              <button className="bg-gray-900 text-white px-4 py-1.5 rounded-md text-sm">สั่งซื้อทันที</button>
            </div>
          </div>
        ) : (
          <div className="border rounded-xl p-5 hover:shadow-md transition">
            <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded font-semibold">Hotel</span>
            <h3 className="font-bold text-lg mt-2">Grand Sukhumvit Resort</h3>
            <p className="text-sm text-gray-500 mt-1">กรุงเทพฯ, ประเทศไทย • ⭐ 4.8</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="font-bold text-orange-600 text-lg">1,850 {currency} / คืน</span>
              <button className="bg-gray-900 text-white px-4 py-1.5 rounded-md text-sm">จองห้องพัก</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};