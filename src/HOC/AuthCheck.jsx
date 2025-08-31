import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const roleUser = {
  ADMIN: "QuanTri",
  USER: "KhachHang",
};

const AuthCheck = ({ children, isNeedLogin, pagePermission }) => {
  const { infoUser } = useSelector((state) => state.userSlice);
  const location = useLocation();

  // Chỉ redirect admin về trang admin khi họ truy cập các trang auth (login/register)
  if (
    infoUser?.maLoaiNguoiDung === roleUser.ADMIN &&
    (location.pathname === "/login" || location.pathname === "/register")
  ) {
    return <Navigate to="/admin" replace />;
  }

  // Kiểm tra quyền truy cập trang admin
  if (
    infoUser?.maLoaiNguoiDung === roleUser.USER &&
    infoUser &&
    pagePermission === roleUser.ADMIN
  ) {
    return <Navigate to="/" replace />;
  }

  if (infoUser && !isNeedLogin) {
    //   trường hợp user muốn vào lại trang đăng nhập hoặc đăng ký khi đã login
    return <Navigate to="/" replace />;
  }
  //   nếu user chưa login thì sẽ đá về trang login với 1 số pages
  if (!infoUser && isNeedLogin) {
    return <Navigate to="/login" replace />;
  }

  return <div>{children}</div>;
};

export default AuthCheck;
