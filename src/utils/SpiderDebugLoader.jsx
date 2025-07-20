import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export default function SpiderDebugLoader() {
  const { scene, nodes } = useGLTF('/models/testPosition7.glb');

  useEffect(() => {
    scene.traverse((child) => {
      if (child.name) {
        console.log('GLB Object:', child.name);
      }
    });
  }, [scene]);

  return null;
}
