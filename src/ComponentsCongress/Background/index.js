import React, { useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router";
import gsap from "gsap";
import BackgroundImg from "../../assets/images/background-img.jpeg";
import { devices } from "../../stylesCongress";

import Background_1 from "../../assets/images/screensaver-1.webp";
import Background_2 from "../../assets/images/screensaver-2.webp";
import Background_3 from "../../assets/images/screensaver-3.webp";
import BackgroundHome from "../../assets/images/background-homepage.webp";

export default function Background() {
  const location = useLocation();
  const isHomeOrResults =
    location.pathname == "/" || location.pathname == "/quiz/results";
  const isHome = location.pathname == "/";

  useEffect(() => {
    const bgImage = document.getElementById("background-image");
    const bgLantern = document.getElementById("bg-lantern");

    if (!bgImage) {
      return;
    }

    if (bgImage.style.opacity === "0") {
      gsap.fromTo(bgImage, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    }

    if (bgLantern.style.opacity === "0.5") {
      gsap.fromTo(bgLantern, { opacity: 0.5 }, { opacity: 0, duration: 0.5 });
    }
  }, [location]);

  const isPortrait = process.env.REACT_APP_DEVICE == "portrait";

  return (
    <Wrapper>
      {/* {!isPortrait && isHomeOrResults && <GradientBackdrop />} */}
      {isHome ? (
        <>
          <BgImage
            style={{
              zIndex: -2,
            }}
            src={BackgroundHome}
            id="bg-img-0"
          />
          <BgImage
            style={{
              zIndex: -3,
            }}
            src={Background_1}
            id="bg-img-1"
          />
          <BgImage
            style={{
              zIndex: -4,
            }}
            src={Background_2}
            id="bg-img-2"
          />
          <BgImage
            style={{
              zIndex: -5,
            }}
            src={Background_3}
            id="bg-img-3"
          />
        </>
      ) : (
        <>
          <BackgroundImage src={BackgroundImg} alt="" />
          <BackgroundImage style={{ zIndex: -4 }} src={BackgroundHome} alt="" />
        </>
      )}
      {/* <BackgroundImage src={isHome ? screensaverImage : BackgroundImg} alt="" /> */}
      {/* <ForeImage
        src={isPortrait ? BackgroundImgLightsOnPortrait : BackgroundImgLightsOn}
        id="background-image"
        alt=""
      />
      <BackgroundImage
        src={
          isPortrait ? BackgroundImgLightsOffPortrait : BackgroundImgLightsOff
        }
        alt=""
      /> */}
      {/* <LanternImage src={LanternImg} id="bg-lantern" alt="" /> */}
    </Wrapper>
  );
}

const BgImage = styled.img`
  position: fixed;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div``;

const GradientBackdrop = styled.div`
  position: absolute;
  z-index: -1;
  height: 1080px;
  width: 1920px;
  background: linear-gradient(
    68.11deg,
    rgba(3, 33, 44, 0.25) 15.03%,
    rgba(0, 0, 0, 0) 40.15%
  );

  @media (max-width: 1366px) {
    height: 2160px;
  }
`;

const ForeImage = styled.img`
  z-index: -2;
  position: absolute;
  width: 1920px;
  height: 1080px;

  @media (max-width: 1366px) {
    transform: scale(1.8);
    -webkit-transform: scale(1.8); /* android, safari, chrome */
    -moz-transform: scale(1.8); /* old firefox */
    -o-transform: scale(1.8); /* old opera */
    -ms-transform: scale(1.8); /* old IE */
    right: 140px;
    top: 200px;
  }

  @media ${devices.PORTRAIT} {
    height: 1920px;
    width: 1080px;
    transform: none;
    -webkit-transform: none; /* android, safari, chrome */
    -moz-transform: none; /* old firefox */
    -o-transform: none; /* old opera */
    -ms-transform: none;
    inset: 0;
  }
`;
const BackgroundImage = styled.img`
  z-index: -3;
  position: fixed;
  width: 100%;
  height: 100%;

  @media (max-width: 1366px) {
    transform: scale(1.8);
    right: 140px;
    top: 200px;
    -webkit-transform: scale(1.8); /* android, safari, chrome */
    -moz-transform: scale(1.8); /* old firefox */
    -o-transform: scale(1.8); /* old opera */
    -ms-transform: scale(1.8); /* old IE */
  }

  @media ${devices.PORTRAIT} {
    height: 1920px;
    width: 1080px;
    transform: none;
    -webkit-transform: none; /* android, safari, chrome */
    -moz-transform: none; /* old firefox */
    -o-transform: none; /* old opera */
    -ms-transform: none;
    inset: 0;
  }
`;

const LanternImage = styled.img`
  position: absolute;
  z-index: 0;
  width: 190px;
  left: 1403px;
  top: 326px;
  background: #ffd29c;
  background-blend-mode: soft-light;
  filter: blur(60px);
  opacity: 0;
  transform: translateZ(0);

  @media (max-width: 1366px) {
    left: 1150px;
    top: 430px;
  }
`;