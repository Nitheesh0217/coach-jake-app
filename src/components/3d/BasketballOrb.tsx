"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function GlowOrb({ position, color, speed, distort }: { position: [number,number,number]; color: string; speed: number; distort: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
  });
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere ref={ref} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial color={color} distort={distort} speed={2} roughness={0.1} metalness={0.8} transparent opacity={0.85} />
      </Sphere>
    </Float>
  );
}

function ParticleField() {
  const count = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i*3]   = (Math.random()-0.5)*20;
      arr[i*3+1] = (Math.random()-0.5)*20;
      arr[i*3+2] = (Math.random()-0.5)*20;
    }
    return arr;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.03;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#10b981" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function RingMesh() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.PI/2 + Math.sin(s.clock.elapsedTime*0.3)*0.1;
    ref.current.rotation.z = s.clock.elapsedTime*0.15;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[3.5, 0.02, 16, 100]} />
      <meshBasicMaterial color="#10b981" transparent opacity={0.25} />
    </mesh>
  );
}

export default function BasketballOrb({ className="" }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position:[0,0,6], fov:50 }} dpr={[1,2]}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5,5,5]} intensity={2} color="#10b981" />
        <pointLight position={[-5,-3,-5]} intensity={1} color="#06b6d4" />
        <pointLight position={[0,5,0]} intensity={0.5} color="#f59e0b" />
        <Stars radius={80} depth={50} count={3000} factor={3} saturation={0} fade speed={0.8} />
        <ParticleField />
        <RingMesh />
        <GlowOrb position={[0,0,0]} color="#10b981" speed={1.2} distort={0.45} />
        <GlowOrb position={[3.5,1.5,-2]} color="#06b6d4" speed={0.8} distort={0.3} />
        <GlowOrb position={[-3,-1,-3]} color="#f59e0b" speed={1.5} distort={0.5} />
      </Canvas>
    </div>
  );
}
