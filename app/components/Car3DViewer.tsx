"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";

function CarModel() {
  const { scene } = useGLTF("/source/2021 Volkswagen Golf GTI.glb");

  return (
    <primitive
      object={scene}
      scale={1.5}
      position={[0, -0.5, 0]}
      rotation={[0, Math.PI / 4, 0]}
    />
  );
}

function Loader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      color: '#fff',
      fontSize: '1.2rem'
    }}>
      Laden van 3D model...
    </div>
  );
}

export default function Car3DViewer() {
  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 2, 5]} fov={50} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Suspense fallback={null}>
          <CarModel />
          <Environment preset="sunset" />
        </Suspense>

        {/* Controls for rotating the model */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={10}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}
