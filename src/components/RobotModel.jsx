import React, { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { BoxHelper } from 'three';

// Load and animate the robot model
function RobotModel(props) {
  const { scene } = useGLTF('/models/spider.glb');
  const groupRef = useRef();

  // Rotation animation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  // Add bounding box for debugging visibility
  useEffect(() => {
    if (scene) {
      const helper = new BoxHelper(scene, 0xff0000);
      scene.add(helper);
      console.log('Scene loaded:', scene); 
    }
  }, [scene]);

  return (
    <primitive
      object={scene}
      ref={groupRef}
      scale={0.5}
      position={[0, -1, 0]}
      {...props}
    />
  );
}

// Canvas component
export default function RobotCanvas() {
  return (
    // <Canvas
    //   camera={{ position: [0, 3, 8], fov: 50 }}
    //   style={{ width: '100vw', height: '100vh', background: '#111' }}
    //   {...props}
    // >
    //   <ambientLight intensity={1} />
    //   <directionalLight position={[5, 5, 5]} intensity={2} />
    //   <Suspense fallback={null}>
    //     <RobotModel />
    //   </Suspense>
    //   <OrbitControls />
    // </Canvas>
    <></>
  );
}

useGLTF.preload('/models/spider.glb');