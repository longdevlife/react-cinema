import React from "react";
import { Outlet } from "react-router-dom";

const AuthTemplate = () => {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};

export default AuthTemplate;
