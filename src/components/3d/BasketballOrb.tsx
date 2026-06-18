"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, PerspectiveCamera } from "@react-three/drei";
import { usePathname } from "next/navigation";
import * as THREE from "three";

// ── 1. PROCEDURAL BASKETBALL TEXTURE GENERATOR ──
// Generates:
// - colorTex: realistic pebbled orange leather with deep dark seam grooves
// - bumpTex: raised pebbles and debossed recessed channels
// - emissiveTex: black base with pure white seams for selective neon teal glow
function generateBasketballTextures() {
  if (typeof window === "undefined") {
    return { colorTex: null, bumpTex: null, emissiveTex: null };
  }

  // Helper to draw standard basketball seams
  const drawSeamPaths = (ctx: CanvasRenderingContext2D) => {
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

  // Canvas 1: Color Texture (Burnt Orange Leather with Pebbles & Black Seams)
  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = 1024;
  colorCanvas.height = 512;
  const cCtx = colorCanvas.getContext("2d")!;

  // Base orange pebbled leather
  cCtx.fillStyle = "#c05c1f"; 
  cCtx.fillRect(0, 0, 1024, 512);

  // Add micro leather pebbled variations
  cCtx.fillStyle = "#a24610";
  for (let i = 0; i < 20000; i++) {
    const rx = Math.random() * 1024;
    const ry = Math.random() * 512;
    cCtx.fillRect(rx, ry, 1.2, 1.2);
  }
  cCtx.fillStyle = "#d86b2b";
  for (let i = 0; i < 10000; i++) {
    const rx = Math.random() * 1024;
    const ry = Math.random() * 512;
    cCtx.fillRect(rx, ry, 1.2, 1.2);
  }

  // Draw deep dark brown/black channels for seams
  cCtx.lineWidth = 10;
  cCtx.strokeStyle = "#120803";
  cCtx.shadowBlur = 0;
  drawSeamPaths(cCtx);

  // Canvas 2: Bump Map Canvas (Procedural pebbles & indented channels)
  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = 1024;
  bumpCanvas.height = 512;
  const bCtx = bumpCanvas.getContext("2d")!;

  // Neutral mid-grey base
  bCtx.fillStyle = "#808080";
  bCtx.fillRect(0, 0, 1024, 512);

  // Raised leather pebbles (lighter = raised)
  bCtx.fillStyle = "#b5b5b5";
  for (let y = 3; y < 512; y += 6) {
    for (let x = (y % 12 === 0 ? 3 : 6); x < 1024; x += 6) {
      bCtx.beginPath();
      bCtx.arc(x, y, 1.4, 0, 2 * Math.PI);
      bCtx.fill();
    }
  }

  // Recessed seams (dark = debossed/grooved)
  bCtx.strokeStyle = "#1c1c1c";
  bCtx.lineWidth = 10;
  drawSeamPaths(bCtx);

  // Canvas 3: Emissive Map Canvas (Only the seams glow)
  const emissiveCanvas = document.createElement("canvas");
  emissiveCanvas.width = 1024;
  emissiveCanvas.height = 512;
  const eCtx = emissiveCanvas.getContext("2d")!;

  // Black background (no emissive glow on the leather body)
  eCtx.fillStyle = "#000000";
  eCtx.fillRect(0, 0, 1024, 512);

  // Seam glow (white areas will shine at maximum intensity)
  eCtx.lineWidth = 8;
  eCtx.strokeStyle = "#ffffff";
  eCtx.shadowBlur = 10;
  eCtx.shadowColor = "#ffffff";
  drawSeamPaths(eCtx);

  // Extra sharp white seam center line
  eCtx.lineWidth = 2.5;
  eCtx.strokeStyle = "#ffffff";
  eCtx.shadowBlur = 0;
  drawSeamPaths(eCtx);

  // Convert canvases to Three.js textures
  const colorTex = new THREE.CanvasTexture(colorCanvas);
  const bumpTex = new THREE.CanvasTexture(bumpCanvas);
  const emissiveTex = new THREE.CanvasTexture(emissiveCanvas);

  colorTex.wrapS = THREE.RepeatWrapping;
  colorTex.wrapT = THREE.ClampToEdgeWrapping;
  bumpTex.wrapS = THREE.RepeatWrapping;
  bumpTex.wrapT = THREE.ClampToEdgeWrapping;
  emissiveTex.wrapS = THREE.RepeatWrapping;
  emissiveTex.wrapT = THREE.ClampToEdgeWrapping;

  return { colorTex, bumpTex, emissiveTex };
}

// ── 2. CYBER BASKETBALL COMPONENT WITH ROUTE PATHS ──
interface CyberBasketballProps {
  pathname: string;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  clickOffset: number;
  scrollSpeed: number;
  scrollY: number;
}

function CyberBasketball({ pathname, mouse, clickOffset, scrollSpeed, scrollY }: CyberBasketballProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  
  const textures = useMemo(() => generateBasketballTextures(), []);
  const mountTime = useRef(Date.now());
  const scrollRotationX = useRef(0);
  const hoverState = useRef(false);

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.elapsedTime;
    const elapsed = (Date.now() - mountTime.current) / 1000;
    
    // 🎬 Zero-G Opener: ball is a centerpiece for the first 2.2 seconds
    const isIntro = elapsed < 2.2;

    // 1. Idle Bobbing (slow sinusoidal float)
    const bob = Math.sin(t * 2.2) * 0.08;

    // 2. Continuous rotation & scroll speed spin
    scrollRotationX.current += scrollSpeed * 0.05;
    meshRef.current.rotation.y = t * 0.18 + mouse.current.x * 0.35;
    meshRef.current.rotation.x = scrollRotationX.current + Math.sin(t * 0.2) * 0.1 - mouse.current.y * 0.35;

    // 3. Responsive Coordinates & Route-Specific Positions
    const { size, viewport } = state;
    const isMobile = size.width < 768;

    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;
    let targetScale = 1.35;

    if (!isIntro) {
      if (isMobile) {
        targetX = 0;
        targetY = 0.8;
        targetZ = -1.2;
        targetScale = 0.85;
      } else {
        // Desktop positions
        if (pathname === "/") {
          // Map scroll progress to positions on homepage
          const maxScroll = document.body.scrollHeight - window.innerHeight;
          const s = maxScroll > 0 ? scrollY / maxScroll : 0;

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
          targetX = 2.0;
          targetY = 0.4;
          targetZ = -1.5;
          targetScale = 0.95;
        } else if (pathname === "/login" || pathname === "/signup" || pathname === "/finish-profile") {
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
          targetX = 2.2;
          targetY = -0.8;
          targetZ = -2.2;
          targetScale = 0.7;
        } else {
          targetX = 1.8;
          targetY = 0;
          targetZ = -1.0;
          targetScale = 1.0;
        }
      }
    }

    // 4. Hover Detection (Projected Distance Math)
    const mouseX3D = mouse.current.x * (viewport.width / 2);
    const mouseY3D = mouse.current.y * (viewport.height / 2);
    const dx = mouseX3D - meshRef.current.position.x;
    const dy = mouseY3D - meshRef.current.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    const isHovered = dist < 1.3 * meshRef.current.scale.x;
    hoverState.current = isHovered;

    if (isHovered) {
      meshRef.current.rotation.z = Math.sin(t * 22) * 0.05;
      meshRef.current.rotation.y += Math.cos(t * 14) * 0.03;
    }

    // Apply translations smoothly with lerping
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.08;
    meshRef.current.position.y += (targetY + bob + clickOffset - meshRef.current.position.y) * 0.08;
    meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.08;

    const currentScale = meshRef.current.scale.x;
    const lerpedScale = currentScale + (targetScale - currentScale) * 0.08;
    meshRef.current.scale.set(lerpedScale, lerpedScale, lerpedScale);

    // 5. Telemetry Rings update
    if (ringRef.current) {
      ringRef.current.position.copy(meshRef.current.position);
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.05;
      ringRef.current.rotation.z = -t * 0.2;
      const ringScale = lerpedScale * 1.35;
      ringRef.current.scale.set(ringScale, ringScale, ringScale);
    }
    if (outerRingRef.current) {
      outerRingRef.current.position.copy(meshRef.current.position);
      outerRingRef.current.rotation.x = Math.PI / 3 + Math.cos(t * 0.2) * 0.08;
      outerRingRef.current.rotation.z = t * 0.12;
      const ringScale = lerpedScale * 1.6;
      outerRingRef.current.scale.set(ringScale, ringScale, ringScale);
    }
  });

  return (
    <>
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          map={textures.colorTex || undefined}
          bumpMap={textures.bumpTex || undefined}
          bumpScale={0.055}
          roughness={0.45}
          metalness={0.15}
          clearcoat={0.45}
          clearcoatRoughness={0.2}
          emissiveMap={textures.emissiveTex || undefined}
          emissive={new THREE.Color("#00f5d4")}
          emissiveIntensity={2.8}
        />
      </mesh>

      <mesh ref={ringRef}>
        <torusGeometry args={[1.0, 0.005, 8, 100]} />
        <meshBasicMaterial color="#00f5d4" transparent opacity={0.22} />
      </mesh>

      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.0, 0.003, 8, 100]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.1} />
      </mesh>
    </>
  );
}

