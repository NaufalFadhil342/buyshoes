import { useContext } from "react";
import { cusSupportMenu } from "../../LocalData/cus-support-menu";
import { LanguageContext } from "../../context/LanguageContext";

const CusSupport = ({ isScrolled }) => {
  const { currentLanguage, handleToggleLang } = useContext(LanguageContext);

  return (
    <section
      id="cus-support"
      className={isScrolled ? "fixed top-0 left-0 z-20" : "relative"}
    >
      <ul className="h-10 flex gap-4 justify-end items-center">
        {cusSupportMenu.map((item, index) => (
          <li key={index} className="capitalize text-sm hover:cursor-pointer">
            {item}
          </li>
        ))}
      </ul>
      <div className="w-px h-4 bg-stone-500" />
      <div className="flex items-center">
        <button
          aria-label={currentLanguage.name}
          className="hover:cursor-pointer"
          onClick={handleToggleLang}
        >
          {currentLanguage.value}
        </button>
      </div>
    </section>
  );
};

export default CusSupport;
