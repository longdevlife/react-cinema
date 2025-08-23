import React from "react";
import { Outlet } from "react-router-dom";

const AuthTemplate = () => {
  return (
    <div className="bg-red-500 w-screen h-screen flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default AuthTemplate;
