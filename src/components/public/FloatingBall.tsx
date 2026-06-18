"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// ── PROCEDURAL BASKETBALL TEXTURE GENERATOR ──
// Generates genuine NBA-accurate burnt orange pebbled leather with glowing neon teal LED seams
function generateBasketballTextures() {
  if (typeof window === "undefined") return { colorTex: null, bumpTex: null };

  // 1. Color Texture Canvas
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  // Base: NBA-accurate pebbled leather orange (#C05C1F / #a34812)
  ctx.fillStyle = "#a84914"; 
  ctx.fillRect(0, 0, 1024, 512);

  // Micro leather pebbled color variations
  ctx.fillStyle = "#8a3608";
  for (let i = 0; i < 15000; i++) {
    const rx = Math.random() * 1024;
    const ry = Math.random() * 512;
    ctx.fillRect(rx, ry, 1.2, 1.2);
  }

  // Draw glowing lines for neon teal seam bleed (LED strips)
  ctx.lineWidth = 14;
  ctx.strokeStyle = "rgba(0, 245, 212, 0.45)"; // Teal neon glow
  ctx.shadowBlur = 20;
  ctx.shadowColor = "#00f5d4";

  const drawSeamPaths = () => {
    // Equator seam
    ctx.beginPath();
    ctx.moveTo(0, 256);
    ctx.lineTo(1024, 256);
    ctx.stroke();

    // Prime meridian seam
    ctx.beginPath();
    ctx.moveTo(512, 0);
    ctx.lineTo(512, 512);
    ctx.stroke();

    // Panel Curve A
    ctx.beginPath();
    for (let x = 0; x <= 1024; x++) {
      const y = 256 + 130 * Math.sin((2 * Math.PI * x) / 1024);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Panel Curve B
    ctx.beginPath();
    for (let x = 0; x <= 1024; x++) {
      const y = 256 - 130 * Math.sin((2 * Math.PI * x) / 1024);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  };

  drawSeamPaths();

  // Intense sharp core neon teal line
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = "#00f5d4"; // Core teal
  ctx.shadowBlur = 8;
  ctx.shadowColor = "#ffffff";
  drawSeamPaths();

  // Reset shadow
  ctx.shadowBlur = 0;

  // 2. Bump Map Canvas (Procedural pebbled leather & indented seams)
  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = 1024;
  bumpCanvas.height = 512;
  const bCtx = bumpCanvas.getContext("2d")!;

  // Neutral mid-grey base
  bCtx.fillStyle = "#808080";
  bCtx.fillRect(0, 0, 1024, 512);

  // Micro leather bumps (thousands of tiny dots)
  bCtx.fillStyle = "#b5b5b5"; // Raised pebbles (lighter = higher in bump map)
  for (let y = 3; y < 512; y += 6) {
    for (let x = (y % 12 === 0 ? 3 : 6); x < 1024; x += 6) {
      bCtx.beginPath();
      bCtx.arc(x, y, 1.3, 0, 2 * Math.PI);
      bCtx.fill();
    }
  }

  // Draw recessed seams (dark = debossed/indented in bump map)
  bCtx.strokeStyle = "#252525"; // Recessed black channels
  bCtx.lineWidth = 8;
  
  const drawBumpSeams = () => {
    bCtx.beginPath();
    bCtx.moveTo(0, 256);
    bCtx.lineTo(1024, 256);
    bCtx.stroke();

    bCtx.beginPath();
    bCtx.moveTo(512, 0);
    bCtx.lineTo(512, 512);
    bCtx.stroke();

    bCtx.beginPath();
    for (let x = 0; x <= 1024; x++) {
      const y = 256 + 130 * Math.sin((2 * Math.PI * x) / 1024);
      if (x === 0) bCtx.moveTo(x, y);
      else bCtx.lineTo(x, y);
    }
    bCtx.stroke();

    bCtx.beginPath();
    for (let x = 0; x <= 1024; x++) {
      const y = 256 - 130 * Math.sin((2 * Math.PI * x) / 1024);
      if (x === 0) bCtx.moveTo(x, y);
      else bCtx.lineTo(x, y);
    }
    bCtx.stroke();
  };

  drawBumpSeams();

  const colorTex = new THREE.CanvasTexture(canvas);
  const bumpTex = new THREE.CanvasTexture(bumpCanvas);

  colorTex.wrapS = THREE.RepeatWrapping;
  colorTex.wrapT = THREE.ClampToEdgeWrapping;
  bumpTex.wrapS = THREE.RepeatWrapping;
  bumpTex.wrapT = THREE.ClampToEdgeWrapping;

  return { colorTex, bumpTex };
}

// ── THREE.JS CYBER BASKETBALL COMPONENT ──
interface CyberBasketballProps {
  isHovered: boolean;
  clickOffset: number;
  scrollSpeed: number;
}

function CyberBasketball({ isHovered, clickOffset, scrollSpeed }: CyberBasketballProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  const textures = React.useMemo(() => generateBasketballTextures(), []);
  const scrollRotationX = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  // Tracks cursor for micro parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.elapsedTime;

    // 1. Idle bobbing (slow float)
    const bob = Math.sin(t * 2.2) * 0.08;

    // 2. Continuous rotation & scroll spin
    // Spin ball along X axis proportional to scroll speed
    scrollRotationX.current += scrollSpeed * 0.05;
    
    // Slow continuous idle rotation along Y
    meshRef.current.rotation.y = t * 0.18 + mouse.current.x * 0.35;
    meshRef.current.rotation.x = scrollRotationX.current + Math.sin(t * 0.2) * 0.1 - mouse.current.y * 0.35;

    // Hover wobble animation
    if (isHovered) {
      meshRef.current.rotation.z = Math.sin(t * 22) * 0.05;
      meshRef.current.rotation.y += Math.cos(t * 14) * 0.03;
    } else {
      meshRef.current.rotation.z = 0;
    }

    // Smooth position updates
    meshRef.current.position.y += (bob + clickOffset - meshRef.current.position.y) * 0.12;

    // 3. Telemetry rings animation
    const scale = meshRef.current.scale.x;
    if (ringRef.current) {
      ringRef.current.position.copy(meshRef.current.position);
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.05;
      ringRef.current.rotation.z = -t * 0.2;
      const ringScale = scale * 1.35;
      ringRef.current.scale.set(ringScale, ringScale, ringScale);
    }
    if (outerRingRef.current) {
      outerRingRef.current.position.copy(meshRef.current.position);
      outerRingRef.current.rotation.x = Math.PI / 3 + Math.cos(t * 0.2) * 0.08;
      outerRingRef.current.rotation.z = t * 0.12;
      const ringScale = scale * 1.6;
      outerRingRef.current.scale.set(ringScale, ringScale, ringScale);
    }
  });

  return (
    <>
      {/* 3D Ball Model */}
      <mesh ref={meshRef} castShadow receiveShadow scale={[1.15, 1.15, 1.15]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          map={textures.colorTex || undefined}
          bumpMap={textures.bumpTex || undefined}
          bumpScale={0.045}
          roughness={0.4}
          metalness={0.2}
          clearcoat={0.65}
          clearcoatRoughness={0.15}
          emissive={new THREE.Color("#00f5d4")}
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Holographic HUD rings */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.0, 0.005, 8, 100]} />
        <meshBasicMaterial color="#00f5d4" transparent opacity={0.3} />
      </mesh>

      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.0, 0.003, 8, 100]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.15} />
      </mesh>
    </>
  );
}

