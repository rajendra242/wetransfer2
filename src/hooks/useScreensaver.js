import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import Background_1 from "../assets/images/screensaver-1.webp";
import Background_2 from "../assets/images/screensaver-2.webp";
import Background_3 from "../assets/images/screensaver-3.webp";
import BackgroundHome from "../assets/images/background-homepage.webp";
import { gsap } from "gsap";

const SCREENSAVER_LIST = [
  {
    heading: "Diagnosing and monitoring geographic atrophy (GA)",
    body: "How much do you know?",
    ctaCopy: "Start the quiz",
    image: BackgroundHome,
    gradient: true,
  },
  {
    heading: "Diagnosing and monitoring geographic atrophy (GA)",
    body: "How much do you know?",
    ctaCopy: "Start the quiz",
    image: Background_1,
    gradient: true,
  },
  {
    heading:
      "Test your knowledge of geographic atrophy (GA) diagnosis and monitoring",
    body: "",
    ctaCopy: "Try our quiz",
    image: Background_2,
    gradient: false,
  },
  {
    heading: "Geographic atrophy (GA) diagnosis and monitoring quiz",
    body: "How high can you score?",
    ctaCopy: "Test yourself",
    image: Background_3,
    gradient: true,
  },
];

const TIME_BETWEEN_CYCLE = 30000;

export function useScreensaver() {
  const [isScreensaverOpen, setIsScreensaverOpen] = useState(false);
  const [screensaverIndex, setScreensaverIndex] = useState(0);
  const screensaverContent = useMemo(() => {
    return SCREENSAVER_LIST[screensaverIndex];
  }, [screensaverIndex]);
  const location = useLocation();
  const nextImage = useMemo(() => {
    return SCREENSAVER_LIST[(screensaverIndex + 1) % SCREENSAVER_LIST.length]
      .image;
  }, [screensaverIndex]);

  useEffect(() => {
    if (location.pathname !== "/") {
      closeScreensaver();
    }
  }, [location]);

  // cycle through the screensavers every 30 seconds
  useEffect(() => {
    let interval;

    if (location.pathname == "/") {
      interval = setInterval(() => {
        const IMAGE_TO_FADE_OUT = document.getElementById(
          `bg-img-${screensaverIndex}`
        );

        if (screensaverIndex == SCREENSAVER_LIST.length - 1) {
          const el = document.getElementById(`bg-img-0`);
          gsap.to(el, {
            opacity: 1,
            onComplete: () => {
              setScreensaverIndex(
                (index) => (index + 1) % SCREENSAVER_LIST.length
              );

              for (let i = 0; i < SCREENSAVER_LIST.length; i++) {
                if (i !== screensaverIndex) {
                  console.log(i);
                  const el = document.getElementById(`bg-img-${i}`);

                  el.style.opacity = 1;
                }
              }
            },
          });
        } else {
          gsap.to(IMAGE_TO_FADE_OUT, {
            opacity: 0,
            onComplete: () => {
              setScreensaverIndex(
                (index) => (index + 1) % SCREENSAVER_LIST.length
              );
            },
          });
        }
      }, TIME_BETWEEN_CYCLE);
    }
    else {
      setScreensaverIndex(0);
    }

    return () => clearInterval(interval);
  }, [screensaverIndex, location]);

  function openScreensaver() {
    setIsScreensaverOpen(true);
  }

  function closeScreensaver() {
    setIsScreensaverOpen(false);
  }

  return {
    isScreensaverOpen,
    openScreensaver,
    closeScreensaver,
    screensaverContent,
    nextImage,
  };
}
