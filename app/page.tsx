'use client'
import "./page.css"
import { useAnimationStore } from "@/stores/animationStore";
import TextSlideIn from "@/components/TextSlideIn";
// import Navbar from "@/components/navbar";
import {
  useEffect,
  useState,
  Suspense,
  useRef
} from 'react'
// import Sculpture from '@/components/Sculpture'
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import { OrbitControls } from '@react-three/drei';

const Sculpture = dynamic(() => import('@/components/Sculpture'), { ssr: false, }) as React.ComponentType<{ scrollY: number }>;

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const previousScrollY = useRef(0);
  const { triggered, triggerAnimation, resetAnimation } = useAnimationStore();
  // const for text anmation

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const goingDown = currentY > previousScrollY.current;
      const goingUp = currentY < previousScrollY.current;
      if (goingDown && !triggered) {
        triggerAnimation(); // Start animation
      }

      if (goingUp && triggered) {
        resetAnimation(); // Reverse animation
      }

      previousScrollY.current = currentY;
      setScrollY(currentY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggered, triggerAnimation, resetAnimation]);

  //animation listener sculputre
  useEffect(() => {
    const trigger = () => {
      useAnimationStore.getState().triggerAnimation();
      window.removeEventListener('scroll', trigger);
      window.removeEventListener('click', trigger);
    }

    window.addEventListener('scroll', trigger, { once: true });
    window.addEventListener('click', trigger, { once: true });

    return () => {
      window.removeEventListener('scroll', trigger);
      window.removeEventListener('click', trigger);
    };
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
      {/* for scrolling in mobile */}
      <div className="h-[100vh]"></div>
      {/* Text animation trigger based on the `triggered` state */}
      {triggered && (
        <div className="absolute top-1/3 w-full px-6 flex justify-between">
          <TextSlideIn from="left" delay={0.2}>
            Welcome to the Past
          </TextSlideIn>
          <TextSlideIn from="right" delay={0.4}>
            Carved in Code
          </TextSlideIn>
        </div>
      )}

    </main>
  );
}