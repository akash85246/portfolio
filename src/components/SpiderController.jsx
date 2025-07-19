import React, {  useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CameraDebugger from '../utils/CameraDebugger';
import Spider from '../utils/Spider';


export default function App() {
  const controlsRef = useRef();

  return (
    <Canvas camera={{ position: [0, 136.8, -273.61], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <Spider />
      <OrbitControls ref={controlsRef} target={[0, 0, 0]} />
      <CameraDebugger controlsRef={controlsRef} />
    </Canvas>
  );
}
