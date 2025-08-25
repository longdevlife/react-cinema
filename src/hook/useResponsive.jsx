import React from "react";
import { useMediaQuery } from "react-responsive";

// hook có đầy đủ các hook như 1 component {useState,useEffect,...} khác là hook sẽ đi xử lý logic còn component sẽ render giao diện
const useResponsive = () => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 639 });
  return {
    isDesktop,
    isTablet,
    isMobile,
  };
};

export default useResponsive;
