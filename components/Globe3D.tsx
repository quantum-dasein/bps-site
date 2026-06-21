"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import * as THREE from "three";
import AutoImage from "./AutoImage";

const R = 1;

const REGIONS: { name: string; lat: number; lon: number }[] = [
  { name: "СНГ", lat: 55, lon: 50 },
  { name: "ОАЭ", lat: 24, lon: 54 },
  { name: "Пакистан", lat: 30, lon: 69 },
  { name: "Индия", lat: 21, lon: 78 },
  { name: "Китай", lat: 35, lon: 108 },
];

function latLonToVec3(lat: number, lon: number, radius = R) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/** Dotted sphere surface (fibonacci distribution). */
function DottedGlobe() {
  const positions = useMemo(() => {
    const count = 1400;
    const arr = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = golden * i;
      arr[i * 3] = Math.cos(theta) * radius * R;
      arr[i * 3 + 1] = y * R;
      arr[i * 3 + 2] = Math.sin(theta) * radius * R;
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#C9A646"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Glowing arc between two lat/lon points (raised great-circle-ish curve). */
function Arc({ from, to, delay }: { from: THREE.Vector3; to: THREE.Vector3; delay: number }) {
  const head = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => {
    const mid = from.clone().add(to).multiplyScalar(0.5);
    const dist = from.distanceTo(to);
    mid.normalize().multiplyScalar(R + dist * 0.55);
    return new THREE.QuadraticBezierCurve3(from, mid, to);
  }, [from, to]);

  const geometry = useMemo(
    () => new THREE.TubeGeometry(curve, 50, 0.006, 8, false),
    [curve]
  );

  useFrame((state) => {
    if (!head.current) return;
    const t = (state.clock.elapsedTime * 0.35 + delay) % 1;
    const p = curve.getPointAt(t);
    head.current.position.copy(p);
    const s = 0.02 + Math.sin(t * Math.PI) * 0.03;
    head.current.scale.setScalar(s);
  });

  return (
    <group>
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#E4C96A" transparent opacity={0.5} />
      </mesh>
      <mesh ref={head}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color="#FFF2CD" />
      </mesh>
    </group>
  );
}

function GlobeGroup() {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const markers = useMemo(() => REGIONS.map((r) => latLonToVec3(r.lat, r.lon)), []);
  const arcs = useMemo(() => {
    const pairs: { from: THREE.Vector3; to: THREE.Vector3; delay: number }[] = [];
    for (let i = 0; i < markers.length - 1; i++) {
      pairs.push({ from: markers[i], to: markers[i + 1], delay: i * 0.2 });
    }
    return pairs;
  }, [markers]);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x +=
      (-pointer.current.y * 0.3 + 0.15 - group.current.rotation.x) * 0.03;
    group.current.position.x +=
      (pointer.current.x * 0.1 - group.current.position.x) * 0.03;
  });

  return (
    <group ref={group} rotation={[0.15, 0, 0]}>
      {/* solid core to occlude back-facing dots */}
      <mesh>
        <sphereGeometry args={[R * 0.985, 48, 48]} />
        <meshStandardMaterial color="#070705" metalness={0.4} roughness={0.9} />
      </mesh>
      {/* faint atmosphere */}
      <mesh>
        <sphereGeometry args={[R * 1.04, 48, 48]} />
        <meshBasicMaterial
          color="#C9A646"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
      <DottedGlobe />
      {markers.map((m, i) => (
        <mesh key={i} position={m}>
          <sphereGeometry args={[0.022, 16, 16]} />
          <meshBasicMaterial color="#FFF2CD" />
        </mesh>
      ))}
      {arcs.map((a, i) => (
        <Arc key={i} from={a.from} to={a.to} delay={a.delay} />
      ))}
    </group>
  );
}

export default function Globe3D({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<"loading" | "3d" | "fallback">("loading");
  const [visible, setVisible] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    const force = new URLSearchParams(window.location.search).has("force3d");
    setMode((reduce || small) && !force ? "fallback" : "3d");
  }, []);

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
        <AutoImage src="/images/contact-globe.png" alt="" className="w-full" />
      </div>
    );
  }

  return (
    <div className={className} ref={wrap}>
      {visible && (
        <Canvas
          camera={{ position: [0, 0, 3.1], fov: 42 }}
          dpr={[1, 1.8]}
          gl={{ alpha: true, antialias: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <pointLight position={[3, 2, 4]} intensity={2} color="#FFF2CD" />
            <GlobeGroup />
            <EffectComposer>
              <Bloom
                intensity={1.1}
                luminanceThreshold={0.4}
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
