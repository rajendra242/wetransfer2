import React, { useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Container, ContentWrapper, devices } from "../../stylesCongress";
import { ButtonPrimary } from "../../ComponentsCongress/Button";
import { getChunks } from "../../utils";
import { dictionary } from "../../contexts/siteCongress";
import {
  PatientDetails,
  StatsTitle,
  Stats,
  Row,
  Cell,
  Column,
} from "../PatientSelector";
import { useLanguage } from "../../contexts/LanguageContext";

export default function PatientDetailsPage({
  details,
  name,
  patientName,
  questions,
}) {
  const { language } = useLanguage();
  const [answers] = useLocalStorage(`answer-${patientName}`, false);
  const history = useHistory();

  useEffect(() => {
    // If not coming from the game, but have previously saved answers for the patient
    if (!name && answers) {
      // Get the last question related to the patient the user answered

      const lastProgress = Object.keys(answers)
        .reverse()
        .find((key) => {
          return answers[key];
        });

      let redirectPath = `tutorial`;
      if (lastProgress) {
        // next question quesiton needs answering
        redirectPath = `${parseInt(lastProgress) + 1}`;
      }
      if (
        lastProgress &&
        Object.keys(answers).findIndex((key) => key === lastProgress) ===
          questions.length - 1
      ) {
        redirectPath = `results`;
      }
      redirectPath = `/${patientName}/${redirectPath}`;

      history.replace(redirectPath);
    } else if (!name) {
      history.replace(`/${patientName}/tutorial`);
    }
  }, [name, answers, history, patientName, questions]);

  return (
    <Container>
      <PatientDetailsWrapper>
        <PatientDetails>
          <StatsTitle>{details.title}</StatsTitle>
          <Stats>
            {getChunks(details.stats[0].rows, 3).map((column, columnIndex) => {
              return (
                <Column key={`column-${columnIndex}`}>
                  {column.map((stat, index) => {
                    return (
                      <Row key={`${stat.key}-${index}`}>
                        <Cell>{stat.key}</Cell>
                        <Cell>
                          {typeof stat.value === "string" ? (
                            stat.value
                          ) : (
                            <ul style={{ padding: "0px", marginLeft: "15px" }}>
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
            })}
          </Stats>
        </PatientDetails>
        <BackButton light onClick={history.goBack}>
          <span>{dictionary[language].buttons.back}</span>
          <img alt="arrow pointing left" src="./arrow_left.svg" />
        </BackButton>
      </PatientDetailsWrapper>
    </Container>
  );
}

const PatientDetailsWrapper = styled(ContentWrapper)`
  background-color: rgba(65, 84, 100, 0.9);
  color: ${({ theme }) => theme.light};
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
      max-width: 442px;
    }
  }

  ${PatientDetails} {
    margin-bottom: 30px;
    background-color: rgb(99, 116, 130);
  }
`;

const BackButton = styled(ButtonPrimary)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 5px 0px 15px;
  margin: 0 auto;

  img {
    height: 25px;
    width: 25px;
    @media all and (-ms-high-contrast: none) {
      & {
        margin-top: 3px;
      }
    }
  }
`;
