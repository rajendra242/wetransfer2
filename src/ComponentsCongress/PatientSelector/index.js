import gsap from "gsap/gsap-core";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Container, ContentWrapper, devices } from "../../stylesCongress";
import { ButtonSecondary } from "../../ComponentsCongress/Button";
import { getChunks, scrollToTop } from "../../utils";
import { usePatients, dictionary } from "../../contexts/siteCongress";

import TagManager from "react-gtm-module";
import { useLanguage } from "../../contexts/LanguageContext";

export default function PatientSelector({ setName, setVideoSrc }) {
  const { language } = useLanguage();
  const [selected, setSelected] = useState(0);
  const patients = usePatients();
  const history = useHistory();

  useEffect(() => {
    // analytics event for page load
    const tagManagerArgs = {
      dataLayer: {
        event: "gaQuizEvent",
        eventAction: "Select Your Patient",
        eventLabel: "Step 2 - Select Your Patient",
      },
    };
    TagManager.dataLayer(tagManagerArgs);
  }, []);

  useEffect(() => {
    setName(null);
  }, [setName]);

  const selectPatient = () => {
    setName(patients[selected].name);

    // analytics event for clicking submit after selecting a patient
    const tagManagerArgs = {
      dataLayer: {
        event: "gaQuizEvent",
        eventAction: `${patients[selected].name}`,
        eventLabel: `Step 3 - Patient Selected - ${patients[selected].name}`,
      },
    };
    TagManager.dataLayer(tagManagerArgs);

    //history.push(`/${patients[selected].name}/tutorial`);
    history.push(`/${patients[selected].name}/0`);
  };

  const enterRightAnimation = () => {
    gsap.fromTo(".fadeOut", { x: 30 }, { x: 0, autoAlpha: 1, stagger: 0.05 });
  };

  useLayoutEffect(() => {
    gsap.fromTo(".fadeIn", { autoAlpha: 0 }, { autoAlpha: 1, stagger: 0.05 });
  }, []);

  // change the intro animation when the user selects a different patient
  useEffect(() => {
    setVideoSrc(`./videos/${patients[0].name}_door-1_idle-1.mp4`);
  }, [selected, patients, setVideoSrc]);

  const fadeOutAnimation = (index) => {
    // show correct patient animation video for the selected patient
    gsap.to(".fadeOut", {
      autoAlpha: 0,
      onComplete: (index) => {
        setSelected(index);
        enterRightAnimation();
      },
      onCompleteParams: [index],
    });
  };

  const onSelect = () => {
    const timeline = gsap.timeline({ repeat: 0, repeatDelay: 0 });
    const elements = [...document.querySelectorAll(".moveUp")].reverse();

    // fade out text elements
    const animation = timeline.fromTo(
      elements,
      { autoAlpha: 1, y: 0 },
      {
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.1,
      }
    );

    // change state so the button animation plays
    animation
      .then(() => {
        scrollToTop();
      })
      .then(() =>
        // wait for animation to play, then go to tutorial page
        setTimeout(() => {
          selectPatient();
        }, 1000)
      );
  };

  const patient = patients[selected];
  return (
    <Container>
      <Wrapper className="fadeIn wrapper">
        <div>
          <IconContainer className="moveUp">
            {patients.map((patient, index) => {
              return (
                <PatientIcon
                  aria-label={patient.name}
                  key={`patient-select-${index}`}
                  onClick={() => fadeOutAnimation(index)}
                  selected={index === selected}
                  image={patient.profilePic}
                ></PatientIcon>
              );
            })}
          </IconContainer>
          <Title className="fadeIn moveUp">Select your patient</Title>
          <PatientDetails className="moveUp">
            <StatsTitle className="fadeIn fadeOut">
              {patient.details.title}*
            </StatsTitle>
            <Stats className="fadeIn fadeOut">
              {getChunks(patient.details.stats[0].rows, 3).map(
                (column, columnIndex) => {
                  return (
                    <Column key={`column-${columnIndex}`}>
                      {column.map((stat, index) => {
                        return (
                          <Row
                            className="fadeIn fadeOut"
                            key={`${stat.key}-${index}`}
                          >
                            <Cell>{stat.key}</Cell>
                            <Cell>
                              {typeof stat.value === "string" ? (
                                stat.value
                              ) : (
                                <ul>
                                  {stat.value.map((item, index) => {
                                    return <li key={index}>{item}</li>;
                                  })}
                                </ul>
                              )}
                            </Cell>
                          </Row>
                        );
                      })}
                    </Column>
                  );
                }
              )}
            </Stats>
          </PatientDetails>
          <Disclaimer className="moveUp">*Not a real patient.</Disclaimer>
          <ButtonWrapper className="select-button">
            <ButtonSecondary onClick={() => onSelect()}>
              <span>{dictionary[language].buttons.select}</span>
            </ButtonSecondary>
          </ButtonWrapper>
        </div>
      </Wrapper>
    </Container>
  );
}

const Wrapper = styled(ContentWrapper)`
  text-align: center;
  position: relative;
  padding-bottom: 95px;
`;

const PatientIcon = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  appearance: none;
  cursor: pointer;
  border: none;
  margin: 5px;
  opacity: ${({ selected }) => (selected ? 1 : 0.5)};
  background: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  box-shadow: ${({ selected }) =>
    selected &&
    "0 2px 6px 2px rgba(60, 64, 67, 0.15), 0 1px 2px 0 rgba(60, 64, 67, 0.3)"};
  &:hover {
    box-shadow: 0 1px 3px 1px rgba(60, 64, 67, 0.15),
      0 1px 2px 0 rgba(60, 64, 67, 0.3);
    opacity: 1;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 21px;
  line-height: 1.48;
  font-weight: normal;
  color: #505d68;

  @media ${devices.M} {
    font-size: 24px;
    line-height: 1.58;
  }

  @media ${devices.L} {
    font-size: 28px;
    line-height: 1.36;
  }
`;

export const Cell = styled.div`
  width: 100%;

  ul {
    padding-left: 20px;
  }
  ul li {
    list-style-type: disc;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media ${devices.S} {
    &:not(:last-child) {
      border-bottom:1px solid ${({ theme }) => theme.light};
    }
  }
  
  }


  @media ${devices.M} {
    width: calc(50% - 15px);

    &:not(:last-child) {
      margin-right: 15px;
    }
  }

  @media ${devices.S} {
    ${Cell}:first-child {
      border-bottom: none;
    }

  }
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
`;

export const Stats = styled.div`
  width: 100%;
  border-collapse: collapse;
  display: flex;
  flex-direction: column;

  @media ${devices.S} {
    font-size: 14px;
  }

  @media ${devices.M} {
    flex-direction: row;
  }

  ${Cell} {
    padding: 15px 0;
  }

  ${Row}:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.light};
  }

  ${Cell}:first-child {
    font-weight: bold;
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: calc(100% - 95px);
  left: 0;
  right: 0;
  display: flex;
`;

export const PatientDetails = styled.div`
  background-color: rgb(222, 225, 228);
  border-radius: 8px;
  padding: 15px 15px 0;
  text-align: left;
`;

export const StatsTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 21px;
  line-height: 1.48;

  @media ${devices.M} {
    font-size: 24px;
    line-height: 1.58;
  }

  @media ${devices.L} {
    font-size: 28px;
    line-height: 1.5;
  }
`;

const Disclaimer = styled.p`
  text-align: left;
  font-size: 12px;
  margin-top: 10px;
`;
