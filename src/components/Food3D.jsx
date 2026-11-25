import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

/* Grain cluster: instanced ellipsoid rice grains inside the handi */
function RiceGrains() {
  const COUNT = 320;
  const ref = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const grains = useMemo(() => {
    const arr = [];
    for (let i = 0; i < COUNT; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 0.85 * Math.sqrt(Math.random());
      arr.push({
        pos: [Math.cos(a) * r, 0.34 + Math.random() * 0.12, Math.sin(a) * r],
        rot: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        scale: 0.85 + Math.random() * 0.5,
      });
    }
    return arr;
  }, []);

  useFrame(() => {
    grains.forEach((g, i) => {
      dummy.position.set(...g.pos);
      dummy.rotation.set(...g.rot);
      dummy.scale.set(0.09 * g.scale, 0.16 * g.scale, 0.09 * g.scale);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, COUNT]} castShadow>
      <sphereGeometry args={[1, 10, 8]} />
      <meshStandardMaterial color="#f5e6c4" roughness={0.55} />
    </instancedMesh>
  );
}

/* Saffron strands + caramelized onions on top */
function Garnish() {
  const saffron = useMemo(
    () =>
      Array.from({ length: 14 }, () => {
        const a = Math.random() * Math.PI * 2;
        const r = 0.75 * Math.sqrt(Math.random());
        return {
          pos: [Math.cos(a) * r, 0.4, Math.sin(a) * r] ,
          rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        };
      }),
    []
  );
  const onions = useMemo(
    () =>
      Array.from({ length: 22 }, () => {
        const a = Math.random() * Math.PI * 2;
        const r = 0.78 * Math.sqrt(Math.random());
        return {
          pos: [Math.cos(a) * r, 0.38 + Math.random() * 0.05, Math.sin(a) * r],
          rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        };
      }),
    []
  );

  return (
    <group>
      {saffron.map((s, i) => (
        <mesh key={`sf-${i}`} position={s.pos} rotation={s.rot}>
          <boxGeometry args={[0.02, 0.006, 0.14]} />
          <meshStandardMaterial color="#e8620c" emissive="#c4400a" emissiveIntensity={0.35} roughness={0.4} />
        </mesh>
      ))}
      {onions.map((o, i) => (
        <mesh key={`on-${i}`} position={o.pos} rotation={o.rot}>
          <torusGeometry args={[0.035, 0.012, 6, 12]} />
          <meshStandardMaterial color="#6b3410" roughness={0.7} />
        </mesh>
      ))}
      {/* Mint leaves */}
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2 + 0.6;
        return (
          <mesh key={`mn-${i}`} position={[Math.cos(a) * 0.4, 0.42, Math.sin(a) * 0.4]} rotation={[0.3, a, 0.2]}>
            <sphereGeometry args={[0.05, 8, 6]} />
            <meshStandardMaterial color="#2e7d32" roughness={0.5} flatShading />
          </mesh>
        );
      })}
      {/* Boiled egg halves */}
      {[-0.45, 0.45].map((x, i) => (
        <group key={`eg-${i}`} position={[x, 0.42, i === 0 ? -0.3 : 0.25]}>
          <mesh>
            <sphereGeometry args={[0.11, 16, 12]} />
            <meshStandardMaterial color="#f3ead2" roughness={0.45} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.108, 16, 12, 0, Math.PI]} />
            <meshStandardMaterial color="#f0c94a" roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* Brass handi (pot) — lathe geometry for authentic profile */
function Handi() {
  const profile = useMemo(() => {
    const pts = [];
    // from bottom center outward and up: narrow base, bulging belly, tight rim
    const shape = [
      [0.0, 0.0], [0.3, 0.0], [0.42, 0.06], [0.52, 0.18],
      [0.56, 0.34], [0.54, 0.5], [0.48, 0.62], [0.44, 0.7],
    ];
    shape.forEach(([x, y]) => pts.push(new THREE.Vector2(x, y)));
    return pts;
  }, []);

  return (
    <group>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[profile, 48]} />
        <meshStandardMaterial color="#b8860b" metalness={0.95} roughness={0.28} side={THREE.DoubleSide} />
      </mesh>
      {/* Rim torus */}
      <mesh position={[0, 0.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.445, 0.028, 12, 48]} />
        <meshStandardMaterial color="#d4a017" metalness={0.95} roughness={0.22} />
      </mesh>
      {/* Decorative engraved bands */}
      {[0.22, 0.4, 0.58].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.545 - i * 0.045, 0.008, 8, 48]} />
          <meshStandardMaterial color="#e9b23f" metalness={1} roughness={0.15} />
        </mesh>
      ))}
      {/* Brass lid, tilted open beside */}
      <group position={[0.85, 0.28, 0.1]} rotation={[0, 0, -0.5]}>
        <mesh castShadow>
          <sphereGeometry args={[0.36, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#c9941a" metalness={0.95} roughness={0.25} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.05, 12, 10]} />
          <meshStandardMaterial color="#efc96e" metalness={1} roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
}

/* Rising steam — layered transparent sprites drifting upward */
function Steam() {
  const puffs = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        seed: Math.random() * Math.PI * 2,
        x: (Math.random() - 0.5) * 0.5,
        z: (Math.random() - 0.5) * 0.5,
        speed: 0.25 + Math.random() * 0.2,
        scale: 0.5 + Math.random() * 0.4,
        delay: i * 0.9,
      })),
    []
  );
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.children.forEach((child, i) => {
      const p = puffs[i];
      const cycle = ((t * p.speed + p.delay) % 5) / 5;
      child.position.set(p.x + Math.sin(t * 0.8 + p.seed) * 0.15 * cycle, 0.5 + cycle * 2.6, p.z + Math.cos(t * 0.6 + p.seed) * 0.1 * cycle);
      const s = p.scale * (0.5 + cycle * 1.6);
      child.scale.set(s, s, s);
      child.material.opacity = 0.28 * (1 - cycle) * Math.min(cycle * 5, 1);
    });
  });

  return (
    <group ref={ref}>
      {puffs.map((_, i) => (
        <sprite key={i}>
          <spriteMaterial
            color="#ffffff"
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.NormalBlending}
          />
        </sprite>
      ))}
    </group>
  );
}

