"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, PerspectiveCamera } from "@react-three/drei";
import { usePathname } from "next/navigation";
import * as THREE from "three";

// ── PROCEDURAL TEXTURE GENERATORS ──
function generateTextures() {
  if (typeof window === "undefined") return { colorTex: null, bumpTex: null };

  // 1. Color Texture Canvas
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  // Dark brushed carbon-charcoal base
  ctx.fillStyle = "#0c0d12";
  ctx.fillRect(0, 0, 1024, 512);

  // Carbon micro-weave lines
  ctx.strokeStyle = "#16171e";
  ctx.lineWidth = 1;
  for (let i = -512; i < 1024; i += 6) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 512, 512);
    ctx.stroke();
  }

  // Draw wide soft glowing outer lines (for emissive neon bleed)
  ctx.lineWidth = 16;
  ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
  ctx.shadowBlur = 20;
  ctx.shadowColor = "#10b981";

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

    // Curve A
    ctx.beginPath();
    for (let x = 0; x <= 1024; x++) {
      const y = 256 + 130 * Math.sin((2 * Math.PI * x) / 1024);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Curve B
    ctx.beginPath();
    for (let x = 0; x <= 1024; x++) {
      const y = 256 - 130 * Math.sin((2 * Math.PI * x) / 1024);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  };

  drawSeamPaths();

  // Intense sharp core line
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#10b981"; // Core emerald green
  ctx.shadowBlur = 8;
  ctx.shadowColor = "#06b6d4"; // Core cyan bleed
  drawSeamPaths();

  // Reset shadow for subsequent drawings
  ctx.shadowBlur = 0;

  // 2. Bump Map Canvas (Procedural leather bumps & indented seams)
  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = 1024;
  bumpCanvas.height = 512;
  const bCtx = bumpCanvas.getContext("2d")!;

  // Neutral mid-grey base
  bCtx.fillStyle = "#808080";
  bCtx.fillRect(0, 0, 1024, 512);

  // Micro leather dimples (thousands of tiny dots)
  bCtx.fillStyle = "#555555"; // Indented dimples
  for (let y = 3; y < 512; y += 6) {
    for (let x = (y % 12 === 0 ? 3 : 6); x < 1024; x += 6) {
      bCtx.beginPath();
      bCtx.arc(x, y, 1.2, 0, 2 * Math.PI);
      bCtx.fill();
    }
  }

  // Draw indented seams
  bCtx.strokeStyle = "#282828"; // Deep dark indentations
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

// ── THE BASKETBALL MESH & INTERACTIVE LOGIC ──
function CyberBasketball({ pathname }: { pathname: string | null }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const { viewport, size } = useThree();

  // Mouse Listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      scroll.current = maxScroll > 0 ? scrollY / maxScroll : 0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Generate textures once on initial mount
  const textures = useMemo(() => generateTextures(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.elapsedTime;
    const s = scroll.current;

    // 1. Continuous Rotation
    meshRef.current.rotation.y = t * 0.12 + s * 4.5;
    meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.2;

    // 2. Cursor Parallax Tilt (Damped)
    const targetTiltX = mouse.current.y * 0.45;
    const targetTiltY = mouse.current.x * 0.45;
    meshRef.current.rotation.x += (targetTiltX - meshRef.current.rotation.x) * 0.08;
    meshRef.current.rotation.y += (targetTiltY - meshRef.current.rotation.y) * 0.08;

    // 3. Responsive Coordinates & Route-Specific Positions
    const isMobile = size.width < 768;
    
    let targetX = 1.6;
    let targetY = 0;
    let targetZ = 0;
    let targetScale = 1.25;

    if (isMobile) {
      targetX = 0;
      targetY = 0.8;
      targetZ = -1.2;
      targetScale = 0.85;
    } else {
      // route-specific positions
      if (pathname === "/") {
        // Apply scroll-mapping for homepage
        if (s < 0.3) {
          const p = s / 0.3;
          targetX = THREE.MathUtils.lerp(1.6, -1.9, p);
          targetY = THREE.MathUtils.lerp(0, -0.6, p);
          targetZ = THREE.MathUtils.lerp(0, -1.5, p);
          targetScale = THREE.MathUtils.lerp(1.25, 0.85, p);
        } else if (s < 0.6) {
          const p = (s - 0.3) / 0.3;
          targetX = THREE.MathUtils.lerp(-1.9, 1.7, p);
          targetY = THREE.MathUtils.lerp(-0.6, 0.1, p);
          targetZ = THREE.MathUtils.lerp(-1.5, -0.8, p);
          targetScale = THREE.MathUtils.lerp(0.85, 1.1, p);
        } else {
          const p = (s - 0.6) / 0.4;
          targetX = THREE.MathUtils.lerp(1.7, 0, p);
          targetY = THREE.MathUtils.lerp(0.1, -1.5, p);
          targetZ = THREE.MathUtils.lerp(-0.8, -3.0, p);
          targetScale = THREE.MathUtils.lerp(1.1, 0.65, p);
        }
      } else if (pathname === "/programs") {
        // Floating at top right of programs
        targetX = 2.0;
        targetY = 0.4;
        targetZ = -1.5;
        targetScale = 0.95;
      } else if (pathname === "/login" || pathname === "/signup" || pathname === "/finish-profile") {
        // Large background moon on left
        targetX = -1.9;
        targetY = 0.1;
        targetZ = -1.2;
        targetScale = 1.15;
      } else if (
        pathname?.startsWith("/dashboard") ||
        pathname?.startsWith("/workouts") ||
        pathname?.startsWith("/leaderboard") ||
        pathname?.startsWith("/trainer-dashboard")
      ) {
        // Deep background icon for dashboard
        targetX = 2.2;
        targetY = -0.8;
        targetZ = -2.2;
        targetScale = 0.7;
      } else {
        // Fallback default
        targetX = 1.8;
        targetY = 0;
        targetZ = -1.0;
        targetScale = 1.0;
      }
    }

    // Apply smoothed translations
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.08;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.08;
    meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.08;
    
    const scale = meshRef.current.scale.x;
    const newScale = scale + (targetScale - scale) * 0.08;
    meshRef.current.scale.set(newScale, newScale, newScale);

    // 4. Animate outer telemetry rings
    if (ringRef.current) {
      ringRef.current.position.copy(meshRef.current.position);
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.2) * 0.08;
      ringRef.current.rotation.z = -t * 0.18;
      const ringScale = newScale * 2.8;
      ringRef.current.scale.set(ringScale, ringScale, ringScale);
    }
    if (outerRingRef.current) {
      outerRingRef.current.position.copy(meshRef.current.position);
      outerRingRef.current.rotation.x = Math.PI / 3.5 + Math.cos(t * 0.15) * 0.1;
      outerRingRef.current.rotation.z = t * 0.08;
      const ringScale = newScale * 3.6;
      outerRingRef.current.scale.set(ringScale, ringScale, ringScale);
    }
  });

  return (
    <>
      {/* 3D Cyber Basketball Mesh */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          map={textures.colorTex || undefined}
          bumpMap={textures.bumpTex || undefined}
          bumpScale={0.06}
          roughness={0.3}
          metalness={0.82}
          clearcoat={0.15}
          clearcoatRoughness={0.2}
          emissive={new THREE.Color("#10b981")}
          emissiveIntensity={0.28}
          envMapIntensity={1}
        />
      </mesh>

      {/* Futuristic Telemetry HUD Rings */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.35, 0.006, 8, 120]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.3} />
      </mesh>

      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.65, 0.003, 8, 120]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.18} />
      </mesh>
    </>
  );
}

// ── FLOATING STARFIELD PARTICLES ──
function Particles() {
  const count = 350;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 22;
    }
    return arr;
  }, []);

  const pts = useRef<THREE.Points>(null);
  useFrame((s) => {
    if (!pts.current) return;
    pts.current.rotation.y = s.clock.elapsedTime * 0.012;
    pts.current.rotation.x = s.clock.elapsedTime * 0.005;
  });

  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#10b981"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function BasketballOrb() {
  let pathname: string | null = null;
  try {
    pathname = usePathname();
  } catch (e) {
  }

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-transparent">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 6.2]} fov={50} />
        
        {/* Futuristic lighting scheme */}
        <ambientLight intensity={0.12} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#ffffff" castShadow />
        <pointLight position={[8, 4, 3]} intensity={3.5} color="#10b981" />
        <pointLight position={[-8, -6, -4]} intensity={2.2} color="#06b6d4" />
        <pointLight position={[0, 8, -2]} intensity={0.8} color="#f59e0b" />

        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
        <Particles />
        
        <CyberBasketball pathname={pathname} />
      </Canvas>
    </div>
  );
}
