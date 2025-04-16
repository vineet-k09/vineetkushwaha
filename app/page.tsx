'use client'
import "./page.css"
// import Navbar from "@/components/navbar";
import {
  useEffect,
  useState,
  Suspense
} from 'react'
// import Sculpture from '@/components/Sculpture'
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import { OrbitControls } from '@react-three/drei';

const Sculpture = dynamic(() => import('@/components/Sculpture'), { ssr: false, }) as React.ComponentType<{ scrollY: number }>;

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-[200vh] bg-black text-white">
      <Suspense fallback={null}>
        <Canvas className="w-full h-screen" camera={{ position: [40, 50, 60], fov: 20 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[15, 5, 5]} />
          <Sculpture scrollY={scrollY} />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </Suspense>
    </main>
  );
}