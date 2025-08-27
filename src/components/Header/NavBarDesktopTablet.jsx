import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogoutAction } from "../../stores/user";
import { Button } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const NavBarDesktopTablet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { infoUser } = useSelector((state) => state.userSlice);

  const handleLogout = () => {
    dispatch(setLogoutAction());
  };

  const menuItems = [
    { label: "TRANG CHỦ", path: "/" },
    { label: "PHIM", path: "/movies" },
    { label: "RẠP", path: "/cinemas" },
    { label: "TIN TỨC", path: "/news" },
    { label: "KHUYẾN MÃI", path: "/promotions" }
  ];

  return (
    <div className="flex items-center gap-8">
      {/* Navigation Menu */}
      <nav className="hidden lg:flex items-center gap-6">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className="text-white hover:text-red-500 font-semibold transition-colors duration-200 relative group"
          >
            {item.label}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-200 group-hover:w-full"></span>
          </button>
        ))}
      </nav>

      {/* User Section */}
      {infoUser ? (
        <div className="flex items-center gap-4">
          <Button
            type="text"
            icon={<UserOutlined />}
            onClick={() => navigate("/info")}
            className="text-white hover:text-red-500 border-none"
          >
            <span className="hidden md:inline">Xin chào, {infoUser?.hoTen}</span>
          </Button>
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 border-red-600"
          >
            <span className="hidden md:inline">Đăng xuất</span>
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Button
            type="primary"
            onClick={() => navigate("/login")}
            className="bg-red-600 hover:bg-red-700 border-red-600 font-semibold"
          >
            ĐĂNG NHẬP
          </Button>
          <Button
            onClick={() => navigate("/register")}
            className="border-white text-white hover:bg-white hover:text-black font-semibold"
          >
            ĐĂNG KÝ
          </Button>
        </div>
      )}
    </div>
  );
};

export default NavBarDesktopTablet;