// ── 3. INTERACTIVE PARTICLES DRIFT (CURSOR PARALLAX) ──
const STAR_COUNT = 300;
const STAR_POSITIONS = (() => {
  const arr = new Float32Array(STAR_COUNT * 3);
  for (let i = 0; i < STAR_COUNT; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 22;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 22;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 22;
  }
  return arr;
})();

function InteractiveParticles({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const pts = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pts.current) return;
    const t = state.clock.elapsedTime;
    
    // Parallax position drift (foreground particles drift faster)
    const targetX = mouse.current.x * 2.2;
    const targetY = mouse.current.y * 2.2;
    pts.current.position.x += (targetX - pts.current.position.x) * 0.05;
    pts.current.position.y += (targetY - pts.current.position.y) * 0.05;

    // Ambient rotate + mouse tilt parallax
    const targetRotX = t * 0.008 + mouse.current.y * 0.15;
    const targetRotY = t * 0.012 + mouse.current.x * 0.15;
    pts.current.rotation.x += (targetRotX - pts.current.rotation.x) * 0.04;
    pts.current.rotation.y += (targetRotY - pts.current.rotation.y) * 0.04;
  });

  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[STAR_POSITIONS, 3]} />
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

// ── 4. INTERACTIVE STARFIELD BACKGROUND (CURSOR PARALLAX) ──
function InteractiveStars({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Parallax position drift (background stars drift slower)
    const targetX = mouse.current.x * 0.8;
    const targetY = mouse.current.y * 0.8;
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;

    // Parallax rotation
    const targetRotX = mouse.current.y * 0.08;
    const targetRotY = mouse.current.x * 0.08;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.04;
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
    </group>
  );
}

