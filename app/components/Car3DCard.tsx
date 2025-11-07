"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useMemo } from "react";

// Configureer Draco decoder voor gecomprimeerde modellen
useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

function CarModel({ isHovered }: { isHovered: boolean }) {
  const { scene } = useGLTF("/source/2021 Volkswagen Golf GTI.glb");
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <primitive
      object={clonedScene}
      scale={0.95}
      position={[0.4, -0.3, 0]}
      rotation={[0, -Math.PI / 2 + Math.PI / 6 + (2 * Math.PI / 3) + Math.PI / 3 + Math.PI / 9 + Math.PI / 9 + Math.PI / 6 + Math.PI / 12 + Math.PI / 18 + Math.PI + Math.PI / 18 - Math.PI / 9 - Math.PI / 10, 0]}
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
        frameloop="always"
        dpr={[1.5, 2]}
        performance={{ min: 0.5, max: 1 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
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
          enabled={true}
          autoRotate={!isCardHovered}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

// Preload the model for immediate availability
useGLTF.preload("/source/2021 Volkswagen Golf GTI.glb");
