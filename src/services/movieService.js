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

  updateMovieUpload: (formData) => {
    return axiosCustom.post("/QuanLyPhim/CapNhatPhimUpload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteMovie: (movieId) => {
    return axiosCustom.delete(`/QuanLyPhim/XoaPhim?MaPhim=${movieId}`);
  },
};
