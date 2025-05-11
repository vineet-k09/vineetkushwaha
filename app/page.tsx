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
    //adding this cause when u click scrollY = 0 thus cause issue with smoothness
    const handleClick = () => {
      setScrollY(100); // Set scrollY to current position on click
      triggerAnimation(); // Trigger animation immediately
    };
    //adding spacebar as a backup
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowRight' && !triggered) {
        triggerAnimation();
      }
      if (e.code === 'ArrowLeft' && triggered) {
        resetAnimation();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick); // Cleanup click listener
      window.removeEventListener('keydown', handleKeydown);
    }
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
      {/* <div className="h-[100vh]"></div> */}
      {/* Text animation trigger based on the `triggered` state */}
      {triggered && (
        <div className="absolute top-1/3 w-full px-6 flex justify-between">
          {/* LEFT STACK */}
          <div className="flex flex-col space-y-2">
            <TextSlideIn from="left" delay={0.35}>
              <h1 className="text-3xl uppercase">Welcome to the Past</h1>
            </TextSlideIn>
            <TextSlideIn from="left" delay={1}>
              Made with Love ❤️ <br />
              by
            </TextSlideIn>
            <TextSlideIn from="left" delay={2.0}>
              <h1 className="text-9xl font-zillaSlab">Vineet Kushwaha</h1>
            </TextSlideIn>
          </div>

          {/* RIGHT STACK */}
          <div className="flex flex-col items-end space-y-2">
            <TextSlideIn from="right" delay={0.4}>
              <h1 className="poppins"> Carved in Code </h1>
            </TextSlideIn>
            <TextSlideIn from="right" delay={0.4}>
              Digitally Immortal
            </TextSlideIn>
          </div>
        </div>
      )}

    </main>
  );
}