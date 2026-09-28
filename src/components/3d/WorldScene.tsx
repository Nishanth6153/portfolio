import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// ────────────────────────────────────────────────────────────────────────────
// Morphing central blob — distorts organically using MeshDistortMaterial
// ────────────────────────────────────────────────────────────────────────────
function OrangeBlob({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const sp = scrollProgress.current;

    // Rotate continuously, scroll tilts it
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2 + sp * Math.PI * 0.5;
    meshRef.current.rotation.y = t * 0.15 + sp * Math.PI;
    meshRef.current.rotation.z = Math.cos(t * 0.2) * 0.15;

    // Scale down as user scrolls
    const scale = 1.0 - sp * 0.35;
    meshRef.current.scale.setScalar(scale);

    // Drift upward on scroll
    meshRef.current.position.y = -sp * 3;
    meshRef.current.position.x = Math.sin(t * 0.1) * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} castShadow>
        <icosahedronGeometry args={[1.6, 4]} />
        <MeshDistortMaterial
          color="#FF9812"
          emissive="#E8820A"
          emissiveIntensity={0.25}
          metalness={0.6}
          roughness={0.15}
          distort={0.45}
          speed={2.5}
          transparent
          opacity={0.92}
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Twisted ribbon / wire strands — like Reference 2 metallic wires
// ────────────────────────────────────────────────────────────────────────────
function TwistedRibbons({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!);

  const ribbons = useMemo(() => {
    const items = [];
    const count = 14;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 1.2 + (i % 3) * 0.4;
      const heightOffset = (Math.random() - 0.5) * 4;
      const twistFactor = 0.8 + Math.random() * 1.5;

      // Create a curved tube path
      const points: THREE.Vector3[] = [];
      const segments = 40;
      for (let j = 0; j <= segments; j++) {
        const t = j / segments;
        const theta = angle + t * twistFactor * Math.PI * 2;
        const x = Math.cos(theta) * radius * (1 - t * 0.3);
        const z = Math.sin(theta) * radius * (1 - t * 0.3);
        const y = heightOffset + (t - 0.5) * 5.5 + Math.sin(t * Math.PI * 3) * 0.3;
        points.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 40, 0.015 + Math.random() * 0.02, 6, false);

      items.push({
        geo: tubeGeo,
        color: i % 3 === 0 ? '#FF9812' : i % 3 === 1 ? '#FFD700' : '#C0A050',
        emissive: i % 3 === 0 ? '#FF5500' : '#FF8800',
        opacity: 0.5 + (i % 4) * 0.12,
        speed: 0.08 + (i % 5) * 0.02,
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const sp = scrollProgress.current;

    // Group rotates and rises with scroll
    groupRef.current.rotation.y = t * 0.04 + sp * Math.PI * 0.8;
    groupRef.current.rotation.x = sp * 0.4 + Math.sin(t * 0.1) * 0.05;
    groupRef.current.position.y = -sp * 2.0;

    // Stretch the group vertically as scroll progresses (Ref 2 style)
    const stretchY = 1.0 + sp * 1.8;
    const compressXZ = 1.0 - sp * 0.25;
    groupRef.current.scale.set(compressXZ, stretchY, compressXZ);
  });

  return (
    <group ref={groupRef}>
      {ribbons.map((ribbon, i) => (
        <mesh key={i} geometry={ribbon.geo}>
          <meshStandardMaterial
            color={ribbon.color}
            emissive={ribbon.emissive}
            emissiveIntensity={0.5}
            metalness={0.85}
            roughness={0.05}
            transparent
            opacity={ribbon.opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Particle field — ambient orange stars in the background
// ────────────────────────────────────────────────────────────────────────────
function ParticleField({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Points>(null!);
  const count = 600;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Orange to amber color range
      const r = 0.9 + Math.random() * 0.1;
      const g = 0.45 + Math.random() * 0.35;
      const b = 0.0 + Math.random() * 0.1;
      col[i * 3]     = r;
      col[i * 3 + 1] = g;
      col[i * 3 + 2] = b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const sp = scrollProgress.current;
    meshRef.current.rotation.y = t * 0.008;
    meshRef.current.rotation.x = sp * 0.3;
    meshRef.current.position.z = -sp * 2;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Floating geometric rings — orbit the blob
// ────────────────────────────────────────────────────────────────────────────
function OrbitalRings({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const sp = scrollProgress.current;

    if (ring1.current) {
      ring1.current.rotation.x = t * 0.4 + sp * 2;
      ring1.current.rotation.y = t * 0.2;
      ring1.current.scale.setScalar(1 - sp * 0.6);
      ring1.current.position.y = -sp * 2;
    }
    if (ring2.current) {
      ring2.current.rotation.x = -t * 0.3 + sp * 1.5;
      ring2.current.rotation.z = t * 0.25;
      ring2.current.scale.setScalar(1 - sp * 0.5);
      ring2.current.position.y = -sp * 2;
    }
    if (ring3.current) {
      ring3.current.rotation.y = t * 0.5;
      ring3.current.rotation.x = Math.PI / 4 + sp;
      ring3.current.scale.setScalar(1 - sp * 0.7);
      ring3.current.position.y = -sp * 2;
    }
  });

  return (
    <group>
      <mesh ref={ring1}>
        <torusGeometry args={[2.3, 0.012, 8, 120]} />
        <meshStandardMaterial
          color="#FF9812" emissive="#FF5500" emissiveIntensity={0.6}
          metalness={0.9} roughness={0.05} transparent opacity={0.5}
        />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[2.9, 0.008, 8, 120]} />
        <meshStandardMaterial
          color="#FFD700" emissive="#FF8800" emissiveIntensity={0.4}
          metalness={0.85} roughness={0.08} transparent opacity={0.35}
        />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[1.7, 0.018, 8, 80]} />
        <meshStandardMaterial
          color="#FFB347" emissive="#FF6600" emissiveIntensity={0.5}
          metalness={0.9} roughness={0.04} transparent opacity={0.45}
        />
      </mesh>
    </group>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Connected Knowledge Lattice — Restrained 3D Neural / Systems Metaphor for About
// ────────────────────────────────────────────────────────────────────────────
function ConnectedKnowledgeLattice({
  scrollProgress,
}: {
  scrollProgress: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  const { nodePositions, lineIndices } = useMemo(() => {
    const rawNodes = [
      [0.0, 1.2, 0.0],
      [-1.4, 0.6, 0.4],
      [1.3, 0.8, -0.3],
      [-0.8, -0.5, 0.8],
      [1.1, -0.4, 0.5],
      [-1.8, -1.2, -0.5],
      [0.2, -1.4, -0.2],
      [1.7, -1.0, -0.8],
      [-0.3, 2.0, -0.6],
      [1.5, 1.8, 0.4],
      [-2.1, 0.2, 0.6],
      [2.2, 0.1, -0.5],
      [-0.5, -2.1, 0.3],
      [0.9, -2.3, -0.4],
    ];

    const lines: number[] = [];
    for (let i = 0; i < rawNodes.length; i++) {
      for (let j = i + 1; j < rawNodes.length; j++) {
        const dx = rawNodes[i][0] - rawNodes[j][0];
        const dy = rawNodes[i][1] - rawNodes[j][1];
        const dz = rawNodes[i][2] - rawNodes[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 2.0) {
          lines.push(i, j);
        }
      }
    }

    return {
      nodePositions: rawNodes.map((p) => new THREE.Vector3(p[0], p[1], p[2])),
      lineIndices: lines,
    };
  }, []);

  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let k = 0; k < lineIndices.length; k += 2) {
      points.push(nodePositions[lineIndices[k]]);
      points.push(nodePositions[lineIndices[k + 1]]);
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [nodePositions, lineIndices]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const sp = scrollProgress.current;

    // About section envelope: smoothly blossoms in around 0.05, reaches full presence around 0.12 - 0.22
    let envelope = 0;
    if (sp < 0.04) {
      envelope = 0;
    } else if (sp < 0.10) {
      envelope = (sp - 0.04) / 0.06;
    } else if (sp < 0.24) {
      envelope = 1.0;
    } else if (sp < 0.34) {
      envelope = Math.max(0, 1.0 - (sp - 0.24) / 0.10);
    } else {
      envelope = 0;
    }

    // Positioned in right/center depth to complement left-side editorial text
    groupRef.current.position.x = 1.8 + Math.sin(t * 0.15) * 0.15;
    groupRef.current.position.y = -0.3 + Math.cos(t * 0.12) * 0.15;
    groupRef.current.position.z = -0.5;

    // Rotation
    groupRef.current.rotation.y = t * 0.08 + sp * Math.PI * 0.8;
    groupRef.current.rotation.x = Math.sin(t * 0.06) * 0.12;

    const currentScale = envelope * 1.25;
    groupRef.current.scale.setScalar(currentScale);
    groupRef.current.visible = envelope > 0.01;
  });

  return (
    <group ref={groupRef}>
      {/* Synapse line connections */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#FF9812"
          transparent
          opacity={0.4}
          linewidth={1}
        />
      </lineSegments>

      {/* Nodes: small glowing icosahedrons */}
      {nodePositions.map((pos, idx) => (
        <group key={idx} position={pos}>
          <mesh>
            <icosahedronGeometry args={[0.07 + (idx % 3) * 0.02, 1]} />
            <meshStandardMaterial
              color={idx % 3 === 0 ? '#FF9812' : idx % 3 === 1 ? '#FFD700' : '#FFB347'}
              emissive={idx % 2 === 0 ? '#FF6600' : '#E8820A'}
              emissiveIntensity={1.3}
              metalness={0.85}
              roughness={0.1}
            />
          </mesh>
          {idx % 4 === 0 && (
            <mesh>
              <icosahedronGeometry args={[0.15, 1]} />
              <meshBasicMaterial
                color="#FFB347"
                wireframe
                transparent
                opacity={0.45}
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Camera controller — choreographs camera back and around for About storytelling
// ────────────────────────────────────────────────────────────────────────────
function CameraController({
  mouseRef,
  scrollProgress,
}: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  scrollProgress: React.MutableRefObject<number>;
}) {
  useFrame((state) => {
    const sp = scrollProgress.current;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    let targetX = mx * 0.9;
    let targetY = my * -0.9;
    let targetZ = 5.0;

    if (sp < 0.06) {
      // Hero view: direct front angle
      targetZ = 5.0 + sp * 8.0;
      targetY = -sp * 2.0 + my * -1.0;
    } else if (sp < 0.24) {
      // About Section: camera pulls back and pivots, opening space for name & story
      const progressInAbout = (sp - 0.06) / 0.18;
      targetX = mx * 0.8 + 0.35 * Math.sin(progressInAbout * Math.PI);
      targetY = -1.2 - progressInAbout * 0.8 + my * -0.7;
      targetZ = 6.0 + progressInAbout * 1.5;
    } else {
      // Subsequent sections
      targetZ = 7.5 + (sp - 0.24) * 3.5;
      targetY = -2.0 - (sp - 0.24) * 1.8 + my * -0.8;
      targetX = mx * 0.8;
    }

    state.camera.position.x += (targetX - state.camera.position.x) * 0.045;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.045;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.045;

    const lookY = sp < 0.06 ? 0 : -0.7 * (sp / 0.3);
    state.camera.lookAt(0, lookY, 0);
  });
  return null;
}

// ────────────────────────────────────────────────────────────────────────────
// Main exported WorldScene canvas wrapper
// ────────────────────────────────────────────────────────────────────────────
interface WorldSceneProps {
  scrollProgress: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

export const WorldScene: React.FC<WorldSceneProps> = ({ scrollProgress, mouseRef }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      shadows={{ type: THREE.PCFShadowMap }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.3} color="#FF9812" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.5}
        color="#FFB347"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-4, 3, -3]} intensity={1.5} color="#FF6600" />
      <pointLight position={[4, -3, 3]} intensity={1.0} color="#FFD700" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={0.8}
        intensity={2.0}
        color="#FF9812"
        castShadow
      />

      {/* Environment for reflections */}
      <Environment preset="sunset" />

      {/* 3D elements */}
      <OrangeBlob scrollProgress={scrollProgress} />
      <TwistedRibbons scrollProgress={scrollProgress} />
      <OrbitalRings scrollProgress={scrollProgress} />
      <ConnectedKnowledgeLattice scrollProgress={scrollProgress} />
      <ParticleField scrollProgress={scrollProgress} />

      {/* Camera controller */}
      <CameraController mouseRef={mouseRef} scrollProgress={scrollProgress} />
    </Canvas>
  );
};
