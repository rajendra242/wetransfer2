import styled from "styled-components";
import { devices, Container } from "../../stylesCongress";

export const Center = styled(Container)`
  position: relative;
  opacity: 1;
  height: unset;
  padding-inline: 0px;
  background: none;
  backdrop-filter: none;
`;

export const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  height: 24px;
  border-radius: 8px;
  z-index: 1;
`;

const CONNECTOR_WIDTH = 120;
const SIZE = {
  WIDTH: {
    OPEN: 40,
    CLOSED: 16,
  },
  HEIGHT: {
    OPEN: 24,
    CLOSED: 16,
  },
  BORDER_WIDTH: 2,
};

const GAP_BETWEEN_QUESTIONS = CONNECTOR_WIDTH + SIZE.BORDER_WIDTH;

export const Indicator = styled.div`
  position: relative;
  border: ${(props) =>
    props.status === "none"
      ? `${SIZE.BORDER_WIDTH}px solid #E6E0D0`
      : `${SIZE.BORDER_WIDTH}px solid #c04c1c`};
  border-radius: 100px;
  height: ${(props) =>
    props.status === "none"
      ? `${SIZE.HEIGHT.CLOSED}px`
      : `${SIZE.HEIGHT.OPEN}px`};
  width: ${(props) =>
    props.status === "none"
      ? `${SIZE.WIDTH.CLOSED}px`
      : `${SIZE.WIDTH.OPEN}px`};
  background-color: ${(props) =>
    props.status === "none" || props.status === "active"
      ? `#f8f6f5`
      : `#c04c1c`};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${(props) =>
    props.status === "none"
      ? `${CONNECTOR_WIDTH}px`
      : `${CONNECTOR_WIDTH - SIZE.WIDTH.CLOSED}px`};

  @media ${devices.PORTRAIT} {
    margin-right: ${(props) => (props.status === "none" ? "139px" : "114px")};
  }

  @media only screen and (max-width: 480px) {
    margin-right: ${(props) => (props.status === "none" ? `76px` : `60px`)};

    &:last-child {
      margin-right: 0;
    }

    &:not(:first-child) {
      left: 60px
    }
  }

  &:not(:first-child) {
    &:before {
      content: "";
      width: 120px;
      height: 2px;
      background: #e6e0d0;
      position: absolute;
      left: ${`-${GAP_BETWEEN_QUESTIONS}px`};
      background: ${(props) =>
        props.status === "none" ? "#EFECE3" : "#c04c1c"};
      z-index: -1;

      @media ${devices.PORTRAIT} {
        width: 140px;
        left: -140px;
      }
    }
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c04c1c;

  img {
    width: 16px;
    height: 16px;
  }

  svg {
    width: 17px;
    height: 10px;
  }
`;
