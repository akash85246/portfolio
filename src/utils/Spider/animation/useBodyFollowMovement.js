import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function useBodyFollowMovement(groupRef, direction = "right") {
  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const t = clock.getElapsedTime();
    const amplitude = 0.2;
    const body = groupRef.current;

    // Horizontal sway
    const offset = Math.sin(t * 1.5) * amplitude;
    body.position.x = direction === "right" ? offset : -offset;

    // Subtle rotation toward the direction
    const rotAmount = direction === "right" ? 0.2 : -0.2;
    body.rotation.y = rotAmount * Math.sin(t * 1.5);
  });
}