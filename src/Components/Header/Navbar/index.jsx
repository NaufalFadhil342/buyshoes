import { useState, useRef, useContext } from "react";
import { navbarLinks, usersMenu } from "../../../LocalData/navbar-links";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { FavoriteContext } from "../../../context/FavoriteContext";
import { ShoppingContext } from "../../../context/ShoppingContext";

const Navbar = ({ isScrolled, topOffset }) => {
  const { favorites, toggleFavorite } = useContext(FavoriteContext);
  const { shopping } = useContext(ShoppingContext);

  const cartData = {
    favorites: favorites,
    shoppingBag: shopping,
  };

  const navbarRef = useRef({
    favoriteRef: null,
    searchBarRef: null,
  });

  const [showFavoriteItems, setShowFavoriteItems] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const isFavoriteActive = () => {
    setShowFavoriteItems((prev) => !prev);
    setShowSearchBar(false);
  };

  const isSearchBarActive = () => {
    setShowSearchBar((prev) => !prev);
    setShowFavoriteItems(false);
  };

  return (
    <header id="navbar">
      <DesktopNavbar
        cartData={cartData}
        navbarLinks={navbarLinks}
        usersMenu={usersMenu}
        showFavoriteItems={showFavoriteItems}
        setShowFavoriteItems={setShowFavoriteItems}
        isFavoriteActive={isFavoriteActive}
        navbarRef={navbarRef}
        isScrolled={isScrolled}
        topOffset={topOffset}
        toggleFavorite={toggleFavorite}
      />
      <MobileNavbar
        cartData={cartData}
        navbarLinks={navbarLinks}
        showFavoriteItems={showFavoriteItems}
        showSearchBar={showSearchBar}
        setShowFavoriteItems={setShowFavoriteItems}
        setShowSearchBar={setShowSearchBar}
        isFavoriteActive={isFavoriteActive}
        isSearchBarActive={isSearchBarActive}
        navbarRef={navbarRef}
        isScrolled={isScrolled}
        topOffset={topOffset}
        toggleFavorite={toggleFavorite}
      />
    </header>
  );
};

export default Navbar;
