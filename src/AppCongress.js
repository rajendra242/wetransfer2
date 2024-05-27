import React, { useCallback, useEffect, useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { AppWrapper, ContentContainer } from "./stylesCongress";
import Intro from "./ComponentsCongress/Intro";
import Question from "./ComponentsCongress/Question";
import Results from "./ComponentsCongress/Results";
import Restart from "./ComponentsCongress/Restart";
import Background from "./ComponentsCongress/Background";
import { usePatients } from "./contexts/siteCongress";
import { scrollToTop } from "./utils";
import MenuBar from "./ComponentsCongress/MenuBar";
import { useReferences } from "./hooks/useReferencesCongress";
import Timeout from "./ComponentsCongress/Timeout";
import useTimeout from "./hooks/useTimeout";
import ImagePopup from "./ComponentsCongress/ImagePopup";
import Sidebar from "./ComponentsCongress/Sidebar";
import useAnswerExplanation from "./hooks/useAnswerExplanation";
import SidebarContent from "./ComponentsCongress/Sidebar/SidebarContent";
import { useScreensaver } from "./hooks/useScreensaver";

function App() {
  const patients = usePatients();
  const [name, setName] = useState(null);
  const [answers, setAnswers] = useState(false);
  const [active, setActive] = useState(0);
  const history = useHistory();
  const location = useLocation();
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const {
    content,
    buttonText,
    referencesOpen,
    setReferencesOpen,
    setReferencesContent,
    setAbbreviationsContent,
    isReferencesContentEmpty,
  } = useReferences();
  const {
    showAnswerExplanation,
    setShowAnswerExplanation,
    isCorrectAnswer,
    setIsCorrectAnswer,
    explanationContent,
    setExplanationContent,
  } = useAnswerExplanation();
  const { isTimeoutIdle, resetIdleTimer } = useTimeout(setReferencesOpen);
  const { screensaverContent } = useScreensaver();

  useEffect(() => {
    // when url changes, scroll to top of the page if on mobile and ensure sidebar content is closed
    scrollToTop();
    setShowAnswerExplanation(false);
    setReferencesOpen(false);
  }, [location]);

  const resetProgress = useCallback(() => {
    history.push("/");
    setAnswers(null);
    setReferencesOpen(false);
    setShowAnswerExplanation(false);
  }, [setAnswers, history]);

  useEffect(() => {
    if (location.pathname == "/") {
      setAnswers(null);
    }
  }, [location]);

  const showProgressBar = name && !showRestartModal && !isTimeoutIdle;
  // const showProgressBarPortrait =
  //   name &&
  //   !referencesOpen &&
  //   !showRestartModal &&
  //   !isTimeoutIdle &&
  //   !isImagePopupOpen;
  const showMenuBar =
    location.pathname !== "/" &&
    location.pathname !== "/quiz/results" &&
    !isTimeoutIdle &&
    !showRestartModal;
  const showMenuBarPortrait =
    location.pathname !== "/" &&
    !isTimeoutIdle &&
    !showRestartModal &&
    !isImagePopupOpen;

  function goToNextQuestion() {
    const QUESTION_COUNT = 6;
    setShowAnswerExplanation(false);

    if (active < QUESTION_COUNT - 1) {
      history.push(`/${name}/${active + 1}`);
    } else {
      history.push(`/${name}/results`);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        {(referencesOpen || showAnswerExplanation) && (
          <div
            style={{
              background:
                "linear-gradient(90deg, rgba(0, 0, 0, 0.68) 0%, rgba(31, 31, 30, 0.00) 100%)",
              backdropFilter: "blur(15px)",
              width: "1219px",
              height: "100%",
              position: "absolute",
              zIndex: 1,
            }}
          ></div>
        )}
        <ContentContainer
          id="content"
          isResults={location.pathname.includes("/results")}
          isIntro={location.pathname.includes("/intro")}
          isSidebarOpen={referencesOpen || showAnswerExplanation}
        >
          <Background />

          {!showRestartModal && !isTimeoutIdle && (
            <Switch>
              {/* Home page */}
              <Route
                exact
                path="/"
                render={() => (
                  <Intro
                    setName={setName}
                    screensaverContent={screensaverContent}
                  />
                )}
              />

              {/* Render routes for each patient */}
              {patients.map(
                ({ name: patientName, questions, details, fullname }) => {
                  // Routes for patient questions

                  return [
                    ...questions.map((question, index) => (
                      <Route
                        exact
                        path={`/${patientName}/${index}`}
                        render={() => (
                          <Question
                            key={`${patientName}-${index}`}
                            answers={answers}
                            setAnswers={setAnswers}
                            setActive={setActive}
                            setName={setName}
                            index={index}
                            name={patientName}
                            questions={questions}
                            fullname={fullname}
                            setReferences={setReferencesContent}
                            setAbbreviations={setAbbreviationsContent}
                            isHidden={referencesOpen || showRestartModal}
                            setIsImagePopupOpen={setIsImagePopupOpen}
                            active={active}
                            showProgressBar={showProgressBar}
                            setIsCorrectAnswer={setIsCorrectAnswer}
                            setExplanationContent={setExplanationContent}
                            setShowAnswerExplanation={setShowAnswerExplanation}
                          />
                        )}
                      />
                    )),
                    // Route for patient result screen
                    <Route
                      exact
                      path={`/${patientName}/results`}
                      render={() => (
                        <Results
                          setName={setName}
                          name={patientName}
                          setActive={setActive}
                          questions={questions}
                          fullname={fullname}
                          setReferences={setReferencesContent}
                          setAbbreviations={setAbbreviationsContent}
                          isHidden={referencesOpen || showRestartModal}
                          setIsImagePopupOpen={setIsImagePopupOpen}
                          active={active}
                          showProgressBar={showProgressBar}
                          answers={answers}
                          resetProgress={resetProgress}
                        />
                      )}
                    />,
                  ];
                }
              )}
              {/* If route not found redirect to the homepage */}
              <Redirect to="/" />
            </Switch>
          )}
        </ContentContainer>
        <Sidebar
          background={
            !referencesOpen && isCorrectAnswer ? "alternate" : "default"
          }
          isOpen={referencesOpen || showAnswerExplanation}
        >
          <SidebarContent
            referencesOpen={referencesOpen}
            setReferencesOpen={setReferencesOpen}
            content={content}
            showAnswerExplanation={showAnswerExplanation}
            isCorrectAnswer={isCorrectAnswer}
            explanationContent={explanationContent}
            goToNextQuestion={goToNextQuestion}
          />
        </Sidebar>

        {((process.env.REACT_APP_DEVICE == "portrait" && showMenuBarPortrait) ||
          (process.env.REACT_APP_DEVICE != "portrait" && showMenuBar)) && (
          <MenuBar
            referencesOpen={referencesOpen}
            setReferencesOpen={setReferencesOpen}
            resetProgress={resetProgress}
            isReferencesContentEmpty={isReferencesContentEmpty}
            referencesButtonText={buttonText}
            setShowRestartModal={setShowRestartModal}
            isSidebarOpen={referencesOpen || showAnswerExplanation}
          />
        )}

        {isTimeoutIdle && (
          <Timeout name={name} reset={resetIdleTimer} setAnswers={setAnswers} />
        )}

        {showRestartModal && (
          <Restart
            setShowRestartModal={setShowRestartModal}
            name={name}
            resetProgress={resetProgress}
          />
        )}
        {isImagePopupOpen && (
          <ImagePopup
            isOpen={isImagePopupOpen}
            currentQuestion={active}
            close={() => setIsImagePopupOpen(false)}
          />
        )}
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
