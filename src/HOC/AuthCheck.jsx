import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const roleUser = {
  ADMIN: "quanTri",
  USER: "khachHang",
};

const AuthCheck = ({ children, isNeedLogin, pagePermission }) => {
  const { infoUser } = useSelector((state) => state.userSlice);

  // trường hợp mã loại người dùng là admin thì đá về trang admin =>

  const location = useLocation();
  // nếu user là admin và đang ở trang khác ngoài admin thì sẽ chuyển hướng về trang admin , còn nếu đang ở trang admin thì sẽ bỏ qua điều kiện này
  if (
    infoUser?.maLoaiNguoiDung === roleUser.ADMIN &&
    infoUser &&
    !location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/admin" replace />;
  }

  if (
    infoUser?.maLoaiNguoiDung === roleUser.USER &&
    infoUser &&
    pagePermission === "quanTri"
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
