import React, { useState, useEffect } from "react";
import NavBarDesktopTablet from "./NavBarDesktopTablet";
import NavBarMobile from "./NavBarMobile";
import useResponsive from "../../hook/useResponsive";
import { useNavigate } from "react-router-dom";

const HeaderPage = () => {
  const navigate = useNavigate();
  const { isDesktop, isTablet, isMobile } = useResponsive();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-md shadow-2xl py-3"
          : "bg-gradient-to-b from-black/80 to-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-white text-2xl md:text-3xl font-bold cursor-pointer hover:text-red-500 transition-colors duration-300 flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-black">🎬</span>
          </div>
          <span className="hidden sm:block">LONG CINEMA</span>
          <span className="sm:hidden">LC</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center">
          {(isDesktop || isTablet) && <NavBarDesktopTablet />}
          {isMobile && <NavBarMobile />}
        </nav>
      </div>
    </header>
  );
};

export default HeaderPage;
