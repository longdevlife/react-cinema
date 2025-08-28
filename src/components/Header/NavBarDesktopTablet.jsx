import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogoutAction } from "../../stores/user";
import {
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";

const NavBarDesktopTablet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { infoUser } = useSelector((state) => state.userSlice);

  const handleLogout = () => {
    dispatch(setLogoutAction());
  };

  const userMenuItems = [
    {
      key: "profile",
      label: "Thông tin cá nhân",
      icon: <UserOutlined />,
      onClick: () => navigate("/info"),
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="flex items-center gap-6">
      {/* Navigation Links */}
      <nav className="hidden lg:flex items-center gap-6">
        <a
          href="#phim"
          className="text-white hover:text-red-500 transition-colors duration-300 font-medium"
        >
          Phim
        </a>
        <a
          href="#rap"
          className="text-white hover:text-red-500 transition-colors duration-300 font-medium"
        >
          Rạp
        </a>
        <a
          href="#khuyen-mai"
          className="text-white hover:text-red-500 transition-colors duration-300 font-medium"
        >
          Khuyến mãi
        </a>
        <a
          href="#lien-he"
          className="text-white hover:text-red-500 transition-colors duration-300 font-medium"
        >
          Liên hệ
        </a>
      </nav>

      {/* User Section */}
      {infoUser ? (
        <Dropdown
          menu={{ items: userMenuItems }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <div className="flex items-center gap-2 cursor-pointer hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300">
            <Avatar size={32} icon={<UserOutlined />} className="bg-red-600" />
            <span className="text-white font-medium hidden md:block">
              {infoUser?.hoTen}
            </span>
          </div>
        </Dropdown>
      ) : (
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent border border-white/30 text-white hover:bg-white/10 transition-all duration-300 font-medium"
          >
            <LoginOutlined />
            <span className="hidden md:block">Đăng nhập</span>
          </button>
          <button
            onClick={() => navigate("/register")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all duration-300 font-medium"
          >
            <UserAddOutlined />
            <span className="hidden md:block">Đăng ký</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBarDesktopTablet;
