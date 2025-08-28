import { axiosCustom } from "./config";

export const userService = {
  login: (infoUser) => {
    return axiosCustom.post("QuanLyNguoiDung/DangNhap", infoUser);
  },

  register: (infoUser) => {
    return axiosCustom.post("/QuanLyNguoiDung/DangKy", infoUser);
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

  getListUser: () => {
    return axiosCustom.get("/QuanLyNguoiDung/LayDanhSachNguoiDung");
  },

  deleteUser: (taiKhoan) => {
    return axiosCustom.delete(
      `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
  },
};
