"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* Shared pointer (normalized -1..1), updated once for the whole scene  */
/* ------------------------------------------------------------------ */
function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return pointer;
}

/* ------------------------------------------------------------------ */
/* The gold triangular prism — the logo extruded into 3D               */
/* ------------------------------------------------------------------ */
function GoldPrism({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.15);
    shape.lineTo(-1.0, -0.75);
    shape.lineTo(1.0, -0.75);
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.55,
      bevelEnabled: true,
      bevelThickness: 0.09,
      bevelSize: 0.07,
      bevelSegments: 6,
      curveSegments: 24,
    });
    geo.center();
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.3;
    const targetX = pointer.current.y * 0.4 + 0.12;
    const targetZ = -pointer.current.x * 0.3;
    mesh.current.rotation.x += (targetX - mesh.current.rotation.x) * 0.05;
    mesh.current.rotation.z += (targetZ - mesh.current.rotation.z) * 0.05;
  });

  const scale = Math.min(viewport.width, viewport.height) * 0.34;

  return (
    <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.85}>
      <mesh ref={mesh} geometry={geometry} scale={scale}>
        <meshStandardMaterial
          color="#E4C97A"
          metalness={1}
          roughness={0.15}
          envMapIntensity={2.8}
          emissive="#6b5212"
          emissiveIntensity={0.55}
        />
      </mesh>
    </Float>
  );
}

/* ------------------------------------------------------------------ */
/* Subtle floating gold particles for depth                            */
/* ------------------------------------------------------------------ */
function Particles({ count = 90 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#E4C97A"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Group rig: gentle parallax of everything toward the cursor          */
/* ------------------------------------------------------------------ */
function Rig() {
  const group = useRef<THREE.Group>(null);
  const pointer = usePointer();

  useFrame(() => {
    if (!group.current) return;
    group.current.position.x +=
      (pointer.current.x * 0.45 - group.current.position.x) * 0.04;
    group.current.position.y +=
      (-pointer.current.y * 0.32 - group.current.position.y) * 0.04;
  });

  return (
    <group ref={group}>
      <GoldPrism pointer={pointer} />
      <Particles />
    </group>
  );
}

export default function PyramidScene() {
  const [ready, setReady] = useState(false);
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    setReady(true);
    setLowPower(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.innerWidth < 768
    );
  }, []);

  if (!ready) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, lowPower ? 1.5 : 2]}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} />
        <spotLight
          position={[6, 9, 6]}
          angle={0.45}
          penumbra={1}
          intensity={4.5}
          color="#FFF2CD"
        />
        <pointLight position={[-7, -4, -3]} intensity={2.2} color="#FFE9A8" />
        <pointLight position={[4, -2, 5]} intensity={1.6} color="#FFF2CD" />

        <Rig />

        <Environment resolution={256}>
          <Lightformer
            intensity={3.2}
            position={[0, 4, 4]}
            scale={[9, 4, 1]}
            color="#FFF7E0"
          />
          <Lightformer
            intensity={2.4}
            position={[-5, 1, 2]}
            scale={[4, 7, 1]}
            color="#FFE9A8"
          />
          <Lightformer
            intensity={1.8}
            position={[5, -2, 2]}
            scale={[5, 4, 1]}
            color="#D4AF37"
          />
        </Environment>

        {!lowPower && (
          <EffectComposer>
            <Bloom
              intensity={1.15}
              luminanceThreshold={0.5}
              luminanceSmoothing={0.32}
              mipmapBlur
            />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}
