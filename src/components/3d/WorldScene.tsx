import React, { useRef, useMemo, useEffect, useLayoutEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

// ──────────────────────────────────────────────────────────────────────────────
const FilmVignetteShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    resolution: { value: new THREE.Vector2(1, 1) },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform vec2 resolution;
    varying vec2 vUv;
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      vec2 centered = (vUv - 0.5) * vec2(resolution.x / resolution.y, 1.0);
      float vignette = smoothstep(0.34, 0.88, length(centered));
      float grain = hash(gl_FragCoord.xy + vec2(time * 19.0)) - 0.5;
      color.rgb *= 1.0 - vignette * 0.34;
      color.rgb += grain * 0.012;
      gl_FragColor = color;
    }
  `,
};
// Utility: build a smooth Catmull-Rom spline tube
// ──────────────────────────────────────────────────────────────────────────────
function makeTube(pts: THREE.Vector3[], segments = 64, radius = 0.1, radialSegs = 12) {
  const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal', 0.5);
  return new THREE.TubeGeometry(curve, segments, radius, radialSegs, false);
}

// ──────────────────────────────────────────────────────────────────────────────
// 1. GRAND FOREST TRUNKS — Towering botanical silhouettes framing the canvas
// ──────────────────────────────────────────────────────────────────────────────
function ForestSilhouettes({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!);

  const trunks = useMemo(() => {
    const list: { geo: THREE.CylinderGeometry; pos: [number, number, number]; rot: [number, number, number]; scale: [number, number, number]; color: string }[] = [];

    // Far-left towering trunk
    list.push({
      geo: new THREE.CylinderGeometry(0.18, 0.36, 18, 8, 1),
      pos: [-5.8, -2, -4.5],
      rot: [0, 0.2, -0.05],
      scale: [1, 1, 1],
      color: '#1a1610',
    });
    // Near-left mid trunk
    list.push({
      geo: new THREE.CylinderGeometry(0.12, 0.26, 14, 8, 1),
      pos: [-4.2, -3, -2.5],
      rot: [0, -0.1, 0.04],
      scale: [1, 1, 1],
      color: '#221c14',
    });
    // Far-right grand trunk
    list.push({
      geo: new THREE.CylinderGeometry(0.22, 0.44, 20, 8, 1),
      pos: [5.6, -1.5, -5.0],
      rot: [0, 0.3, 0.06],
      scale: [1, 1, 1],
      color: '#18140e',
    });
    // Near-right slender trunk
    list.push({
      geo: new THREE.CylinderGeometry(0.09, 0.20, 12, 7, 1),
      pos: [4.0, -4, -2.2],
      rot: [0, -0.2, -0.03],
      scale: [1, 1, 1],
      color: '#2a2018',
    });
    // Deep background center trunk
    list.push({
      geo: new THREE.CylinderGeometry(0.14, 0.28, 16, 8, 1),
      pos: [0.8, -3.5, -7.0],
      rot: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#141010',
    });
    // Extra accent trunks
    list.push({
      geo: new THREE.CylinderGeometry(0.07, 0.15, 9, 7, 1),
      pos: [-2.8, -5, -3.0],
      rot: [0.04, 0.15, 0.06],
      scale: [1, 1, 1],
      color: '#1e1a12',
    });
    list.push({
      geo: new THREE.CylinderGeometry(0.06, 0.13, 8, 6, 1),
      pos: [2.5, -5.5, -3.5],
      rot: [-0.03, -0.12, -0.04],
      scale: [1, 1, 1],
      color: '#1c1810',
    });

    return list;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const sp = scrollProgress.current;

    // Subtle breathing sway
    groupRef.current.rotation.y = Math.sin(t * 0.06) * 0.012 + sp * 0.15;
    groupRef.current.position.y = -sp * 2.0 + Math.sin(t * 0.15) * 0.015;
  });

  return (
    <group ref={groupRef}>
      {trunks.map((t, i) => (
        <mesh key={i} position={t.pos} rotation={t.rot as any} scale={t.scale}>
          <primitive object={t.geo} />
          <meshStandardMaterial
            color={t.color}
            roughness={0.9}
            metalness={0.04}
            envMapIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// 2. LIVING ROOT NETWORK — Organic Catmull-Rom botanical vine system
// ──────────────────────────────────────────────────────────────────────────────
function LivingRoots({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const rootGroupRef = useRef<THREE.Group>(null!);

  const roots = useMemo(() => {
    const list: {
      geo: THREE.TubeGeometry;
      color: string;
      emissive: string;
      roughness: number;
      metalness: number;
      opacity: number;
      emissiveIntensity: number;
    }[] = [];

    // Central sweeping root trunk
    list.push({
      geo: makeTube([
        new THREE.Vector3(-4.0, 5.2, -1.8),
        new THREE.Vector3(-2.8, 2.8, -0.7),
        new THREE.Vector3(-1.3, 0.5, 0.5),
        new THREE.Vector3(0.5, -1.5, -0.2),
        new THREE.Vector3(1.9, -4.0, -1.3),
        new THREE.Vector3(2.8, -7.5, -2.2),
      ], 80, 0.14, 14),
      color: '#2a2218',
      emissive: '#1a1410',
      roughness: 0.68,
      metalness: 0.12,
      opacity: 0.97,
      emissiveIntensity: 0.25,
    });

    // Moss sleeve on central trunk
    list.push({
      geo: makeTube([
        new THREE.Vector3(-2.7, 2.6, -0.62),
        new THREE.Vector3(-1.25, 0.4, 0.48),
        new THREE.Vector3(0.4, -1.55, -0.18),
        new THREE.Vector3(1.75, -3.85, -1.15),
      ], 52, 0.155, 11),
      color: '#292b25',
      emissive: '#141714',
      roughness: 0.88,
      metalness: 0.04,
      opacity: 0.78,
      emissiveIntensity: 0.35,
    });

    // Right flanking vine
    list.push({
      geo: makeTube([
        new THREE.Vector3(3.4, 4.5, -2.2),
        new THREE.Vector3(2.6, 2.0, -0.9),
        new THREE.Vector3(2.1, -0.3, 0.3),
        new THREE.Vector3(2.4, -2.6, -0.6),
        new THREE.Vector3(1.4, -5.8, -2.0),
      ], 55, 0.082, 10),
      color: '#342a20',
      emissive: '#3d2508',
      roughness: 0.55,
      metalness: 0.22,
      opacity: 0.90,
      emissiveIntensity: 0.30,
    });

    // Left deep background vine
    list.push({
      geo: makeTube([
        new THREE.Vector3(-4.5, 3.5, -3.5),
        new THREE.Vector3(-3.0, 1.0, -2.2),
        new THREE.Vector3(-2.6, -1.4, -1.6),
        new THREE.Vector3(-3.4, -4.8, -2.8),
      ], 44, 0.070, 8),
      color: '#1e2318',
      emissive: '#142018',
      roughness: 0.72,
      metalness: 0.08,
      opacity: 0.82,
      emissiveIntensity: 0.20,
    });

    // Amber bioluminescent tendrils (6 filaments)
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2;
      const r = 1.8 + (i % 3) * 0.55;
      const pts = [
        new THREE.Vector3(Math.cos(angle) * r, 2.8 - i * 1.0, (i % 3) * 0.5 - 1.1),
        new THREE.Vector3(Math.cos(angle + 0.85) * (r * 0.8), 1.2 - i * 1.0, (i % 2) * 0.35),
        new THREE.Vector3(Math.cos(angle + 1.6) * (r * 1.15), -0.6 - i * 1.0, -0.55),
      ];
      list.push({
        geo: makeTube(pts, 30, 0.026, 6),
        color: i % 2 === 0 ? '#FF9812' : '#62645d',
        emissive: i % 2 === 0 ? '#CC6A00' : '#292b25',
        roughness: 0.32,
        metalness: 0.65,
        opacity: 0.60 + Math.sin(i) * 0.12,
        emissiveIntensity: 1.6 + Math.cos(i) * 0.4,
      });
    }

    // Extra crossing root — adds natural chaos
    list.push({
      geo: makeTube([
        new THREE.Vector3(0.5, 1.0, 0.8),
        new THREE.Vector3(-0.8, -0.5, 0.3),
        new THREE.Vector3(-2.0, -2.0, -0.4),
        new THREE.Vector3(-1.2, -4.5, -1.5),
      ], 40, 0.055, 8),
      color: '#302818',
      emissive: '#1e1808',
      roughness: 0.62,
      metalness: 0.15,
      opacity: 0.88,
      emissiveIntensity: 0.18,
    });

    return list;
  }, []);

  useFrame((state) => {
    if (!rootGroupRef.current) return;
    const t = state.clock.getElapsedTime();
    const sp = scrollProgress.current;

    // Organic breathing
    rootGroupRef.current.rotation.y = Math.sin(t * 0.16) * 0.042 + sp * 0.26;
    rootGroupRef.current.rotation.x = Math.cos(t * 0.12) * 0.028 + sp * 0.10;
    rootGroupRef.current.position.y = -sp * 3.8 + Math.sin(t * 0.22) * 0.035;
  });

  return (
    <group ref={rootGroupRef}>
      {roots.map((item, idx) => (
        <mesh key={idx} geometry={item.geo}>
          <meshStandardMaterial
            color={item.color}
            emissive={item.emissive}
            emissiveIntensity={item.emissiveIntensity}
            roughness={item.roughness}
            metalness={item.metalness}
            transparent
            opacity={item.opacity}
          />
        </mesh>
      ))}
    </group>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// 3. VOLUMETRIC SPORE FIELD — Bio-luminescent atmospheric pollen ecosystem
// ──────────────────────────────────────────────────────────────────────────────
function SporePollenField({
  scrollProgress,
  mouseRef,
}: {
  scrollProgress: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 1100;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 32;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 1.5;

      // Warm amber and soft-silver pollen keep the field inside the midnight palette.
      const rand = Math.random();
      if (rand > 0.45) {
        // Amber / gold
        col[i * 3]     = 1.0;
        col[i * 3 + 1] = 0.60 + Math.random() * 0.28;
        col[i * 3 + 2] = 0.08 + Math.random() * 0.12;
      } else if (rand > 0.15) {
        // Soft silver
        col[i * 3]     = 0.62 + Math.random() * 0.16;
        col[i * 3 + 1] = 0.66 + Math.random() * 0.16;
        col[i * 3 + 2] = 0.68 + Math.random() * 0.16;
      } else {
        // Warm white-cream
        col[i * 3]     = 0.9 + Math.random() * 0.1;
        col[i * 3 + 1] = 0.85 + Math.random() * 0.12;
        col[i * 3 + 2] = 0.6 + Math.random() * 0.2;
      }
    }

    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const sp = scrollProgress.current;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    pointsRef.current.rotation.y = t * 0.012 + mx * 0.14;
    pointsRef.current.rotation.x = Math.sin(t * 0.009) * 0.07 + my * 0.10;
    pointsRef.current.position.y = -sp * 5.0;
    pointsRef.current.position.x = mx * 0.45;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.046}
        vertexColors
        transparent
        opacity={0.82}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// 4. GROUND PLANE — Organic mossy forest floor with emissive glow pools
// ──────────────────────────────────────────────────────────────────────────────
function ForestFloor({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (!ref.current) return;
    const sp = scrollProgress.current;
    ref.current.position.y = -8.5 - sp * 1.5;
  });

  return (
    <group ref={ref}>
      {/* Dark mossy ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[40, 40, 1, 1]} />
        <meshStandardMaterial
          color="#0e1208"
          roughness={0.98}
          metalness={0}
        />
      </mesh>

      {/* Orange glow pool — amber campfire energy */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.5, 0.01, 1.5]}>
        <circleGeometry args={[2.2, 32]} />
        <meshBasicMaterial
          color="#FF6000"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Green bioluminescent glow pool */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.5, 0.01, 0.5]}>
        <circleGeometry args={[1.6, 32]} />
        <meshBasicMaterial
          color="#292b25"
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// 5. BIOLUMINESCENT SPROUT NODES — Botanical intelligence anchor points
// ──────────────────────────────────────────────────────────────────────────────
function SproutNodes({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!);

  const nodes = useMemo(() => [
    { pos: [-1.2, 0.5, 0.5], scale: 0.15, color: '#FF9812', em: '#FFB347', emI: 1.8 },
    { pos: [0.5, -1.5, -0.2], scale: 0.12, color: '#666a64', em: '#aeb7ba', emI: 1.1 },
    { pos: [2.0, -0.3, 0.3], scale: 0.14, color: '#FF9812', em: '#FFD700', emI: 2.0 },
    { pos: [-2.7, 2.6, -0.6], scale: 0.11, color: '#666a64', em: '#aeb7ba', emI: 1.1 },
    { pos: [1.9, -4.0, -1.3], scale: 0.13, color: '#FF9812', em: '#FF5500', emI: 1.7 },
    { pos: [-2.5, -1.5, -1.4], scale: 0.10, color: '#666a64', em: '#aeb7ba', emI: 1.0 },
    { pos: [3.0, 1.5, -1.0], scale: 0.09, color: '#FFB347', em: '#FFD700', emI: 1.3 },
    { pos: [-0.5, -3.2, 0.2], scale: 0.11, color: '#FF9812', em: '#FFB347', emI: 1.5 },
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const sp = scrollProgress.current;

    groupRef.current.position.y = -sp * 3.8;

    nodes.forEach((_, i) => {
      const child = groupRef.current.children[i];
      if (child) {
        const pulse = 1.0 + Math.sin(t * 1.6 + i * 1.35) * 0.22;
        child.scale.setScalar(pulse);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <group key={i} position={node.pos as [number, number, number]}>
          {/* Core sphere */}
          <mesh>
            <sphereGeometry args={[node.scale, 16, 16]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.em}
              emissiveIntensity={node.emI}
              roughness={0.18}
              metalness={0.42}
            />
          </mesh>
          {/* Bio-halo ring */}
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[node.scale * 2.0, 0.008, 8, 32]} />
            <meshBasicMaterial
              color={node.em}
              transparent
              opacity={0.32}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          {/* Outer soft halo */}
          <mesh>
            <sphereGeometry args={[node.scale * 3.5, 8, 8]} />
            <meshBasicMaterial
              color={node.color}
              transparent
              opacity={0.04}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// 6. GOD RAYS — Volumetric light shafts (simulated via large translucent cones)
// ──────────────────────────────────────────────────────────────────────────────
function GodRays() {
  const ref = useRef<THREE.Group>(null!);

  const rays = useMemo(() => [
    { pos: [2.0, 8, -4] as [number,number,number], rot: [0.3, 0, 0.25] as [number,number,number], color: '#FFB347', opacity: 0.025, height: 18 },
    { pos: [-1.5, 7.5, -3] as [number,number,number], rot: [0.2, 0, -0.2] as [number,number,number], color: '#FF9812', opacity: 0.018, height: 15 },
    { pos: [0.5, 9, -6] as [number,number,number], rot: [0.1, 0, 0.05] as [number,number,number], color: '#62645d', opacity: 0.012, height: 20 },
  ], []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.children.forEach((child, i) => {
      (child as THREE.Mesh).material && ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity
        ? null : null;
      child.rotation.z = Math.sin(t * 0.04 + i * 1.2) * 0.015;
    });
  });

  return (
    <group ref={ref}>
      {rays.map((ray, i) => (
        <mesh key={i} position={ray.pos} rotation={ray.rot}>
          <coneGeometry args={[1.8, ray.height, 6, 1, true]} />
          <meshBasicMaterial
            color={ray.color}
            transparent
            opacity={ray.opacity}
            side={THREE.BackSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// 7. SYLVA CAMERA CONTROLLER — Cinematic 5-phase scroll journey
// ──────────────────────────────────────────────────────────────────────────────
function SylvaCameraController({
  cameraRef,
}: {
  cameraRef: React.MutableRefObject<THREE.Camera | null>;
}) {
  const camera = useThree((state) => state.camera);
  const scene = useThree((state) => state.scene);
  useEffect(() => {
    cameraRef.current = camera;
    return () => {
      if (cameraRef.current === camera) cameraRef.current = null;
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        mesh.geometry?.dispose();
        const materials = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
        materials.forEach((material) => {
          const visited = new WeakSet<object>();
          const disposeTextures = (value: unknown) => {
            if (!value || typeof value !== 'object' || visited.has(value)) return;
            visited.add(value);
            if (value instanceof THREE.Texture) {
              value.dispose();
              return;
            }
            Object.values(value).forEach(disposeTextures);
          };
          disposeTextures(material);
          material.dispose();
        });
      });
    };
  }, [camera, cameraRef, scene]);

  return null;
}

// ──────────────────────────────────────────────────────────────────────────────
function CinematicPostProcessing() {
  const { gl, scene, camera, size } = useThree();
  const [enabled, setEnabled] = useState(() => window.innerWidth >= 768 && window.devicePixelRatio <= 2);
  const composerRef = useRef<EffectComposer | null>(null);
  const filmPassRef = useRef<ShaderPass | null>(null);
  const reduceMotionRef = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    let resizeTimer: number | undefined;
    const updateCapability = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const next = window.innerWidth >= 768 && window.devicePixelRatio <= 2;
        setEnabled((current) => current === next ? current : next);
      }, 180);
    };
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => { reduceMotionRef.current = motionPreference.matches; };
    window.addEventListener('resize', updateCapability, { passive: true });
    window.visualViewport?.addEventListener('resize', updateCapability, { passive: true });
    motionPreference.addEventListener('change', updateMotionPreference);
    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', updateCapability);
      window.visualViewport?.removeEventListener('resize', updateCapability);
      motionPreference.removeEventListener('change', updateMotionPreference);
    };
  }, []);

  useLayoutEffect(() => {
    if (!enabled) return;
    const composer = new EffectComposer(gl);
    composer.setPixelRatio(gl.getPixelRatio());
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(size.width, size.height), 0.38, 0.32, 1.2));
    const filmPass = new ShaderPass(FilmVignetteShader);
    composer.addPass(filmPass);
    composer.addPass(new OutputPass());
    composer.setSize(size.width, size.height);
    filmPass.uniforms.resolution.value.set(size.width * gl.getPixelRatio(), size.height * gl.getPixelRatio());
    composerRef.current = composer;
    filmPassRef.current = filmPass;

    return () => {
      composerRef.current = null;
      filmPassRef.current = null;
      composer.passes.forEach((pass) => pass.dispose());
      composer.dispose();
    };
  }, [enabled, gl, scene, camera]);

  useEffect(() => {
    const composer = composerRef.current;
    if (!composer) return;
    composer.setSize(size.width, size.height);
    filmPassRef.current?.uniforms.resolution.value.set(size.width * gl.getPixelRatio(), size.height * gl.getPixelRatio());
  }, [gl, size.width, size.height, enabled]);

  useFrame((state, delta) => {
    const composer = composerRef.current;
    if (!enabled || !composer) return;
    if (!reduceMotionRef.current && filmPassRef.current) {
      filmPassRef.current.uniforms.time.value += delta;
    }
    composer.render(delta);
  }, enabled ? 1 : 0);

  return null;
}
// 8. MAIN WORLDSCENE EXPORT
// ──────────────────────────────────────────────────────────────────────────────
export interface WorldSceneProps {
  scrollProgress: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  cameraRef: React.MutableRefObject<THREE.Camera | null>;
  cameraFov: number;
}

export const WorldScene: React.FC<WorldSceneProps> = ({ scrollProgress, mouseRef, cameraRef, cameraFov }) => {
  const [contextLost, setContextLost] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextHandlers = useRef<{ lost: (event: Event) => void; restored: () => void } | null>(null);

  useEffect(() => () => {
    const canvas = canvasRef.current;
    const handlers = contextHandlers.current;
    if (canvas && handlers) {
      canvas.removeEventListener('webglcontextlost', handlers.lost);
      canvas.removeEventListener('webglcontextrestored', handlers.restored);
    }
    canvasRef.current = null;
    contextHandlers.current = null;
  }, []);

  return (
    <div className="world-scene-root">
      <div className={`world-scene-fallback${contextLost ? ' is-visible' : ''}`} aria-hidden="true" />
      <Canvas
      camera={{ position: [0, 0, 5.5], fov: cameraFov, near: 0.1, far: 120 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.25,
      }}
      dpr={[1, 1.5]}
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        const canvas = gl.domElement;
        const lost = (event: Event) => {
          event.preventDefault();
          setContextLost(true);
        };
        const restored = () => setContextLost(false);
        canvas.addEventListener('webglcontextlost', lost);
        canvas.addEventListener('webglcontextrestored', restored);
        canvasRef.current = canvas;
        contextHandlers.current = { lost, restored };
      }}
      style={{ background: 'transparent', position: 'relative', zIndex: 1, opacity: contextLost ? 0 : 1, transition: 'opacity 900ms ease' }}
    >
      <CinematicPostProcessing />

      {/* ── Atmospheric Fog (native THREE.Fog via attach) ── */}
      <fog attach="fog" args={['#111111', 12, 55]} />

      {/* ── Sylva Living World Lighting ── */}
      {/* Warm amber canopy key light */}
      <ambientLight intensity={0.24} color="#c9c2b4" />

      {/* Sunbeam directional key */}
      <directionalLight
        position={[7, 12, 5]}
        intensity={2.1}
        color="#FF9812"
        castShadow={false}
      />

      {/* Emerald moss bounce from forest floor */}
      <pointLight position={[-5, -3, 2]} intensity={0.75} color="#77736a" />

      {/* Warm amber horizon floor glow */}
      <pointLight position={[4, -8, 3]} intensity={2.0} color="#FF9812" />

      {/* Cool blue-sky fill from behind */}
      <directionalLight position={[-6, 5, -5]} intensity={0.35} color="#aeb9bd" />

      {/* Secondary warm fill from right */}
      <pointLight position={[6, 2, 1]} intensity={0.85} color="#FFB347" />

      {/* Deep forest shadow fill */}
      <pointLight position={[0, -6, 0]} intensity={0.55} color="#FF9812" />

      {/* ── Scene Objects ── */}
      {/* God ray shafts first (deepest) */}
      <GodRays />

      {/* Forest silhouettes in background */}
      <ForestSilhouettes scrollProgress={scrollProgress} />

      {/* Ground plane */}
      <ForestFloor scrollProgress={scrollProgress} />

      {/* Living root network with gentle Float wrapper */}
      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.20}>
        <LivingRoots scrollProgress={scrollProgress} />
        <SproutNodes scrollProgress={scrollProgress} />
      </Float>

      {/* Atmospheric spore pollen field */}
      <SporePollenField scrollProgress={scrollProgress} mouseRef={mouseRef} />

      {/* Cinematic camera controller */}
      <SylvaCameraController cameraRef={cameraRef} />
      </Canvas>
    </div>
  );
};
