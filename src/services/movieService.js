import { axiosCustom } from "./config";

export const movieService = {
  getListMovies: async () => {
    return axiosCustom.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
  },

  getMovieDetail: (movieId) => {
    return axiosCustom.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`);
  },

  getBannerList: async () => {
    return axiosCustom.get("/QuanLyPhim/LayDanhSachBanner");
  },

  addMovieUpload: (formData) => {
    return axiosCustom.post("/QuanLyPhim/ThemPhimUploadHinh", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
