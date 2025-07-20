import { useEffect, useRef } from "react";

export function useAttackAnimation(object4Ref) {
  const tapCountRef = useRef(0);
  const lastTapTimeRef = useRef(0);
  const isAttackingRef = useRef(false);

  useEffect(() => {
    const object = object4Ref.current;
    if (!object) {
      console.warn("⚠️ Object_4 is not yet available in useAttackAnimation");
      return;
    }

    // console.log("Object_4 found in useAttackAnimation");

    const handleGlobalClick = () => {
      const now = Date.now();
      console.log("🕷️ Global click detected");

      if (now - lastTapTimeRef.current > 1000) {
        tapCountRef.current = 0;
      }

      tapCountRef.current += 1;
      lastTapTimeRef.current = now;

      if (tapCountRef.current === 4 && !isAttackingRef.current) {
        tapCountRef.current = 0;
        isAttackingRef.current = true;

        let startTime = null;
        const attackDuration = 1000;

        const attack = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / attackDuration, 1);

          const angle =
            progress < 0.5
              ? progress * 2 * Math.PI * 0.2
              : (1 - progress) * 2 * Math.PI * 0.2;

          object.rotation.x = -angle;

          if (progress < 1) {
            requestAnimationFrame(attack);
          } else {
            object.rotation.x = 0;
            isAttackingRef.current = false;
          }
        };

        requestAnimationFrame(attack);
      }
    };

    
    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [object4Ref]);
}