import { MenuButton, Chevron, TextContainer } from "./styles.js";
import { useLanguage } from "../../contexts/LanguageContext.js";
import { dictionary } from "../../contexts/siteCongress.js";
import ReferencesIcon from "../../assets/images/references-icon.png";
import RestartIcon from "../../assets/images/restart-icon-menu.png";
import ReferencesChevron from "../../assets/images/references-chevron.png";

export const AbbreviationsButton = ({
  handleReferencesClick,
  referencesOpen,
  referencesButtonText,
  isSidebarOpen,
}) => {
  return (
    <div>
      <MenuButton
        menuButton
        data-test="ref-button"
        className="menuButton"
        onClick={() => handleReferencesClick()}
        onKeyPress={() => handleReferencesClick()}
        role="button"
        tabIndex="0"
        disabled={isSidebarOpen}
      >
        <img alt="book" src={ReferencesIcon} />
        <div style={{ marginLeft: "16px" }}>{referencesButtonText}</div>
        <Chevron isOpen={referencesOpen} src={ReferencesChevron} alt="" />
      </MenuButton>
    </div>
  );
};

export const RestartButton = ({
  handleRestartButtonClick,
  referencesOpen,
  isSidebarOpen,
}) => {
  const { language } = useLanguage();

  return (
    <div>
      <MenuButton
        data-test="restart-btn"
        className="menuButton"
        onClick={() => handleRestartButtonClick()}
        onKeyPress={() => handleRestartButtonClick()}
        role="button"
        tabIndex="0"
        disabled={isSidebarOpen}
      >
        <img src={RestartIcon} alt="arrow pointing left" />
        <TextContainer text="restart">
          {dictionary[language].menuBar.restart}
        </TextContainer>
      </MenuButton>
    </div>
  );
};
