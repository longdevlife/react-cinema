import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogoutAction } from "../../stores/user";

const NavBarDesktopTablet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { infoUser } = useSelector((state) => state.userSlice);

  const handleLogout = () => {
    dispatch(setLogoutAction());
  };
  return (
    <div>
      {infoUser ? (
        <div className="text-white font-bold">
          <span
            className="cursor-pointer"
            onClick={() => {
              navigate("/info");
            }}
          >
            Xin chào {infoUser?.hoTen}
          </span>
          <button
            onClick={handleLogout}
            className="bg-purple-400 px-2 py-1 rounded ml-2"
          >
            Đăng xuất
          </button>
        </div>
      ) : (
        <div className="text-white ">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="px-2 py-1 rounded bg-purple-400 hover:bg-purple-500 text-white cursor-pointer"
          >
            Đăng nhập
          </button>
          <button
            onClick={() => {
              navigate("/register");
            }}
            className="ml-2 px-2 py-1 rounded bg-white text-black hover:bg-gray-200 cursor-pointer"
          >
            Đăng ký
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBarDesktopTablet;
