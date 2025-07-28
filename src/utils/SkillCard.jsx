import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { motion, useInView } from "framer-motion";

// Center and scale model to fit into view
function normalizeModel(model, targetSize = 1.5) {
  const box = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);
  model.position.sub(center); // Center the model
  const maxAxis = Math.max(size.x, size.y, size.z);
  const scale = targetSize / maxAxis;
  model.scale.setScalar(scale);
}

function Model({ url, type, fallbackColor, isHovered, shouldResetRotation }) {
  const loader = type === "fbx" ? FBXLoader : GLTFLoader;
  const object = useLoader(loader, url);
  const model = object.scene || object;
  const ref = useRef();
  const { camera } = useThree();

  useEffect(() => {
    const obj = ref.current;
    if (!obj) return;

    normalizeModel(obj);

    const box = new THREE.Box3().setFromObject(obj);
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    camera.position.set(0, 0, sphere.radius * 3);
    camera.lookAt(0, 0, 0);

    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (type === "fbx") {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(fallbackColor),
            metalness: 0.2,
            roughness: 0.5,
          });
        }
      }
    });
  }, [model, camera, fallbackColor, type]);
  useFrame(() => {
    if (ref.current) {
      if (isHovered) {
        ref.current.rotation.y += 0.05;
      } else if (shouldResetRotation) {
        ref.current.rotation.y += (0 - ref.current.rotation.y) * 0.1;
      }
    }
  });

  return <primitive ref={ref} object={model} />;
}

export default function SkillCard({ icon, name, color = "#cccccc", type }) {
  const [isHovered, setIsHovered] = useState(false);
  const [shouldResetRotation, setShouldResetRotation] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

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
          <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.7, ease: "easeOut" },
            }
          : {}
      }
      className="backdrop-blur-sm rounded-xl p-4 shadow-md flex flex-col items-center justify-center hover:shadow-lg transition border hover-fade-up w-28 sm:w-36 md:w-44 lg:w-52 xl:w-60"
      style={{ borderColor: color }}
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 mb-3 overflow-hidden">
        {content}
      </div>
      <p
        className="text-center text-xs sm:text-sm md:text-base lg:text-lg font-medium"
        style={{ color: color }}
      >
        {name}
      </p>
    </motion.div>
  );
}
