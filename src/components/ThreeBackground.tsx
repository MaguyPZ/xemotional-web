"use client";

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function SoundwaveOcean() {
  const ref = useRef<any>(null);
  const count = 12000; 
  const gridSize = Math.floor(Math.sqrt(count)); // ~109
  
  const positions = useMemo(() => {
    const arr = new Float32Array(gridSize * gridSize * 3);
    let i = 0;
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        arr[i++] = (x - gridSize / 2) * 0.15; // x
        arr[i++] = 0; // y
        arr[i++] = (z - gridSize / 2) * 0.15; // z
      }
    }
    return arr;
  }, [gridSize]);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    const positionsArr = ref.current.geometry.attributes.position.array;
    
    let i = 0;
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        const pX = (x - gridSize / 2) * 0.15;
        const pZ = (z - gridSize / 2) * 0.15;
        
        // Complex bio-acoustic wave pattern
        // Simulates voice frequencies and autonomous stress oscillations
        const y = 
          Math.sin(pX * 0.5 + time * 0.8) * 0.45 + 
          Math.cos(pZ * 0.4 + time * 1.1) * 0.35 + 
          Math.sin(Math.sqrt(pX * pX + pZ * pZ) * 0.5 - time * 1.5) * 0.55;
        
        positionsArr[i * 3 + 1] = y; // update y
        i++;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    
    // Smooth cinematic rotation
    ref.current.rotation.y = Math.sin(time * 0.1) * 0.2;
    ref.current.rotation.x = Math.cos(time * 0.1) * 0.1;
  });

  return (
    <group rotation={[Math.PI / 4, 0, 0]} position={[0, -2, -6]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#22D3EE" // Electric Cyan bioluminescence
          size={0.038}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.85}
        />
      </Points>
    </group>
  );
}

function FloatingDust() {
  const ref = useRef<any>(null);
  const count = 600;
  
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12 - 5;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    ref.current.rotation.y = time * 0.02;
    ref.current.rotation.x = time * 0.03;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#10B981" // Forensic Emerald dust
        size={0.024}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
}

export default function ThreeBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 -z-10 w-full h-full bg-[#050813] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12)_0%,transparent_75%)] pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 -z-10 w-full h-full bg-[#050813] overflow-hidden">
      {/* Background static gradients as mesh layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.22)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.18)_0%,transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-30 mix-blend-screen bg-[radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.15)_0%,transparent_60%)] pointer-events-none" />
      
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <fog attach="fog" args={['#050813', 2.5, 12]} />
        <ambientLight intensity={0.4} />
        <SoundwaveOcean />
        <FloatingDust />
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-b from-[#050813]/50 via-transparent to-[#050813] pointer-events-none" />
    </div>
  );
}
