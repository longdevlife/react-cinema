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

  //admin page

  getListUser: () => {
    return axiosCustom.get("/QuanLyNguoiDung/LayDanhSachNguoiDung");
  },

  deleteUser: (taiKhoan) => {
    return axiosCustom.delete(
      `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
  },

  // Thêm người dùng mới (admin)
  addUser: (userData) => {
    return axiosCustom.post("/QuanLyNguoiDung/ThemNguoiDung", userData);
  },

  // Cập nhật thông tin người dùng (admin)
  updateUser: (userData) => {
    return axiosCustom.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", userData);
  },
};
