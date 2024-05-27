import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import useProgress from "../../hooks/useProgress";
import { BackgroundContent } from "../../stylesCongress";
import gsap from "gsap";

export default function QuizBackground({
  answers,
  questions,
  name,
  isIdle,
  showICS,
}) {
  const { progress /*, max*/ } = useProgress(answers, questions);
  const location = useLocation();

  const [currentVideo, setCurrentVideo] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [idlePosition, setIdlePosition] = useState(1);
  const [roomPosition, setRoomPosition] = useState(1);
  const [incorrectPosition, setIncorrectPosition] = useState(1);

  useEffect(() => {
    const bgImage = document.getElementById("background-image");
    const video = document.getElementById("currentVideo");
    const progressAll = Object.keys(progress).filter(
      (key) => progress[key] === "right"
    ).length;

    /// question results screens.... "You're correct/incorrect"
    if (!isIdle && !isFirstLoad) {
      video.onended = null;
      let currentAnswer = progress[location.pathname.slice(-1)];

      if (location.pathname.slice(-1) == "s") {
        let currentAnswer = progress[9];
        //FINAL SEQUENCES
        /**
         * 1. check what room in
         * 2. if not lobby...  fade to white... on complete, play lock the bitch up anim
         * 3. if lobby...play walking out of hospital anim, on complete play park scene
         */

        if (
          bgImage.src.indexOf("4") !== -1 &&
          currentAnswer === "right" &&
          progressAll >= 7
        ) {
          // console.log('right, correct, good score');
          // console.log('play walkout then');
          // console.log('play park');

          setTimeout(() => {
            setCurrentVideo(`./videos/Mary_door-4_corridor.mp4#t=0.01`);
            video.play();
            video.onended = function () {
              bgImage.style = "opacity:0";
              video.pause();
              video.currentTime = 0;
              setCurrentVideo(`./videos/Mary_stage_final_success.mp4#t=0.01`);
              video.play();
              video.onended = function () {
                video.pause();
              };
            };
          }, 1000);
        } else if (currentAnswer === "wrong" && progressAll >= 7) {
          // console.log('wrong room but good score');
          // console.log('fade out');
          // console.log('play park');

          setTimeout(() => {
            setCurrentVideo(`./videos/Mary_door-4_corridor.mp4#t=0.01`);
            video.play();
            video.onended = function () {
              bgImage.style = "opacity:0";
              video.pause();
              video.currentTime = 0;
              setCurrentVideo(`./videos/Mary_stage_final_success.mp4#t=0.01`);
              video.play();
              video.onended = function () {
                video.pause();
              };
            };
          }, 1000);
        } else {
          // console.log('BAD score');
          // console.log('fade out');
          // console.log('slam door');
          // bgImage.src = `./background-imgs/Mary_door-4.png`;
          const timeline = gsap.timeline({ repeat: 0, repeatDelay: 0 });
          const animation = timeline.fromTo(
            [video, bgImage],
            { autoAlpha: 1, y: 0 },
            {
              autoAlpha: 0,
              duration: 1,
            }
          );

          animation.then(() => {
            setCurrentVideo(`./videos/Mary_stage_final_fail.mp4#t=0.01`);
            const animation = timeline.fromTo(
              [video],
              { autoAlpha: 0, y: 0 },
              {
                autoAlpha: 1,
                duration: 1,
              }
            );
            video.play();
            video.onended = function () {
              video.pause();
            };
          });
        }
      } else {
        setIsFirstLoad(true);

        if (currentAnswer === "wrong") {
          bgImage.style = "opacity:1";
          if (bgImage.src.indexOf("door-4") !== -1) {
            bgImage.src = `./background-imgs/Mary_door-4.png`;
            setCurrentVideo(`./videos/Mary_door-4_incorrect-3.mp4#t=0.01`);
          } else {
            setCurrentVideo(
              `./videos/Mary_door-${roomPosition}_incorrect-${incorrectPosition}.mp4#t=0.01`
            );
          }

          //we're wrong so we can increment now
          setIncorrectPosition(Math.floor(incorrectPosition) + 1);
          if (incorrectPosition === 5) {
            setIncorrectPosition(1);
          }

          if (video) {
            video.pause();
            video.currentTime = 0;
            setTimeout(() => {
              video.play();
            }, 1000);
          }
        } else if (currentAnswer === "right") {
          bgImage.style = "opacity:1";

          if (
            bgImage.src.indexOf("door-4") !== -1 &&
            location.pathname.slice(-1) == 9 &&
            progressAll >= 7
          ) {
            setCurrentVideo(`./videos/Mary_door-4_correct.mp4#t=0.01`);
          } else if (
            bgImage.src.indexOf("door-4") !== -1 &&
            location.pathname.slice(-1) == 9 &&
            progressAll < 7
          ) {
            setCurrentVideo(`./videos/Mary_door-4_correct.mp4#t=0.01`);
          } else {
            setCurrentVideo(
              `./videos/Mary_door-${roomPosition}_corridor.mp4#t=0.01`
            );
          }

          //we're correct so we can increment now
          if (roomPosition === 3) {
            setRoomPosition(1);
          } else {
            setRoomPosition(Math.floor(roomPosition) + 1);
          }

          if (video) {
            video.pause();
            video.currentTime = 0;
            setTimeout(() => {
              video.play();

              video.onended = function () {
                if (location.pathname.slice(-1) >= 8 && progressAll >= 7) {
                  setCurrentVideo(`./videos/Mary_door-4_idle-3.mp4#t=0.01`);
                  setRoomPosition(4);
                } else if (
                  location.pathname.slice(-1) >= 8 &&
                  progressAll < 7
                ) {
                  setCurrentVideo(`./videos/Mary_door-4_idle-3.mp4#t=0.01`);
                  //setRoomPosition(4)

                  if (roomPosition === 3) {
                    setCurrentVideo(
                      `./videos/Mary_door-1_idle-${idlePosition}.mp4#t=0.01`
                    );
                  } else {
                    setCurrentVideo(
                      `./videos/Mary_door-${
                        roomPosition + 1
                      }_idle-${idlePosition}.mp4#t=0.01`
                    );
                  }
                } else {
                  if (roomPosition === 3) {
                    setCurrentVideo(
                      `./videos/Mary_door-1_idle-${idlePosition}.mp4#t=0.01`
                    );
                  } else {
                    setCurrentVideo(
                      `./videos/Mary_door-${
                        roomPosition + 1
                      }_idle-${idlePosition}.mp4#t=0.01`
                    );
                  }
                }
              };
            }, 100);
          }
        }
      }
    }

    if (isFirstLoad && isIdle) {
      // anim screens (idling / results)

      // set it once in the room and this resolves a lot of issues
      if (location.pathname.slice(-1) >= 8 && progressAll > 6) {
        bgImage.src = `./background-imgs/Mary_door-4.png`;
        setCurrentVideo(`./videos/Mary_door-4_idle-3.mp4#t=0.01`);
      } else {
        if (location.pathname.slice(-1) >= 8 && progressAll <= 6) {
          bgImage.style = "opacity:1";
          bgImage.src = `./background-imgs/Mary_door-${roomPosition}.png`;
          setCurrentVideo(
            `./videos/Mary_door-${roomPosition}_idle-${idlePosition}.mp4#t=0.01`
          );
        } else {
          bgImage.src = `./background-imgs/Mary_door-${roomPosition}.png`;
          setCurrentVideo(
            `./videos/Mary_door-${roomPosition}_idle-${idlePosition}.mp4#t=0.01`
          );
        }
      }

      setTimeout(() => {
        video.play();
      }, 500);

      //we're idling so we can increment now
      setIdlePosition(Math.floor(idlePosition) + 1);
      if (idlePosition === 5) {
        setIdlePosition(1);
      }

      setIsFirstLoad(false);
    }

    video.oncanplay = null;
    if (video.src.indexOf("_corridor") == -1) {
      video.oncanplay = function () {
        //If not score page set to opacity 1
        bgImage.style =
          location.pathname.slice(-2) == "ts" ? "opacity:0" : "opacity:1";
      };
    } else {
      video.oncanplay = function () {
        bgImage.style = "opacity:0";
      };
    }
  }, [progress, name, location, isFirstLoad, isIdle]);

  /*useEffect(() => {
    const video = document.getElementById("currentVideo");
    if (showICS) {
      video.pause();
    }
  });*/

  return (
    <BackgroundContent id="background">
      <video
        //style={{"filter": "blur(3px)"}}
        id="currentVideo"
        muted
        playsInline
        src={currentVideo}
        type="video/mp4"
        preload="auto"
      >
        <track kind="captions" srcLang="en" label="english_captions"></track>
      </video>
    </BackgroundContent>
  );
}
