import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Button, Empty, Card, Tag, Tooltip } from "antd";
import { 
  ClockCircleOutlined, 
  EnvironmentOutlined, 
  StarOutlined,
  CalendarOutlined,
  PlayCircleOutlined,
  FireOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { cinemaService } from "../../../services/cinemaService";
import {
  setCinemaSystemListAction,
  setSelectedCinemaSystemAction,
  setCinemaShowtimesAction,
  setLoadingAction,
} from "../../../stores/cinema";

const CinemaShowtimes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [expandedMovies, setExpandedMovies] = useState(new Set());

  const { cinemaSystemList, selectedCinemaSystem, cinemaShowtimes, loading } =
    useSelector((state) => state.cinemaSlice);

  // Fetch danh sách hệ thống rạp
  const fetchCinemaSystemList = async () => {
    try {
      const response = await cinemaService.getCinemaSystemList();
      dispatch(setCinemaSystemListAction(response.data.content));
    } catch (error) {
      console.error("Error fetching cinema system list:", error);
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
  }, []);

  // Auto-select rạp đầu tiên khi có dữ liệu
  useEffect(() => {
    if (cinemaSystemList.length > 0 && !selectedCinemaSystem) {
      fetchCinemaShowtimes(cinemaSystemList[0]);
    }
  }, [cinemaSystemList, selectedCinemaSystem]);

  // Format thời gian
  const formatTime = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format giá tiền
  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  // Generate next 7 days for date selector
  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        date: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('vi-VN', { weekday: 'short' }),
        dayNumber: date.getDate(),
        month: date.getMonth() + 1
      });
    }
    return days;
  };

  const toggleMovieExpansion = (movieId) => {
    const newExpanded = new Set(expandedMovies);
    if (newExpanded.has(movieId)) {
      newExpanded.delete(movieId);
    } else {
      newExpanded.add(movieId);
    }
    setExpandedMovies(newExpanded);
  };

  const days = getNext7Days();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Cinema System Selector */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-6 h-6 bg-gradient-to-r from-red-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm">🎭</span>
          Chọn hệ thống rạp
        </h3>
        <div className="flex flex-wrap gap-4">
          {cinemaSystemList.map((cinema) => (
            <button
              key={cinema.maHeThongRap}
              className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                selectedCinemaSystem?.maHeThongRap === cinema.maHeThongRap
                  ? "border-red-500 bg-red-50 shadow-lg shadow-red-500/25"
                  : "border-gray-200 bg-white hover:border-red-300 hover:shadow-lg"
              }`}
              onClick={() => fetchCinemaShowtimes(cinema)}
            >
              <div className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-white shadow-sm">
                  <img
                    src={cinema.logo}
                    alt={cinema.tenHeThongRap}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                    {cinema.tenHeThongRap}
                  </h4>
                  <p className="text-xs text-gray-500">Hệ thống rạp</p>
                </div>
              </div>
              {selectedCinemaSystem?.maHeThongRap === cinema.maHeThongRap && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-purple-500/10 pointer-events-none"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Date Selector */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <CalendarOutlined className="text-red-500" />
          Chọn ngày xem
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {days.map((day) => (
            <button
              key={day.date}
              className={`flex-shrink-0 p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 min-w-[80px] ${
                selectedDate === day.date
                  ? "border-red-500 bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25"
                  : "border-gray-200 bg-white hover:border-red-300 hover:shadow-md text-gray-700"
              }`}
              onClick={() => setSelectedDate(day.date)}
            >
              <div className="text-center">
                <div className="text-xs font-medium opacity-80 mb-1">
                  {day.dayName}
                </div>
                <div className="text-lg font-bold">
                  {day.dayNumber}
                </div>
                <div className="text-xs opacity-80">
                  Th{day.month}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cinema Content */}
      {!selectedCinemaSystem ? (
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-3xl">
          <div className="text-center text-gray-500">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClockCircleOutlined className="text-2xl" />
            </div>
            <p className="text-lg font-medium">Đang tải dữ liệu...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center items-center h-64 bg-gray-50 rounded-3xl">
              <Spin size="large" />
            </div>
          ) : cinemaShowtimes.length === 0 ? (
            <div className="bg-gray-50 rounded-3xl p-12">
              <Empty
                description="Không có lịch chiếu cho hệ thống rạp này"
                className="my-8"
              />
            </div>
          ) : (
            cinemaShowtimes.map((theater) => (
              <div key={theater.maHeThongRap} className="space-y-6">
                {theater.lstCumRap?.map((cumRap) => (
                  <Card
                    key={cumRap.maCumRap}
                    className="cinema-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden"
                    bodyStyle={{ padding: 0 }}
                  >
                    {/* Cinema Header */}
                    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-2">
                          <img
                            src={cumRap.hinhAnh}
                            alt={cumRap.tenCumRap}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                            {cumRap.tenCumRap}
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                              PREMIUM
                            </span>
                          </h3>
                          <p className="text-gray-300 flex items-center gap-2">
                            <EnvironmentOutlined />
                            {cumRap.diaChi}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-yellow-400 mb-1">
                            <StarOutlined />
                            <span className="font-bold">4.8</span>
                          </div>
                          <p className="text-xs text-gray-400">1,234 đánh giá</p>
                        </div>
                      </div>
                    </div>

                    {/* Movies List */}
                    <div className="p-6 bg-white">
                      {cumRap.danhSachPhim?.length === 0 ? (
                        <Empty
                          description="Không có phim chiếu tại cụm rạp này"
                          className="my-8"
                          size="small"
                        />
                      ) : (
                        <div className="space-y-6">
                          {cumRap.danhSachPhim?.map((phim) => {
                            const isExpanded = expandedMovies.has(phim.maPhim);
                            const showtimes = phim.lstLichChieuTheoPhim || [];
                            const visibleShowtimes = isExpanded ? showtimes : showtimes.slice(0, 6);
                            
                            return (
                              <div
                                key={phim.maPhim}
                                className="movie-item bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-red-200 hover:shadow-md transition-all duration-300"
                              >
                                <div className="flex flex-col lg:flex-row gap-6">
                                  {/* Movie Info */}
                                  <div className="flex gap-4 lg:min-w-[400px]">
                                    <div className="relative group cursor-pointer">
                                      <img
                                        src={phim.hinhAnh}
                                        alt={phim.tenPhim}
                                        className="w-20 h-28 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                                        onClick={() => navigate(`/movie-detail/${phim.maPhim}`)}
                                      />
                                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 rounded-xl transition-all duration-300 flex items-center justify-center">
                                        <PlayCircleOutlined className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                      </div>
                                    </div>
                                    
                                    <div className="flex-1">
                                      <h4
                                        className="font-bold text-lg text-gray-800 mb-2 cursor-pointer hover:text-red-600 transition-colors line-clamp-2 leading-tight"
                                        onClick={() => navigate(`/movie-detail/${phim.maPhim}`)}
                                      >
                                        {phim.tenPhim}
                                      </h4>
                                      
                                      <div className="flex flex-wrap gap-2 mb-3">
                                        {phim.hot && (
                                          <Tag color="red" className="flex items-center gap-1 border-0 rounded-full">
                                            <FireOutlined />
                                            HOT
                                          </Tag>
                                        )}
                                        {phim.dangChieu && (
                                          <Tag color="green" className="border-0 rounded-full">
                                            Đang chiếu
                                          </Tag>
                                        )}
                                        <Tag color="blue" className="border-0 rounded-full">
                                          T16
                                        </Tag>
                                      </div>
                                      
                                      <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                          <ClockCircleOutlined />
                                          {phim.thoiLuong || "120"} phút
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <StarOutlined className="text-yellow-500" />
                                          8.5
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Showtimes */}
                                  <div className="flex-1">
                                    {showtimes.length === 0 ? (
                                      <div className="text-center py-8">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                          <ClockCircleOutlined className="text-gray-400 text-xl" />
                                        </div>
                                        <p className="text-gray-500 font-medium">Chưa có lịch chiếu</p>
                                      </div>
                                    ) : (
                                      <div>
                                        <div className="flex items-center justify-between mb-4">
                                          <h5 className="font-semibold text-gray-700 flex items-center gap-2">
                                            <CalendarOutlined />
                                            Lịch chiếu ({showtimes.length} suất)
                                          </h5>
                                          {showtimes.length > 6 && (
                                            <button
                                              onClick={() => toggleMovieExpansion(phim.maPhim)}
                                              className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
                                            >
                                              {isExpanded ? "Thu gọn" : `+${showtimes.length - 6} suất khác`}
                                            </button>
                                          )}
                                        </div>
                                        
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                                          {visibleShowtimes.map((lichChieu) => {
                                            const showDate = new Date(lichChieu.ngayChieuGioChieu);
                                            const isToday = showDate.toDateString() === new Date().toDateString();
                                            const isPast = showDate < new Date();
                                            
                                            return (
                                              <Tooltip
                                                key={lichChieu.maLichChieu}
                                                title={`${formatTime(lichChieu.ngayChieuGioChieu)} - ${formatPrice(lichChieu.giaVe)}`}
                                              >
                                                <Button
                                                  className={`showtime-btn h-auto py-3 px-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                                                    isPast
                                                      ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                                                      : isToday
                                                      ? "border-red-500 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25 hover:shadow-xl"
                                                      : "border-blue-500 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl"
                                                  }`}
                                                  disabled={isPast}
                                                  onClick={() => {
                                                    if (!isPast) {
                                                      navigate(`/booking/${lichChieu.maLichChieu}`);
                                                    }
                                                  }}
                                                >
                                                  <div className="text-center">
                                                    <div className="font-bold text-sm mb-1">
                                                      {formatTime(lichChieu.ngayChieuGioChieu)}
                                                    </div>
                                                    <div className="text-xs opacity-90">
                                                      {formatPrice(lichChieu.giaVe)}
                                                    </div>
                                                    {isToday && (
                                                      <div className="text-xs mt-1 bg-white/20 rounded-full px-2 py-0.5">
                                                        Hôm nay
                                                      </div>
                                                    )}
                                                  </div>
                                                </Button>
                                              </Tooltip>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CinemaShowtimes;