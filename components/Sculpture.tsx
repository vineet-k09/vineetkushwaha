'use client';
import React, { JSX, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';
import { useSpring, animated } from '@react-spring/three';
import { useAnimationStore } from '@/stores/animationStore';

export default function Sculpture(props: JSX.IntrinsicElements['group']) {
    const ref = useRef<Mesh>(null);
    const { scene } = useGLTF('/model/sculpture.glb');

    const triggered = useAnimationStore((state) => state.triggered);

    const { z } = useSpring({
        z: triggered ? -20 : 0,
        config: { tension: 200, friction: 25 },
    });

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.003;
        }
    });

    return (
        <animated.group
            ref={ref}
            {...props}
            dispose={null}
            position-y={-30}
            position-z={z}
        >
            <primitive object={scene} scale={1} />
        </animated.group>
    );
}
