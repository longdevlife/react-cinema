import React from "react";
import { Outlet } from "react-router-dom";
import HeaderPage from "../components/Header";

const HomeTemplate = () => {
  return (
    <div>
      <HeaderPage />
      <Outlet />
    </div>
  );
};

export default HomeTemplate;
