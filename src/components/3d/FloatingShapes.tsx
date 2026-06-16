import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ShapeProps {
  position: [number, number, number];
  color: string;
  speed: number;
  scale: number;
  type: "octahedron" | "dodecahedron" | "icosahedron" | "torus";
}

function Shape({ position, color, speed, scale, type }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    meshRef.current.rotation.x += 0.005 * speed;
    meshRef.current.rotation.y += 0.008 * speed;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.3;
  });

  const geometry = useMemo(() => {
    switch (type) {
      case "octahedron": return <octahedronGeometry args={[scale, 0]} />;
      case "dodecahedron": return <dodecahedronGeometry args={[scale, 0]} />;
      case "icosahedron": return <icosahedronGeometry args={[scale, 0]} />;
      case "torus": return <torusGeometry args={[scale, scale * 0.3, 16, 32]} />;
    }
  }, [type, scale]);

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.15}
        transparent
        opacity={0.3}
        wireframe
        roughness={0.4}
        metalness={0.6}
      />
    </mesh>
  );
}

const shapes: ShapeProps[] = [
  { position: [-3, -2, -3], color: "#22d3ee", speed: 0.8, scale: 0.6, type: "octahedron" },
  { position: [3.5, 1, -4], color: "#a78bfa", speed: 1.2, scale: 0.8, type: "dodecahedron" },
  { position: [-4, 3, -2], color: "#f472b6", speed: 0.6, scale: 0.5, type: "icosahedron" },
  { position: [4, -1, -5], color: "#34d399", speed: 1.0, scale: 0.7, type: "torus" },
  { position: [-2, -3, -6], color: "#fb923c", speed: 0.9, scale: 0.4, type: "octahedron" },
  { position: [2.5, 3.5, -5], color: "#818cf8", speed: 0.7, scale: 0.55, type: "dodecahedron" },
];

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        {shapes.map((shape, i) => (
          <Shape key={i} {...shape} />
        ))}
      </Canvas>
    </div>
  );
}
