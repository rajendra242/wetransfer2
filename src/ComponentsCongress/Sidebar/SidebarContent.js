import { ButtonPrimary, ButtonSecondary } from "../Button";
import ExplanationContent from "./ExplanationContent";
import ReferencesContent from "./ReferencesContent";

export default function SidebarContent({
  referencesOpen,
  setReferencesOpen,
  content,
  showAnswerExplanation,
  isCorrectAnswer,
  explanationContent,
  goToNextQuestion,
}) {
  return (
    <>
      {referencesOpen ? (
        <>
          <ReferencesContent content={content} />
          <ButtonPrimary
            onClick={() => setReferencesOpen(false)}
            style={{ paddingInline: "32px 56px" }}
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

            <span>Back</span>
          </ButtonPrimary>
        </>
      ) : showAnswerExplanation ? (
        <>
          <ExplanationContent
            isCorrectAnswer={isCorrectAnswer}
            content={explanationContent}
          />
          {isCorrectAnswer ? (
            <ButtonSecondary includeIcon onClick={goToNextQuestion}>
              <span>Continue</span>
            </ButtonSecondary>
          ) : (
            <ButtonPrimary includeIcon onClick={goToNextQuestion}>
              <span>Continue</span>
            </ButtonPrimary>
          )}
        </>
      ) : null}
    </>
  );
}
