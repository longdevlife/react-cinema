import React, { useState, useEffect } from "react";
import NavBarDesktopTablet from "./NavBarDesktopTablet";
import NavBarMobile from "./NavBarMobile";
import useResponsive from "../../hook/useResponsive";
import { useNavigate, useLocation } from "react-router-dom";

const HeaderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDesktop, isTablet, isMobile } = useResponsive();
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Header visibility logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false); // Hide when scrolling down
      } else {
        setIsHeaderVisible(true); // Show when scrolling up
      }
      
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Don't hide header on certain pages
  const isSpecialPage = location.pathname.includes('/booking') || 
                      location.pathname.includes('/admin') ||
                      location.pathname.includes('/login') ||
                      location.pathname.includes('/register');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-black/95 backdrop-blur-xl shadow-2xl py-3"
          : "bg-gradient-to-b from-black/80 via-black/60 to-transparent py-6"
      } ${
        isHeaderVisible || isSpecialPage ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
        {/* Enhanced Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-white text-2xl md:text-3xl font-bold cursor-pointer hover:text-red-500 transition-all duration-300 flex items-center gap-3 group"
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-red-500/50 transition-all duration-300 transform group-hover:scale-110">
              <span className="text-white text-lg font-black">🎬</span>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 w-10 h-10 bg-red-500 rounded-full opacity-0 group-hover:opacity-30 blur-lg transition-all duration-300"></div>
          </div>
          
          <div className="flex flex-col">
            <span className="hidden sm:block font-black text-xl md:text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              LONG CINEMA
            </span>
            <span className="sm:hidden font-black text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              LC
            </span>
            <span className="hidden md:block text-xs text-gray-400 font-normal -mt-1">
              Premium Experience
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center">
          {(isDesktop || isTablet) && <NavBarDesktopTablet />}
          {isMobile && <NavBarMobile />}
        </nav>
      </div>

      {/* Progress Bar for Scroll */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 transition-opacity duration-300"
        style={{
          opacity: isScrolled ? 1 : 0,
          transform: `scaleX(${Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1)})`,
          transformOrigin: 'left'
        }}
      ></div>
    </header>
  );
};

export default HeaderPage;