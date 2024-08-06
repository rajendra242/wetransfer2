import styled from "styled-components";
import sanitizeHtml from "sanitize-html";
import CorrectIcon from "../../assets/images/correct-icon.png";
import IncorrectIcon from "../../assets/images/incorrect-icon.png";
import { dictionary } from "../../contexts/siteCongress";
import { useLanguage } from "../../contexts/LanguageContext";
import { swapName } from "../../utils";

export default function ExplanationContent({ isCorrectAnswer, content }) {
  return (
    <>
      <Heading isCorrect={isCorrectAnswer} />
      <Content
        className="answer-explanation"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(content, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat([
              "img",
              "button",
              "small",
            ]),
            allowedClasses: {
              div: ["flex-*", "gap-*", "popup-*"],
              img: ["popup-image"],
              p: ["text-*", "m*"],
              ul: ["text-*"],
              button: ["popup-*"],
              small: ["mt-*"],
            },
          }),
        }}
      ></Content>
    </>
  );
}

const Heading = ({ isCorrect }) => {
  const { language } = useLanguage();

  return (
    <HeadingWrapper>
      <img
        alt=""
        src={isCorrect ? CorrectIcon : IncorrectIcon}
        width="57"
        height="57"
      />
      <span
        dangerouslySetInnerHTML={{
          __html: isCorrect
            ? dictionary[language].explanation.correct
            : dictionary[language].explanation.incorrect,
        }}
      />
    </HeadingWrapper>
  );
};

const HeadingWrapper = styled.h2`
  display: flex !important;
  margin-bottom: 28px !important;
  align-items: center;
  gap: 28px;
  font-size: 30px !important;

  @media only screen and (min-width: 810px) and (max-width: 1080px) and (orientation: landscape) {
    margin-bottom: 10px !important;
  }

  span {
    font-weight: 400;

    strong {
      font-weight: 700;
    }
  }
`;

const Content = styled.div`
  font-size: 20px;

  p {
    font-size: 14px;
    line-height: 29px;
  }

  strong {
    font-weight: 700;
  }

  small {
    font-size: 12px;
    display: block;
    margin-top: 28px;
    font-weight: 400;

    span {
      display: block;
      margin: 0px;
    }
  }
  @media only screen and (min-width: 1024px) and (max-width: 1366px) and (orientation: landscape) {
    p {
      font-size: 16px;
      margin-bottom: 5px;
    }

    small {
      margin-top: 18px;
    }

    .answer-explanation {
      flex-grow: unset;
    }
  }

  @media only screen and (min-width: 810px) and (max-width: 1080px) and (orientation: landscape) {
    p {
      font-size: 16px;
      margin-bottom: 5px;
    }

    small {
      margin-top: 12px;
    }

    .answer-explanation {
      flex-grow: unset;
    }
  }
`;
