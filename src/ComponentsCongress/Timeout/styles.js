import styled, { keyframes } from "styled-components";
import { devices } from "../../stylesCongress";

export const Wrapper = styled.div`
  z-index: 101;
  position: fixed;
  inset: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(24px);

  // @media (max-width: 1366px) {
  //   inset: -350px;
  // }

  * {
    -khtml-user-select: none;
    -o-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 940px;
  position: relative;
  /* padding-block: 40px; */
  text-align: center;

  // @media (max-width: 1366px) {
  //   left: 235px;
  //   top: calc(50% - 800px);
  // }

  @media only screen and (max-width: 480px) { 
    left: 0;
    top: 0;

    h1 {
      font-size: 35px !important;
    }

    p {
      font-size: 20px !important;
    }
  }

  @media ${devices.PORTRAIT} {
    margin-inline: 70px;
    left: unset;
    top: unset;
  }

  h1 {
    font-weight: 700;
    line-height: 91px;
    color: #c8a85d;
    font-size: 70px;
    margin-bottom: 24px;
  }

  p {
    margin-bottom: 44px;
    font-size: 30px;
    line-height: 33px;
  }

  button {
    min-width: 312px;
    display: flex;

    &:first-child {
      padding-inline: 32px 56px;
    }

    span {
      flex-grow: 1;
    }
  }
`;

export const CountdownWrapper = styled.div`
  position: relative;
  height: 336px;
  width: 336px;

  @media ${devices.PORTRAIT} {
    left: 300px;
    top: -400px;
  }

  svg {
    left: 0px;
  }

  @media only screen and (max-width: 480px) { 
    svg {
      left: 62px;
    }
  }
`;

export const TimeDisplay = styled.div`
  position: absolute;
  left: 0px;
  width: 100%;
  height: 324px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  color: white;
  margin-top: 70px;

  h2 {
    color: #fff;
    text-align: center;
    font-family: "Poppins";
    font-size: 150px;
    font-weight: 300;
    line-height: 150px;
    margin: 0px;

  }

  @media only screen and (max-width: 480px) { 
    left: -8px;

    h2 {
      line-height: 25px;
      font-size: 80px;
    }
  }

  @media only screen and (min-width: 1024px) and (max-width: 1366px) and (orientation: portrait) {
    h2 {
      font-size: 100px;
    }
  }


  @media only screen and (min-width: 820px) and (max-width: 1180px) and (orientation: portrait) {
    h2 {
      font-size: 100px;
    }
  }
  

  @media only screen and (min-width: 744px) and (max-width: 1133px) and (orientation: portrait) {
    left: -75px;

    h2 {
      line-height: 25px;
      font-size: 80px;
    }
  }

  p {
    font-size: 24px;
    margin: 0px;
  }
`;

export const countdown = keyframes`
  from {
    stroke-dashoffset: 0px;
  }
  to {
    stroke-dashoffset: 1010px;
  }
`;
export const countdownIpad = keyframes`
  from {
    stroke-dashoffset: 0px;
  }
  to {
    stroke-dashoffset: 580px;
  }
`;

export const Circle = styled.svg`
  position: absolute;
  width: 193px;
  height: 193px;
  transform: rotateY(-180deg) rotateZ(-90deg);

  circle {
    stroke-dasharray: 580px;
    stroke-dashoffset: 0px;
    stroke-linecap: round;
    stroke-width: 10px;
    stroke: #f8f8f8;
    fill: none;
  }
  @media ${devices.XL} {
    width: 336px;
    height: 336px;

    circle {
      stroke-dasharray: 1010px;
      stroke-width: 17px;
    }
  }

  @media ${devices.PORTRAIT} {
    width: 336px;
    height: 336px;

    circle {
      stroke-dasharray: 1010px;
      stroke-width: 17px;
    }
  }
`;

export const OrangeBorder = styled(Circle)`
  circle {
    stroke: #c8a85d;
    animation: ${countdownIpad} 60s linear forwards;
  }
  @media ${devices.XL} {
    circle {
      animation: ${countdown} 61s linear forwards;
    }
  }
  @media ${devices.PORTRAIT} {
    circle {
      animation: ${countdown} 61s linear forwards;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 52px;
  z-index: 2;

  @media only screen and (max-width: 480px) { 
    display: block;
    margin-top: 0px !important;
    button {
      margin-bottom: 15px;
    }
  }
`;
