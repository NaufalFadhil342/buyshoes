import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import {
  navMenu,
  favorite,
  shopbag,
  account,
  prevArrow,
} from "../../Icons/draftIcon";
import SearchIcon from "@iconify-react/material-symbols/search";
import {
  cusSupportMenu,
  languageDrafts,
} from "../../../LocalData/cus-support-menu";
import { LanguageContext } from "../../../context/LanguageContext";
import FavoriteCardItem from "../../FavoriteCardItem";

const MobileNavbar = ({
  cartData,
  navbarLinks,
  showFavoriteItems,
  showSearchBar,
  setShowFavoriteItems,
  setShowSearchBar,
  navbarRef,
  isFavoriteActive,
  isSearchBarActive,
  isScrolled,
  topOffset,
}) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const { selectedLang, handleSelectedLang, currentLanguage } =
    useContext(LanguageContext);

  const MenuIcon = navMenu;
  const FavoriteIcon = favorite;
  const ShopIcon = shopbag;
  const AccountIcon = account;
  const PrevMenuIcon = prevArrow;

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const { favoriteRef, searchBarRef } = navbarRef.current;

      if (favoriteRef && !favoriteRef.contains(e.target)) {
        setShowFavoriteItems(false);
      }

      if (searchBarRef && !searchBarRef.contains(e.target)) {
        setShowSearchBar(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [navbarRef, setShowFavoriteItems, setShowSearchBar]);

  return (
    <nav
      className={`w-full h-auto py-4 flex xl:hidden items-center justify-between sm:gap-8 ${isScrolled ? "fixed left-0 px-[5%] sm:px-12 lg:px-20 bg-white z-40 shadow-md shadow-stone-900/5" : "relative"}`}
      style={isScrolled ? { top: topOffset } : undefined}
    >
      <div className="w-auto h-auto flex items-center gap-2 md:gap-4">
        <button onClick={() => setShowNavbar(true)}>
          <MenuIcon />
        </button>
        <Link className="relative" onClick={isFavoriteActive}>
          <FavoriteIcon />
          <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-accent text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center">
            {cartData.favorites.length}
          </span>
        </Link>
      </div>
      <div className="w-full h-auto ml-2">
        <Link
          to="/"
          className="text-2xl md:text-3xl font-bold flex justify-center"
        >
          <span>buy</span>
          <span className="underline text-accent">Shoes</span>
        </Link>
      </div>
      <div className="w-auto h-auto flex items-center justify-end gap-2 md:gap-4 relative">
        <span className="block" onClick={isSearchBarActive}>
          <SearchIcon className="size-6 md:size-8 text-stone-300 rotate-90 translate-x-px xs:translate-x-1" />
        </span>
        <button className="block">
          <AccountIcon />
        </button>
        <button className="block relative">
          <ShopIcon />
          <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-accent text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center">
            {cartData.shoppingBag.length}
          </span>
        </button>
      </div>
      {showNavbar && (
        <div className="w-screen h-screen top-0 left-0 fixed z-20 bg-white">
          <div className="w-full h-auto relative flex justify-between items-center my-4 px-6">
            <div className="text-2xl font-bold">
              <span>buy</span>
              <span className="underline text-accent">Shoes</span>
            </div>
            <button
              className="font-medium text-lg hover:text-accent"
              onClick={() => setShowNavbar(false)}
            >
              X
            </button>
          </div>
          <ul className="w-full h-auto flex flex-col gap-2 my-4 px-6">
            {navbarLinks.map((link) => (
              <li
                key={link.keyName}
                className="h-8 w-auto flex hover:cursor-pointer font-medium"
              >
                <NavLink
                  className={({ isActive }) => `
                    h-full w-full  
                ${
                  isActive
                    ? "border-b-2 border-stone-700"
                    : "hover:border-b-2 hover:border-stone-700"
                }`}
                  to={link.path}
                  onClick={() => window.scrollTo({ top: 0 })}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="w-full h-px bg-stone-300" />
          <ul className="w-full h-auto flex flex-col gap-2 items-start my-4 px-6">
            {cusSupportMenu.map((item, index) => (
              <li
                key={index}
                className="capitalize text-sm hover:cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="w-full h-fit flex border py-4 absolute bottom-0 left-0 border-t-stone-300 px-6 bg-white">
            <span className="flex-[0_0_50%] flex justify-center">
              Language:
            </span>
            <div className="flex-[0_0_50%]">
              <span
                className="font-medium flex justify-center capitalize"
                onClick={() => setShowLangMenu(!showLangMenu)}
              >
                {currentLanguage.name}
              </span>
            </div>
          </div>
          <ul className="w-full h-auto py-2 bg-white absolute bottom-14 left-0">
            {showLangMenu &&
              languageDrafts.map((lang, index) => (
                <li
                  key={index}
                  className={`py-1.5 px-6 capitalize ${lang.keyName === selectedLang ? "bg-stone-700/10" : "bg-transparent"}`}
                  onClick={() => {
                    handleSelectedLang(lang.keyName);
                    setShowLangMenu(false);
                  }}
                >
                  {lang.name}
                </li>
              ))}
          </ul>
        </div>
      )}
      <>
        {showFavoriteItems && (
          <div
            className="w-full sm:w-md h-auto absolute top-full left-0 rounded-md shadow-lg bg-white p-4 z-20"
            ref={(node) => (navbarRef.current.favoriteRef = node)}
          >
            {cartData.favorites.length === 0 ? (
              <p className="text-stone-500">
                You are not adding your favorite items yet
              </p>
            ) : (
              <FavoriteCardItem />
            )}
          </div>
        )}
      </>
      <>
        {showSearchBar && (
          <div
            className="w-screen h-screen fixed top-0 left-0 bg-white z-20"
            ref={(node) => (navbarRef.current.searchBarRef = node)}
          >
            <div className="w-full h-10 px-3 bg-stone-300/50 outline-none flex items-center gap-2">
              <PrevMenuIcon
                className="text-stone-700 size-5"
                onClick={() => setShowSearchBar(false)}
              />
              <input
                type="text"
                className="w-full h-full outline-none"
                placeholder="Search"
              />
            </div>
          </div>
        )}
      </>
    </nav>
  );
};

export default MobileNavbar;