/* Floating saffron particles */
function SaffronParticles() {
  const COUNT = 90;
  const ref = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const parts = useMemo(
    () =>
      Array.from({ length: COUNT }, () => ({
        x: (Math.random() - 0.5) * 6,
        y: Math.random() * 4.5,
        z: (Math.random() - 0.5) * 3 - 0.5,
        speed: 0.15 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
      })),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    parts.forEach((p, i) => {
      dummy.position.set(p.x + Math.sin(t * 0.5 + p.phase) * 0.25, ((p.y + t * p.speed) % 4.8), p.z);
      dummy.rotation.set(t * 0.8 + p.phase, t * 0.5, 0);
      dummy.scale.set(0.02, 0.02, 0.05);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, COUNT]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#f2933f" emissive="#e8722c" emissiveIntensity={0.8} />
    </instancedMesh>
  );
}

function Rig() {
  const { camera } = useThree();
  const group = useRef();
  const target = useMemo(() => new THREE.Vector2(0, 0), []);

  useFrame((state, delta) => {
    target.x += (state.pointer.x * 0.35 - target.x) * delta * 2;
    target.y += (state.pointer.y * 0.18 - target.y) * delta * 2;
    camera.position.x = 0 + target.x * 1.6;
    camera.position.y = 1.55 + target.y * 1.1;
    camera.lookAt(0, 0.45, 0);
    if (group.current) {
      group.current.rotation.y += delta * 0.28;
    }
  });

  return (
    <group ref={group} position={[0, -0.35, 0]}>
      <Handi />
      <RiceGrains />
      <Garnish />
      <Steam />
    </group>
  );
}

export default function Food3D({ light = false }) {
  return (
    <Canvas
      camera={{ position: [0, 1.55, 4.2], fov: 42 }}
      dpr={light ? [1, 1.2] : [1, 2]}
      gl={{ antialias: !light, alpha: true }}
      shadows={!light}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.35} />
      <spotLight position={[4, 6, 3]} angle={0.5} intensity={light ? 80 : 120} color="#ffd9a0" castShadow={!light} penumbra={0.8} />
      <pointLight position={[-3, 2, 2]} intensity={18} color="#e8722c" />
      <pointLight position={[0, 1, 3]} intensity={10} color="#efc96e" />
      <Rig light={light} />
      <SaffronParticles />
      <Sparkles count={light ? 30 : 70} scale={[5, 3, 3]} position={[0, 1.5, -0.5]} size={2.2} speed={0.3} color="#efc96e" />
      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.5}>
        <mesh position={[-1.9, 1.6, -1]} rotation={[0.5, 0.3, 0.2]}>
          <octahedronGeometry args={[0.14]} />
          <meshStandardMaterial color="#efc96e" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[2, 1.2, -1.4]} rotation={[0.9, 0.6, 0.4]}>
          <octahedronGeometry args={[0.1]} />
          <meshStandardMaterial color="#e8722c" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[1.6, 2.1, -0.8]} rotation={[0.3, 0.9, 0.5]}>
          <octahedronGeometry args={[0.08]} />
          <meshStandardMaterial color="#f5e0a8" metalness={0.9} roughness={0.2} />
        </mesh>
      </Float>
      <ContactShadows position={[0, -0.37, 0]} opacity={0.7} scale={6} blur={2.6} far={2} color="#000000" />
      <Environment preset="sunset" />
    </Canvas>
  );
}
