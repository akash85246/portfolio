// CameraDebugger.jsx
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

function CameraDebugger({ controlsRef }) {
  const { camera } = useThree();
  const last = useRef({});

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls || !controls.target) return;

    const pos = camera.position;
    const tgt = controls.target;

    const position = [pos.x.toFixed(2), pos.y.toFixed(2), pos.z.toFixed(2)];
    const target = [tgt.x.toFixed(2), tgt.y.toFixed(2), tgt.z.toFixed(2)];

    const changed =
      last.current.position?.join() !== position.join() ||
      last.current.target?.join() !== target.join();

    if (changed) {
      console.log('Camera position:', position, 'Target:', target);
      last.current = { position, target };
    }
  });

  return null;
}

export default CameraDebugger;