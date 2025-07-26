import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWalkAnimation } from "./animation/useWalkAnimation";
import { useAttackAnimation } from "./animation/useAttackAnimation";
import { useEyeBlink } from "./animation/useEyeBlink";
import { useLegCrawlAnimation } from "./animation/useStaticCrawlAnimation";

export default function Spider() {
  
  const [ready, setReady] = useState(false);
  const group = useRef();
  const legsRef = useRef([]);
  const eyelidsRef = useRef([]);
  const object4Ref = useRef();
  const isWalkingRef = useRef(false);

  const { scene, animations } = useGLTF("/models/spider.glb");
  const { actions, mixer } = useAnimations(animations, group);
  const getScaleByWidth = (width) => {
    if (width < 500) return 0.6;
    if (width < 700) return 0.5;
    if (width < 770) return 0.5;
    if (width < 1024) return 0.8;
    return 0.9; 
  };

  const [scale, setScale] = useState(getScaleByWidth(window.innerWidth));

  useEffect(() => {
  const handleResize = () => {
    setScale(getScaleByWidth(window.innerWidth));
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  useEffect(() => {
    const spiderParts = {
      eyes: [],
      eyelids: [],
      body: null,
      joints: [],
      legs: [[], [], [], [], [], [], [], []],
    };

    let object4 = null;

    scene.traverse((child) => {
      if (child.name === "Object_4") object4 = child;
      if (child.name.includes("Spider_Eye1")) spiderParts.eyes.push(child);
      else if (child.name.includes("Spider_Eye2"))
        spiderParts.eyelids.push(child);
      else if (child.name === "Spider_Body") spiderParts.body = child;
      else if (child.name.startsWith("Spider_Joint"))
        spiderParts.joints.push(child);
      else if (child.name.startsWith("Spider_Leg")) {
        const index = parseInt(child.name.replace("Spider_Leg", "")) - 1;
        child.traverse((legPart) => {
          if (legPart.name.startsWith(`Leg${index + 1}_`)) {
            spiderParts.legs[index].push(legPart);
          }
        });
      }
    });

    if (!object4) {
      console.warn("⚠️ Object_4 not found!");
      return;
    }

    legsRef.current = spiderParts.legs.map((leg) =>
      leg.sort((a, b) => a.name.localeCompare(b.name))
    );
    eyelidsRef.current = spiderParts.eyelids;
    object4Ref.current = object4;

    setReady(true); // ✅ triggers after object4 is loaded

    const box = new THREE.Box3().setFromObject(object4);
    const center = new THREE.Vector3();
    box.getCenter(center);
    object4.position.sub(center);
    object4.scale.set(10, 10, 10);
    object4.rotation.y = Math.PI;


    group.current.add(object4);
    const idleAnim = actions?.["Idle1"];
    if (idleAnim) {

      idleAnim.play();
    } else {
      console.warn("Idle1 animation not found.");
    }
  }, [scene, actions]);

  useFrame((_, delta) => {
    if (mixer) mixer.update(delta);
  });

  useEyeBlink(eyelidsRef);
  
  useAttackAnimation(object4Ref);
  useLegCrawlAnimation(object4Ref, isWalkingRef);
  useWalkAnimation(group, isWalkingRef);

  return (
    <group ref={group} scale={scale}>
      {object4Ref.current && (
        <primitive
          object={object4Ref.current}
          onClick={(e) => {
            e.stopPropagation();
            object4Ref.current?.userData?.handleClick?.();
          }}
        />
      )}
    </group>
  );
}
