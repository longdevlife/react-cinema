import React from "react";

const TicketHistorySimple = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Lịch sử đặt vé
          </h1>
          <p className="text-gray-600">
            Trang lịch sử đặt vé đang được phát triển...
          </p>
          <div className="mt-6">
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketHistorySimple;
