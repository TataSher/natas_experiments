import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useRef } from 'react';

function Nebula() {
  const material = useRef<THREE.MeshStandardMaterial>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    material.current.color.setHSL(Math.sin(t * 0.05) * 0.3 + 0.6, 0.5, 0.5);
  });

  return (
    <mesh>
      <sphereGeometry args={[5, 64, 64]} />
      <meshStandardMaterial
        ref={material}
        color="#4b0082"
        emissive="#6a0dad"
        emissiveIntensity={1.5}
        transparent
        opacity={0.8}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

export const Universe2 = () => {
  return (
    <div
      style={{
        position: 'fixed', // stick to viewport
        inset: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      <Canvas
        style={{ width: '100%', height: '100%', display: 'block' }}
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        <Nebula />
        <EffectComposer>
          <Bloom intensity={1.2} luminanceThreshold={0} />
        </EffectComposer>

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}