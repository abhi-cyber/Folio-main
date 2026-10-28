import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// A rotating "knowledge graph": points on a noisy sphere, wired to their nearest
// neighbours, with a signal wave sweeping through. It leans toward the pointer.

const COUNT = 820;

let cached = null;

function buildGraph() {
  if (cached) return cached;
  const positions = new Float32Array(COUNT * 3);
  const seeds = new Float32Array(COUNT);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const radius = 2.1 + (Math.random() - 0.5) * 0.35;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
    seeds[i] = Math.random();
  }

  const lines = [];
  const v = new THREE.Vector3();
  const w = new THREE.Vector3();
  for (let i = 0; i < COUNT; i++) {
    v.fromArray(positions, i * 3);
    const near = [];
    for (let j = i + 1; j < COUNT; j++) {
      w.fromArray(positions, j * 3);
      const d = v.distanceToSquared(w);
      if (d < 0.11) near.push([d, j]);
    }
    near.sort((a, b) => a[0] - b[0]);
    for (let k = 0; k < Math.min(2, near.length); k++) {
      const j = near[k][1];
      lines.push(...positions.slice(i * 3, i * 3 + 3), ...positions.slice(j * 3, j * 3 + 3));
    }
  }
  cached = { positions, seeds, lines: new Float32Array(lines) };
  return cached;
}

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute float aSeed;
  varying float vGlow;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float wave = sin(position.y * 2.4 + position.x * 0.8 - uTime * 1.6);
    float spark = step(0.985, fract(aSeed * 91.7 + uTime * 0.08));
    vGlow = smoothstep(0.55, 1.0, wave) + spark;
    gl_PointSize = uSize * (0.55 + vGlow * 0.9 + aSeed * 0.4) * (6.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uHot;
  uniform float uOpacity;
  varying float vGlow;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    vec3 col = mix(uBase, uHot, clamp(vGlow, 0.0, 1.0));
    gl_FragColor = vec4(col, a * uOpacity * (0.45 + vGlow * 0.55));
  }
`;

function Graph({ light, pointer }) {
  const group = useRef();
  const core = useRef();
  const ring = useRef();
  const { positions, seeds, lines } = useMemo(buildGraph, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 9 },
      uBase: { value: new THREE.Color() },
      uHot: { value: new THREE.Color() },
      uOpacity: { value: 1 },
    }),
    []
  );

  useEffect(() => {
    uniforms.uBase.value.set(light ? '#5b4bd6' : '#8b7bff');
    uniforms.uHot.value.set(light ? '#3f7a00' : '#c6ff3d');
    uniforms.uOpacity.value = light ? 0.95 : 1;
  }, [light, uniforms]);

  useFrame((state, delta) => {
    uniforms.uTime.value += delta;
    const g = group.current;
    g.rotation.y += delta * 0.08;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, pointer.current.y * 0.35, 0.04);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -pointer.current.x * 0.2, 0.04);
    g.position.x = THREE.MathUtils.lerp(g.position.x, pointer.current.x * 0.25, 0.04);
    core.current.rotation.x += delta * 0.25;
    core.current.rotation.y -= delta * 0.18;
    ring.current.rotation.z += delta * 0.12;
  });

  const blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={blending}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={light ? '#5b4bd6' : '#8b7bff'} transparent opacity={light ? 0.18 : 0.14} depthWrite={false} blending={blending} />
      </lineSegments>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial color={light ? '#3f7a00' : '#c6ff3d'} wireframe transparent opacity={light ? 0.5 : 0.35} />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[3.05, 0.004, 8, 200]} />
        <meshBasicMaterial color={light ? '#5b4bd6' : '#c6ff3d'} transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

export default function NeuralScene({ light = false, reduced = false }) {
  const wrap = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const move = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', move, { passive: true });
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    return () => {
      window.removeEventListener('pointermove', move);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrap} className="neural">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 7.2], fov: 45 }}
        frameloop={reduced ? 'demand' : visible ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Remount on theme change: blending modes can't be swapped on a live material. */}
        <Graph key={light ? 'light' : 'dark'} light={light} pointer={pointer} />
      </Canvas>
    </div>
  );
}
