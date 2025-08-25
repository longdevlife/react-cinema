import { axiosCustom } from "./config";

export const userService = {
  login: (infoUser) => {
    return axiosCustom.post("QuanLyNguoiDung/DangNhap", infoUser);
  },

  getInfoUser: () => {
    return axiosCustom.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
  },
  updateInfoUser: (infoUser) => {
    return axiosCustom.put(
      "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      infoUser
    );
  },
};
