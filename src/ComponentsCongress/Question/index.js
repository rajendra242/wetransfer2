import gsap from "gsap";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import sanitizeHtml from "sanitize-html";
import { scrollToTop, swapName } from "../../utils";
import useProgress from "../../hooks/useProgress";
import { Container, ProgressBarContainer, devices } from "../../stylesCongress";
import {
  AnswerExplanation,
  AnswerLabel,
  AnswerWrap,
  ExplanationTitle,
  FormOptions,
  QuestionPagination,
  QuestionSubtitle,
  QuestionTitle,
  Wrapper,
  Submit,
  ExplanationContent,
  ExplanationContinueButton,
  InnerWrapper,
} from "./styles";
import { dictionary } from "../../contexts/siteCongress";
import { useLanguage } from "../../contexts/LanguageContext";
import AnswerCorrect from "./thumbs_up.png";
import AnswerIncorrect from "./cross.png";
import { useAnalytics } from "../../hooks/useAnalytics";
import ProgressBar from "../ProgressBar";

const buttonStates = { INITIAL: "initial", SUCCESS: "success", FAIL: "fail" };

const { INITIAL, SUCCESS, FAIL } = buttonStates;

export default function Question({
  name,
  index,
  questions,
  answers,
  setAnswers,
  setActive,
  setName,
  setReferences,
  setAbbreviations,
  fullname,
  isHidden,
  setIsImagePopupOpen,
  active,
  showProgressBar,
  setShowAnswerExplanation,
  setIsCorrectAnswer,
  setExplanationContent,
}) {
  const { language } = useLanguage();
  const [canSubmit, setCanSubmit] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);
  const answerExplanation = useRef();
  const submitButton = useRef();
  const [buttonState, setButtonState] = useState(INITIAL);
  const history = useHistory();
  const { progress, score } = useProgress(answers, questions);
  const { sendAnswerQuestionEvent } = useAnalytics();

  // update footnotes for the current question
  useEffect(() => {
    setReferences([questions[index].questionReferences]);
    setAbbreviations([questions[index].questionAbbreviations]);
  }, [index, questions, setReferences, setAbbreviations, progress]);

  const onChange = useCallback(
    (event) => {
      const { type, checked, value } = event.target;
      const newValues = { ...answers };

      // checkboxes
      if (type === "checkbox") {
        // if there's no value attached to the key, create a new array
        if (!newValues[index]) {
          newValues[index] = [];
        }

        // if the target is checked push the array, if not remove it from the array
        checked
          ? newValues[index].push(value)
          : (newValues[index] = newValues[index].filter(
              (item) => item !== value
            ));
        setAnswers(newValues);
        return;
      }

      // on radiobutton save the value of the button
      newValues[index] = value;
      setAnswers(newValues);
    },
    [setAnswers, index, answers]
  );

  const isMultipleChoice = useMemo(() => {
    let nr = 0;

    // check if there's more than one right answer
    questions[index].answers.forEach((element) => {
      if (element.isRight) {
        nr += 1;
      }
    });

    return nr > 1;
  }, [index, questions]);

  const submit = useCallback(() => {
    submitButton.current.style.visibility = "hidden";

    const isRightAnswer = () => {
      // get submitted answers
      const submittedAnswer = answers[index];
      const possibleAnswers = questions[index].answers;

      // If simple radio buttons, check if the answer is right
      if (!isMultipleChoice) {
        return Boolean(possibleAnswers[submittedAnswer].isRight);
      }

      // if checkboxes get all right answers
      let rightAnswers = [];
      possibleAnswers.forEach((elem, index) => {
        if (elem.isRight) {
          rightAnswers.push(index.toString());
        }
      });

      // if user has the same amount of answers as the right answers
      if (rightAnswers.length === submittedAnswer.length) {
        // go through the submitted answers and filter them from possible answers
        submittedAnswer.forEach((elem) => {
          rightAnswers = rightAnswers.filter((right) => {
            return right !== elem;
          });
        });

        // if user got all right answers return true
        return rightAnswers.length === 0;
      }

      return false;
    };

    // send GA event for answering question correctly/incorrectly
    sendAnswerQuestionEvent(index + 1, isRightAnswer());

    // disable submit button
    setCanSubmit(false);

    // show explanation in the sidebar
    setShowAnswerExplanation(true);
    setIsCorrectAnswer(isRightAnswer());

    const explanationContent = sanitizeHtml(
      swapName(questions[index].explanation.body, fullname),
      {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([
          "img",
          "button",
        ]),
        allowedClasses: {
          div: ["flex-*", "gap-*", "popup-*"],
          img: ["popup-image"],
          p: ["text-*", "m*"],
          ul: ["text-*"],
          button: ["popup-*"],
        },
      }
    );

    setExplanationContent(explanationContent);

    /*



    // make answer explanation active
    // setShowExplanation(true);
    const timeline = gsap.timeline({ repeat: 0, repeatDelay: 0 });
    let elements;

    if (isRightAnswer()) {
      elements = [...document.querySelectorAll(".questionContent")].reverse();
    } else {
      elements = [
        ...document.querySelectorAll(".questionContent"),
        ".submit-button",
      ].reverse();
    }

    // fade out text elements
    const animation = timeline.fromTo(
      elements,
      { autoAlpha: 1, y: 0 },
      {
        autoAlpha: 0,
        duration: 0.5,
      }
    );

    animation.add(() => {
      if (isRightAnswer()) {
        // On right answer
        setButtonState(SUCCESS);
      }
    });

    // if answer is wrong, fade out white container box and contents
    if (!isRightAnswer()) {
      animation.to(
        ".wrapper",
        {
          height: document.getElementsByClassName("wrapper")[0].offsetHeight,
          duration: 0.5,
          onComplete: () => {
            submitButton.current.style.display = "none";
          },
        },
        `afterFadeout`
      );

      // update bg image if incorrect answer to show no lights
      gsap.fromTo(
        `#background-image`,
        { opacity: 1 },
        { opacity: 0, duration: 0.5, delay: 0.5 }
      );
    } else {
      animation.to(
        ".wrapper",
        {
          height: document.getElementsByClassName("wrapper")[0].offsetHeight,
          duration: 0.5,
          onComplete: () => {
            submitButton.current.style.display = "none";
          },
        },
        `afterFadeout`
      );

      // update lantern image if correct answer to show the lantern glowing brighter
      gsap.fromTo(
        `#bg-lantern`,
        { opacity: 0 },
        { opacity: 0.5, duration: 1, delay: 0.5 }
      );
    }

    // remove text elements
    animation.set(elements, { display: "none" });

    // after the animation
    if (!isRightAnswer()) {
      // scroll to top of the page if on mobile
      scrollToTop();

      // 1 second delay before showing the white answer explanation box after user answers incorrectly
      setTimeout(() => {
        setButtonState(FAIL);
        setShowExplanation(true);
        setReferences(questions[index].explanationReferences);
        setAbbreviations(questions[index].explanationAbbreviations);
      }, 1000);
    } else {
      animation.then(() => {
        setShowExplanation(true);
        setReferences(questions[index].explanationReferences);
        setAbbreviations(questions[index].explanationAbbreviations);

        // scroll to top of the page if on mobile (scroll after thumbs up animation if correct answer)
        scrollToTop();
      });
    }
    */
  }, [
    score,
    index,
    questions,
    answers,
    isMultipleChoice,
    setCanSubmit,
    name,
    setReferences,
    setAbbreviations,
  ]);

  useEffect(() => {
    let answerExplanationAnimation = gsap.timeline();
    let progressBarAnimation = gsap.timeline();

    if (showExplanation && answerExplanation.current) {
      if (progress[index] === "right") {
        answerExplanationAnimation.to(
          ".wrapper",
          {
            height: answerExplanation.current.offsetHeight + 60,
          },
          `growExplanation+=0.5`
        );
      } else if (progress[index] === "wrong") {
        answerExplanationAnimation.to(
          ".wrapper",
          {
            height: answerExplanation.current.offsetHeight + 60,
          },
          `growExplanation+=0.5`
        );
      }

      answerExplanationAnimation.then(() => {
        // add the wrapper (only needed for wrong answer because wrapper shouldn't fade out if answer is right, and it fades out for correct answer on firefox if not)
        if (progress[index] === "wrong") {
          answerExplanationAnimation.to(".wrapper", {
            // backgroundColor: "rgba(255, 255, 255)",
            //backgroundImage: "url('card-bg.gif')",
            // backgroundPosition: "bottom center",
            // backgroundRepeat: "repeat-x",
            // boxShadow:
            //   "0 4px 8px 2px rgba(60, 64, 67, 0.15), 0 1px 3px 0 rgba(60, 64, 67, 0.3)",
          });
        }

        // add the text content inside the wrapper
        answerExplanationAnimation.fromTo(
          ".answer-explanation > *",
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.5,
            stagger: 0.1,
          }
        );
        answerExplanationAnimation.to(
          ".answer-explanation",
          {
            autoAlpha: 1,
          },
          `growExplanation+=0.5`
        );
      });
    }

    return () => {
      answerExplanationAnimation.kill();
      progressBarAnimation.kill();
    };
  }, [showExplanation, progress, index]);

  useLayoutEffect(() => {
    gsap.fromTo(
      ".fadeIn",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
      }
    );
  }, []);

  useLayoutEffect(() => {
    // fade in text elements
    const elements = [...document.querySelectorAll(".fadeInDown")];

    const textAnimation = gsap.fromTo(
      elements,
      { autoAlpha: 0, y: -10 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
      }
    );

    textAnimation.then(() => {
      setButtonState(INITIAL);
    });

    // kill animation on unmount
    return () => {
      textAnimation.kill();
    };
  }, []);

  useEffect(() => {
    if (window.location.href.includes("Mary/0")) {
      setAnswers(null);
    }

    setActive(index);
  }, [setActive, index]);

  const goNext = () => {
    // analytics event for submitting answers to a question
    // const tagManagerArgs = {
    //   dataLayer: {
    //     event: "gaQuizEvent",
    //     eventAction: `${name}`,
    //     eventLabel: `Step ${5 + 2 * index} - ${name} - ${index} - ${
    //       progress[index] === "right" ? "Correct" : "Incorrect"
    //     }`,
    //   },
    // };
    // TagManager.dataLayer(tagManagerArgs);

    // before going to the next page fade out container
    const wrapperAnimation = gsap.to(".wrapper", {
      autoAlpha: 0,
      duration: 0.5,
    });
    gsap.to("#progress-bar-container", {
      autoAlpha: 0,
      duration: 0.5,
    });

    // after animation done
    wrapperAnimation.then(() => {
      // if there's another question go to the next question page
      // if it's the last question go to the results page
      if (index < questions.length - 1) {
        history.push(`/${name}/${index + 1}`);
      } else {
        history.push(`/${name}/results`);
      }
    });
    setReferences("");
    setAbbreviations("");
  };

  useEffect(() => {
    setName(name);
  }, [name, setName]);

  useEffect(() => {
    // if show explanation, set index to next question so the progress bar updates current question with tick/cross
    if (showExplanation) {
      setActive(index + 1);
    }
  }, [showExplanation, setActive, index]);

  useEffect(() => {
    if (showExplanation && answerExplanation.current) {
      answerExplanation.current.focus();
    }
  }, [showExplanation]);

  // when content loads, add click events to the scan images in the explanation that should open the image popup
  useEffect(() => {
    const images = [...document.querySelectorAll(".popup-img-container")];

    for (let i = 0; i < images.length; i++) {
      // find image button and attach the openImagePopup function to btn click
      const btn = images[i].querySelector("button");

      if (btn) {
        btn.addEventListener("click", () => setIsImagePopupOpen(true));
      }
    }

    return () => {
      for (let i = 0; i < images.length; i++) {
        images[i].removeEventListener("click", () => setIsImagePopupOpen(true));
      }
    };
  }, []);

  return (
    <Container
      style={{
        background: `linear-gradient(91deg, rgba(0, 0, 0, 0.68) 0.54%, rgba(0, 0, 0, 0.68) 72.02%, rgba(31, 31, 30, 0.00) 99.55%)`,
      }}
    >
      <InnerWrapper className="fadeIn">
        {/* {process.env.REACT_APP_DEVICE == "portrait" && showProgressBar ? ( */}
        {showProgressBar ? (
          <ProgressBarContainer id="progress-bar-container">
            <ProgressBar
              questions={questions}
              answers={answers}
              active={active}
              disabled={false}
            />
          </ProgressBarContainer>
        ) : null}
        <Wrapper
          className="wrapper"
          //isHidden={isHidden}
          isIncorrectAnswer={buttonState === FAIL}
        >
          <>
            <QuestionPagination
              className="questionContent"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(
                  dictionary[language].pagination.question +
                    ` ` +
                    (index + 1) +
                    ` ` +
                    dictionary[language].pagination.of
                ),
              }}
            />
            <QuestionTitle
              className="questionContent"
              dangerouslySetInnerHTML={{
                __html: swapName(questions[index].title, fullname),
              }}
            ></QuestionTitle>
            <QuestionSubtitle
              className="questionContent"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(
                  swapName(questions[index].subheading, fullname)
                ),
              }}
            ></QuestionSubtitle>
            <form>
              <FormOptions>
                {questions[index].answers.map(({ label }, answerIndex) => {
                  const value = answerIndex.toString();
                  const isChecked = () => {
                    if (!answers) {
                      return false;
                    }
                    // radio buttons
                    if (!isMultipleChoice) {
                      return Boolean(
                        answers[index] && answers[index].toString() === value
                      );
                    }

                    //checkboxes
                    return Boolean(
                      answers[index] &&
                        answers[index].find((elem) => elem === value)
                    );
                  };

                  const inputId = `answer-${index}-${answerIndex}`;

                  return (
                    <AnswerWrap
                      className="questionContent fadeInDown"
                      key={`question-${index}-${answerIndex}`}
                    >
                      <input
                        type={isMultipleChoice ? "checkbox" : "radio"}
                        name="question"
                        value={value}
                        checked={isChecked()}
                        onChange={onChange}
                        id={inputId}
                      />
                      <AnswerLabel
                        htmlFor={inputId}
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHtml(label),
                        }}
                      ></AnswerLabel>
                    </AnswerWrap>
                  );
                })}
              </FormOptions>
            </form>

            <Submit
              data-test="submit-button"
              id="submit-button"
              submitRef={(node) => (submitButton.current = node)}
              onClick={submit}
              disabled={
                !answers ||
                //!canSubmit ||
                (answers && !answers[index]) ||
                (isMultipleChoice && !answers[index].length)
              }
              disabledStyle={
                !answers ||
                (answers && (!answers[index] || answers[index].length === 0))
              }
              includeIcon={true}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: dictionary[language].buttons.select,
                }}
              />
            </Submit>

            {questions[index].explanation ? (
              <>
                <AnswerExplanation
                  aria-hidden={!showExplanation}
                  ref={(node) => (answerExplanation.current = node)}
                  className="answer-explanation"
                >
                  <ExplanationTitle data-test="explination-title">
                    <img
                      src={
                        buttonState === SUCCESS
                          ? AnswerCorrect
                          : AnswerIncorrect
                      }
                      alt=""
                    />
                    <span
                      dangerouslySetInnerHTML={{
                        __html:
                          buttonState === SUCCESS
                            ? dictionary[language].explanation.correct
                            : dictionary[language].explanation.incorrect,
                      }}
                    />
                  </ExplanationTitle>

                  <ExplanationContent
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(
                        swapName(questions[index].explanation.body, fullname),
                        {
                          allowedTags: sanitizeHtml.defaults.allowedTags.concat(
                            ["img", "button"]
                          ),
                          allowedClasses: {
                            div: ["flex-*", "gap-*", "popup-*"],
                            img: ["popup-image"],
                            p: ["text-*", "m*"],
                            ul: ["text-*"],
                            button: ["popup-*"],
                          },
                        }
                      ),
                    }}
                  ></ExplanationContent>
                  <ExplanationContinueButton
                    disabled={!showExplanation}
                    onClick={goNext}
                    includeIcon={true}
                    data-test="explanation-continue-btn"
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: dictionary[language].buttons.continue,
                      }}
                    />
                  </ExplanationContinueButton>
                </AnswerExplanation>
              </>
            ) : null}
          </>
        </Wrapper>
      </InnerWrapper>
    </Container>
  );
}

