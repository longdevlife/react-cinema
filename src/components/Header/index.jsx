import React from "react";
import NavBarDesktopTablet from "./NavBarDesktopTablet";
import NavBarMobile from "./NavBarMobile";
import useResponsive from "../../hook/useResponsive";
import { useNavigate } from "react-router-dom";

const HeaderPage = () => {
  const navigate = useNavigate();
  const { isDesktop, isTablet, isMobile } = useResponsive();
  return (
    <div className="px-3 py-6 bg-black flex justify-between">
      <div
        onClick={() => {
          navigate("/");
        }}
        className="text-white text-2xl font-bold cursor-pointer"
      >
        LONG CINEMA
      </div>
      {isDesktop && <NavBarDesktopTablet />}
      {isTablet && <NavBarDesktopTablet />}
      {isMobile && <NavBarMobile />}
    </div>
  );
};

export default HeaderPage;
