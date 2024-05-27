import { useLayoutEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Modal from "../Modal";
import DownscaleIcon from "../../assets/images/downscale-icon.png";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import DE_Q7 from "../../assets/images/explanation/de/q7_expanded.png";
import DE_Q8 from "../../assets/images/explanation/de/q8_expanded.png";
import DE_Q9 from "../../assets/images/explanation/de/q9_expanded.png";
import { ButtonPrimary } from "../Button";
import { devices } from "../../stylesCongress";

// separate map for images based on which current quiz question you are on
// used to just pass the image source, but images in popup are sometimes different to images on answer explanation
const POPUP_IMAGES = {
  4: {
    src: DE_Q7,
    width: 1231,
    height: 344,
    small: {
      width: 700,
      height: 344,
      // width: 1539,
      // height: 430,
    },
  },
  7: {
    src: DE_Q7,
    width: 1231,
    height: 344,
    small: {
      width: 1231,
      height: 344,
      // width: 1539,
      // height: 430,
    },
  },
  8: {
    src: DE_Q8,
    width: 1189,
    height: 657,
    small: {
      // width: 1486,
      // height: 821,
      width: 1189,
      height: 657,
    },
  },
  9: {
    src: DE_Q9,
    width: 943,
    height: 622,
    small: {
      // width: 1179,
      // height: 778,
      width: 943,
      height: 622,
    },
  },
};

const PORTRAIT_POPUP_IMAGES = {
  4: {
    src: DE_Q7,
    containerHeight: 713,
  },
  5: {
    src: DE_Q8,
    containerHeight: 713,
  },
  6: {
    src: DE_Q9,
    containerHeight: 751,
  },
};

export default function ImagePopup({ currentQuestion = 1, close, isOpen }) {
  const image = useMemo(() => {
    if (process.env.REACT_APP_DEVICE == "portrait") {
      return PORTRAIT_POPUP_IMAGES[currentQuestion];
    }
    return POPUP_IMAGES[currentQuestion];
  }, [currentQuestion]);

  const { width, height } = useWindowDimensions();

  const [containerHeight, setContainerHeight] = useState(null);

  // set height of the wrapper to be same height as the question / explanation box;
  useLayoutEffect(() => {
    const contentWrapper = [...document.getElementsByClassName("wrapper")];

    if (contentWrapper && contentWrapper.length > 0) {
      if (contentWrapper[0].offsetHeight) {
        setContainerHeight(contentWrapper[0].offsetHeight);
      }
    }
  }, [isOpen]);

  return (
    <Modal isOpen={true}>
      <Backdrop onClick={close}></Backdrop>
      <Wrapper
        containerHeight={
          process.env.REACT_APP_DEVICE == "portrait" && image.containerHeight
        }
      >
        <CloseButton close={close} />
        {image ? (
          process.env.REACT_APP_DEVICE == "portrait" ? (
            <img src={image.src} alt="" />
          ) : (
            <img
              src={image.src}
              alt=""
              width={width < 1920 ? image.small.width : image.width}
              height={width < 1920 ? image.small.height : image.height}
            />
          )
        ) : null}
        <BackButton onClick={close}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.5743 20.2929C12.9648 20.6834 12.9648 21.3166 12.5743 21.7071C12.1838 22.0976 11.5506 22.0976 11.1601 21.7071L5.80999 16.357C4.50825 15.0553 4.50825 12.9447 5.81 11.643L11.1601 6.29289C11.5506 5.90237 12.1838 5.90237 12.5743 6.29289C12.9648 6.68342 12.9648 7.31658 12.5743 7.70711L7.2814 13H22.3672C22.9195 13 23.3672 13.4477 23.3672 14C23.3672 14.5523 22.9195 15 22.3672 15H7.2814L12.5743 20.2929Z"
              fill="white"
            />
          </svg>
          <span>Back</span>
        </BackButton>
      </Wrapper>
    </Modal>
  );
}

const CloseButton = ({ close }) => {
  return (
    <Button
      onClick={close}
      aria-label="Close image popup"
      data-test="close-popup-image"
    >
      <img src={DownscaleIcon} />
    </Button>
  );
};

const Wrapper = styled.div`
  margin: 76px 100px;
  background-color: white;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 928px;
  position: relative;
  border-bottom: 3px solid #ff681d;

  @media (max-width: 1366px) {
    width: 110%;
    height: 110%;
  }

  @media ${devices.PORTRAIT} {
    width: unset;
    max-height: 800px;
    height: ${({ containerHeight }) => `${containerHeight}px`};
    margin: 0px;
    margin-inline: 70px;
    bottom: 773px;
    position: absolute;
    padding-inline: 40px;

    > img {
      width: 100%;
    }
  }
`;

const Button = styled.button`
  box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3),
    0px 2px 6px 2px rgba(60, 64, 67, 0.15);
  position: absolute;
  top: 16px;
  right: 16px;
  border: none;
  padding: 0;
  margin: 0;
  background-color: #ffffff;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    width: 24px;
    height: 24px;
  }
`;

const Backdrop = styled.div`
  background-color: rgba(3, 33, 44, 0.5);
  position: absolute;
  inset: 0;

  @media (max-width: 1366px) {
    inset: -350px;
  }
`;

const BackButton = styled(ButtonPrimary)`
  padding-inline: 32px 56px;
  width: 312px;
  height: 60px;
  position: absolute;
  bottom: 40px;

  span {
    width: 180px;
  }
`;
