import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router";
import { BackgroundContent } from "../../stylesCongress";

export default function SelectorBackground({ videoSrc }) {
  const location = useLocation();
  const videos = ["./videos/Mary_door-1_idle-1.mp4"];

  useLayoutEffect(() => {
    // start currently displayed video from beginning
    if (location.pathname.includes("patient-selector")) {
      const videos = [...document.getElementsByClassName("selector-videos")];
      videos.forEach((video) => {
        if (video.style.zIndex === "1" || video.style.zIndex === 1) {
          try {
            video.currentTime = 0;
          } catch (err) {
            console.error(err);
          }
          video.pause();
          video.currentTime = 0;
          video.play();
        }
      });
    }
  }, [videoSrc, location]);

  return (
    <BackgroundContent
      style={{ visibility: location.pathname === "/" && "hidden" }}
      className="background-content-selector"
    >
      {/* render all videos, but if don't show any of them unless they are the current videoSrc (the currently selected patient's video) */}
      {videos.map((video, index) => {
        return (
          <video
            className="selector-videos"
            key={index}
            style={{ bottom: "0px", zIndex: videoSrc === video ? 1 : 0 }}
            muted
            playsInline
          >
            <source src={video} type="video/mp4"></source>
            <track
              kind="captions"
              srcLang="en"
              label="english_captions"
            ></track>
          </video>
        );
      })}
    </BackgroundContent>
  );
}
