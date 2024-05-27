import React, { useEffect, useState } from "react";
import TagManager from "react-gtm-module";
import { useHistory } from "react-router";
import styled from "styled-components";
import { ButtonPrimary } from "../../ComponentsCongress/Button";
import { Container, ContentWrapper, devices } from "../../stylesCongress";
import { getChunks } from "../../utils";
import {
  Cell,
  Column,
  PatientDetails,
  Row,
  Stats,
  StatsTitle,
} from "../PatientSelector";

export default function Intersection({
  patientName,
  setName,
  details,
  active,
}) {
  const [tab, setTab] = useState(0);
  const history = useHistory();

  useEffect(() => {
    setName(patientName);
  }, [patientName, setName]);

  return (
    <Container>
      <IntersectionWrapper>
        <TabWrapper>
          {details.stats.map(({ tabLabel }, index) => {
            return (
              <TabButton
                key={tabLabel}
                isActive={index === tab}
                onClick={() => {
                  const tagManagerArgs = {
                    dataLayer: {
                      event: "gaQuizEvent",
                      eventAction: `${patientName}`,
                      eventLabel: `Intersection - ${tabLabel}`,
                    },
                  };
                  TagManager.dataLayer(tagManagerArgs);
                  setTab(index);
                }}
              >
                {tabLabel}
              </TabButton>
            );
          })}
        </TabWrapper>
        <PatientDetails>
          <StatsTitle>{details.stats[tab].subTitle}</StatsTitle>
          <Stats>
            {getChunks(details.stats[tab].rows, 3).map(
              (column, columnIndex) => {
                return (
                  <Column key={`column-${columnIndex}`}>
                    {column.map((stat, index) => {
                      return (
                        stat.key.toLowerCase() !== "comorbidities" && (
                          <Row
                            className="fadeIn fadeOut"
                            key={`${stat.key}-${columnIndex}-${index}`}
                          >
                            <Cell className="fadeIn fadeOut">{stat.key}</Cell>
                            <Cell className="fadeIn fadeOut">
                              {typeof stat.value === "string" ? (
                                stat.value
                              ) : (
                                <ul
                                  style={{ padding: "0px", marginLeft: "15px" }}
                                >
                                  {stat.value.map((item, index) => {
                                    return <li key={index}>{item}</li>;
                                  })}
                                </ul>
                              )}
                            </Cell>
                          </Row>
                        )
                      );
                    })}
                  </Column>
                );
              }
            )}
          </Stats>
        </PatientDetails>
        <AnswerButton
          light
          onClick={() =>
            history.push(`/${patientName}/${active === 7 ? "8" : active}`)
          }
        >
          Back to question
          <img alt="arrow facing left" src="./arrow_left.svg" />
        </AnswerButton>
      </IntersectionWrapper>
    </Container>
  );
}

const IntersectionWrapper = styled(ContentWrapper)`
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

  ${StatsTitle} {
    font-size: 21px;
    margin-top: 15px;
  }

  ${PatientDetails} {
    background-color: rgb(99, 116, 130);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    margin-bottom: 30px;
  }
`;

const TabWrapper = styled.div`
  display: flex;
`;

const TabButton = styled.button`
  background-color: ${({ isActive }) =>
    isActive ? "rgb(99, 116, 130)" : "rgba(0, 94, 161, 0.6)"};
  color: ${({ theme }) => theme.light};
  width: 100%;
  appearance: none;
  border-right: ${({ isActive }) =>
    isActive ? "none;" : "2px solid #62717E;"};
  border-top: none;
  border-left: none;
  border-bottom: none;
  padding: 23px;
  font-weight: ${({ theme }) => theme.bold};

  &:first-child {
    border-top-left-radius: 8px;
  }

  &:last-child {
    border-top-right-radius: 8px;
    border-right: none;
  }
`;

const AnswerButton = styled(ButtonPrimary)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 5px 0px 15px;
  margin: 0 auto;

  img {
    height: 25px;
    width: 25px;
  }
`;
