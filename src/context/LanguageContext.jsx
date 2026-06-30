import { createContext, useState } from "react";
import { languageDrafts } from "../LocalData/cus-support-menu";

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [selectedLang, setSelectedLang] = useState("id");

  const currentLanguage = languageDrafts.find(
    (l) => l.keyName === selectedLang,
  );

  const handleToggleLang = () => {
    setSelectedLang((prev) => (prev === "id" ? "en" : "id"));
  };

  const handleSelectedLang = (keyName) => {
    setSelectedLang(keyName);
  };

  const value = {
    selectedLang,
    currentLanguage,
    handleToggleLang,
    handleSelectedLang,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
