import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";

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

const CinemaShowtimes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    cinemaSystemList,
    selectedCinemaSystem,
    cinemaComplexList,
    selectedCinemaComplex,
    cinemaShowtimes,
    loadingComplex,
  } = useSelector((state) => state.cinemaSlice);

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
      dispatch(setSelectedCinemaSystemAction(cinemaSystem));

      // Fetch danh sách cụm rạp khi chọn hệ thống rạp
      await fetchCinemaComplexList(cinemaSystem.maHeThongRap);
    } catch (error) {
      console.error("Error fetching cinema showtimes:", error);
    } finally {
      dispatch(setLoadingAction(false));
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await fetchCinemaSystemList();
    };
    initializeData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-select rạp đầu tiên khi có dữ liệu
  useEffect(() => {
    if (cinemaSystemList.length > 0 && !selectedCinemaSystem) {
      fetchCinemaShowtimes(cinemaSystemList[0]);
    }
  }, [cinemaSystemList]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="max-w-full mx-auto bg-white rounded-3xl p-10 shadow-lg min-h-screen">
      <h3 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <span className="w-10 h-10 bg-gradient-to-r from-red-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg">
          🎭
        </span>
        Lịch Chiếu Theo Cụm Rạp
      </h3>

      {/* Layout 3 cột */}
      <div className="grid grid-cols-12 gap-6">
        {/* Cột 1: Hệ thống rạp - chỉ logo */}
        <div className="col-span-2">
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200 h-[1000px]">
            <div className="space-y-4 h-full overflow-y-auto scrollbar-hide">
              {cinemaSystemList.map((cinema) => (
                <button
                  key={cinema.maHeThongRap}
                  className={`w-full group relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                    selectedCinemaSystem?.maHeThongRap === cinema.maHeThongRap
                      ? "border-red-500 bg-red-50 shadow-lg shadow-red-500/25"
                      : "border-gray-200 bg-white hover:border-red-300 hover:shadow-lg"
                  }`}
                  onClick={() => fetchCinemaShowtimes(cinema)}
                >
                  <div className="p-4 flex justify-center">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shadow-sm">
                      <img
                        src={cinema.logo}
                        alt={cinema.tenHeThongRap}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cột 2: Cụm rạp - to hơn */}
        <div className="col-span-4">
          <div className="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-200 h-[1000px]">
            {selectedCinemaSystem ? (
              <div className="space-y-5 h-full overflow-y-auto scrollbar-hide">
                {loadingComplex ? (
                  <div className="flex justify-center py-16">
                    <Spin size="large" />
                  </div>
                ) : cinemaComplexList.length > 0 ? (
                  cinemaComplexList.map((complex) => (
                    <button
                      key={complex.maCumRap}
                      className={`w-full group relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                        selectedCinemaComplex?.maCumRap === complex.maCumRap
                          ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/25"
                          : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg"
                      }`}
                      onClick={() =>
                        dispatch(setSelectedCinemaComplexAction(complex))
                      }
                    >
                      <div className="p-6 text-left">
                        <h4 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors line-clamp-2 mb-4">
                          {complex.tenCumRap}
                        </h4>
                        <p className="text-base text-gray-600 line-clamp-3 leading-relaxed">
                          {complex.diaChi}
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-20 text-gray-500 text-lg">
                    Không có cụm rạp
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500 text-lg">
                Chọn hệ thống rạp để xem cụm rạp
              </div>
            )}
          </div>
        </div>

        {/* Cột 3: Lịch chiếu - to và nhiều hơn */}
        <div className="col-span-6">
          <div className="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-200 h-[1000px]">
            {selectedCinemaComplex ? (
              <div className="space-y-8 h-full overflow-y-auto scrollbar-hide">
                {(() => {
                  const cinemaData = cinemaShowtimes?.find((cinema) =>
                    cinema.lstCumRap?.some(
                      (cumRap) =>
                        cumRap.maCumRap === selectedCinemaComplex.maCumRap
                    )
                  );

                  const cumRapData = cinemaData?.lstCumRap?.find(
                    (cumRap) =>
                      cumRap.maCumRap === selectedCinemaComplex.maCumRap
                  );

                  if (
                    !cumRapData ||
                    !cumRapData.danhSachPhim ||
                    cumRapData.danhSachPhim.length === 0
                  ) {
                    return (
                      <div className="text-center py-24 text-gray-500 text-xl">
                        Không có lịch chiếu cho cụm rạp này
                      </div>
                    );
                  }

                  return cumRapData.danhSachPhim.map((movie) => (
                    <div
                      key={movie.maPhim}
                      className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start gap-6 mb-8">
                        <img
                          src={movie.hinhAnh}
                          alt={movie.tenPhim}
                          className="w-24 h-32 object-cover rounded-xl shadow-sm"
                        />
                        <div className="flex-1">
                          <h5 className="font-bold text-gray-800 text-xl line-clamp-2 mb-4">
                            {movie.tenPhim}
                          </h5>
                          <div className="flex items-center gap-4 text-base text-gray-600 mb-5">
                            <span className="flex items-center gap-1">
                              <span className="text-yellow-500">⭐</span>
                              <strong>{movie.danhGia}/10</strong>
                            </span>
                            <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                              T{movie.tuoi}+
                            </span>
                          </div>

                          {/* Ngày chiếu */}
                          <div className="text-sm text-gray-500 mb-4 font-medium">
                            Thứ Hai, 7 Tháng Một 2019
                          </div>

                          {/* Suất chiếu */}
                          <div className="grid grid-cols-4 gap-3">
                            {movie.lstLichChieuTheoPhim &&
                              movie.lstLichChieuTheoPhim
                                .slice(0, 8)
                                .map((showtime) => (
                                  <button
                                    key={showtime.maLichChieu}
                                    className="px-4 py-3 bg-white border-2 border-red-500 text-red-600 text-sm font-medium rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 transform hover:scale-105"
                                    onClick={() =>
                                      navigate(`/movie-detail/${movie.maPhim}`)
                                    }
                                  >
                                    {new Date(
                                      showtime.ngayChieuGioChieu
                                    ).toLocaleTimeString("vi-VN", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </button>
                                ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            ) : (
              <div className="text-center py-24 text-gray-500 text-xl">
                Chọn cụm rạp để xem lịch chiếu
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemaShowtimes;
