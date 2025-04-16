// components/Sculpture.tsx
'use client';

import { JSX, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';
export default function Sculpture(props: JSX.IntrinsicElements['group']) {
    const ref = useRef<Mesh>(null);
    const { scene } = useGLTF('/model/sculpture.glb');

    // Rotation animation
    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.001;
        }
    });

    return (
        <group ref={ref} {...props} dispose={null} position={[0, -20, 0]}>
            <primitive object={scene} scale={1} />
        </group>
    );
}
useGLTF.preload('/model/sculpture.glb');