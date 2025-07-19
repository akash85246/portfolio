import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Spider() {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/spider.glb');
  const { actions, mixer } = useAnimations(animations, group);
  const object4Ref = useRef();

  useEffect(() => {
    let object4 = null;

    scene.traverse((child) => {
      if (child.name === 'Object_4') {
        object4 = child;
      }
    });

    if (!object4) {
      console.warn('⚠️ Object_4 not found!');
      return;
    }

    object4Ref.current = object4;

    const box = new THREE.Box3().setFromObject(object4);
    const center = new THREE.Vector3();
    box.getCenter(center);
    object4.position.sub(center);

    object4.scale.set(10, 10, 10);
    object4.rotation.y = Math.PI;

    group.current.add(object4);

    const idleAnim = Object.values(actions)[0];
    if (idleAnim) {
      idleAnim.play();
    }
  }, [scene, actions]);

  useFrame((_, delta) => {
    if (mixer) mixer.update(delta);
  });

  return <group ref={group} />;
}
