import { useEffect } from "react";

export function useEyeBlink(eyelidsRef) {
  useEffect(() => {
    let animationFrame;
    let blinking = false;
    let blinkStart = 0;
    const blinkDuration = 400; // blink duration in ms

    const blinkEyelids = (timestamp) => {
      if (!blinkStart) blinkStart = timestamp;
      const elapsed = timestamp - blinkStart;
      const progress = Math.min(elapsed / blinkDuration, 1); // 0 to 1

      // Animate scale on Y axis (up/down) to simulate closing
      const scaleY = progress < 0.5
        ? 1 - progress * 2 * 0.95 // down to 0.05
        : 0.05 + (progress - 0.5) * 2 * 0.95; // back to 1

      eyelidsRef.current?.forEach((lid) => {
        lid.scale.y = scaleY;
      });

      if (progress < 1) {
        animationFrame = requestAnimationFrame(blinkEyelids);
      } else {
        blinking = false;
        blinkStart = 0;
        eyelidsRef.current?.forEach((lid) => {
          lid.scale.y = 1; // reset
        });
      }
    };

    const blinkLoop = setInterval(() => {
      if (!blinking && eyelidsRef.current?.length > 0) {
        blinking = true;
        animationFrame = requestAnimationFrame(blinkEyelids);
      }
    }, 5000); // blink every 5s

    return () => {
      clearInterval(blinkLoop);
      cancelAnimationFrame(animationFrame);
    };
  }, []);
}