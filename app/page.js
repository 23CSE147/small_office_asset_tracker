'use client';
import Homepage from '@/components/Homepage';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
  <main>
    <Navbar/>
   <Homepage/>
  </main>
  );
}
