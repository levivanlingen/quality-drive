"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";

// Configureer Draco decoder voor gecomprimeerde modellen
useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

function CarModel({ isHovered }: { isHovered: boolean }) {
  const { scene } = useGLTF("/source/2021 Volkswagen Golf GTI.glb");
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const modelRef = useRef<any>(null);

  useFrame(({ clock }) => {
    // Alleen animeren tijdens hover voor betere performance
    if (modelRef.current && isHovered) {
      const amplitude = 0.035;
      const speed = 7;
      modelRef.current.position.y = -0.15 + Math.sin(clock.getElapsedTime() * speed) * amplitude;
    } else if (modelRef.current) {
      // Reset naar base positie als niet gehovered
      modelRef.current.position.y = -0.15;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={clonedScene}
      scale={0.95}
      position={[0.15, -0.15, 0]}
      rotation={[0, -Math.PI / 2 + Math.PI / 6 + (2 * Math.PI / 3) + Math.PI / 3 + Math.PI / 9 + Math.PI / 9 + Math.PI / 6 + Math.PI / 12 + Math.PI / 18 + Math.PI + Math.PI / 18 - Math.PI / 9, 0]}
    />
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#0065A6" />
    </mesh>
  );
}

export default function Car3DCard({ isCardHovered = false }: { isCardHovered?: boolean }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Canvas
        frameloop={isCardHovered ? 'always' : 'demand'}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <PerspectiveCamera makeDefault position={[3.5, 1.2, 3.5]} fov={45} />

        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} />

        <Suspense fallback={<LoadingFallback />}>
          <CarModel isHovered={isCardHovered} />
          <Environment preset="city" background={false} />
        </Suspense>

        {/* Controls for rotating the model */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minDistance={3}
          maxDistance={8}
          enabled={isCardHovered}
        />
      </Canvas>
    </div>
  );
}

// Preload het 3D model voor snellere laadtijden
useGLTF.preload("/source/2021 Volkswagen Golf GTI.glb");
