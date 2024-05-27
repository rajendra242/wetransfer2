import gsap from "gsap/gsap-core";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { scrollToTop } from "../../utils";
import { dictionary, usePatients } from "../../contexts/siteCongress";
import { IntroContainer, IntroWrapper, JobCode } from "./styles";
import { useLanguage } from "../../contexts/LanguageContext";
import ApellisLogo from "../../assets/images/apellis-logo.png";
import { useAnalytics } from "../../hooks/useAnalytics";
import { ButtonPrimary } from "../Button";
import { useScreensaver } from "../../hooks/useScreensaver";

export default function Intro({ setName, screensaverContent }) {
  const { language } = useLanguage();
  const patients = usePatients();
  const history = useHistory();
  const { sendQuizStartEvent } = useAnalytics();

  useEffect(() => {
    setName(null);
  }, [setName]);

  useEffect(() => {
    const elements = [...document.querySelectorAll(".fadeInUp")];

    const textAnimation = gsap.fromTo(
      elements,
      { autoAlpha: 0, y: -50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
      }
    );

    return () => {
      textAnimation.kill();
    };
  }, []);

  const fadeOutAnimation = () => {
    scrollToTop();
    gsap.to(".fadeOut", {
      duration: 1,
      opacity: 0,
      onComplete: () => {
        if (patients.length == 1) {
          const { name } = patients[0];

          // send GA event for quiz start and navigate to the first question
          setName(name);
          sendQuizStartEvent();
          history.push(`/${name}/0`);
        }
      },
    });
  };

  return (
    <IntroContainer
      hasGradient={screensaverContent.gradient}
      image={screensaverContent.image}
      isHomepage={true}
      className="fadeOut"
    >
      <IntroWrapper>
        <h1
          className="fadeInUp fadeOut"
          dangerouslySetInnerHTML={{
            __html: screensaverContent.heading,
          }}
        />
        <h2
          className="fadeInUp fadeOut"
          dangerouslySetInnerHTML={{
            __html: screensaverContent.body,
          }}
        />
        <ButtonPrimary
          aria-label={screensaverContent.ctaCopy}
          className="fadeInUp fadeOut"
          onClick={() => fadeOutAnimation()}
          includeIcon
        >
          <span>{screensaverContent.ctaCopy}</span>
        </ButtonPrimary>
      </IntroWrapper>
      <img className="fadeInUp fadeOut" src={ApellisLogo} alt="Apellis logo" />
      <JobCode className="fadeInUp fadeOut">
        <span
          dangerouslySetInnerHTML={{
            __html: dictionary[language].intro.copyright,
          }}
        ></span>
        <span>
          {dictionary[language].intro.jobCode}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {dictionary[language].intro.dop}
        </span>
      </JobCode>
    </IntroContainer>
  );
}
