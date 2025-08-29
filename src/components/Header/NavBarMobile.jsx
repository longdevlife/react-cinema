import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogoutAction } from "../../stores/user";

const NavBarMobile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { infoUser } = useSelector((state) => state.userSlice);

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(setLogoutAction());
    setOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={showDrawer}
        className="bg-purple-600 border-purple-600"
      >
        Menu
      </Button>
      <Drawer
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        width={250}
        className="mobile-nav-drawer"
      >
        <div className="flex flex-col space-y-4 p-4">
          {/* Navigation Links */}
          <div className="space-y-3 border-b border-gray-200 pb-4">
            <button
              onClick={() => scrollToSection("phim")}
              className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-left"
            >
              📽️ Phim
            </button>
            <button
              onClick={() => scrollToSection("rap")}
              className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-left"
            >
              🏪 Rạp
            </button>
          </div>

          {infoUser ? (
            <div className="space-y-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-800">Xin chào</p>
                <p className="text-purple-600 font-bold">{infoUser?.hoTen}</p>
              </div>
              <button
                onClick={() => {
                  navigate("/info");
                  setOpen(false);
                }}
                className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Thông tin cá nhân
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => {
                  navigate("/login");
                  setOpen(false);
                }}
                className="w-full px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => {
                  navigate("/register");
                  setOpen(false);
                }}
                className="w-full px-4 py-3 bg-white text-purple-600 border-2 border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Đăng ký
              </button>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default NavBarMobile;
