import styled, { keyframes } from "styled-components";

const breakpoints = {
  M: 648,
  L: 1026,
  XL: 1200,
  large: process.env.REACT_APP_DEVICE === "ipad" ? 6000 : 1920,
};

export const devices = {
  S: `(max-width: ${breakpoints.M - 1}px)`,
  M: `(min-width: ${breakpoints.M}px)`,
  Portrait: `(min-width: 1024px) and (max-height: 1366px) and (orientation: portrait)`,
  L: `(min-width: ${breakpoints.L}px)`,
  XL: `(min-width: ${breakpoints.XL}px)`,
  large: `(min-width: ${breakpoints.large}px)`,
  PORTRAIT: `(width: 1080px) and (height: 1920px)`,
};

const BackdropAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;

export const AppWrapper = styled.main`
  font-family: ${({ theme }) => theme.bodyFont};
  color: #03212c;
  line-height: 1.3;
  min-height: calc(100vh - 0px);
  position: relative;
  display: flex;
  flex-direction: column;
  background: white;
  position: relative;
  max-width: 1978px;
  margin: auto;
  height: 100%;

  display: flex;
  flex-direction: row;

  // @media (max-width: 1366px) {
  //   transform: scale(0.8);
  //   transform-origin: top left;
  //   -webkit-transform: scale(0.8); /* android, safari, chrome */
  //   -moz-transform: scale(0.8); /* old firefox */
  //   -o-transform: scale(0.8); /* old opera */
  //   -ms-transform: scale(0.8); /* old IE */
  // }
  
  // @media only screen and (max-width: 480px) { 
  //   min-height: 100vh;
  //   height: 100vh;
  // }

  @media ${devices.M} {
    padding-bottom: 0px;
  }

  @media ${devices.large} {
    // height: 1080px;
  }

  @media ${devices.PORTRAIT} {
    height: 1920px;
    width: 1080px;
    transform: none;
    transform-origin: top left;
    -webkit-transform: none; /* android, safari, chrome */
    -moz-transform: none; /* old firefox */
    -o-transform: none; /* old opera */
    -ms-transform: none; /* old IE */
  }

  * {
    font-family: inherit;
  }

  *:focus {
    outline: 2px solid transparent;
  }

  /* h1 {
    color: ${({ theme }) => theme.primary};
    display: inline-block;
    font-size: 22px;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: 0px;
    text-align: center;
    font-family: FilsonProBlack;

    @media ${devices.M} {
      font-size: 26px;
      line-height: 31px;
    }

    @media ${devices.large} {
      font-size: 36px;
      line-height: 43px;
    }
  } */

  h2 {
    display: inline-block;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    /* max-width: 355px; */
    margin-bottom: 24px;
  }

  p {
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 30px;
    color: ${({ theme }) => theme.body};
    margin-bottom: 16px;
    display: block;

    /* @media ${devices.L} {
      font-size: 23px;
      line-height: 40px;
    } */
  }

  sup {
    font-size: 0.7em;
    position: relative;
    top: -0.4em;
    vertical-align: top;
  }

  sub {
    vertical-align: bottom;
    font-size: 0.6em;
  }

  small {
    font-size: 12px;
    line-height: 18px;
    font-weight: 300;

    sup {
      top: -0.6em;
      vertical-align: inherit;
    }
  }

  em {
    font-style: italic;
  }
`;

