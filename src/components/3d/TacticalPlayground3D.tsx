"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface PlayNode {
  pos: THREE.Vector3;
  color: string;
  label?: string;
}

// ── PLAYBOOK PARAMETRIC PHYSICS ──
// Returns the positions of players and ball at time `t` for a given program ID
function getPlayPositions(programId: number, t: number) {
  const loopTime = t % 6; // 6-second animation loop
  const pA = new THREE.Vector3();
  const pB = new THREE.Vector3();
  const pBall = new THREE.Vector3();
  let showBall = true;

  if (programId === 0) {
    // ── PLAY 1: VERTICAL JUMP & DUNK (Plyometrics) ──
    // Player A stands at half-court observing. Player B jumps from the block to dunk.
    pA.set(-1.8, 0, 1.5); // Guard watching

    // Jumper (Player B) approaches and springs
    if (loopTime < 2.2) {
      // Walk to launching point
      const pct = loopTime / 2.2;
      pB.lerpVectors(new THREE.Vector3(0, 0, 1.8), new THREE.Vector3(0, 0, 0.4), pct);
      pBall.copy(pB);
      pBall.y += 0.2; // Dribbling bounce
      pBall.y += Math.abs(Math.sin(loopTime * 6.5)) * 0.15;
    } else if (loopTime < 3.8) {
      // Jump and Dunk
      const pct = (loopTime - 2.2) / 1.6;
      // Parabolic jump arc towards rim at [0, 1.3, -1.5]
      const start = new THREE.Vector3(0, 0, 0.4);
      const rim = new THREE.Vector3(0, 1.25, -1.45);
      pB.lerpVectors(start, rim, pct);
      // Parabolic height curve
      pB.y = Math.sin(pct * Math.PI) * 1.35;
      pBall.copy(pB);
      pBall.z -= 0.12; // ball in front of hands
    } else {
      // Land and return
      const pct = (loopTime - 3.8) / 2.2;
      const rim = new THREE.Vector3(0, 0, -1.45); // land under rim
      pB.lerpVectors(rim, new THREE.Vector3(0, 0, 1.8), pct);
      pBall.copy(pB);
      pBall.y += 0.18;
      showBall = false; // ball through net
    }

  } else if (programId === 1) {
    // ── PLAY 2: PICK & ROLL (Strength & Power) ──
    // Player A drives. Player B sets screen then rolls.
    
    // Initial Setup
    const guardStart = new THREE.Vector3(-1.4, 0, 1.4);
    const bigStart = new THREE.Vector3(-0.4, 0, 0.5); // Screen position

    if (loopTime < 1.8) {
      // Guard sets up, big moves to screen position
      const pct = loopTime / 1.8;
      pA.copy(guardStart);
      pB.lerpVectors(new THREE.Vector3(0.6, 0, 0.8), bigStart, pct);
      pBall.copy(pA).y += 0.2 + Math.abs(Math.sin(loopTime * 4)) * 0.1;
    } else if (loopTime < 3.8) {
      // Guard drives around screen
      const pct = (loopTime - 1.8) / 2.0;
      // Curved drive path
      const p1 = guardStart;
      const p2 = new THREE.Vector3(-0.9, 0, 0.2);
      const p3 = new THREE.Vector3(0.4, 0, 0.1);
      pA.bezierCurveTo(p1.x, p1.z, p2.x, p2.z, p3.x, p3.z); // Math helper approximation:
      pA.x = THREE.MathUtils.lerp(p1.x, p3.x, pct);
      pA.z = Math.sin(pct * Math.PI) * 0.45 + THREE.MathUtils.lerp(p1.z, p3.z, pct);
      
      pB.copy(bigStart); // Big sets screen
      pBall.copy(pA).y += 0.2 + Math.abs(Math.sin(loopTime * 8)) * 0.08;
    } else if (loopTime < 4.8) {
      // Pass is made. Big rolls to rim
      const pct = (loopTime - 3.8) / 1.0;
      pA.set(0.4, 0, 0.1);
      // Big rolls
      pB.lerpVectors(bigStart, new THREE.Vector3(0, 0, -1.3), pct);
      // Ball passes from Guard to Big
      pBall.lerpVectors(pA, pB, pct);
      pBall.y += Math.sin(pct * Math.PI) * 0.45; // passing arc
    } else {
      // Big dunks/scores and resets
      const pct = (loopTime - 4.8) / 1.2;
      pA.lerpVectors(new THREE.Vector3(0.4, 0, 0.1), guardStart, pct);
      pB.lerpVectors(new THREE.Vector3(0, 0, -1.3), new THREE.Vector3(0.6, 0, 0.8), pct);
      pBall.copy(pB).y += 0.1;
      showBall = false;
    }

  } else {
    // ── PLAY 3: ZIGZAG HANDLES & THREE-POINT SHOT (Hoop IQ) ──
    // Player A performs handles and shoots. Player B stands under rim for rebound.
    pB.set(0.8, 0, -1.3); // Rebounder waiting

    if (loopTime < 3.0) {
      // Zigzag handles
      const pct = loopTime / 3.0;
      const points = [
        new THREE.Vector3(1.6, 0, 1.8),
        new THREE.Vector3(-1.2, 0, 1.2),
        new THREE.Vector3(1.0, 0, 0.6),
        new THREE.Vector3(-0.6, 0, 0.0),
      ];
      // Pick active segment
      const seg = Math.min(2, Math.floor(pct * 3));
      const segPct = (pct * 3) % 1;
      pA.lerpVectors(points[seg], points[seg + 1], segPct);
      pBall.copy(pA);
      pBall.y += 0.15 + Math.abs(Math.sin(loopTime * 10)) * 0.12;
    } else if (loopTime < 4.8) {
      // Shoot ball
      const pct = (loopTime - 3.0) / 1.8;
      pA.set(-0.6, 0, 0.0); // Shooter stands at spot
      
      const rim = new THREE.Vector3(0, 1.25, -1.45);
      // High shot arc
      pBall.lerpVectors(pA, rim, pct);
      pBall.y += Math.sin(pct * Math.PI) * 1.8; // Shot arc peak
    } else {
      // Ball scores, reset
      pA.set(-0.6, 0, 0.0);
      pBall.set(0, 0, -1.45);
      showBall = false;
    }
  }

  return { pA, pB, pBall, showBall };
}

