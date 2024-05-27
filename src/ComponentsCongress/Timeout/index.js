import React, { useEffect } from "react";
import { useHistory } from "react-router";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "../../ComponentsCongress/Button";
import { dictionary } from "../../contexts/siteCongress";
import { swapName } from "../../utils";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  ButtonContainer,
  Circle,
  Content,
  CountdownWrapper,
  OrangeBorder,
  TimeDisplay,
  Wrapper,
} from "./styles";
import useCountdown from "../../hooks/useCountdown";

const COUNTDOWN_DURATION = 60; // duration in seconds

export default function Timeout({ name = "Mary", reset, setAnswers }) {
  const { language } = useLanguage();
  const history = useHistory();
  const { startCountdown, timeRemaining } = useCountdown(
    COUNTDOWN_DURATION,
    reset
  );

  useEffect(() => {
    startCountdown();
  }, []);

  return (
    <Wrapper>
      <Content>
        <h1>{swapName(dictionary[language].timeout.heading, name)}</h1>
        <p>{dictionary[language].timeout.para}</p>
        <CountdownWrapper>
          <div id="countdown">
            <TimeDisplay>
              <h2>{timeRemaining}</h2>
              <p>
                {timeRemaining > 1
                  ? dictionary[language].timeout.seconds
                  : dictionary[language].timeout.second}
              </p>
            </TimeDisplay>
            <Circle>
              <circle r="47%" cx="50%" cy="50%"></circle>
            </Circle>
            <OrangeBorder>
              <circle r="47%" cx="50%" cy="50%"></circle>
            </OrangeBorder>
          </div>
        </CountdownWrapper>
        <ButtonContainer>
          <ButtonPrimary
            onClick={() => {
              reset();
              setAnswers(null);
            }}
            data-test="restart-continue"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: "rotateY(180deg)" }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.6249 20.2929C15.2344 20.6834 15.2344 21.3166 15.6249 21.7071C16.0154 22.0976 16.6486 22.0976 17.0391 21.7071L22.3892 16.357C23.691 15.0553 23.691 12.9447 22.3892 11.643L17.0391 6.29289C16.6486 5.90237 16.0154 5.90237 15.6249 6.29289C15.2344 6.68342 15.2344 7.31658 15.6249 7.70711L20.9178 13H5.83203C5.27975 13 4.83203 13.4477 4.83203 14C4.83203 14.5523 5.27975 15 5.83203 15H20.9178L15.6249 20.2929Z"
                fill="currentColor"
              />
            </svg>
            <span>{dictionary[language].timeout.continue}</span>
          </ButtonPrimary>
          <ButtonSecondary
            includeIcon
            onClick={() => {
              reset();
              setAnswers(null);
              history.push("/");
            }}
          >
            <span>{dictionary[language].timeout.restart}</span>
          </ButtonSecondary>
        </ButtonContainer>
      </Content>
    </Wrapper>
  );
}

