import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import {
  dictionary,
  references,
  abbreviations,
  q8,
} from "../contexts/siteCongress";

export function useReferences() {
  const { language } = useLanguage();
  const location = useLocation();
  const [referencesContent, setReferencesContent] = useState([]);
  const [abbreviationsContent, setAbbreviationsContent] = useState([]);
  const [referencesOpen, setReferencesOpen] = useState(false);

  // when location changes, ensure footnotes popup is closed
  useEffect(() => {
    setReferencesOpen(false);
  }, [location]);

  // update the footnotes when route changes (for non-question pages)
  useEffect(() => {
    if (location.pathname === "/") {
      setReferencesContent(references["/"]);
      setAbbreviationsContent(abbreviations["/"]);
    } else if (location.pathname === "/international-statement") {
      setReferencesContent(references["statement"]);
      setAbbreviationsContent(abbreviations["statement"]);
    } else if (location.pathname.includes("tutorial")) {
      setReferencesContent(null);
      setAbbreviationsContent(null);
    } else {
      const path = location.pathname.split("/");

      if (references[path[path.length - 1]] != null) {
        setReferencesContent(references[path[path.length - 1]]);
      }
      if (abbreviations[path[path.length - 1]] != null) {
        setAbbreviationsContent(abbreviations[path[path.length - 1]]);
      }
    }
  }, [location]);

  const isReferencesContentEmpty = useMemo(() => {
    const hasContentAbbreviations =
      abbreviationsContent &&
      abbreviationsContent[0] &&
      abbreviationsContent[0].length;
    const hasContentReferences =
      referencesContent && referencesContent[0] && referencesContent[0].length;

    if (hasContentAbbreviations || hasContentReferences) {
      return false;
    }

    return true;
  }, [referencesContent, abbreviationsContent]);

  const docReferences = useMemo(() => {
    return new DOMParser().parseFromString(referencesContent, "text/html");
  }, [referencesContent]);

  const docAbbreviations = useMemo(() => {
    return new DOMParser().parseFromString(abbreviationsContent, "text/html");
  }, [abbreviationsContent]);

  // the content of the footnotes/abbreviations/references section
  const content = useMemo(() => {
    const listReferences = docReferences.querySelectorAll("li");
    const listAbbreviations = docAbbreviations.querySelectorAll("p")[0]
      ? docAbbreviations.querySelectorAll("p")[0].innerHTML.split(";")
      : 0;

    const isAbbreviations = listAbbreviations.length > 0;
    const isReferences = listReferences.length > 0;

    if (isAbbreviations && isReferences) {
      return abbreviationsContent + referencesContent;
    }

    if (isAbbreviations) {
      return abbreviationsContent;
    }

    if (isReferences) {
      return referencesContent;
    }

    return "";
  }, [
    referencesContent,
    abbreviationsContent,
    docAbbreviations,
    docReferences,
  ]);

  // the title text for footnotes/abbreviations/references depending on which ones are present on the current page
  const buttonText = useMemo(() => {
    const listReferences = docReferences.querySelectorAll("li");
    const listAbbreviations = docAbbreviations.querySelectorAll("p")[0]
      ? docAbbreviations.querySelectorAll("p")[0].innerHTML.split(";")
      : 0;

    const isAbbreviations = listAbbreviations.length > 0;
    const isReferences = listReferences.length > 0;
    const isFootnotes = false;

    const ABBREVIATIONS_COUNT = listAbbreviations
      ? listAbbreviations.length
      : 0;
    const REFERENCES_COUNT = isReferences ? listReferences.length : 0;

    if (isAbbreviations && isReferences && isFootnotes) {
      if (ABBREVIATIONS_COUNT > 1) {
        if (REFERENCES_COUNT > 1) {
          return dictionary[language].footnotes
            .footnotesAbbreviationsReferences;
        }

        return dictionary[language].footnotes.footnotesAbbreviationsReference;
      }

      if (REFERENCES_COUNT > 1) {
        return dictionary[language].footnotes.footnotesAbbreviationReferences;
      }

      return dictionary[language].footnotes.footnotesAbbreviationReference;
    }

    if (isAbbreviations && isReferences) {
      if (ABBREVIATIONS_COUNT > 1) {
        if (REFERENCES_COUNT > 1) {
          return dictionary[language].footnotes.abbreviationsReferences;
        }

        return dictionary[language].footnotes.abbreviationsReference;
      }

      if (REFERENCES_COUNT > 1) {
        return dictionary[language].footnotes.abbreviationReferences;
      }

      return dictionary[language].footnotes.abbreviationReference;
    }

    if (isReferences && isFootnotes) {
      if (REFERENCES_COUNT > 1) {
        return dictionary[language].footnotes.footnoteAndReferences;
      }

      return dictionary[language].footnotes.footnoteAndReference;
    }

    if (isAbbreviations) {
      if (ABBREVIATIONS_COUNT > 1) {
        return dictionary[language].footnotes.abbreviations;
      }

      return dictionary[language].footnotes.abbreviation;
    }

    if (isReferences) {
      if (REFERENCES_COUNT > 1) {
        return dictionary[language].footnotes.references;
      }

      return dictionary[language].footnotes.reference;
    }

    return dictionary[language].footnotes.references;
  }, [
    referencesContent,
    abbreviationsContent,
    docReferences,
    docAbbreviations,
  ]);

  return {
    content,
    buttonText,
    referencesOpen,
    setReferencesOpen,
    setReferencesContent,
    setAbbreviationsContent,
    isReferencesContentEmpty,
  };
}
