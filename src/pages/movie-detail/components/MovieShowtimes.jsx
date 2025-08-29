import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cinemaService } from "../../../services/cinemaService";
import {
  setCinemaSystemListAction,
  setSelectedCinemaSystemAction,
  setCinemaComplexListAction,
  setSelectedCinemaComplexAction,
  setCinemaShowtimesAction,
  setLoadingAction,
  setLoadingComplexAction,
} from "../../../stores/cinema";

const MovieShowtimes = ({ movieId, movieDetail }) => {
  const dispatch = useDispatch();
  const {
    cinemaSystemList,
    selectedCinemaSystem,
    selectedCinemaComplex,
    cinemaShowtimes,
    loading,
    loadingComplex,
  } = useSelector((state) => state.cinemaSlice);

  const [_selectedMovie, setSelectedMovie] = useState(null);

  // Fetch danh sách hệ thống rạp
  const fetchCinemaSystemList = async () => {
    try {
      const response = await cinemaService.getCinemaSystemList();
      dispatch(setCinemaSystemListAction(response.data.content));
    } catch (error) {
      console.error("Error fetching cinema system list:", error);
    }
  };

  // Fetch danh sách cụm rạp theo hệ thống rạp
  const fetchCinemaComplexList = async (cinemaSystemCode) => {
    dispatch(setLoadingComplexAction(true));
    try {
      const response = await cinemaService.getCinemaComplexList(
        cinemaSystemCode
      );
      dispatch(setCinemaComplexListAction(response.data.content));
    } catch (error) {
      console.error("Error fetching cinema complex list:", error);
    } finally {
      dispatch(setLoadingComplexAction(false));
    }
  };

  // Fetch lịch chiếu theo hệ thống rạp
  const fetchCinemaShowtimes = async (cinemaSystem) => {
    dispatch(setLoadingAction(true));
    try {
      const response = await cinemaService.getCinemaShowtimes(
        cinemaSystem.maHeThongRap
      );
      dispatch(setCinemaShowtimesAction(response.data.content));
    } catch (error) {
      console.error("Error fetching cinema showtimes:", error);
    } finally {
      dispatch(setLoadingAction(false));
    }
  };

  useEffect(() => {
    fetchCinemaSystemList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Tìm phim trong lịch chiếu dựa trên movieId
  useEffect(() => {
    if (cinemaShowtimes.length > 0 && movieId) {
      // Tìm phim trong tất cả các rạp
      let foundMovie = null;
      for (const cinema of cinemaShowtimes) {
        for (const cumRap of cinema.lstCumRap) {
          const movie = cumRap.danhSachPhim.find(
            (m) => m.maPhim === parseInt(movieId)
          );
          if (movie) {
            foundMovie = movie;
            break;
          }
        }
        if (foundMovie) break;
      }
      setSelectedMovie(foundMovie);
    }
  }, [cinemaShowtimes, movieId]);

  const handleCinemaSystemSelect = (cinemaSystem) => {
    dispatch(setSelectedCinemaSystemAction(cinemaSystem));
    dispatch(setSelectedCinemaComplexAction(null));
    fetchCinemaComplexList(cinemaSystem.maHeThongRap);
    fetchCinemaShowtimes(cinemaSystem);
  };

  const handleCinemaComplexSelect = (cinemaComplex) => {
    dispatch(setSelectedCinemaComplexAction(cinemaComplex));
  };

  const handleShowtimeClick = (showtime) => {
    console.log("Selected showtime:", showtime);
    alert(`Bạn đã chọn suất chiếu: ${showtime.ngayChieuGioChieu}`);
  };

  // ===================== THUẬT TOÁN THÔNG MINH =====================
  // Lọc ra chỉ các hệ thống rạp có phim hiện tại
  const getAvailableCinemaSystems = () => {
    if (!cinemaShowtimes.length || !movieId) return [];

    const availableSystems = [];

    cinemaShowtimes.forEach((cinema) => {
      // Kiểm tra xem hệ thống rạp này có phim hiện tại không
      const hasCurrentMovie = cinema.lstCumRap.some((cumRap) =>
        cumRap.danhSachPhim.some((movie) => movie.maPhim === parseInt(movieId))
      );

      if (hasCurrentMovie) {
        // Tìm thông tin hệ thống rạp từ cinemaSystemList
        const systemInfo = cinemaSystemList.find(
          (system) => system.maHeThongRap === cinema.maHeThongRap
        );
        if (systemInfo) {
          availableSystems.push(systemInfo);
        }
      }
    });

    return availableSystems;
  };

  // Lọc ra chỉ các cụm rạp có phim hiện tại cho hệ thống đã chọn
  const getAvailableCinemaComplexes = () => {
    if (!selectedCinemaSystem || !cinemaShowtimes.length || !movieId) return [];

    const cinemaData = cinemaShowtimes.find(
      (cinema) => cinema.maHeThongRap === selectedCinemaSystem.maHeThongRap
    );

    if (!cinemaData) return [];

    // Lọc chỉ những cụm rạp có phim hiện tại
    const availableComplexes = cinemaData.lstCumRap.filter((cumRap) =>
      cumRap.danhSachPhim.some((movie) => movie.maPhim === parseInt(movieId))
    );

    return availableComplexes;
  };

  // Lấy thông tin suất chiếu của phim hiện tại
  const getCurrentMovieShowtimes = () => {
    if (!selectedCinemaComplex || !cinemaShowtimes.length || !movieId)
      return null;

    const cinemaData = cinemaShowtimes.find((cinema) =>
      cinema.lstCumRap.some(
        (cumRap) => cumRap.maCumRap === selectedCinemaComplex.maCumRap
      )
    );

    const cumRapData = cinemaData?.lstCumRap?.find(
      (cumRap) => cumRap.maCumRap === selectedCinemaComplex.maCumRap
    );

    // Chỉ lấy phim hiện tại
    const currentMovie = cumRapData?.danhSachPhim?.find(
      (movie) => movie.maPhim === parseInt(movieId)
    );

    return currentMovie;
  };

  // Sử dụng các function thông minh
  const availableCinemaSystems = getAvailableCinemaSystems();
  const availableCinemaComplexes = getAvailableCinemaComplexes();
  const currentMovieShowtimes = getCurrentMovieShowtimes();

  return (
    <div className="movie-showtimes bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header với thống kê */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-1 h-8 bg-blue-600 mr-4"></div>
            <h2 className="text-2xl font-bold text-gray-800">
              LỊCH CHIẾU PHIM
            </h2>
          </div>

          {/* Thống kê */}
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span>{availableCinemaSystems.length} hệ thống rạp</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>{availableCinemaComplexes.length} cụm rạp</span>
            </div>
            {currentMovieShowtimes && (
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                <span>
                  {currentMovieShowtimes.lstLichChieuTheoPhim?.length || 0} suất
                  chiếu
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Cinema System Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Cinema Systems (chỉ hiển thị có phim) */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-lg mb-4 text-gray-700">
              Hệ thống rạp ({availableCinemaSystems.length})
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {availableCinemaSystems.length > 0 ? (
                availableCinemaSystems.map((system) => (
                  <button
                    key={system.maHeThongRap}
                    onClick={() => handleCinemaSystemSelect(system)}
                    className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                      selectedCinemaSystem?.maHeThongRap === system.maHeThongRap
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <img
                        src={system.logo}
                        alt={system.tenHeThongRap}
                        className="w-8 h-8 object-contain mr-3"
                      />
                      <span className="font-medium text-sm">
                        {system.tenHeThongRap}
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 text-sm">
                  Không có rạp chiếu phim này
                </div>
              )}
            </div>
          </div>

          {/* Middle Column - Cinema Complexes (chỉ hiển thị có phim) */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-lg mb-4 text-gray-700">
              Cụm rạp ({availableCinemaComplexes.length})
            </h3>
            {loadingComplex ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : availableCinemaComplexes.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {availableCinemaComplexes.map((complex) => (
                  <button
                    key={complex.maCumRap}
                    onClick={() => handleCinemaComplexSelect(complex)}
                    className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                      selectedCinemaComplex?.maCumRap === complex.maCumRap
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="text-sm font-medium mb-1">
                      {complex.tenCumRap}
                    </div>
                    <div className="text-xs text-gray-500 line-clamp-2">
                      {complex.diaChi}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 text-sm">
                {selectedCinemaSystem
                  ? "Hệ thống này không có cụm rạp chiếu phim này"
                  : "Vui lòng chọn hệ thống rạp trước"}
              </div>
            )}
          </div>

          {/* Right Column - Movie Showtimes */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-lg mb-4 text-gray-700">Suất chiếu</h3>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Đang tải lịch chiếu...</p>
              </div>
            ) : currentMovieShowtimes ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={movieDetail?.hinhAnh}
                    alt={movieDetail?.tenPhim}
                    className="w-20 h-28 object-cover rounded-lg shadow-sm"
                  />
                  <div className="flex-1">
                    <h5 className="font-bold text-gray-800 text-lg mb-2">
                      {movieDetail?.tenPhim}
                    </h5>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <span className="text-yellow-500">⭐</span>
                        <strong>{movieDetail?.danhGia || "9.0"}/10</strong>
                      </span>
                      <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                        T16+
                      </span>
                    </div>
                  </div>
                </div>

                {/* Showtimes Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {currentMovieShowtimes.lstLichChieuTheoPhim?.map(
                    (showtime) => (
                      <button
                        key={showtime.maLichChieu}
                        onClick={() => handleShowtimeClick(showtime)}
                        className="p-3 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-center group"
                      >
                        <div className="text-sm font-bold text-gray-800 group-hover:text-blue-600">
                          {new Date(
                            showtime.ngayChieuGioChieu
                          ).toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {showtime.giaVe?.toLocaleString("vi-VN")}đ
                        </div>
                      </button>
                    )
                  ) || (
                    <div className="col-span-full text-center py-8 text-gray-500">
                      Không có suất chiếu cho phim này
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                Vui lòng chọn hệ thống rạp và cụm rạp để xem lịch chiếu
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieShowtimes;
