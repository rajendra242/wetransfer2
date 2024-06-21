import gsap from "gsap/gsap-core";
import React, { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { dictionary } from "../../contexts/siteCongress";
import useProgress from "../../hooks/useProgress";
import { ButtonPrimary } from "../Button";
import RestartIcon from "../../assets/images/restart-icon.png";
import { QRContent, ResultsContainer, ResultsWrapper } from "./styles";
import QRCode from "../../assets/images/qr-code-3.png";
import { useAnalytics } from "../../hooks/useAnalytics";

export default function Results({
  setActive,
  name,
  setName,
  answers = [],
  questions = [],
  resetProgress,
}) {
  const { language } = useLanguage();
  const { score, max } = useProgress(answers, questions);
  const [message, setMessage] = useState("");
  const { sendQuizEndEvent } = useAnalytics();

  // when you first land on the results page, if all the questions are answered send a GA event for quiz ended
  useEffect(() => {
    sendQuizEndEvent(score);
  }, []);

  useEffect(() => {
    setActive("results");
  }, [setActive]);

  useEffect(() => {
    setName(name);
  }, [setName, name]);

  useEffect(() => {
    gsap.fromTo(".fadeIn", { autoAlpha: 0 }, { autoAlpha: 1, stagger: 0.1 });
  }, []);

  useEffect(() => {
    if (score <= 3) {
      setMessage(dictionary[language].resultsPage.negative);
    } else {
      setMessage(dictionary[language].resultsPage.positive);
    }
  }, [score, name]);

  return (
    <ResultsContainer className="fadeIn">
      <ResultsWrapper>
        <div>
          <h1 className="fadeIn">
            {dictionary[language].resultsPage.youScored}{" "}
            <span>
              {score} {dictionary[language].resultsPage.outOf} {max}
            </span>{" "}
            {dictionary[language].resultsPage.points}
          </h1>
          <h2>{message}</h2>
          <ButtonPrimary onClick={resetProgress}>
            <span>{dictionary[language].resultsPage.tryAgain}</span>
            <img src={RestartIcon} />
          </ButtonPrimary>
        </div>
        <QRContent>
          <div>
            <img src={QRCode} alt="QR code" />
            <p
              dangerouslySetInnerHTML={{
                __html: dictionary[language].resultsPage.qrCodeLabelOne,
              }}
            />
          </div>
        </QRContent>
      </ResultsWrapper>
    </ResultsContainer>
  );
}
