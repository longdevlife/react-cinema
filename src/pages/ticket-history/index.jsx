import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal, message } from "antd";
import {
  DeleteOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";

const TicketHistory = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userSlice.userInfo);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load tickets from localStorage
    const loadTicketsData = () => {
      try {
        const storedTickets = JSON.parse(
          localStorage.getItem("userTickets") || "[]"
        );
        
        let userTickets = [];
        
        if (user) {
          // Filter tickets for current user (by email, userId, or customerInfo email)
          userTickets = storedTickets.filter(
            (ticket) =>
              ticket.userId === user?.taiKhoan ||
              ticket.userEmail === user?.email ||
              ticket.customerInfo?.email === user?.email ||
              (user?.email && ticket.customerInfo?.email === user.email)
          );
        } else {
          // Nếu không có user (đã đăng xuất), hiển thị thông báo
          userTickets = [];
        }

        // Sort by booking time (newest first)
        userTickets.sort(
          (a, b) => new Date(b.bookingTime) - new Date(a.bookingTime)
        );

        setTickets(userTickets);
      } catch (error) {
        console.error("Error loading tickets:", error);
        message.error("Không thể tải lịch sử vé");
      } finally {
        setLoading(false);
      }
    };

    loadTicketsData();
  }, [user]);

  const loadTickets = () => {
    try {
      const storedTickets = JSON.parse(
        localStorage.getItem("userTickets") || "[]"
      );
      
      let userTickets = [];
      
      if (user) {
        // Filter tickets for current user (by email, userId, or customerInfo email)
        userTickets = storedTickets.filter(
          (ticket) =>
            ticket.userId === user?.taiKhoan ||
            ticket.userEmail === user?.email ||
            ticket.customerInfo?.email === user?.email ||
            (user?.email && ticket.customerInfo?.email === user.email)
        );
      }

      // Sort by booking time (newest first)
      userTickets.sort(
        (a, b) => new Date(b.bookingTime) - new Date(a.bookingTime)
      );

      setTickets(userTickets);
    } catch (error) {
      console.error("Error loading tickets:", error);
      message.error("Không thể tải lịch sử vé");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelTicket = (ticketId) => {
    Modal.confirm({
      title: "Hủy vé",
      content:
        "Bạn có chắc chắn muốn hủy vé này? Thao tác này không thể hoàn tác.",
      okText: "Hủy vé",
      cancelText: "Giữ lại",
      okType: "danger",
      onOk: () => {
        try {
          // Update ticket status to cancelled
          const storedTickets = JSON.parse(
            localStorage.getItem("userTickets") || "[]"
          );
          const updatedTickets = storedTickets.map((ticket) =>
            ticket.id === ticketId
              ? {
                  ...ticket,
                  status: "cancelled",
                  cancelledAt: new Date().toISOString(),
                }
              : ticket
          );

          localStorage.setItem("userTickets", JSON.stringify(updatedTickets));
          loadTickets(); // Reload tickets
          message.success("Đã hủy vé thành công");
        } catch (error) {
          console.error("Error cancelling ticket:", error);
          message.error("Không thể hủy vé");
        }
      },
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            Đã đặt
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex px-3 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
            Đã hủy
          </span>
        );
      default:
        return (
          <span className="inline-flex px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
            {status}
          </span>
        );
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "momo":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="4" fill="#A50064" />
            <text
              x="12"
              y="15"
              textAnchor="middle"
              fontSize="10"
              fontWeight="bold"
              fill="white"
            >
              M
            </text>
          </svg>
        );
      case "zalopay":
        return (
          <img
            src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png"
            alt="ZaloPay"
            className="w-5 h-5"
          />
        );
      case "vnpay":
        return (
          <img
            src="https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg"
            alt="VNPay"
            className="w-5 h-5"
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải lịch sử vé...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Lịch sử đặt vé
              </h1>
              <p className="text-gray-600">Quản lý các vé đã đặt của bạn</p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300"
            >
              Về trang chủ
            </button>
          </div>
        </div>

        {/* Tickets List */}
        {tickets.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              Chưa có vé nào
            </h3>
            <p className="text-gray-500 mb-6">
              Bạn chưa đặt vé nào. Hãy đặt vé để xem lịch sử tại đây.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Đặt vé ngay
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Movie Poster */}
                  <div className="lg:w-32 lg:h-48 w-full h-48 bg-gray-200">
                    <img
                      src={ticket.showtimeDetail.thongTinPhim.hinhAnh}
                      alt={ticket.showtimeDetail.thongTinPhim.tenPhim}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Ticket Details */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {ticket.showtimeDetail.thongTinPhim.tenPhim}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-gray-600">
                            Mã vé:
                          </span>
                          <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                            {ticket.bookingCode}
                          </span>
                          {getStatusBadge(ticket.status)}
                        </div>
                      </div>

                      {ticket.status === "active" && (
                        <button
                          onClick={() => handleCancelTicket(ticket.id)}
                          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                        >
                          <DeleteOutlined />
                          Hủy vé
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <EnvironmentOutlined className="text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-600">Rạp</p>
                          <p className="font-medium">
                            {ticket.showtimeDetail.thongTinPhim.tenRap}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <CalendarOutlined className="text-green-500" />
                        <div>
                          <p className="text-sm text-gray-600">Ngày chiếu</p>
                          <p className="font-medium">
                            {ticket.showtimeDetail.thongTinPhim.ngayChieu}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <ClockCircleOutlined className="text-orange-500" />
                        <div>
                          <p className="text-sm text-gray-600">Giờ chiếu</p>
                          <p className="font-medium">
                            {ticket.showtimeDetail.thongTinPhim.gioChieu}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <UserOutlined className="text-purple-500" />
                        <div>
                          <p className="text-sm text-gray-600">Khách hàng</p>
                          <p className="font-medium">
                            {ticket.customerInfo.hoTen}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-blue-500">🎫</span>
                        <div>
                          <p className="text-sm text-gray-600">Ghế</p>
                          <p className="font-medium">
                            {ticket.selectedSeats
                              .map((seat) => seat.tenGhe)
                              .join(", ")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {getPaymentMethodIcon(ticket.paymentMethod)}
                        <div>
                          <p className="text-sm text-gray-600">Thanh toán</p>
                          <p className="font-medium">
                            {ticket.paymentMethod === "momo"
                              ? "Ví MoMo"
                              : ticket.paymentMethod === "zalopay"
                              ? "ZaloPay"
                              : ticket.paymentMethod === "vnpay"
                              ? "VNPay"
                              : ticket.paymentMethod}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-sm text-gray-600">
                          Đặt lúc: {formatDate(ticket.bookingTime)}
                        </p>
                        {ticket.status === "cancelled" &&
                          ticket.cancelledAt && (
                            <p className="text-sm text-red-600">
                              Hủy lúc: {formatDate(ticket.cancelledAt)}
                            </p>
                          )}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-red-600">
                          {ticket.totalPrice.toLocaleString("vi-VN")}đ
                        </p>
                        <p className="text-sm text-gray-600">
                          {ticket.selectedSeats.length} vé
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketHistory;
