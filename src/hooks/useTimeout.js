import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useLocation } from "react-router";

// how long without user interaction until the idle timeout modal appears
const idleTimeout = 1000 * 60;

export default function useTimeout(setReferencesOpen) {
  const [isTimeoutIdle, setIsTimeoutIdle] = useState(false);
  const location = useLocation();

  // when user is idle for timeout length, set isIdle to true which opens the idle modal
  const onIdle = () => {
    const path = location.pathname;

    if (path !== "/") {
      setIsTimeoutIdle(true);
    }
  };

  // when user interacts
  const onActive = () => {
    if (!isTimeoutIdle) {
      reset();
    }
  };

  const { reset, pause, getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    timeout: idleTimeout,
    events: [
      "mousemove",
      "keydown",
      "wheel",
      "DOMMouseScroll",
      "mousewheel",
      "mousedown",
      "touchstart",
      "touchmove",
      "MSPointerDown",
      "MSPointerMove",
      "visibilitychange",
    ],
    startOnMount: true,
  });

  useEffect(() => {
    if (isTimeoutIdle) {
      pause();
    }
  }, [isTimeoutIdle]);

  const resetIdleTimer = () => {
    setIsTimeoutIdle(false);
    setReferencesOpen(false);
    reset();
  };

  return { isTimeoutIdle, resetIdleTimer };
}
