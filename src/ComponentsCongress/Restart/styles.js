import styled, { keyframes } from "styled-components";
import { Container, ContentWrapper, devices } from "../../stylesCongress";

const FadeInBackground = keyframes`
  0% {
    background-color: transparent;
  }
  100% {
    background-color: rgba(14,56,89,0.75);
  }
`;

export const MainWrapper = styled(Container)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  margin: 0;
  padding: 0px;
  max-width: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

export const RestartWrapper = styled(ContentWrapper)`
  position: relative;
  text-align: center;
  height: 100%;
  padding: 40px;
  height: fit-content;
  background: none;
  margin: 0px auto;

  // @media (max-width: 1366px) {
  //   margin-left: 150px;
  // }

  @media ${devices.PORTRAIT} {
    margin-inline: 70px;
    margin-top: 767px;
  }

  @media only screen and (max-width: 480px) { 
    margin: unset;

    h1 {
      font-size: 40px !important;
    }

    p {
      font-size: 20px !important;
    }
  }

  &::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(24px);
  }

  h1 {
    display: inline-block;
    font-size: 70px;
    line-height: 91px;
    font-weight: 700;
    text-align: center;
    color: #c8a85d;
    margin-bottom: 24px;
  }

  p {
    font-size: 30px;
    font-weight: 500;
    line-height: 33px;
    margin: 0px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 52px;

  button {
    width: 312px;
    justify-content: space-between;
    border-radius: 8px;
    box-shadow: 0px 2px 6px 2px rgba(60, 64, 67, 0.15),
      0px 2px 4px 0px rgba(60, 64, 67, 0.3);
    border: 2px solid #c04c1c;

    span {
      text-align: center;
      width: 100%;
    }

    &:first-of-type {
      padding-inline: 32px 56px;
    }
    &:last-of-type {
      color: #c04c1c;
    }
  }

  @media only screen and (max-width: 480px) { 
    display: block;
    
    button {
      margin-bottom: 15px;
    }
  }
`;
