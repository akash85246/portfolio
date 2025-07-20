import { useFrame } from "@react-three/fiber";
import { useRef } from "react";


export function useLegCrawlAnimation(objectRef, isWalkingRef) {
  const clockRef = useRef(0);

  useFrame((_, delta) => {
    if (
      !isWalkingRef.current ||
      !objectRef.current ||
      !objectRef.current.position
    ) return;

    clockRef.current += delta * 2;
    const t = clockRef.current;

    // Simulated crawl movement
    const forwardSpeed = delta * 0.5;
    const bobY = Math.sin(t * 3.5) * 0.05;
    const tiltX = Math.sin(t * 2) * 0.03;
    const swayY = Math.sin(t * 1.8) * 0.02;

    // Forward movement
    objectRef.current.position.z -= forwardSpeed;

    // Subtle bobbing and tilting
    objectRef.current.position.y = 0.05 + bobY;
    objectRef.current.rotation.x = tiltX;
    objectRef.current.rotation.y = swayY;
  });
}