import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function useCountdown(totalTime = 30, reset) {
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(totalTime);
  const history = useHistory();

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        if (timeRemaining == 1) {
          // if at end of timer countdown, navigate back to start screen, open screensaver and reset timer
          setIsRunning(false);
          setTimeRemaining(totalTime);
          reset();
          history.push("/");
        } else {
          setTimeRemaining((t) => t - 1);
        }
      }, 1000);
    } else {
      setTimeRemaining(totalTime);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  function startCountdown() {
    setIsRunning(true);
  }

  return { timeRemaining, startCountdown };
}
