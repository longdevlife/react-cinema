import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingSuccess = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    // Lấy dữ liệu thành công từ sessionStorage
    const successData = sessionStorage.getItem("bookingSuccess");
    if (successData) {
      setBookingData(JSON.parse(successData));
    } else {
      // Nếu không có dữ liệu, quay về trang chủ
      navigate("/");
    }
  }, [navigate]);

  const handleBackToHome = () => {
    // Xóa dữ liệu booking khỏi sessionStorage
    sessionStorage.removeItem("bookingSuccess");
    navigate("/");
  };

  const handleViewHistory = () => {
    sessionStorage.removeItem("bookingSuccess");
    navigate("/info"); // Trang thông tin user
  };

  if (!bookingData) return null;

  const {
    showtimeDetail,
    selectedSeats,
    totalPrice,
    customerInfo,
    bookingCode,
    bookingTime,
  } = bookingData;
  const { thongTinPhim } = showtimeDetail;

  return (
    <div className="booking-success-page bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ĐẶT VÉ THÀNH CÔNG!
          </h1>
          <p className="text-gray-600">
            Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">VÉ XEM PHIM</h2>
                <p className="text-blue-100">Mã đặt vé: {bookingCode}</p>
              </div>
              <div className="text-right">
                <p className="text-blue-100 text-sm">Thời gian đặt</p>
                <p className="font-medium">
                  {new Date(bookingTime).toLocaleString("vi-VN")}
                </p>
              </div>
            </div>
          </div>

          {/* Movie Info */}
          <div className="p-6 border-b">
            <div className="flex gap-4">
              <img
                src={thongTinPhim.hinhAnh}
                alt={thongTinPhim.tenPhim}
                className="w-20 h-28 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {thongTinPhim.tenPhim}
                </h3>
                <div className="space-y-1 text-gray-600">
                  <p>
                    <strong>Rạp:</strong> {thongTinPhim.tenCumRap}
                  </p>
                  <p>
                    <strong>Phòng:</strong> {thongTinPhim.tenRap}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {thongTinPhim.diaChi}
                  </p>
                  <p>
                    <strong>Suất chiếu:</strong> {thongTinPhim.gioChieu} -{" "}
                    {thongTinPhim.ngayChieu}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="p-6 border-b">
            <h4 className="font-bold text-gray-800 mb-4">CHI TIẾT VÉ</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 mb-2">Ghế đã đặt:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map((seat) => (
                    <span
                      key={seat.maGhe}
                      className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {seat.tenGhe}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Loại ghế:</p>
                <div className="space-y-1">
                  {selectedSeats.map((seat) => (
                    <div
                      key={seat.maGhe}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        Ghế {seat.tenGhe} ({seat.loaiGhe}):
                      </span>
                      <span className="font-medium">
                        {seat.giaVe.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="p-6 border-b">
            <h4 className="font-bold text-gray-800 mb-4">
              THÔNG TIN KHÁCH HÀNG
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Họ tên</p>
                <p className="font-medium">{customerInfo.hoTen}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="font-medium">{customerInfo.email}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Số điện thoại</p>
                <p className="font-medium">{customerInfo.soDT}</p>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">
                  Tổng số vé: {selectedSeats.length}
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 text-sm">Tổng tiền</p>
                <p className="text-2xl font-bold text-red-600">
                  {totalPrice.toLocaleString("vi-VN")}đ
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code (Optional) */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center mb-6">
          <h4 className="font-bold text-gray-800 mb-4">MÃ QR NHẬN VÉ</h4>
          <div className="inline-block p-4 bg-gray-100 rounded-lg">
            {/* Placeholder for QR code - you can integrate a QR code library */}
            <div className="w-32 h-32 bg-gray-300 rounded flex items-center justify-center">
              <span className="text-gray-500 text-xs">QR CODE</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Xuất trình mã QR này tại quầy để nhận vé
          </p>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h4 className="font-bold text-yellow-800 mb-2">LƯU Ý QUAN TRỌNG</h4>
          <ul className="text-yellow-700 text-sm space-y-1">
            <li>• Vui lòng có mặt tại rạp trước giờ chiếu ít nhất 15 phút</li>
            <li>• Mang theo CCCD/CMND để đối chiếu thông tin</li>
            <li>• Vé đã mua không thể đổi hoặc hoàn tiền</li>
            <li>• Liên hệ hotline 1900-xxxx nếu cần hỗ trợ</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleBackToHome}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors duration-300"
          >
            VỀ TRANG CHỦ
          </button>
          <button
            onClick={handleViewHistory}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors duration-300"
          >
            XEM LỊCH SỬ ĐẶT VÉ
          </button>
        </div>

        {/* Download/Print Options */}
        <div className="text-center mt-6">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            📧 Gửi vé qua Email
          </button>
          <span className="mx-4 text-gray-300">|</span>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            🖨️ In vé
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
