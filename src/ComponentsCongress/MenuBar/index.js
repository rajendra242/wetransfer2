import gsap from "gsap/gsap-core";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import lottie from "lottie-web";
import buttonAnimation from "../../animations/button_animation_menu.json";
import { ResultsPageWrapper, Wrapper } from "./styles.js";
import { AbbreviationsButton, RestartButton } from "./MenuBarButtons";
import { dictionary } from "../../contexts/siteCongress";
import { useLanguage } from "../../contexts/LanguageContext";

const detailsButtonStates = {
  INITIAL_DETAILS: "initialDetails",
  TO_DETAILS: "toDetails",
  FROM_DETAILS: "fromDetails",
};

const exitButtonStates = {
  INITIAL_EXIT: "initialExit",
  TO_EXIT: "toExit",
  FROM_EXIT: "fromExit",
};

const { INITIAL_DETAILS, TO_DETAILS, FROM_DETAILS } = detailsButtonStates;
const { INITIAL_EXIT, TO_EXIT, FROM_EXIT } = exitButtonStates;

export default function MenuBar({
  name,
  goToIntersection,
  active,
  referencesOpen,
  setReferencesOpen,
  showDetails,
  showRestart,
  resetProgress,
  referencesButtonText,
  setShowRestartModal,
  isSidebarOpen,
}) {
  const location = useLocation();
  const history = useHistory();
  const [detailsButtonState, setDetailsButtonState] = useState(INITIAL_DETAILS);
  const detailsButton = useRef();
  const detailsButtonAnimation = useRef();
  const [exitButtonState, setExitButtonState] = useState(INITIAL_DETAILS);
  const exitButton = useRef();
  const exitButtonAnimation = useRef();
  const [fromExit, setFromExit] = useState(false);
  const [fromDetails, setFromDetails] = useState(false);

  // load in the animations for the exit and detail buttons
  useLayoutEffect(() => {
    detailsButtonAnimation.current = lottie.loadAnimation({
      container: detailsButton.current, // the dom element that will contain the animation
      renderer: "svg",
      animationData: buttonAnimation,
      autoplay: false,
      loop: false,
    });
    exitButtonAnimation.current = lottie.loadAnimation({
      container: exitButton.current, // the dom element that will contain the animation
      renderer: "svg",
      animationData: buttonAnimation,
      autoplay: false,
      loop: false,
    });

    // set the buttons to the initial values
    setDetailsButtonState(INITIAL_DETAILS);
    setExitButtonState(INITIAL_EXIT);

    return () => {
      detailsButtonAnimation.current.destroy();
      exitButtonAnimation.current.destroy();
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(".menuButton", { opacity: 0 }, { opacity: 1, duration: 2 });
  }, []);

  useEffect(() => {
    // don't show details animation icon on intersection page (should be profile image with notification)
    if (active === 4) {
      const item = document
        .getElementById("details-animation")
        .getElementsByTagName("svg")[0];

      if (item) item.style.display = "none";
    }

    // otherwise display the details animation icon
    if (
      (goToIntersection && showDetails) ||
      !location.pathname.includes(`${name}/8`)
    ) {
      const animation = document.getElementById("details-animation");

      if (animation) {
        const item = animation.getElementsByTagName("svg")[0];

        if (item) item.style.display = "block";
      }
    }
  }, [goToIntersection, location, name, active, showDetails]);

  useEffect(() => {
    if (detailsButtonAnimation.current) {
      switch (detailsButtonState) {
        case INITIAL_DETAILS:
          detailsButtonAnimation.current.playSegments([15, 16], true);
          break;
        case TO_DETAILS:
          detailsButtonAnimation.current.playSegments([17, 29], true);
          break;
        case FROM_DETAILS:
          detailsButtonAnimation.current.playSegments([29, 15], true);
          setFromDetails(false); // set from details to false so animation doesn't play until user goes to a different page from the details page
          break;
        default:
          detailsButtonAnimation.current.playSegments([15, 16], true);
          break;
      }
    }
  }, [detailsButtonState]);

  useEffect(() => {
    if (exitButtonAnimation.current) {
      switch (exitButtonState) {
        case INITIAL_EXIT:
          exitButtonAnimation.current.playSegments([0, 1], true);
          break;
        case TO_EXIT:
          exitButtonAnimation.current.playSegments([2, 15], true);
          break;
        case FROM_EXIT:
          exitButtonAnimation.current.playSegments([15, 0], true);
          setFromExit(false); // set from exit to false so animation doesn't play until user goes to a different page from the exit page
          break;
        default:
          exitButtonAnimation.current.playSegments([0, 1], true);
          break;
      }
    }
  }, [exitButtonState]);

  const isSelector = location.pathname.includes("/patient-selector");
  // const isTutorial = location.pathname.includes("/tutorial");
  // const isDetails = location.pathname.includes("/details");
  const isDetails = showDetails;
  // const isExit = location.pathname.includes("/exit");
  const isExit = showRestart;
  // const isIntersection = location.pathname.includes("/intersection");
  const isIntersection = showDetails;
  const isResults = location.pathname.includes("/results");

  useEffect(() => {
    // if current page is exit/details, update fromExit/fromDetails to be true (so the animation will play when the user goes back to the main page)
    if (showRestart) {
      setFromExit(true);
    }
    if (
      showDetails
      // location.pathname.includes("details") ||
      // location.pathname.includes("intersection")
    ) {
      setFromDetails(true);
    }
  }, [showDetails, showRestart]);

  useEffect(() => {
    if (isDetails || isIntersection) {
      setDetailsButtonState(TO_DETAILS);
    } else if (fromDetails) {
      // only play animation if coming from the details page (stops it playing on first load of a page)
      setDetailsButtonState(FROM_DETAILS);
    }
  }, [location.pathname, isDetails, isIntersection, fromDetails]);

  useEffect(() => {
    if (isExit) {
      setExitButtonState(TO_EXIT);
    } else if (fromExit) {
      // only play animation if coming from the exit page (stops it playing on first load of a page)
      setExitButtonState(FROM_EXIT);
    }
  }, [location.pathname, isExit, fromExit]);

  // if in intersection go back to current question, if question has intersection instead of details, go to the intersection instead of details page
  // otherwise toggle between current question and details page
  // const detailsClickFunction = location.pathname.includes("/3")
  //   ? () => history.push(`/${name}/details`)
  //   : isDetails
  //   ? history.goBack
  //   : isIntersection
  //   ? history.goBack
  //   : goToIntersection
  //   ? () => history.push(`/${name}/intersection`)
  //   : () => history.push(`/${name}/details`);

  const closeReferencesAnimation = () => {
    gsap.fromTo(
      "#sidebar",
      {
        transform: `translateX(0%)`,
      },
      {
        transform: `translateX(100%)`,
        duration: 0.2,
        onComplete: () => {
          setReferencesOpen((prev) => !prev);
        },
      }
    );

    // const isPortrait = process.env.REACT_APP_DEVICE == "portrait";
    // if (isPortrait) {
    //   gsap.fromTo(
    //     "#references-wrapper",
    //     {
    //       height: "560px",
    //       opacity: 1,
    //     },
    //     {
    //       height: 0,
    //       opacity: 0,
    //       duration: 0.5,
    //       onComplete: () => {
    //         setReferencesOpen((prev) => !prev);
    //       },
    //     }
    //   );
    // } else {
    //   gsap.fromTo(
    //     "#references-wrapper",
    //     {
    //       top: "158px",
    //       opacity: 1,
    //     },
    //     {
    //       top: "1000px",
    //       opacity: 0,
    //       duration: 0.5,
    //       onComplete: () => {
    //         setReferencesOpen((prev) => !prev);
    //       },
    //     }
    //   );
    // }
  };

  const handleReferencesClick = () => {
    setReferencesOpen(!referencesOpen);
  };

  const handleRestartButtonClick = () => {
    if (location.pathname.includes("/results")) {
      setShowRestartModal(false);
      resetProgress();
    } else {
      setShowRestartModal(true);
    }
  };

  return (
    <Wrapper id="menu-bar" isResults={isResults}>
      {!isResults && (
        <AbbreviationsButton
          handleReferencesClick={
            referencesOpen ? closeReferencesAnimation : handleReferencesClick
          }
          referencesOpen={referencesOpen}
          referencesButtonText={referencesButtonText}
          setReferencesOpen={setReferencesOpen}
          isSidebarOpen={isSidebarOpen}
        />
      )}
      <RestartButton
        handleRestartButtonClick={handleRestartButtonClick}
        referencesOpen={referencesOpen}
        isSidebarOpen={isSidebarOpen}
      />
    </Wrapper>
  );
}

export function ResultsPageFooter({ showStandalone }) {
  const { language } = useLanguage();

  return (
    <ResultsPageWrapper>
      <p
        dangerouslySetInnerHTML={{
          __html: showStandalone
            ? dictionary[language].stampStandalone
            : dictionary[language].stamp,
        }}
      />
      <img src={"./logo.png"} />
    </ResultsPageWrapper>
  );
}
