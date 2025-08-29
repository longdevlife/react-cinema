import React from "react";
import { Outlet } from "react-router-dom";
import HeaderPage from "../components/Header";

const HomeTemplate = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderPage />
      <main className="pt-24 flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeTemplate;
