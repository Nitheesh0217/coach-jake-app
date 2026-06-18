"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function StatCard3D({ position, label, value, color }: { position:[number,number,number]; label:string; value:string; color:string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.4 + position[0]) * 0.08;
    ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.3 + position[1]) * 0.04;
  });
  return (
    <Float speed={1.5} floatIntensity={0.6} rotationIntensity={0.1}>
      <group ref={ref} position={position}>
        <RoundedBox args={[2.2, 1.1, 0.08]} radius={0.12} smoothness={4}>
          <meshStandardMaterial color="#0a0f1e" metalness={0.8} roughness={0.2} transparent opacity={0.9} />
        </RoundedBox>
        <Text position={[0, 0.18, 0.06]} fontSize={0.36} color={color} anchorX="center" anchorY="middle" font="/fonts/Inter-Black.woff">
          {value}
        </Text>
        <Text position={[0, -0.2, 0.06]} fontSize={0.13} color="#71717a" anchorX="center" anchorY="middle">
          {label}
        </Text>
      </group>
    </Float>
  );
}

export default function FloatingStats() {
  return (
    <Canvas camera={{ position:[0,0,5], fov:45 }} dpr={[1,1.5]}>
      <ambientLight intensity={0.3} />
      <pointLight position={[3,3,3]} intensity={1} color="#10b981" />
      <pointLight position={[-3,-3,3]} intensity={0.5} color="#06b6d4" />
      <StatCard3D position={[-2.4, 0.8, 0]} label="Athletes Trained" value="120+" color="#10b981" />
      <StatCard3D position={[2.4, 0.8, 0]} label="Avg Vertical Gain" value='+3"' color="#06b6d4" />
      <StatCard3D position={[0, -0.6, 0]} label="Years Experience" value="5+" color="#f59e0b" />
    </Canvas>
  );
}
