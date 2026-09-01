import { createClient } from '@/lib/supabase/server'

export default async function HotelsPage() {
  const supabase = await createClient()
  
  // Query ข้อมูลจากตาราง 'hotels'
  const { data: hotels, error } = await supabase
    .from('hotels')
    .select('*')

  if (error) {
    return <div>เกิดข้อผิดพลาดในการดึงข้อมูล: {error.message}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {hotels?.map((hotel) => (
        <div key={hotel.id} className="border rounded-xl p-5 shadow-sm">
          <h3 className="font-bold text-lg">{hotel.name}</h3>
          <p className="text-sm text-gray-500">{hotel.location}</p>
          <p className="font-bold text-orange-600 mt-2">{hotel.price} THB / คืน</p>
        </div>
      ))}
    </div>
  )
}