import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

function normalizeModelSize(model, targetSize = 1) {
  const box = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  box.getSize(size);

  const center = new THREE.Vector3();
  box.getCenter(center);
  model.position.sub(center);

  const maxAxis = Math.max(size.x, size.y, size.z);
  const scaleFactor = (targetSize * 1.5) / maxAxis;
  model.scale.setScalar(scaleFactor);
}

function Model({ url, type, fallbackColor, isHovered, shouldResetRotation }) {
  const loader = type === "fbx" ? FBXLoader : GLTFLoader;
  const object = useLoader(loader, url);
  const ref = useRef();
  const { camera } = useThree();
  const model = object.scene || object;

  useEffect(() => {
    if (ref.current) {
      normalizeModelSize(ref.current);

      const box = new THREE.Box3().setFromObject(ref.current);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      camera.position.set(0, 0, maxDim * 2);
      camera.lookAt(0, 0, 0);
    }

    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (type === "fbx") {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(fallbackColor),
            metalness: 0.1,
            roughness: 0.4,
          });
        }
      }
    });
  }, [model, camera, fallbackColor, type]);

  useFrame(() => {
    if (ref.current) {
      if (isHovered) {
        ref.current.rotation.y += 0.1;
      } else if (shouldResetRotation) {
        // Smooth reset
        ref.current.rotation.y += (0 - ref.current.rotation.y) * 0.1;
      }
    }
  });

  return <primitive ref={ref} object={model} />;
}

export default function SkillCard({ icon, name, color = "#cccccc", type }) {
  const [isHovered, setIsHovered] = useState(false);
  const [shouldResetRotation, setShouldResetRotation] = useState(false);

  let content;
  switch (type) {
    case "svg":
      content = (
        <img
          src={icon}
          alt={name}
          className="w-full h-full object-contain p-2"
          draggable={false}
        />
      );
      break;

    case "glb":
    case "fbx":
      content = (
        <Canvas
          className="w-full h-full"
          shadows
          gl={{ alpha: true }}
          camera={{ fov: 35 }}
          onPointerOver={() => {
            setIsHovered(true);
            setShouldResetRotation(false);
          }}
          onPointerOut={() => {
            setIsHovered(false);
            setShouldResetRotation(true);
          }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight
            position={[3, 5, 5]}
            intensity={4}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <Suspense fallback={null}>
            <Model
              url={icon}
              type={type}
              fallbackColor={color}
              isHovered={isHovered}
              shouldResetRotation={shouldResetRotation}
            />
          </Suspense>
        </Canvas>
      );
      break;

    case "video":
      content = (
        <video
          src={icon}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain"
        />
      );
      break;

    default:
      content = (
        <div className="w-full h-full flex items-center justify-center text-sm">
          Unsupported type
        </div>
      );
  }

  return (
    <div
      className=" rounded-xl p-2 shadow-md  bg-transparent flex flex-col items-center justify-center hover:shadow-lg transition border  hover-fade-up"
      style={{ borderColor: color }}
    >
      <div className="w-35 h-35 mb-2 overflow-hidden">{content}</div>
      <p className="text-center text-lg font-medium" style={{ color: color }}>
        {name}
      </p>
    </div>
  );
}