// ── MAIN INTERACTIVE CONTAINER ──
export default function FloatingBall() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [clickOffset, setClickOffset] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);

  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    setMounted(true);

    // Track scroll velocity dynamically
    const unsubscribe = scrollY.on("change", (latest) => {
      const now = Date.now();
      const dt = now - lastTime.current;
      const dy = latest - lastScrollY.current;
      
      if (dt > 0) {
        setScrollSpeed(dy / dt);
      }
      
      lastScrollY.current = latest;
      lastTime.current = now;
    });

    return () => unsubscribe();
  }, [scrollY]);

  // Slowly decay scroll rotation speed when user stops scrolling
  useEffect(() => {
    if (scrollSpeed === 0) return;
    const decay = setInterval(() => {
      setScrollSpeed((prev) => {
        const next = prev * 0.88;
        return Math.abs(next) < 0.01 ? 0 : next;
      });
    }, 30);
    return () => clearInterval(decay);
  }, [scrollSpeed]);

  if (!mounted) return null;

  const handlePointerDown = () => {
    setClickOffset(-0.25); // Slams down
    setTimeout(() => {
      setClickOffset(0.12); // Bounces back up slightly
      setTimeout(() => setClickOffset(0), 180);
    }, 120);
  };

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-10 flex items-center justify-center">
      {/* Interactive 3D Canvas */}
      <motion.div
        className="w-80 h-80 pointer-events-auto cursor-pointer relative"
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        onPointerDown={handlePointerDown}
        // Entrance scale zoom on load
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.12, 1], opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      >
        <Canvas
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
          style={{ background: "transparent" }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 3.2]} fov={45} />
          
          {/* Neon dramatic lighting */}
          <ambientLight intensity={0.25} />
          <directionalLight position={[4, 4, 3]} intensity={1.6} color="#ffffff" />
          <pointLight position={[5, 3, 2]} intensity={2.8} color="#00f5d4" />
          <pointLight position={[-5, -3, -2]} intensity={1.8} color="#10b981" />
          <pointLight position={[0, 4, -1]} intensity={0.8} color="#7b2fff" />

          <CyberBasketball 
            isHovered={isHovered} 
            clickOffset={clickOffset} 
            scrollSpeed={scrollSpeed} 
          />
        </Canvas>

        {/* Ambient background glow */}
        <div 
          className="absolute inset-16 rounded-full -z-10 blur-[45px] transition-all duration-500 pointer-events-none opacity-40" 
          style={{
            background: isHovered 
              ? "radial-gradient(circle, rgba(0,245,212,0.35) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)"
          }}
        />
      </motion.div>
    </div>
  );
}
