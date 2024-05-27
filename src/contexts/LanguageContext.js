import { useState, useContext, createContext } from "react";

const LanguageStateContext = createContext();
const LanguageDispatchContext = createContext();

export default function LanguageContext({ children }) {
  const [language, setLanguage] = useState(
    process.env.REACT_APP_LANGUAGE || "en"
  );

  return (
    <LanguageStateContext.Provider value={language}>
      <LanguageDispatchContext.Provider value={setLanguage}>
        {children}
      </LanguageDispatchContext.Provider>
    </LanguageStateContext.Provider>
  );
}

export function useLanguage() {
  const language = useContext(LanguageStateContext);
  const setLanguage = useContext(LanguageDispatchContext);

  return { language, setLanguage };
}
