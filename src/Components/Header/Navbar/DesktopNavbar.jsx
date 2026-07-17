import { useEffect } from "react";
import { Link, NavLink } from "react-router";
import SearchIcon from "@iconify-react/material-symbols/search";
import FavoriteCardItem from "../../FavoriteCardItem";

const DesktopNavbar = ({
  navbarLinks,
  usersMenu,
  cartData,
  showFavoriteItems,
  setShowFavoriteItems,
  isFavoriteActive,
  navbarRef,
  isScrolled,
  topOffset,
  toggleFavorite,
}) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      const { favoriteRef } = navbarRef.current;

      if (favoriteRef && !favoriteRef.contains(e.target)) {
        setShowFavoriteItems(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [setShowFavoriteItems, navbarRef]);

  const handleIconClick = (keyName) => {
    if (keyName === "favorites") isFavoriteActive();
  };

  const getDropdownRef = (keyName) => {
    if (keyName === "favorites")
      return (el) => (navbarRef.current.favoriteRef = el);
    return null;
  };

  const isDropdownOpen = (keyName) => {
    if (keyName === "favorites") return showFavoriteItems;
    return false;
  };

  return (
    <nav
      className={`w-full h-auto py-4 hidden xl:flex items-center justify-between gap-10 ${isScrolled ? "fixed left-0 bg-white z-20 px-20 shadow-md shadow-stone-900/5" : "relative"}`}
      style={isScrolled ? { top: topOffset } : undefined}
    >
      <div className="w-auto h-auto">
        <Link to="/" className="text-[2em] font-bold flex">
          <span>buy</span>
          <span className="underline text-accent">Shoes</span>
        </Link>
      </div>

      <ul className="flex items-center gap-6">
        {navbarLinks.map((link) => (
          <li
            key={link.keyName}
            className="h-8 w-auto flex items-center hover:cursor-pointer font-medium"
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

      <div className="w-auto h-auto flex items-center gap-4">
        <div className="w-full h-10 rounded-md flex items-center bg-stone-100 px-2">
          <input
            type="text"
            placeholder="Find your shoes"
            className="w-full h-full border-none outline-none bg-transparent"
          />
          <SearchIcon className="size-8 text-stone-500" />
        </div>

        <ul className="flex items-center gap-4">
          {usersMenu.map((item) => {
            const Icon = item.icon;
            const items = cartData[item.keyName] ?? [];
            const isOpen = isDropdownOpen(item.keyName);

            if (!item.hasDropdown) {
              return (
                <li key={item.keyName} className="relative">
                  <Link
                    to={item.path}
                    className="relative mt-1 hover:cursor-pointer"
                  >
                    <Icon />
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {items?.length}
                      </span>
                    )}
                  </Link>
                </li>
              );
            }

            return (
              <li
                key={item.keyName}
                className="relative"
                ref={getDropdownRef(item.keyName)}
              >
                <button
                  className="relative mt-1 hover:cursor-pointer"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() => handleIconClick(item.keyName)}
                >
                  <Icon />
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {items?.length}
                    </span>
                  )}
                </button>

                {isOpen && (
                  <div
                    className="absolute top-full right-0 w-100 h-auto bg-white shadow-lg rounded-md p-4 z-50"
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    {items?.length === 0 ? (
                      <p className="text-stone-500 text-center">No items yet</p>
                    ) : (
                      item.keyName === "favorites" && (
                        <FavoriteCardItem
                          onClose={() => setShowFavoriteItems(false)}
                          favorites={cartData.favorites}
                          toggleFavorite={toggleFavorite}
                        />
                      )
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default DesktopNavbar;
