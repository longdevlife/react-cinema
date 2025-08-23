import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthCheck = ({ children, isNeedLogin }) => {
  const { infoUser } = useSelector((state) => state.userSlice);

  //   trường hợp user muốn vào lại trang đăng nhập hoặc đăng ký khi đã login
  if (infoUser && !isNeedLogin) {
    return <Navigate to="/" replace />;
  }
  //   nếu user chưa login thì sẽ đá về trang login với 1 số pages
  if (!infoUser && isNeedLogin) {
    return <Navigate to="/login" replace />;
  }
  return <div>{children}</div>;
};

export default AuthCheck;
