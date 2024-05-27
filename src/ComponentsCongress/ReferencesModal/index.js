import gsap from "gsap";
import React, { useLayoutEffect, useMemo } from "react";
import { useLocation } from "react-router";
import { useLanguage } from "../../contexts/LanguageContext";
import { dictionary } from "../../contexts/siteCongress";

import {
  CloseButton,
  Content,
  TopBar,
  TopBarBackground,
  Wrapper,
  Backdrop,
  Container,
} from "./styles";

export default function ReferencesModal({
  isOpen,
  setReferencesOpen,
  content,
}) {
  const { language } = useLanguage();
  const location = useLocation();
  const isHome = useMemo(() => {
    return location.pathname == "/";
  }, [location]);

  useLayoutEffect(() => {
    const isPortrait = process.env.REACT_APP_DEVICE == "portrait";

    var contentWrapper = document.getElementsByClassName("wrapper").length ? document.getElementsByClassName("wrapper")[0].clientHeight + 4 : "560px";

    if (isOpen) {
      if (isPortrait) {
        gsap.fromTo(
          "#references-wrapper",
          {
            height: 0,
            opacity: 0,
          },
          {
            height: contentWrapper,
            opacity: 1,
            duration: 0.5,
          }
        );
      } else {
        gsap.fromTo(
          "#references-wrapper",
          {
            top: "1000px",
            opacity: 0,
          },
          {
            top: "158px",
            opacity: 1,
            duration: 0.5,
          }
        );
      }
    }
  }, [isOpen]);

  const closeReferencesAnimation = () => {
    const isPortrait = process.env.REACT_APP_DEVICE == "portrait";
  
    var contentWrapper = document.getElementsByClassName("wrapper").length ? document.getElementsByClassName("wrapper")[0].clientHeight + 4 : "560px";

    if (isPortrait) {
      gsap.fromTo(
        "#references-wrapper",
        {
          height: contentWrapper,
          opacity: 0,
        },
        {
          height: 0,
          opacity: 1,
          duration: 0.5,
          onComplete: () => {
            setReferencesOpen((prev) => !prev);
          },
        }
      );
    } else {
      gsap.fromTo(
        "#references-wrapper",
        {
          top: "158px",
          opacity: 1,
        },
        {
          top: "1000px",
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            setReferencesOpen((prev) => !prev);
          },
        }
      );
    }
  };

  return  isOpen && !isHome ? (
    <Wrapper>
      <Backdrop></Backdrop>
      <Container id="references-wrapper" isOpen={isOpen}>
        <TopBar>
          <h2
            dangerouslySetInnerHTML={{
              __html: dictionary[language].footnotes.references,
            }}
          />
          <CloseButton
            data-test="ref-button-close"
            role="button"
            tabIndex="0"
            onKeyPress={() => closeReferencesAnimation()}
            onClick={() => closeReferencesAnimation()}
          ></CloseButton>
        </TopBar>
        {isOpen && (
          <Content dangerouslySetInnerHTML={{ __html: content }}></Content>
        )}
      </Container>
    </Wrapper>
  ) : null;
}
