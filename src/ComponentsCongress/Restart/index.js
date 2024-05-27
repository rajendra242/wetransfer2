import gsap from "gsap/gsap-core";
import React, { useEffect, useLayoutEffect } from "react";
import TagManager from "react-gtm-module";
import { useHistory } from "react-router-dom";
import { dictionary } from "../../contexts/siteCongress";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "../../ComponentsCongress/Button";
import { useLanguage } from "../../contexts/LanguageContext";
import { ButtonsContainer, MainWrapper, RestartWrapper } from "./styles";
import RestartIcon from "../../assets/images/restart-icon-orange.png";
import ArrowLeft from "../../assets/images/arrow-left.png";

export default function Restart({
  setShowRestartModal,
  name = "Mary",
  resetProgress,
}) {
  const { language } = useLanguage();
  const history = useHistory();

  // useLayoutEffect(() => {
  //   gsap.fromTo(".fadeIn", { autoAlpha: 0 }, { autoAlpha: 1, stagger: 0.2 });
  // }, [])

  useEffect(() => {
    if (!name) {
      history.push("/");
    }
  }, [name, history]);

  return !name ? null : (
    <MainWrapper data-test="restart-modal">
      <RestartWrapper>
        <h1 className="fadeIn">{dictionary[language].restart.heading}</h1>
        <p className="fadeIn">{dictionary[language].restart.copy}</p>
        <ButtonsContainer>
          <ButtonPrimary
            data-test="continue-btn"
            onClick={() => {
              // analytics for clicking no button
              // const tagManagerArgs = {
              //   dataLayer: {
              //     event: "gaQuizEvent",
              //     eventAction: `${name}`,
              //     eventLabel: `Restart Button - No`,
              //   },
              // };
              // TagManager.dataLayer(tagManagerArgs);

              setShowRestartModal(false);
              //history.goBack();
            }}
          >
            <img src={ArrowLeft} alt="" />
            <span>{dictionary[language].restart.continueBtn}</span>
          </ButtonPrimary>

          <ButtonSecondary
            data-test="restart-button-true"
            onClick={() => {
              // analytics for clicking no button
              // const tagManagerArgs = {
              //   dataLayer: {
              //     event: "gaQuizEvent",
              //     eventAction: `${name}`,
              //     eventLabel: `Restart Button - Yes`,
              //   },
              // };
              // TagManager.dataLayer(tagManagerArgs);
              setShowRestartModal(false);
              resetProgress();
            }}
          >
            <span>{dictionary[language].restart.restartBtn}</span>
            <img src={RestartIcon} alt="" />
          </ButtonSecondary>
        </ButtonsContainer>
      </RestartWrapper>
    </MainWrapper>
  );
}

