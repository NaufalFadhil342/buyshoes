import { Suspense, useEffect, useRef, useState, useLayoutEffect } from "react";
import { Outlet } from "react-router";
import CusSupport from "../Components/Header/CusSupport";
import Navbar from "../Components/Header/Navbar";
import { LanguageProvider } from "../context/LanguageContext";
import { FavoriteProvider } from "../context/FavoriteContext";
import { ShoppingProvider } from "../context/ShoppingContext";
import Footer from "../Components/Footer";
import { Loading } from "@/Components/ui/Loading";

const MainApp = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);

  const headerRef = useRef(null);
  const custSupportRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [custSupportHeight, setCustSupportHeight] = useState(0);

  useLayoutEffect(() => {
    if (!headerRef.current || !custSupportRef.current) return;

    setHeaderHeight(headerRef.current.getBoundingClientRect().height);
    setCustSupportHeight(custSupportRef.current.getBoundingClientRect().height);
  }, []);

  useEffect(() => {
    if (!headerRef.current || !custSupportRef.current) return;

    const observer = new ResizeObserver((entries) => {
      if (isScrolledRef.current) return;
      for (const entry of entries) {
        if (entry.target === headerRef.current)
          setHeaderHeight(entry.contentRect.height);
        else if (entry.target === custSupportRef.current)
          setCustSupportHeight(entry.contentRect.height);
      }
    });

    observer.observe(headerRef.current);
    observer.observe(custSupportRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrolled = window.scrollY > 0;
        isScrolledRef.current = scrolled;
        setIsScrolled(scrolled);
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <FavoriteProvider>
        <ShoppingProvider>
          <LanguageProvider>
            <div ref={headerRef}>
              <div ref={custSupportRef}>
                <CusSupport isScrolled={isScrolled} />
              </div>
              <Navbar isScrolled={isScrolled} topOffset={custSupportHeight} />
            </div>
            {isScrolled && <div style={{ height: headerHeight }} />}

            <Suspense fallback={<Loading />}>
              <main>
                <Outlet />
              </main>
            </Suspense>

            <Footer />
          </LanguageProvider>
        </ShoppingProvider>
      </FavoriteProvider>
    </>
  );
};

export default MainApp;
