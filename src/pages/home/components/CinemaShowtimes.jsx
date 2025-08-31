import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

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
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {
    cinemaSystemList,
    selectedCinemaSystem,
    cinemaComplexList,
    selectedCinemaComplex,
    cinemaShowtimes,
    loadingComplex,
  } = useSelector((state) => state.cinemaSlice);

  // Intersection Observer for animations
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Generate next 7 days for date selector
  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const formatDate = (date) => {
    return {
      dayName: date.toLocaleDateString("vi-VN", { weekday: "short" }),
      dayNumber: date.getDate(),
      month: date.getMonth() + 1,
      fullDate: date.toLocaleDateString("vi-VN"),
    };
  };

  const fetchCinemaSystemList = async () => {
    try {
      const response = await cinemaService.getCinemaSystemList();
      dispatch(setCinemaSystemListAction(response.data.content));
    } catch (error) {
      console.error("Error fetching cinema system list:", error);
    }
  };

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

  const fetchCinemaShowtimes = async (cinemaSystem) => {
    dispatch(setLoadingAction(true));
    try {
      const response = await cinemaService.getCinemaShowtimes(
        cinemaSystem.maHeThongRap
      );
      dispatch(setCinemaShowtimesAction(response.data.content));
      dispatch(setSelectedCinemaSystemAction(cinemaSystem));
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

  useEffect(() => {
    if (cinemaSystemList.length > 0 && !selectedCinemaSystem) {
      fetchCinemaShowtimes(cinemaSystemList[0]);
    }
  }, [cinemaSystemList]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={sectionRef}
      className={`max-w-full mx-auto bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl p-8 md:p-12 shadow-2xl min-h-screen transition-all duration-1000 ${
        inView
          ? "opacity-100 transform translate-y-0"
          : "opacity-0 transform translate-y-8"
      }`}
    >
      {/* Enhanced Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-xl">
          <span className="text-3xl">🎭</span>
        </div>
        <h3 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-purple-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
          Lịch Chiếu Theo Rạp
        </h3>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Chọn rạp và thời gian phù hợp để thưởng thức những bộ phim tuyệt vời
        </p>
      </div>

      {/* Enhanced Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {/* ================================== */}
        {/* CỘT 1: HỆ THỐNG RẠP (2/12 columns) */}
        {/* ================================== */}
        <div className="md:col-span-2 order-1">
          <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100 md:h-[800px]">
            <h4 className="font-bold text-lg text-gray-800 mb-6 text-center">
              Hệ thống rạp
            </h4>
            <div className="flex md:block gap-3 md:space-y-4 max-h-[700px] overflow-x-auto md:overflow-y-auto scrollbar-hide pb-4">
              {cinemaSystemList.map((cinema, index) => (
                <button
                  key={cinema.maHeThongRap}
                  className={`group relative rounded-2xl border-2 transition-all duration-300 min-w-[80px] md:min-w-0 w-auto md:w-full h-20 md:h-24 flex items-center justify-center transform hover:scale-105 ${
                    selectedCinemaSystem?.maHeThongRap === cinema.maHeThongRap
                      ? "border-red-500 bg-red-50 shadow-lg shadow-red-500/20"
                      : "border-gray-200 bg-white hover:border-red-300 hover:shadow-md"
                  }`}
                  onClick={() => fetchCinemaShowtimes(cinema)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img
                    src={cinema.logo}
                    alt={cinema.tenHeThongRap}
                    className="w-12 h-12 md:w-16 md:h-16 object-contain transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Selection Indicator */}
                  {selectedCinemaSystem?.maHeThongRap ===
                    cinema.maHeThongRap && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ================================== */}
        {/* CỘT 2: CỤM RẠP (4/12 columns)     */}
        {/* ================================== */}
        <div className="md:col-span-4 order-2">
          <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100 md:h-[800px]">
            <h4 className="font-bold text-lg text-gray-800 mb-6">
              Cụm rạp{" "}
              {selectedCinemaSystem &&
                `- ${selectedCinemaSystem.tenHeThongRap}`}
            </h4>

            {selectedCinemaSystem ? (
              <div className="space-y-4 max-h-[700px] overflow-y-auto scrollbar-hide pb-4">
                {loadingComplex ? (
                  <div className="flex justify-center py-20">
                    <Spin size="large" />
                  </div>
                ) : cinemaComplexList.length > 0 ? (
                  cinemaComplexList.map((complex, index) => (
                    <button
                      key={complex.maCumRap}
                      className={`w-full group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                        selectedCinemaComplex?.maCumRap === complex.maCumRap
                          ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20"
                          : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                      }`}
                      onClick={() =>
                        dispatch(setSelectedCinemaComplexAction(complex))
                      }
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="p-6 text-left">
                        <h5 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
                          {complex.tenCumRap}
                        </h5>
                        <p className="text-gray-600 line-clamp-2 leading-relaxed text-sm">
                          {complex.diaChi}
                        </p>

                        {/* Distance indicator (mock) */}
                        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                          <span>📍</span>
                          <span>~2.5km</span>
                          <span>•</span>
                          <span>⭐ 4.8</span>
                        </div>
                      </div>

                      {/* Selection Indicator */}
                      {selectedCinemaComplex?.maCumRap === complex.maCumRap && (
                        <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      )}
                    </button>
                  ))
                ) : (
                  <Empty
                    description="Không có cụm rạp"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-gray-500 text-lg">
                  Chọn hệ thống rạp để xem cụm rạp
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ===================================== */}
        {/* CỘT 3: PHIM & LỊCH CHIẾU (5/12 cols) */}
        {/* ===================================== */}
        <div className="lg:col-span-5 order-3">
          <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100 h-[820px]">
            <h4 className="font-bold text-lg text-gray-800 mb-6">
              Phim & Lịch chiếu{" "}
              {selectedCinemaComplex && `- ${selectedCinemaComplex.tenCumRap}`}
            </h4>

            {selectedCinemaComplex ? (
              <div className="space-y-6 max-h-[700px] overflow-y-auto scrollbar-hide pb-4">
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
                      <Empty
                        description="Không có lịch chiếu cho cụm rạp này"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                      />
                    );
                  }

                  return cumRapData.danhSachPhim.map((movie, index) => (
                    <div
                      key={movie.maPhim}
                      className={`bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${
                        inView ? "animate-fade-in-up" : "opacity-0"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start gap-6 mb-6">
                        <div className="relative group">
                          <img
                            src={movie.hinhAnh}
                            alt={movie.tenPhim}
                            className="w-24 h-36 object-cover rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                          {/* Quick action overlay */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                            <button
                              onClick={() =>
                                navigate(`/detail/${movie.maPhim}`)
                              }
                              className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-200"
                            >
                              <span className="text-lg">👁️</span>
                            </button>
                          </div>
                        </div>

                        <div className="flex-1">
                          <h5 className="font-bold text-gray-800 text-xl line-clamp-2 mb-3 hover:text-red-600 transition-colors cursor-pointer">
                            {movie.tenPhim}
                          </h5>

                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                            <span className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
                              <span className="text-yellow-500">⭐</span>
                              <strong className="text-yellow-700">
                                {movie.danhGia || "9.5"}/10
                              </strong>
                            </span>
                            <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold">
                              T16+
                            </span>
                          </div>

                          {/* Enhanced Date Display */}
                          <div className="text-sm text-gray-500 mb-4 font-medium bg-gray-100 inline-block px-3 py-1 rounded-full">
                            📅 {new Date().toLocaleDateString("vi-VN")}
                          </div>

                          {/* Enhanced Showtimes Grid */}
                          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-2 w-">
                            {movie.lstLichChieuTheoPhim &&
                              movie.lstLichChieuTheoPhim
                                .slice(0, 10)
                                .map((showtime, showtimeIndex) => (
                                  <button
                                    key={showtime.maLichChieu}
                                    className="group relative w-[50px] h-[44px] flex items-center justify-center bg-gradient-to-r from-white to-gray-50 border-2 border-red-200 text-red-600 text-sm font-bold rounded-xl hover:from-red-500 hover:to-red-600 hover:text-white hover:border-red-500 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-lg  "
                                    onClick={() =>
                                      navigate(
                                        `/booking/${showtime.maLichChieu}`
                                      )
                                    }
                                    style={{
                                      animationDelay: `${showtimeIndex * 50}ms`,
                                    }}
                                  >
                                    <div className="relative z-10">
                                      {new Date(
                                        showtime.ngayChieuGioChieu
                                      ).toLocaleTimeString("vi-VN", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </div>

                                    {/* Hover effect background */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
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
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🎪</div>
                <p className="text-gray-500 text-lg">
                  Chọn cụm rạp để xem lịch chiếu
                </p>
              </div>
            )}
          </div>
        </div>
        {/* ===================================== */}
        {/* KẾT THÚC 3 CỘT GRID LAYOUT          */}
        {/* ===================================== */}
      </div>
    </div>
  );
};

export default CinemaShowtimes;
