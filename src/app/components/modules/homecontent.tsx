'use client';

import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

export const HomeContent = () => {
  const { currentCategory, currency } = useAppStore();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // วางโค้ด useEffect ตรงนี้
  useEffect(() => {
    async function fetchPartnerData() {
      setLoading(true);
      
      try {
        if (currentCategory === 'hotels') {
          const res = await fetch('/api/hotels?city=Bangkok');
          const data = await res.json();
          setItems(data.results || []);
        } else if (currentCategory === 'esim') {
          const res = await fetch('/api/esim?country=Japan');
          const data = await res.json();
          setItems(data.packages || []);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPartnerData();
  }, [currentCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header และ Search Box */}
      <div className="bg-orange-600 rounded-2xl p-6 text-white mb-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          {currentCategory === 'hotels' && 'ค้นหาที่พักและโรงแรมที่ดีที่สุด'}
          {currentCategory === 'esim' && 'แพ็กเกจ eSIM อินเทอร์เน็ตทั่วโลก'}
          {currentCategory === 'taxis' && 'จองรถรับ-ส่ง สนามบิน และเดินทางในเมือง'}
          {currentCategory === 'tours' && 'จองทัวร์ กิจกรรม และบัตรท่องเที่ยว'}
          {currentCategory === 'cars' && 'บริการเช่ารถเดินทางทั่วประเทศ'}
        </h1>
        <p className="opacity-90">ราคารวมภาษี ไม่มีค่าธรรมเนียมแอบแฝง (ชำระเป็น {currency})</p>
      </div>

      {/* ส่วนแสดงผลรายการข้อมูลที่ดึงมาจาก API */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">กำลังโหลดข้อมูล...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div key={item.id || index} className="border rounded-xl p-5 hover:shadow-md transition bg-white">
              <h3 className="font-bold text-lg mt-2">{item.name || item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.description || item.location}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-orange-600 text-lg">
                  {item.price} {currency}
                </span>
                <button className="bg-gray-900 text-white px-4 py-1.5 rounded-md text-sm">
                  {currentCategory === 'hotels' ? 'จองห้องพัก' : 'สั่งซื้อทันที'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};