// ── 5. MAIN GLOBAL BACKGROUND CANVAS ──
export default function BasketballOrb() {
  const pathname = usePathname() || "/";
  const mouse = useRef({ x: 0, y: 0 });
  const [clickOffset, setClickOffset] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [scrollYValue, setScrollYValue] = useState(0);

  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    // 1. Mouse coordinates listener
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    // 2. Global click bounce listener
    const handleMouseDown = () => {
      setClickOffset(-0.25); // Slam down
      setTimeout(() => {
        setClickOffset(0.12); // Bounce up
        setTimeout(() => setClickOffset(0), 180);
      }, 120);
    };

    // 3. Scroll velocity listener
    const handleScroll = () => {
      const latest = window.scrollY;
      setScrollYValue(latest);
      const now = Date.now();
      const dt = now - lastTime.current;
      const dy = latest - lastScrollY.current;
      
      if (dt > 0) {
        setScrollSpeed(dy / dt);
      }
      
      lastScrollY.current = latest;
      lastTime.current = now;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Slowly decay scroll spin velocity
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

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-transparent">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 3.2]} fov={45} />
        
        {/* Lights - Balanced to display deep orange leather + bright cyan rim glow */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 4]} intensity={2.2} color="#ffffff" castShadow />
        
        {/* Warm amber light for natural basketball orange */}
        <pointLight position={[6, 2, 2]} intensity={3.5} color="#ff9e59" />
        
        {/* Cool cyan rim light from opposite side for cyber look */}
        <pointLight position={[-6, -2, -2]} intensity={3.8} color="#00f5d4" />
        
        {/* Soft violet fill light from above */}
        <pointLight position={[0, 5, -1]} intensity={1.2} color="#8b5cf6" />

        {/* Parallax Starfields */}
        <InteractiveStars mouse={mouse} />
        <InteractiveParticles mouse={mouse} />
        
        {/* Unified 3D Basketball centerpiece/background */}
        <CyberBasketball 
          pathname={pathname} 
          mouse={mouse} 
          clickOffset={clickOffset}
          scrollSpeed={scrollSpeed}
          scrollY={scrollYValue}
        />
      </Canvas>
    </div>
  );
}
