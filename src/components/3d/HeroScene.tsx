import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.2;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.8}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <MeshDistortMaterial
          color="#22d3ee"
          emissive="#0891b2"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function OrbitingRing({ radius, speed, color, offset = 0 }: { radius: number; speed: number; color: string; offset?: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const sphereRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const angle = state.clock.elapsedTime * speed + offset;
    groupRef.current.position.x = Math.cos(angle) * radius;
    groupRef.current.position.z = Math.sin(angle) * radius;
    sphereRef.current.rotation.x += 0.02;
    sphereRef.current.rotation.y += 0.03;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={sphereRef} scale={0.15}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

function FloatingStars({ count = 200 }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    return pos;
  }, [count]);

  const ref = useRef<THREE.Points>(null!);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#22d3ee"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function RingParticles({ count = 80 }: { count?: number }) {
  const particles = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.8 + Math.random() * 0.5;
      items.push({
        angle,
        radius,
        speed: 0.1 + Math.random() * 0.05,
        size: 0.02 + Math.random() * 0.03,
        color: Math.random() > 0.5 ? "#22d3ee" : "#a78bfa",
      });
    }
    return items;
  }, [count]);

  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={[Math.cos(p.angle) * p.radius, 0, Math.sin(p.angle) * p.radius]}>
          <sphereGeometry args={[p.size, 6, 6]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      className="absolute inset-0 pointer-events-none"
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a78bfa" />
      <TorusKnot />
      <OrbitingRing radius={2.5} speed={0.3} color="#22d3ee" />
      <OrbitingRing radius={3.2} speed={-0.25} color="#a78bfa" offset={1.2} />
      <OrbitingRing radius={1.8} speed={0.4} color="#f472b6" offset={2.5} />
      <FloatingStars count={300} />
      <RingParticles count={100} />
    </Canvas>
  );
}
