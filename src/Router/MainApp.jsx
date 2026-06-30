import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import CusSupport from "../Components/Header/CusSupport";
import Navbar from "../Components/Header/Navbar";
import { LanguageProvider } from "../context/LanguageContext";
import { FavoriteProvider } from "../context/FavoriteContext";
import { ShoppingProvider } from "../context/ShoppingContext";
import Footer from "../Components/Footer";

const MainApp = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <FavoriteProvider>
        <ShoppingProvider>
          <LanguageProvider>
            <div ref={headerRef}>
              <CusSupport isScrolled={isScrolled} />
              <Navbar isScrolled={isScrolled} />
            </div>
            {isScrolled && <div style={{ height: headerHeight }} />}

            <main>
              <Outlet />
            </main>

            <Footer />
          </LanguageProvider>
        </ShoppingProvider>
      </FavoriteProvider>
    </>
  );
};

export default MainApp;
