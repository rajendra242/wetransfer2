import { useEffect } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

const PAGE_TITLES = {
  "/": "Homepage",
  "quiz/results": "Results",
};

export function useAnalytics() {
  const location = useLocation();

  // on location change
  useEffect(() => {
    const { pathname } = location;
    let pageTitle = null;

    // if on the questions work out page title using current question number
    // otherwise get the page title from the pathnames object above
    const isOnQuestionPage = /.*[a-zA-Z].*\/[0-9]*/;

    if (pathname.match(isOnQuestionPage)) {
      const splitPath = pathname.split("/");
      const questionNumber = parseInt(splitPath[splitPath.length - 1]);
      pageTitle = `Question ${questionNumber + 1}`;
    } else {
      if (PAGE_TITLES[pathname]) {
        pageTitle = PAGE_TITLES[pathname];
      }
    }

    if (pageTitle) {
      ReactGA.send({ hitType: "pageview", page: pathname, title: pageTitle });
    }
  }, [location]);

  function sendQuizStartEvent() {
    ReactGA.event({ category: "Quiz", action: `Quiz started` });
  }

  function sendQuizEndEvent(score) {
    ReactGA.event({
      category: "Quiz",
      action: `Quiz finished`,
      value: parseInt(score),
    });
    ReactGA.event({
      category: "Quiz",
      action: `Quiz finished - Score: ${parseInt(score)}`,
      value: parseInt(score),
    });
  }

  function sendAnswerQuestionEvent(questionNumber, isCorrect) {
    if (
      !(typeof questionNumber == "number") ||
      !(typeof isCorrect == "boolean")
    ) {
      console.error("Analytics error");
      return null;
    }

    ReactGA.event({
      category: "Quiz",
      action: `Question ${questionNumber} answered - ${
        isCorrect ? "Correct" : "Incorrect"
      }`,
      label: `Question`,
    });
  }

  return {
    sendQuizStartEvent,
    sendQuizEndEvent,
    sendAnswerQuestionEvent,
  };
}
