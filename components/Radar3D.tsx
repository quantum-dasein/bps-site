"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import * as THREE from "three";
import AutoImage from "./AutoImage";

/** Candidate nodes scattered across the radar rings. */
const NODES = Array.from({ length: 12 }).map((_, i) => {
  const ring = 0.55 + (i % 4) * 0.42;
  const angle = (i / 12) * Math.PI * 2 + (i % 3) * 0.5;
  return { r: ring, angle, pulse: 1.6 + (i % 5) * 0.4 };
});

function Rings() {
  const radii = [0.55, 0.97, 1.39, 1.8];
  return (
    <>
      {radii.map((r) => (
        <mesh key={r}>
          <ringGeometry args={[r - 0.006, r + 0.006, 96]} />
          <meshBasicMaterial
            color="#C9A646"
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      {/* cross hairs */}
      {[0, Math.PI / 2].map((a) => (
        <mesh key={a} rotation={[0, 0, a]}>
          <planeGeometry args={[3.6, 0.004]} />
          <meshBasicMaterial color="#C9A646" transparent opacity={0.18} />
        </mesh>
      ))}
    </>
  );
}

function Node({ r, angle, pulse }: { r: number; angle: number; pulse: number }) {
  const dot = useRef<THREE.Mesh>(null);
  const x = Math.cos(angle) * r;
  const y = Math.sin(angle) * r;

  useFrame((state) => {
    if (!dot.current) return;
    const s = 0.03 + (Math.sin(state.clock.elapsedTime * pulse) * 0.5 + 0.5) * 0.04;
    dot.current.scale.setScalar(s);
  });

  return (
    <group position={[x, y, 0]}>
      <mesh ref={dot}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshBasicMaterial color="#FFF2CD" />
      </mesh>
      <mesh>
        <ringGeometry args={[0.05, 0.062, 24]} />
        <meshBasicMaterial color="#C9A646" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Sweep() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z -= delta * 0.9;
  });
  return (
    <mesh ref={ref}>
      <circleGeometry args={[1.85, 48, 0, 0.7]} />
      <meshBasicMaterial color="#E4C96A" transparent opacity={0.12} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Core() {
  const pulse = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!pulse.current) return;
    const t = (state.clock.elapsedTime * 0.5) % 1;
    pulse.current.scale.setScalar(0.1 + t * 1.6);
    (pulse.current.material as THREE.MeshBasicMaterial).opacity = 0.5 * (1 - t);
  });
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.11, 24, 24]} />
        <meshBasicMaterial color="#FFF6DC" />
      </mesh>
      <mesh ref={pulse} rotation={[0, 0, 0]}>
        <ringGeometry args={[0.1, 0.13, 48]} />
        <meshBasicMaterial color="#E4C96A" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function RadarGroup() {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (spin.current) spin.current.rotation.z += delta * 0.08;
    if (tilt.current) {
      tilt.current.rotation.x +=
        (-1.02 + pointer.current.y * 0.18 - tilt.current.rotation.x) * 0.04;
      tilt.current.rotation.y +=
        (pointer.current.x * 0.22 - tilt.current.rotation.y) * 0.04;
    }
  });

  return (
    <group ref={tilt} rotation={[-1.02, 0, 0]}>
      <group ref={spin}>
        <Rings />
        <Sweep />
        {NODES.map((n, i) => (
          <Node key={i} r={n.r} angle={n.angle} pulse={n.pulse} />
        ))}
      </group>
      <Core />
    </group>
  );
}

export default function Radar3D({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<"loading" | "3d" | "fallback">("loading");
  const [visible, setVisible] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    const force = new URLSearchParams(window.location.search).has("force3d");
    setMode((reduce || small) && !force ? "fallback" : "3d");
  }, []);

  // only run the WebGL canvas while the section is on/near screen
  useEffect(() => {
    if (mode !== "3d" || !wrap.current) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { rootMargin: "300px 0px" }
    );
    io.observe(wrap.current);
    return () => io.disconnect();
  }, [mode]);

  if (mode === "loading") return <div className={className} ref={wrap} />;

  if (mode === "fallback") {
    return (
      <div className={className}>
        <AutoImage
          src="/images/methodology-radar.png"
          alt="Целевой поиск кандидатов"
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className={className} ref={wrap}>
      {visible && (
        <Canvas
          camera={{ position: [0, 0, 4.2], fov: 42 }}
          dpr={[1, 1.8]}
          gl={{ alpha: true, antialias: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.7} />
            <RadarGroup />
            <EffectComposer>
              <Bloom
                intensity={1.2}
                luminanceThreshold={0.35}
                luminanceSmoothing={0.3}
                mipmapBlur
              />
            </EffectComposer>
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
