import { useCallback, useRef, useEffect } from 'react';

interface AnimationFrameCallback {
  (deltaTime: number): void;
}

export const useAnimationFrame = (
  callback: AnimationFrameCallback,
  isActive: boolean
) => {
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);

  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback]
  );

  useEffect(() => {
    if (!isActive) return;

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isActive, animate]);
};
