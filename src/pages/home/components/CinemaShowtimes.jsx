import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Button, Pagination, Empty } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
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

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(3); // Số cụm rạp hiển thị trên mỗi trang

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
    setCurrentPage(1); // Reset về trang đầu khi chọn rạp mới
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-select rạp đầu tiên khi có dữ liệu
  useEffect(() => {
    if (cinemaSystemList.length > 0 && !selectedCinemaSystem) {
      fetchCinemaShowtimes(cinemaSystemList[0]);
    }
  }, [cinemaSystemList, selectedCinemaSystem]); // eslint-disable-line react-hooks/exhaustive-deps

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

  // Tính toán dữ liệu cho phân trang
  const getAllCumRap = () => {
    const allCumRap = [];
    cinemaShowtimes.forEach((theater) => {
      if (theater.lstCumRap) {
        allCumRap.push(...theater.lstCumRap);
      }
    });
    return allCumRap;
  };

  const allCumRap = getAllCumRap();
  const totalCumRap = allCumRap.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCumRap = allCumRap.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top của section khi chuyển trang
    document
      .querySelector(".cinema-showtimes-content")
      ?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex min-h-[600px] border border-gray-300 rounded-lg overflow-hidden shadow-lg">
      {/* Sidebar hệ thống rạp */}
      <div className="w-20 bg-gray-50 border-r border-gray-300 py-4">
        <h3 className="text-center text-xs font-medium mb-4 px-1 text-gray-700">
          Hệ thống rạp
        </h3>
        <div className="flex flex-col gap-3 items-center">
          {cinemaSystemList.map((cinema) => (
            <div
              key={cinema.maHeThongRap}
              className={`w-14 h-14 rounded-lg border-2 overflow-hidden cursor-pointer transition-all duration-300 hover:border-red-500 hover:scale-105 ${
                selectedCinemaSystem?.maHeThongRap === cinema.maHeThongRap
                  ? "border-red-500 scale-105"
                  : "border-transparent"
              }`}
              onClick={() => fetchCinemaShowtimes(cinema)}
            >
              <img
                src={cinema.logo}
                alt={cinema.tenHeThongRap}
                className="w-full h-full object-contain bg-white p-1"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Nội dung lịch chiếu */}
      <div className="flex-1 p-6 cinema-showtimes-content max-h-[700px] overflow-y-auto">
        {!selectedCinemaSystem ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <ClockCircleOutlined className="text-4xl mb-4" />
              <p className="text-lg">Đang tải dữ liệu...</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="sticky top-0 bg-white z-10 pb-4 border-b border-gray-100 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedCinemaSystem.tenHeThongRap}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Hiển thị {currentCumRap.length} trong tổng số {totalCumRap} cụm
                rạp
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Spin size="large" />
              </div>
            ) : totalCumRap === 0 ? (
              <Empty
                description="Không có lịch chiếu cho hệ thống rạp này"
                className="my-16"
              />
            ) : (
              <>
                <div className="space-y-8">
                  {currentCumRap.map((cumRap) => (
                    <div
                      key={cumRap.maCumRap}
                      className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Thông tin cụm rạp */}
                      <div className="flex items-start gap-4 mb-6 pb-4 border-b border-gray-100">
                        <img
                          src={cumRap.hinhAnh}
                          alt={cumRap.tenCumRap}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-lg text-gray-800 mb-1">
                            {cumRap.tenCumRap}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {cumRap.diaChi}
                          </p>
                        </div>
                      </div>

                      {/* Danh sách phim */}
                      {cumRap.danhSachPhim?.length === 0 ? (
                        <Empty
                          description="Không có phim chiếu tại cụm rạp này"
                          className="my-8"
                          size="small"
                        />
                      ) : (
                        cumRap.danhSachPhim?.map((phim) => (
                          <div key={phim.maPhim} className="mb-6 last:mb-0">
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                              {/* Thông tin phim */}
                              <div className="flex items-center gap-4 lg:min-w-[400px]">
                                <img
                                  src={phim.hinhAnh}
                                  alt={phim.tenPhim}
                                  className="w-16 h-20 object-cover rounded cursor-pointer hover:scale-105 transition-transform"
                                  onClick={() =>
                                    navigate(`/movie-detail/${phim.maPhim}`)
                                  }
                                />
                                <div className="flex-1">
                                  <h5
                                    className="font-semibold text-gray-800 mb-1 cursor-pointer hover:text-red-600 transition-colors line-clamp-2"
                                    onClick={() =>
                                      navigate(`/movie-detail/${phim.maPhim}`)
                                    }
                                  >
                                    {phim.tenPhim}
                                  </h5>
                                  <p className="text-xs text-gray-600">
                                    Thời lượng: {phim.thoiLuong || "120"} phút
                                  </p>
                                  <div className="flex items-center gap-2 mt-1">
                                    {phim.hot && (
                                      <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded">
                                        HOT
                                      </span>
                                    )}
                                    {phim.dangChieu && (
                                      <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded">
                                        Đang chiếu
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Lịch chiếu */}
                              <div className="flex-1">
                                {phim.lstLichChieuTheoPhim?.length === 0 ? (
                                  <p className="text-gray-500 text-sm italic">
                                    Chưa có lịch chiếu
                                  </p>
                                ) : (
                                  <>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                                      {phim.lstLichChieuTheoPhim
                                        ?.slice(0, 10)
                                        .map((lichChieu) => (
                                          <Button
                                            key={lichChieu.maLichChieu}
                                            size="small"
                                            className="text-xs h-auto py-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                                            onClick={() => {
                                              navigate(
                                                `/booking/${lichChieu.maLichChieu}`
                                              );
                                            }}
                                          >
                                            <div className="text-center">
                                              <div className="font-medium">
                                                {formatTime(
                                                  lichChieu.ngayChieuGioChieu
                                                )}
                                              </div>
                                              <div className="text-xs opacity-75">
                                                {formatPrice(lichChieu.giaVe)}
                                              </div>
                                            </div>
                                          </Button>
                                        ))}
                                    </div>
                                    {phim.lstLichChieuTheoPhim?.length > 10 && (
                                      <div className="text-center mt-2">
                                        <Button
                                          type="link"
                                          size="small"
                                          className="text-red-500 hover:text-red-600"
                                        >
                                          +
                                          {phim.lstLichChieuTheoPhim.length -
                                            10}{" "}
                                          suất khác
                                        </Button>
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  ))}
                </div>

                {/* Phân trang */}
                {totalCumRap > pageSize && (
                  <div className="flex justify-center mt-8 pt-6 border-t border-gray-100">
                    <Pagination
                      current={currentPage}
                      total={totalCumRap}
                      pageSize={pageSize}
                      onChange={handlePageChange}
                      showSizeChanger={false}
                      showQuickJumper
                      showTotal={(total, range) =>
                        `${range[0]}-${range[1]} của ${total} cụm rạp`
                      }
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CinemaShowtimes;