// ── TACTICAL COURT GRID GENERATOR ──
function VectorCourt() {
  const courtLines = useMemo(() => {
    const lines: [number, number, number][][] = [];

    const width = 2.4;
    const length = 2.2;
    const rimY = -1.45;

    // 1. Boundary lines
    lines.push([
      [-width, 0, length],
      [width, 0, length],
      [width, 0, -length],
      [-width, 0, -length],
      [-width, 0, length],
    ]);

    // 2. Free Throw Key
    lines.push([
      [-0.6, 0, -length],
      [-0.6, 0, -0.6],
      [0.6, 0, -0.6],
      [0.6, 0, -length],
    ]);

    // 3. Free Throw circle top
    const ftPoints: [number, number, number][] = [];
    for (let i = 0; i <= 20; i++) {
      const theta = (i / 20) * Math.PI;
      ftPoints.push([0.6 * Math.cos(theta), 0, -0.6 + 0.6 * Math.sin(theta)]);
    }
    lines.push(ftPoints);

    // 4. Three-point Arc (approx flat sides + round center)
    const arcPoints: [number, number, number][] = [];
    // Left straight line
    for (let z = -length; z <= -0.9; z += 0.2) {
      arcPoints.push([-2.2, 0, z]);
    }
    // Curve arc
    for (let i = 0; i <= 30; i++) {
      const theta = Math.PI - (i / 30) * Math.PI;
      arcPoints.push([2.2 * Math.cos(theta), 0, -0.9 + 2.2 * Math.sin(theta)]);
    }
    // Right straight line
    for (let z = -0.9; z >= -length; z -= 0.2) {
      arcPoints.push([2.2, 0, z]);
    }
    lines.push(arcPoints);

    // 5. Backboard and rim structure
    lines.push([
      [-0.45, 1.25, -2.05],
      [0.45, 1.25, -2.05],
      [0.45, 1.75, -2.05],
      [-0.45, 1.75, -2.05],
      [-0.45, 1.25, -2.05],
    ]); // Backboard outline

    lines.push([
      [0, 1.28, -2.05],
      [0, 1.28, -1.8],
    ]); // Backboard connector

    return lines;
  }, []);

  return (
    <group>
      {/* Draw vector lines */}
      {courtLines.map((linePoints, i) => (
        <Line
          key={i}
          points={linePoints.map(p => new THREE.Vector3(p[0], p[1], p[2]))}
          color="#334155"
          lineWidth={1.2}
        />
      ))}

      {/* Glowing neon key lane borders */}
      <Line
        points={[
          new THREE.Vector3(-0.6, 0.005, -2.2),
          new THREE.Vector3(-0.6, 0.005, -0.6),
          new THREE.Vector3(0.6, 0.005, -0.6),
          new THREE.Vector3(0.6, 0.005, -2.2),
        ]}
        color="#10b981"
        lineWidth={2.0}
        opacity={0.38}
        transparent
      />

      {/* The neon rim */}
      <mesh position={[0, 1.28, -1.58]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.22, 0.015, 8, 32]} />
        <meshBasicMaterial color="#f59e0b" toneMapped={false} />
      </mesh>
    </group>
  );
}

