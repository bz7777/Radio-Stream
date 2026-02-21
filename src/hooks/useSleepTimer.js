import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for managing sleep timer functionality.
 * Uses a ref for onTimerEnd to avoid stale closures,
 * and only depends on [isActive] so the interval is
 * created once and never recreated on each tick.
 */
export const useSleepTimer = (onTimerEnd) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const onTimerEndRef = useRef(onTimerEnd);

  // Keep the ref current without restarting the interval
  useEffect(() => {
    onTimerEndRef.current = onTimerEnd;
  });

  useEffect(() => {
    if (!isActive) return;

    const id = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsActive(false);
          onTimerEndRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isActive]);

  const startTimer = (minutes) => {
    setTimeLeft(minutes * 60);
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return { timeLeft, isActive, startTimer, stopTimer, formatTime };
};
