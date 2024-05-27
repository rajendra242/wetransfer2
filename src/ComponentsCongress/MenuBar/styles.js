import styled from "styled-components";
import { devices } from "../../stylesCongress";

export const Wrapper = styled.div`
  color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ isResults }) =>
    isResults ? "flex-end" : "space-between"};
  position: absolute;
  z-index: 2;
  height: 48px;
  left: 200px;
  bottom: 80px;
  width: 720px;

  @media (max-width: 1366px) {
    left: 150px;
    bottom: -100px;
  }

  @media ${devices.PORTRAIT} {
    bottom: 686px;
    left: 70px;
  }
`;

export const MenuButton = styled.div`
  pointer-events: ${({ disabled }) => (disabled ? "none" : "initial")};
  opacity: ${({ disabled }) => (disabled ? "0.2 !important" : 1)};
  display: flex;
  align-items: center;
  color: #ffffff;
  position: relative;
  min-width: 80px;
  min-height: 80px;
  font-size: 18px;
  line-height: 22px;
  cursor: pointer;

  img:first-of-type {
    height: 32px;
    width: 32px;
  }

  font-weight: 600;
  font-size: 17px;
  line-height: 26px;
`;

export const Chevron = styled.img`
  margin-left: 8px;
  width: 24px;
  height: 24px;
`;

export const TextContainer = styled.div`
  right: 40px;
  margin-left: 10px;

  @media ${devices.large} {
    margin-left: 12px;
  }
`;

export const ResultsPageWrapper = styled.div`
  position: absolute;
  display: flex;
  gap: 50px;
  right: -640px;

  p {
    margin: 0px;
    max-width: 110px;
    font-size: 12px;
    line-height: 18px;
    color: #ffffff;
    //text-shadow: 0px 4px 5px rgba(14, 56, 89, 0.55), 0px 4px 4px rgba(14, 56, 89, 0.25);
  }
  img {
    width: 159px;
    height: 34px;
  }
`;