// ── PLAYBACK SIMULATOR SCENE ──
function SimulatorScene({ activeProgram }: { activeProgram: number }) {
  const nodeARef = useRef<THREE.Mesh>(null);
  const nodeBRef = useRef<THREE.Mesh>(null);
  const ballRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { pA, pB, pBall, showBall } = getPlayPositions(activeProgram, t);

    // Smooth position updates
    if (nodeARef.current) nodeARef.current.position.lerp(pA, 0.28);
    if (nodeBRef.current) nodeBRef.current.position.lerp(pB, 0.28);
    
    if (ballRef.current) {
      ballRef.current.position.lerp(pBall, 0.35);
      ballRef.current.visible = showBall;
      ballRef.current.rotation.y = t * 4;
    }
  });

  return (
    <group position={[0, -0.65, 0]}>
      {/* 3D Wireframe court */}
      <VectorCourt />

      {/* Player A Node (Guard - Cyan) */}
      <mesh ref={nodeARef}>
        <sphereGeometry args={[0.11, 24, 24]} />
        <meshPhysicalMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1.2} roughness={0.1} />
      </mesh>
      
      {/* Player B Node (Big/Jumper - Emerald) */}
      <mesh ref={nodeBRef}>
        <sphereGeometry args={[0.11, 24, 24]} />
        <meshPhysicalMaterial color="#10b981" emissive="#10b981" emissiveIntensity={1.2} roughness={0.1} />
      </mesh>

      {/* Ball Node (Glowing Orange) */}
      <mesh ref={ballRef}>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshPhysicalMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.8} roughness={0.3} />
      </mesh>

      {/* Subtle floor grid shadow plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshBasicMaterial color="#080c1d" transparent opacity={0.65} />
      </mesh>
    </group>
  );
}

// ── MAIN CANVAS COMPONENT ──
export default function TacticalPlayground3D({ activeProgram }: { activeProgram: number }) {
  return (
    <div className="w-full h-full min-h-[300px] relative rounded-2xl overflow-hidden bg-slate-950/40 border border-white/5 backdrop-blur-sm shadow-inner">
      {/* HUD scanning indicators */}
      <div className="absolute top-3 left-4 flex items-center gap-1.5 z-10 pointer-events-none">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">TACTICAL TELEMETRY // L-GRID ACTIVE</span>
      </div>

      <div className="absolute top-3 right-4 z-10 text-[9px] text-zinc-600 font-semibold tracking-wider font-mono select-none pointer-events-none">
        PLAY: #{activeProgram + 1} // FPS: 60
      </div>

      <Canvas
        camera={{ position: [0, 2.8, 3.8], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 2.8, 3.8]} fov={38} />
        <ambientLight intensity={0.25} />
        <pointLight position={[0, 4, 0]} intensity={1.5} color="#10b981" />
        <pointLight position={[3, 2, 3]} intensity={0.8} color="#06b6d4" />
        
        <SimulatorScene activeProgram={activeProgram} />
      </Canvas>
    </div>
  );
}
