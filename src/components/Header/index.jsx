import React from "react";
import NavBarDesktopTablet from "./NavBarDesktopTablet";
import NavBarMobile from "./NavBarMobile";
import useResponsive from "../../hook/useResponsive";
import { useNavigate } from "react-router-dom";

const HeaderPage = () => {
  const navigate = useNavigate();
  const { isDesktop, isTablet, isMobile } = useResponsive();
  
  return (
    <div className="bg-black shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
        <div
          onClick={() => navigate("/")}
          className="text-red-600 text-2xl lg:text-3xl font-bold cursor-pointer hover:text-red-500 transition-colors"
        >
          GALAXY CINEMA
        </div>
        {isDesktop && <NavBarDesktopTablet />}
        {isTablet && <NavBarDesktopTablet />}
        {isMobile && <NavBarMobile />}
      </div>
    </div>
  );
};

export default HeaderPage;