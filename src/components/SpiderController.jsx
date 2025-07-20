import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CameraDebugger from "../utils/CameraDebugger";
import Spider from "../utils/Spider/Spider";

function SpiderController() {
  const controlsRef = useRef();

  return (
    <Canvas camera={{ position: [-24.40, 80.10, -205], fov: 60 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={2} />
      <Spider />
      <OrbitControls
        ref={controlsRef}
        target={[0, 0, 0]}
        disables zooming
        enableZoom={false} 
        maxPolarAngle={Math.PI / 2} 
        // minPolarAngle={Math.PI / 2}
      />
      <CameraDebugger controlsRef={controlsRef} />
    </Canvas>
  );
}

export default SpiderController;
