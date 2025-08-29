import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal, notification } from "antd";
import { cinemaService } from "../../../services/cinemaService";
import { userService } from "../../../services/userService";

const PaymentForm = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userSlice.userInfo);

  const [bookingData, setBookingData] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    hoTen: "",
    email: "",
    soDT: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    // Fetch thông tin user từ API để auto-fill
    const fetchUserInfo = async () => {
      try {
        const response = await userService.getInfoUser();
        const userData = response.data.content;

        setCustomerInfo({
          hoTen: userData.hoTen || "",
          email: userData.email || "",
          soDT: userData.soDT || "",
        });
      } catch (error) {
        console.error("Error fetching user info:", error);
        // Fallback to Redux state
        if (user) {
          setCustomerInfo({
            hoTen: user.hoTen || "",
            email: user.email || "",
            soDT: user.soDT || "",
          });
        }
      }
    };

    // Lấy dữ liệu booking từ sessionStorage
    const savedBookingData = sessionStorage.getItem("bookingData");
    if (savedBookingData) {
      setBookingData(JSON.parse(savedBookingData));
    } else {
      // Nếu không có dữ liệu, quay về trang chủ
      navigate("/");
    }

    // Fetch thông tin user để auto-fill
    fetchUserInfo();
  }, [navigate, user]);

  useEffect(() => {
    if (user) {
      setCustomerInfo((prev) => ({
        hoTen: user.hoTen || prev.hoTen,
        email: user.email || prev.email,
        soDT: user.soDT || prev.soDT,
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Xóa lỗi khi user bắt đầu nhập
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const resetToUserInfo = () => {
    if (user) {
      setCustomerInfo({
        hoTen: user.hoTen || "",
        email: user.email || "",
        soDT: user.soDT || "",
      });
      setErrors({});
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!customerInfo.hoTen.trim()) {
      newErrors.hoTen = "Vui lòng nhập họ tên";
    }

    if (!customerInfo.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!customerInfo.soDT.trim()) {
      newErrors.soDT = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10,11}$/.test(customerInfo.soDT.replace(/\s/g, ""))) {
      newErrors.soDT = "Số điện thoại không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Hiển thị modal xác nhận
    setShowConfirmModal(true);
  };

  const confirmPayment = () => {
    setShowConfirmModal(false);
    proceedWithPayment();
  };

  const cancelPayment = () => {
    setShowConfirmModal(false);
  };

  const proceedWithPayment = async () => {
    setIsSubmitting(true);

    try {
      // Gọi API đặt vé thực tế
      const bookingRequest = {
        maLichChieu: bookingData.showtimeDetail.thongTinPhim.maLichChieu,
        danhSachVe: bookingData.selectedSeats.map((seat) => ({
          maGhe: seat.maGhe,
          giaVe: seat.giaVe,
        })),
      };

      // Sử dụng API thực
      const response = await cinemaService.bookTickets(bookingRequest);
      console.log("Booking response:", response);

      // Tạo dữ liệu vé thành công
      const ticketData = {
        id: `BK${Date.now()}`,
        bookingCode: `BK${Date.now()}`,
        bookingTime: new Date().toISOString(),
        customerInfo,
        paymentMethod,
        showtimeDetail: bookingData.showtimeDetail,
        selectedSeats: bookingData.selectedSeats,
        totalPrice: bookingData.totalPrice,
        status: "active", // active, cancelled
        userId: user?.taiKhoan || customerInfo.email, // Dùng email nếu không có userId
        userEmail: customerInfo.email, // Luôn lưu email để nhận diện
      };

      // Lưu vé vào localStorage (lịch sử vé)
      const existingTickets = JSON.parse(
        localStorage.getItem("userTickets") || "[]"
      );
      existingTickets.push(ticketData);
      localStorage.setItem("userTickets", JSON.stringify(existingTickets));

      // Thành công - chuyển đến trang thành công
      const successData = {
        ...bookingData,
        customerInfo,
        bookingCode: ticketData.bookingCode,
        bookingTime: ticketData.bookingTime,
        paymentMethod,
      };

      sessionStorage.setItem("bookingSuccess", JSON.stringify(successData));
      sessionStorage.removeItem("bookingData");

      // Thông báo đặt vé thành công
      notification.success({
        message: "🎉 Đặt vé thành công!",
        description: `Vé phim "${bookingData.showtimeDetail.thongTinPhim.tenPhim}" đã được đặt thành công. Mã đặt vé: ${ticketData.bookingCode}`,
        placement: "topRight",
        duration: 4,
      });

      navigate("/booking/success");
    } catch (error) {
      console.error("Booking error:", error);

      // Thông báo lỗi đặt vé
      notification.error({
        message: "❌ Đặt vé thất bại",
        description:
          "Có lỗi xảy ra trong quá trình đặt vé. Vui lòng kiểm tra lại thông tin và thử lại.",
        placement: "topRight",
        duration: 4,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!bookingData) return null;

  const { showtimeDetail, selectedSeats, totalPrice } = bookingData;
  const { thongTinPhim } = showtimeDetail;

  return (
    <div className="payment-page bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">THANH TOÁN</h1>
          <div className="flex items-center gap-4">
            <img
              src={thongTinPhim.hinhAnh}
              alt={thongTinPhim.tenPhim}
              className="w-16 h-24 object-cover rounded-lg"
            />
            <div>
              <h2 className="text-lg font-medium text-gray-800">
                {thongTinPhim.tenPhim}
              </h2>
              <p className="text-gray-600 text-sm">
                {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}
              </p>
              <p className="text-blue-600 font-medium text-sm">
                {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Customer Information Form */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">
                  THÔNG TIN KHÁCH HÀNG
                </h3>
                {user && (
                  <button
                    type="button"
                    onClick={resetToUserInfo}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                  >
                    Dùng thông tin tài khoản
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ tên *
                  </label>
                  <input
                    type="text"
                    name="hoTen"
                    value={customerInfo.hoTen}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.hoTen ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Nhập họ tên"
                  />
                  {errors.hoTen && (
                    <p className="text-red-500 text-sm mt-1">{errors.hoTen}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Nhập email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    name="soDT"
                    value={customerInfo.soDT}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.soDT ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Nhập số điện thoại"
                  />
                  {errors.soDT && (
                    <p className="text-red-500 text-sm mt-1">{errors.soDT}</p>
                  )}
                </div>

                {/* Payment Method */}
                <div className="pt-4">
                  <h4 className="text-md font-medium text-gray-700 mb-4">
                    PHƯƠNG THỨC THANH TOÁN
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="momo"
                        checked={paymentMethod === "momo"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-blue-600"
                      />
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZFf-ZRZqrF-Q4CpgI-WwTG2V-LMx2sdjYbw&s"
                        alt="MoMo"
                        className="w-6 h-6"
                      />
                      <span>Ví momo</span>
                    </label>
                    <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="zalopay"
                        checked={paymentMethod === "zalopay"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-blue-600"
                      />
                      <img
                        src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png"
                        alt="ZaloPay"
                        className="w-6 h-6"
                      />
                      <span>ZaloPay</span>
                    </label>
                    <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="vnpay"
                        checked={paymentMethod === "vnpay"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-blue-600"
                      />
                      <img
                        src="https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg"
                        alt="VNPay"
                        className="w-6 h-6"
                      />
                      <span>VNPay</span>
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors duration-300"
                  >
                    QUAY LẠI
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors duration-300"
                  >
                    {isSubmitting ? "ĐANG XỬ LÝ..." : "THANH TOÁN"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                CHI TIẾT ĐƠN HÀNG
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Phim:</span>
                  <span className="font-medium text-right flex-1 ml-2">
                    {thongTinPhim.tenPhim}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Rạp:</span>
                  <span className="font-medium text-right flex-1 ml-2">
                    {thongTinPhim.tenRap}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Suất chiếu:</span>
                  <span className="font-medium">
                    {thongTinPhim.gioChieu} - {thongTinPhim.ngayChieu}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Ghế:</span>
                  <span className="font-medium">
                    {selectedSeats.map((seat) => seat.tenGhe).join(", ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Số lượng:</span>
                  <span className="font-medium">{selectedSeats.length} vé</span>
                </div>

                <hr className="my-4" />

                {/* Breakdown */}
                {selectedSeats.map((seat) => (
                  <div
                    key={seat.maGhe}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      Ghế {seat.tenGhe} ({seat.loaiGhe}):
                    </span>
                    <span>{seat.giaVe.toLocaleString("vi-VN")}đ</span>
                  </div>
                ))}

                <hr className="my-4" />

                <div className="flex justify-between text-lg font-bold text-red-600">
                  <span>TỔNG TIỀN:</span>
                  <span>{totalPrice.toLocaleString("vi-VN")}đ</span>
                </div>
              </div>

              <div className="text-xs text-gray-500 space-y-1">
                <p>• Vé đã mua không thể đổi hoặc hoàn tiền</p>
                <p>• Vui lòng có mặt trước giờ chiếu 15 phút</p>
                <p>• Mang theo CCCD/CMND để nhận vé</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal xác nhận thanh toán */}
      <Modal
        title="🎫 Xác nhận mua vé"
        open={showConfirmModal}
        onOk={confirmPayment}
        onCancel={cancelPayment}
        okText="Xác nhận mua"
        cancelText="Hủy bỏ"
        okType="primary"
        centered
      >
        <div className="py-4">
          <p className="text-gray-600 mb-2">
            Bạn có chắc chắn muốn mua vé xem phim này không?
          </p>
          {bookingData && (
            <div className="bg-gray-50 p-3 rounded-lg mt-3">
              <p className="font-medium">Thông tin đặt vé:</p>
              <p className="text-sm text-gray-600">
                • Phim: {bookingData.showtimeDetail.thongTinPhim.tenPhim}
              </p>
              <p className="text-sm text-gray-600">
                • Ghế:{" "}
                {bookingData.selectedSeats
                  .map((seat) => seat.tenGhe)
                  .join(", ")}
              </p>
              <p className="text-sm text-gray-600">
                • Tổng tiền: {bookingData.totalPrice.toLocaleString("vi-VN")}{" "}
                VNĐ
              </p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default PaymentForm;
