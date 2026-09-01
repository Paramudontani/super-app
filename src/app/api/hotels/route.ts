import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'Bangkok';

  const agodaApiKey = process.env.AGODA_API_KEY;
  const agodaSiteId = process.env.AGODA_SITE_ID;

  // 1. ดึงข้อมูลจาก Agoda API จริง (ถ้าตั้งค่า Key ใน .env.local ไว้แล้ว)
  if (agodaApiKey && agodaSiteId) {
    try {
      const response = await fetch(`https://partner-api.agoda.com/v1/search?city=${city}`, {
        headers: {
          'Authorization': `Bearer ${agodaApiKey}`,
          'Agoda-Site-Id': agodaSiteId,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error(`Agoda API Error: ${response.status}`);
      }

      const data = await response.json();
      return NextResponse.json({ results: data.results || data });
    } catch (error) {
      console.error('Agoda API Fetch Error:', error);
      return NextResponse.json(
        { error: 'ไม่สามารถดึงข้อมูลจาก Agoda API ได้' },
        { status: 500 }
      );
    }
  }

  // 2. Mock Data สำรองสำหรับทดสอบ UI
  const mockHotels = [
    {
      id: 'hotel-1',
      name: 'Grand Sukhumvit Resort',
      location: 'กรุงเทพฯ, ประเทศไทย • ⭐ 4.8',
      price: 1850,
    },
    {
      id: 'hotel-2',
      name: 'Phuket Beachfront Villa & Spa',
      location: 'ภูเก็ต, ประเทศไทย • ⭐ 4.9',
      price: 3200,
    },
    {
      id: 'hotel-3',
      name: 'Chiang Mai Mountain View Hotel',
      location: 'เชียงใหม่, ประเทศไทย • ⭐ 4.6',
      price: 1290,
    },
  ];

  return NextResponse.json({ results: mockHotels });
}