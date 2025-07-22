import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function useWalkAnimation(groupRef, isWalkingRef) {
  const { camera, gl } = useThree();
  let hasScrolledRef = useRef(false);

  const target = useRef(null);
  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const desiredLookQuat = useRef(new THREE.Quaternion());

  useEffect(() => {
    function onClick(event) {
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      raycaster.setFromCamera(mouse, camera);
      const intersectPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersectPoint);

      if (target.current === null) {
        target.current = new THREE.Vector3();
      }

      target.current.copy(intersectPoint);
      isWalkingRef.current = true;
    }

    gl.domElement.addEventListener("click", onClick);
    return () => gl.domElement.removeEventListener("click", onClick);
  }, [camera, gl]);

  // Entrance animation trigger
  useEffect(() => {
    // console.log("🕷️ Spider entrance animation started");
    if (!groupRef.current) return;

    // console.log("🕷️ Spider groupRef is ready for entrance animation");

    // Start spider offscreen (top-right corner)
    groupRef.current.position.set(10, 0, 205); // Adjust as needed
    target.current = new THREE.Vector3(0, 0, 0);
    isWalkingRef.current = true;
  }, []);

useEffect(() => {
  const homeEl = document.getElementById("home");
  const aboutEl = document.getElementById("about");

  let isSpiderOut = false;

  const observer = new IntersectionObserver(
    (entries) => {
      const homeVisible = entries.find(e => e.target.id === "home")?.isIntersecting ?? false;
      const aboutVisible = entries.find(e => e.target.id === "about")?.isIntersecting ?? false;

      // Scroll Down: Spider exits only if both not visible
      console.log(!homeVisible , !aboutVisible,!isSpiderOut);
      if (((!homeVisible && !aboutVisible) && !isSpiderOut)) {
        console.log("🕷️ Spider is exiting");
        target.current = new THREE.Vector3(-350, 0, 605); // Exit position
        isWalkingRef.current = true;
        isSpiderOut = true;
      }

      // Scroll Up or visible again: Spider comes back if any is visible
      if (homeVisible||((homeVisible || aboutVisible) && isSpiderOut)) {
        console.log("🕷️ Spider is coming back");
        target.current = new THREE.Vector3(0, 0, 0); // Entry position
        isWalkingRef.current = true;
        isSpiderOut = false;
      }
    },
    { threshold: 0.9 }
  );

  if (homeEl) observer.observe(homeEl);
  if (aboutEl) observer.observe(aboutEl);

  return () => {
    if (homeEl) observer.unobserve(homeEl);
    if (aboutEl) observer.unobserve(aboutEl);
  };
}, []);

  useFrame((_, delta) => {
    const spider = groupRef.current;
    if (!spider || !target.current) return;

    const distance = spider.position.distanceTo(target.current);
    // console.log("🕷️ Spider distance to target:", distance);

    if (distance > 12) {
      // Move spider toward target
      spider.position.lerp(target.current, delta * 1);

      // Calculate direction and target rotation
      const direction = target.current.clone().sub(spider.position).normalize();
      const lookAtTarget = new THREE.Vector3()
        .copy(spider.position)
        .add(direction);

      const dummy = new THREE.Object3D();
      dummy.position.copy(spider.position);
      dummy.lookAt(lookAtTarget);
      desiredLookQuat.current.copy(dummy.quaternion);

      // Smoothly slerp toward the desired orientation
      spider.quaternion.slerp(desiredLookQuat.current, delta * 4); // adjust speed here
    } else {
      isWalkingRef.current = false;
    }
  });
}
