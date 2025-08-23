import { axiosCustom } from "./config";

export const userService = {
  login: (infoUser) => {
    return axiosCustom.post("QuanLyNguoiDung/DangNhap", infoUser);
  },
};
