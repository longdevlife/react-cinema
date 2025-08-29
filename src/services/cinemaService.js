import { axiosCustom } from "./config";

export const cinemaService = {
  // Lấy danh sách hệ thống rạp
  getCinemaSystemList: async () => {
    return axiosCustom.get("/QuanLyRap/LayThongTinHeThongRap");
  },

  // Lấy danh sách cụm rạp theo hệ thống rạp
  getCinemaComplexList: async (maHeThongRap) => {
    return axiosCustom.get(
      `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
    );
  },

  // Lấy thông tin lịch chiếu theo hệ thống rạp
  getCinemaShowtimes: async (maHeThongRap) => {
    return axiosCustom.get(
      `/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01&maHeThongRap=${maHeThongRap}`
    );
  },
};