export const Container = styled.div`
  width: 100%;
  // margin: 0 auto;
  // max-width: 1256px;

  @media (max-width: 1366px) {
    max-width: unset;
  }

  @media ${devices.large} {
    max-width: 1390px;
  }

  opacity: 1;
  height: 100%;
  padding-inline: 165px 165px;
  background: ${(props) =>
    props.hasGradient
      ? props.isHomepage
        ? `linear-gradient(
    91deg,
    rgba(0, 0, 0, 0.68) 0%,
    rgba(0, 0, 0, 0.68) 72.19%,
    rgba(31, 31, 30, 0) 100%
  )`
        : `linear-gradient(
    91deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.4) 72.19%,
    rgba(31, 31, 30, 0) 100%
  )`
      : "none"};
  backdrop-filter: blur(7px) opacity(1);
  animation: ${BackdropAnimation} 0.3s linear;

  @media (max-width: 1020px) {
    padding-inline: 20px 20px;
  }
  
  @media only screen and (min-width: 1024px) and (max-width: 1366px) and (orientation: portrait) {
    padding-inline: 50px 50px;
    height: 1480px;
    width: 80%;
  }

  @media only screen and (min-width: 820px) and (max-width: 1180px) and (orientation: portrait) {
    height: 1480px;
    padding-inline: 50px 50px;
  }

  @media only screen and (min-width: 820px) and (max-width: 1180px) and (orientation: landscape) {
    // height: 1480px;
    padding-inline: 50px 50px;
  }

  @media only screen and (min-width: 744px) and (max-width: 1133px) and (orientation: portrait) {
    height: 1480px;
    padding-inline: 50px 50px;
  }

  and (min-device-width : 320px)
  and (max-device-width : 480px)
  { 
    padding-inline: 0px 0px !important;
    height: auto;
  }

  @media only screen and (min-width: 1024px) and (max-width: 1366px) and (orientation: landscape) {
    width: 80%;
    padding-inline: 95px;
  }
`;

export const ContentWrapper = styled.div`
  /* border-radius: 14px; */
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.85),
      rgba(255, 255, 255, 0.85)
    ),
    #d7d2c5;
  /* box-shadow: 0 4px 8px 2px rgba(60, 64, 67, 0.15),
    0 1px 3px 0 rgba(60, 64, 67, 0.3); */
  max-width: 940px;
  margin-top: 158px;

  /* @media ${devices.large} {
    margin-top: ${(props) => (props.showICS ? "82px" : "120px")};
    padding: 40px;
  } */
`;

export const BackgroundWrapper = styled.div`
  position: relative;
  min-height: 600px;
`;

export const ContentContainer = styled.div`
  position: relative;
  z-index: 0;
  // height: 100%;
  width: ${(props) => (props.isSidebarOpen ? "1219px" : "100%")};
  pointer-events: ${(props) => (props.isSidebarOpen ? "none" : "all")};

  @media ${devices.S} {
    min-height: 0;
  }
  @media ${devices.M} {
    min-height: 0;
  }

  @media ${devices.PORTRAIT} {
    min-height: 100%;
  }
`;

export const BackgroundContent = styled.div`
  position: absolute;
  height: 1080px; //height: 100vh;
  right: 0;
  left: 0;
  z-index: -1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  overflow: hidden;
  justify-content: center;

  &::before {
    content: "";
    position: fixed;
    bottom: 0;
    background: linear-gradient(
      178.53deg,
      rgba(0, 0, 0, 0) 68.47%,
      rgba(0, 0, 0, 0.55) 98.72%
    );
    z-index: 1;
    width: 100%;
    height: 100%;
    left: 0;
    transition: background 1s linear;
  }

  @media ${devices.S} {
    height: 835px;
    box-shadow: none;
  }

  @media ${devices.M} {
    right: 0;
    img {
      height: 90%;
      right: 10px;
      position: absolute;
    }
  }

  @media ${devices.L} {
    background: transparent; //Videobg
    justify-content: flex-end;
    img {
      height: 90%;
      right: 60px;
    }
  }

  @media (min-width: 1700px) {
    justify-content: center;
  }

  /* Video Placements */
  @media (max-width: 647px) {
    video {
      height: 255px;
      position: absolute;
      top: 0;
    }
  }

  @media ${devices.S} {
    video {
      right: -10px;
    }
  }

  @media (min-width: 648px) and (max-width: 931px) {
    video {
      height: 371px;
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  @media (min-width: 932px) and (max-width: 1025px) {
    video {
      position: absolute;
      right: 0px;
      top: -122px;
      height: 593px;
    }
  }

  @media ${devices.M} {
    video {
      position: absolute;
      height: 1080px;
      left: -935px;
      top: 0;
    }
  }

  @media ${devices.large} {
    video {
      left: -425px;
    }
  }
`;

export const ProgressBarContainer = styled(Container)`
  max-width: 1390px;
  position: relative;
  top: -80px;

  @media (max-width: 1366px) {
    max-width: unset;
    // margin-left: 150px;
  }

  @media ${devices.PORTRAIT} {
    position: relative;
    margin: 0px;
    top: -80px;
    opacity: 1;
  }

  opacity: 1;
  height: unset;
  padding-inline: 0px;
  background: none;
  backdrop-filter: none;
`;
