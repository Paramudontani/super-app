import { Navbar } from '@/components/common/Navbar';
import { HomeContent } from '@/components/modules/HomeContent';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <HomeContent />
    </main>
  );
}