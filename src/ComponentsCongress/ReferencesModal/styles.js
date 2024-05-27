import styled from "styled-components";
import { devices } from "../../stylesCongress";

export const Wrapper = styled.div`
  position: absolute;
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: #03212c;
  opacity: 0.3;
  z-index: 0;

  @media (max-width: 1366px) {
    inset: -350px;
  }
`;

export const Container = styled.div`
  bottom: -1150px;
  background-color: #ffffff;
  margin-left: 265px;
  padding: 32px 40px 48px;
  height: 757px;
  width: 940px;
  z-index: 9;
  position: absolute;
  border-bottom: 3px solid #d7d2c5;

  @media (max-width: 1366px) {
    margin-left: 150px;
  }

  @media ${devices.PORTRAIT} {
    margin-inline: 70px;
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  width: 100%;
  position: relative;
  margin-bottom: 24px;

  h2 {
    margin: 0px;
    font-size: 23px;
    line-height: 40px;
    color: #03212c;
    font-weight: 600;
  }
`;

export const Content = styled.div`
  padding-top: 24px;
  border-top: 1px solid #ff681d;

  p {
    font-size: 18px;
    line-height: 26px;

    sub {
      vertical-align: bottom;
      font-size: 0.6em;
      position: relative;
      bottom: -8px;
    }
  }
  ol {
    list-style: decimal;
    margin-left: 25px;
    font-size: 18px;
    line-height: 26px;
    color: #3b2b2b;

    li {
      font-weight: 300;
    }
  }

  ol:not(:first-child) {
    margin-top: 30px;
  }
`;

export const CloseButton = styled.div`
  margin-left: 12px;
  font-size: 20px;
  align-self: center;
  position: relative;
  width: 24px;
  height: 24px;
  background: inherit;
  margin-right: 20px;

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 16px;
    height: 2px;
    background: #03212c;
    top: 9px;
    right: 1px;
  }

  &:before {
    transform: rotate(-45deg);
  }
  &:after {
    transform: rotate(45deg);
  }
`;
