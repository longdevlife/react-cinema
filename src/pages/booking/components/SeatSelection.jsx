import React, { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { cinemaService } from "../../../services/cinemaService";

const SeatSelection = () => {
  const { showtimeId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userSlice.userInfo);

  // States
  const [showtimeDetail, setShowtimeDetail] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch thông tin lịch chiếu và ghế
  const fetchShowtimeDetail = async () => {
    setLoading(true);
    try {
      // Gọi API để lấy thông tin lịch chiếu và sơ đồ ghế
      const response = await cinemaService.getShowtimeDetail(showtimeId);
      console.log("Showtime detail response:", response);

      if (response.data.content) {
        // Kiểm tra và xử lý dữ liệu từ API
        const apiData = response.data.content;
        console.log("API Data:", apiData);
        console.log("Danh sách ghế từ API:", apiData.danhSachGhe);

        // Nếu API không có dữ liệu ghế hoặc format khác, dùng mock data
        if (!apiData.danhSachGhe || apiData.danhSachGhe.length === 0) {
          console.log("API không có dữ liệu ghế, sử dụng mock data");
          const mockData = {
            ...apiData,
            danhSachGhe: generateMockSeats(),
          };
          setShowtimeDetail(mockData);
        } else {
          setShowtimeDetail(apiData);
        }
      } else {
        // Fallback to mock data if API fails
        console.log("API không trả về content, sử dụng mock data");
        const mockData = {
          thongTinPhim: {
            maLichChieu: showtimeId,
            tenCumRap: "CGV Vincom Center Landmark 81",
            tenRap: "Rạp 6",
            diaChi: "720A Điện Biên Phủ, Bình Thạnh, Hồ Chí Minh",
            tenPhim: "Lật Mặt 48h",
            hinhAnh:
              "https://movienew.cybersoft.edu.vn/hinhanh/lat-mat-48h_gp01.jpg",
            ngayChieu: "01/01/2023",
            gioChieu: "22:45",
          },
          danhSachGhe: generateMockSeats(),
        };
        setShowtimeDetail(mockData);
      }
    } catch (error) {
      console.error("Error fetching showtime detail:", error);

      // Use mock data if API call fails
      console.log("API call failed, sử dụng mock data");
      const mockData = {
        thongTinPhim: {
          maLichChieu: showtimeId,
          tenCumRap: "CGV Vincom Center Landmark 81",
          tenRap: "Rạp 6",
          diaChi: "720A Điện Biên Phủ, Bình Thạnh, Hồ Chí Minh",
          tenPhim: "Lật Mặt 48h",
          hinhAnh:
            "https://movienew.cybersoft.edu.vn/hinhanh/lat-mat-48h_gp01.jpg",
          ngayChieu: "01/01/2023",
          gioChieu: "22:45",
        },
        danhSachGhe: generateMockSeats(),
      };
      setShowtimeDetail(mockData);
      setError("Đang sử dụng dữ liệu mẫu");
    } finally {
      setLoading(false);
    }
  }; // Tạo dữ liệu ghế giả lập với 160 ghế (10 hàng x 16 ghế)
  const generateMockSeats = () => {
    const seats = [];
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]; // 10 hàng
    const seatsPerRow = 16;

    rows.forEach((row, rowIndex) => {
      for (let seatNumber = 1; seatNumber <= seatsPerRow; seatNumber++) {
        const seatId = `${row}${seatNumber.toString().padStart(2, "0")}`; // A01, A02, ...
        const randomStatus = Math.random();
        let loaiGhe = "Thuong"; // Thường
        let giaVe = 75000;

        // Ghế VIP (3 hàng đầu)
        if (rowIndex < 3) {
          loaiGhe = "Vip";
          giaVe = 100000;
        }

        seats.push({
          maGhe: seatId,
          tenGhe: seatId,
          maRap: showtimeId,
          loaiGhe: loaiGhe,
          stt: seatNumber,
          giaVe: giaVe,
          daDat: randomStatus < 0.2, // 20% ghế đã đặt
          taiKhoanNguoiDat: randomStatus < 0.1 ? user?.taiKhoan : null,
        });
      }
    });

    return seats;
  };

  useEffect(() => {
    if (!showtimeId) {
      navigate("/");
      return;
    }
    fetchShowtimeDetail();
  }, [showtimeId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSeatClick = (seat) => {
    if (seat.daDat) return; // Không thể chọn ghế đã đặt

    const isSelected = selectedSeats.find((s) => s.maGhe === seat.maGhe);
    if (isSelected) {
      // Bỏ chọn ghế
      setSelectedSeats(selectedSeats.filter((s) => s.maGhe !== seat.maGhe));
    } else {
      // Chọn ghế (tối đa 8 ghế)
      if (selectedSeats.length < 8) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seat) => total + seat.giaVe, 0);
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Vui lòng chọn ghế");
      return;
    }

    // Chuyển đến trang thanh toán
    const bookingData = {
      showtimeDetail,
      selectedSeats,
      totalPrice: calculateTotal(),
    };

    // Lưu vào sessionStorage để truyền sang trang thanh toán
    sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
    navigate("/booking/payment");
  };

  const getSeatStatus = (seat) => {
    if (seat.daDat) {
      return seat.taiKhoanNguoiDat === user?.taiKhoan ? "mine" : "occupied";
    }
    if (selectedSeats.find((s) => s.maGhe === seat.maGhe)) {
      return "selected";
    }
    return seat.loaiGhe === "Vip" ? "vip" : "available";
  };

  const getSeatClass = (status) => {
    const baseClass =
      "w-8 h-8 m-1 rounded cursor-pointer flex items-center justify-center text-xs font-medium transition-all duration-200";

    switch (status) {
      case "occupied":
        return `${baseClass} bg-red-500 text-white cursor-not-allowed`;
      case "mine":
        return `${baseClass} bg-blue-500 text-white cursor-not-allowed`;
      case "selected":
        return `${baseClass} bg-green-500 text-white shadow-lg`;
      case "vip":
        return `${baseClass} bg-yellow-400 text-black hover:bg-yellow-500`;
      case "available":
        return `${baseClass} bg-gray-200 text-gray-700 hover:bg-gray-300`;
      default:
        return baseClass;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải sơ đồ ghế...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">❌</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  if (!showtimeDetail) return null;

  const { thongTinPhim, danhSachGhe } = showtimeDetail;

  // Nhóm ghế theo hàng và sắp xếp - xử lý cả format API và mock data
  const groupedSeats = (() => {
    // Kiểm tra format dữ liệu ghế
    const firstSeat = danhSachGhe[0];
    console.log("First seat:", firstSeat);

    // Nếu ghế có format số (từ API) - chuyển thành format chữ
    if (firstSeat && /^\d+$/.test(firstSeat.tenGhe)) {
      console.log("Sử dụng format API với số ghế");

      // Tạo layout 10 hàng x 16 ghế với dữ liệu API
      const seats = {};
      const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
      const seatsPerRow = 16;

      rows.forEach((row, rowIndex) => {
        seats[row] = [];
        for (let seatNumber = 1; seatNumber <= seatsPerRow; seatNumber++) {
          const seatIndex = rowIndex * seatsPerRow + (seatNumber - 1);
          const apiSeat = danhSachGhe[seatIndex];

          if (apiSeat) {
            // Sử dụng dữ liệu từ API nhưng đổi tên ghế
            seats[row].push({
              ...apiSeat,
              tenGhe: `${row}${seatNumber.toString().padStart(2, "0")}`, // A01, B02...
              displayNumber: seatNumber, // Hiển thị số 1, 2, 3...
            });
          }
        }
      });

      return seats;
    } else {
      console.log("Sử dụng format mock data với chữ cái");

      // Format mock data (A01, B02...)
      const grouped = danhSachGhe.reduce((acc, seat) => {
        const row = seat.tenGhe.charAt(0); // Lấy ký tự đầu (A, B, C...)
        if (!acc[row]) acc[row] = [];
        acc[row].push({
          ...seat,
          displayNumber: parseInt(seat.tenGhe.slice(1)), // Lấy số để hiển thị
        });
        return acc;
      }, {});

      // Sắp xếp ghế trong mỗi hàng theo số thứ tự
      Object.keys(grouped).forEach((row) => {
        grouped[row].sort((a, b) => a.displayNumber - b.displayNumber);
      });

      return grouped;
    }
  })();

  return (
    <div className="booking-page bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <img
              src={thongTinPhim.hinhAnh}
              alt={thongTinPhim.tenPhim}
              className="w-20 h-28 object-cover rounded-lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {thongTinPhim.tenPhim}
              </h1>
              <p className="text-gray-600 mb-1">
                <strong>{thongTinPhim.tenCumRap}</strong> -{" "}
                {thongTinPhim.tenRap}
              </p>
              <p className="text-gray-600 mb-1">{thongTinPhim.diaChi}</p>
              <p className="text-blue-600 font-medium">
                {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Seat Map */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                CHỌN GHẾ
              </h2>

              {/* Screen */}
              <div className="flex justify-center mb-8">
                <div className="bg-gradient-to-r from-gray-300 to-gray-400 rounded-t-full px-20 py-3 text-center text-gray-700 font-medium">
                  MÀN HÌNH
                </div>
              </div>

              {/* Seats */}
              <div className="space-y-2">
                {Object.keys(groupedSeats)
                  .sort()
                  .map((row) => (
                    <div key={row} className="flex items-center justify-center">
                      <span className="w-8 text-center font-medium text-gray-600 mr-4">
                        {row}
                      </span>
                      <div className="flex gap-1">
                        {groupedSeats[row].map((seat, index) => {
                          const status = getSeatStatus(seat);
                          const displayNumber =
                            seat.displayNumber ||
                            parseInt(seat.tenGhe.slice(1));

                          return (
                            <React.Fragment key={seat.maGhe}>
                              {/* Thêm khoảng cách giữa ghế 4-5 và 12-13 */}
                              {(index === 4 || index === 12) && (
                                <div className="w-4"></div>
                              )}
                              <button
                                onClick={() => handleSeatClick(seat)}
                                className={getSeatClass(status)}
                                disabled={seat.daDat}
                                title={`${seat.tenGhe} - ${
                                  seat.giaVe?.toLocaleString("vi-VN") || "N/A"
                                }đ`}
                              >
                                {displayNumber}
                              </button>
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Legend và thông tin ghế */}
              <div className="mt-8">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">
                    Tổng số ghế: {danhSachGhe.length} | VIP:{" "}
                    {
                      danhSachGhe.filter((seat) => seat.loaiGhe === "Vip")
                        .length
                    }{" "}
                    | Thường:{" "}
                    {
                      danhSachGhe.filter((seat) => seat.loaiGhe === "Thuong")
                        .length
                    }
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                    <span>Ghế trống</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-400 rounded mr-2"></div>
                    <span>Ghế VIP</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                    <span>Đang chọn</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                    <span>Đã đặt</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                    <span>Ghế của bạn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                THÔNG TIN ĐẶT VÉ
              </h3>

              {selectedSeats.length > 0 ? (
                <>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Ghế đã chọn:</span>
                      <span className="font-medium">
                        {selectedSeats.map((seat) => seat.tenGhe).join(", ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Số lượng:</span>
                      <span className="font-medium">
                        {selectedSeats.length} ghế
                      </span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-bold text-blue-600">
                      <span>Tổng tiền:</span>
                      <span>{calculateTotal().toLocaleString("vi-VN")}đ</span>
                    </div>
                  </div>

                  <button
                    onClick={handleBooking}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-colors duration-300"
                  >
                    TIẾP TỤC
                  </button>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">🎬</div>
                  <p>Vui lòng chọn ghế để tiếp tục</p>
                </div>
              )}

              {/* Info */}
              <div className="mt-6 text-xs text-gray-500">
                <p>• Tối đa 8 ghế cho mỗi giao dịch</p>
                <p>• Vé đã mua không thể đổi hoặc hoàn tiền</p>
                <p>• Vui lòng có mặt trước giờ chiếu 15 phút</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
