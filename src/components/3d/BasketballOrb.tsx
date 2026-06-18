"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function GlowOrb({
  position,
  color,
  speed,
  distort,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
  distort: number;
  scale?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    mesh.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
  });
  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.6}>
      <Sphere ref={mesh} args={[scale, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
}

function Particles() {
  const count = 300;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 24;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 24;
    }
    return arr;
  }, []);

  const pts = useRef<THREE.Points>(null);
  useFrame((s) => {
    if (!pts.current) return;
    pts.current.rotation.y = s.clock.elapsedTime * 0.025;
    pts.current.rotation.x = s.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.055} color="#10b981" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function Ring() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = Math.PI / 2 + Math.sin(s.clock.elapsedTime * 0.25) * 0.08;
    mesh.current.rotation.z = s.clock.elapsedTime * 0.12;
  });
  return (
    <mesh ref={mesh}>
      <torusGeometry args={[4, 0.018, 16, 120]} />
      <meshBasicMaterial color="#10b981" transparent opacity={0.2} />
    </mesh>
  );
}

function Ring2() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = Math.PI / 3 + Math.cos(s.clock.elapsedTime * 0.2) * 0.1;
    mesh.current.rotation.z = -s.clock.elapsedTime * 0.08;
  });
  return (
    <mesh ref={mesh}>
      <torusGeometry args={[5.5, 0.012, 16, 120]} />
      <meshBasicMaterial color="#06b6d4" transparent opacity={0.12} />
    </mesh>
  );
}

export default function BasketballOrb() {
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[6, 6, 6]}   intensity={2.5} color="#10b981" />
        <pointLight position={[-6, -4, -6]} intensity={1.2} color="#06b6d4" />
        <pointLight position={[0, 6, 0]}   intensity={0.6} color="#f59e0b" />

        <Stars radius={90} depth={60} count={4000} factor={3} saturation={0} fade speed={0.6} />
        <Particles />
        <Ring />
        <Ring2 />

        <GlowOrb position={[0, 0, 0]}     color="#10b981" speed={1.1} distort={0.42} scale={1.2} />
        <GlowOrb position={[4, 1.5, -2]}  color="#06b6d4" speed={0.75} distort={0.28} scale={0.7} />
        <GlowOrb position={[-3.5, -1, -3]} color="#f59e0b" speed={1.4} distort={0.48} scale={0.5} />
      </Canvas>
    </div>
  );
}
