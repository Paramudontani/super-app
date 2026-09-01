import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country') || 'Japan';

  // 1. ตรวจสอบว่ามี API Key หรือไม่
  const esimApiKey = process.env.ESIM_API_KEY;
  const esimApiUrl = process.env.ESIM_API_URL;

  // หากตั้งค่า API Key ใน .env.local เรียบร้อยแล้ว จะดึงข้อมูลจาก API จริง
  if (esimApiKey && esimApiUrl) {
    try {
      const response = await fetch(`${esimApiUrl}/packages?country=${country}`, {
        headers: {
          'Authorization': `Bearer ${esimApiKey}`,
          'Content-Type': 'application/json',
        },
        // Revalidate ข้อมูลทุก 1 ชม. (3600 วินาที) เพื่อประหยัด API Limit
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      return NextResponse.json({ packages: data.packages || data });
    } catch (error) {
      console.error('eSIM API Error:', error);
      return NextResponse.json(
        { error: 'ไม่สามารถดึงข้อมูลจาก eSIM API ได้' },
        { status: 500 }
      );
    }
  }

  // 2. Mock Data สำรอง (ทำงานทันทีเมื่อยังไม่ได้ใส่ API Key ใน .env.local)
  const mockPackages = [
    {
      id: 'esim-jp-1',
      title: 'Japan Unlimited Data 7 Days',
      description: 'อินเทอร์เน็ต 4G/5G ไม่ลดสปีด ครอบคลุมทั่วประเทศญี่ปุ่น',
      price: 390,
      country: 'Japan',
    },
    {
      id: 'esim-jp-2',
      title: 'Japan 10GB Max Speed 15 Days',
      description: 'เน็ตความเร็วสูงสุด 10GB นาน 15 วัน (หมดความเร็วลดเหลือ 128kbps)',
      price: 550,
      country: 'Japan',
    },
    {
      id: 'esim-kr-1',
      title: 'South Korea Unlimited 5 Days',
      description: 'ใช้งาน 5G ไม่จำกัดบนเครือข่าย SK Telecom ประเทศเกาหลีใต้',
      price: 420,
      country: 'Korea',
    },
  ];

  // กรองข้อมูลตามประเทศที่ค้นหา (ถ้ามี)
  const filteredPackages = mockPackages.filter((pkg) =>
    pkg.country.toLowerCase().includes(country.toLowerCase())
  );

  return NextResponse.json({
    packages: filteredPackages.length > 0 ? filteredPackages : mockPackages,
  });
}