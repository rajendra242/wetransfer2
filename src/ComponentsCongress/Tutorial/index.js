import gsap from "gsap/gsap-core";
import React, { useEffect, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Container, ContentWrapper, devices } from "../../stylesCongress";
import { ButtonSecondary } from "../../ComponentsCongress/Button";
import { scrollToTop } from "../../utils";
import { dictionary } from "../../contexts/siteCongress";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Tutorial({ name, patientName, setName }) {
  const { language } = useLanguage();
  const history = useHistory();

  useLayoutEffect(() => {
    gsap.fromTo(
      ".fadeIn",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1, stagger: 0.1 }
    );
  }, []);

  useEffect(() => {
    setName(patientName);
  }, [setName, patientName]);

  const fadeOut = (location) => {
    gsap.fromTo(
      ".fadeOut",
      { autoAlpha: 1 },
      {
        autoAlpha: 0,
        duration: 0,
        onComplete: () => history.push(location),
      }
    );
  };

  return (
    <Container>
      <TutorialWrapper>
        <Content>
          <p className="fadeIn fadeOut">
            {`To support her hospital exit, you must make 10 decisions ahead of ${name}'s surgery — every decision you make in the pre-operative stage will impact Mary's outcomes and how quickly she can go home.`}
          </p>
          <p className="fadeIn fadeOut">
            {dictionary[language].start.paragraph1}
          </p>
        </Content>
        <div>
          <TreatButton
            onClick={() => {
              fadeOut(`/${name}/0`);
              scrollToTop();
            }}
          >
            <span>{dictionary[language].start.cta}</span>
          </TreatButton>
        </div>
      </TutorialWrapper>
    </Container>
  );
}

const TutorialWrapper = styled(ContentWrapper)`
  text-align: center;

  h1 {
    color: ${({ theme }) => theme.primary};
    display: inline-block;
    font-size: 22px;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: 0px;
    text-align: center;
    text-transform: uppercase;

    @media ${devices.M} {
      font-size: 26px;
      line-height: 30px;
    }

    @media ${devices.L} {
      //max-width: 442px;
    }
  }

  p {
    font-size: 16px;
    line-height: 30px;
    font-weight: 400;
    margin-bottom: 15px;
    color: #3b2b2b;

    @media ${devices.M} {
    }

    @media ${devices.L} {
    }
  }
`;

const Content = styled.div`
  text-align: left;
  margin-bottom: 30px;
  text-align: center;
`;

const TreatButton = styled(ButtonSecondary)``;
