import React from "react";
import CarouselMovie from "./components/CarouselMovie";
import ListMovie from "./components/ListMovie";
import CinemaShowtimes from "./components/CinemaShowtimes";
import Section from "../../HOC/Section";
import NewsSection from "./components/NewsSection";

import TestimonialsSection from "./components/TestimonialsSection";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Carousel */}
      <CarouselMovie />

      {/* Movies Section */}
      <Section titleSection={"DANH SÁCH PHIM"}>
        <div id="phim">
          <ListMovie />
        </div>
      </Section>

      {/* Cinema Showtimes Section */}
      <Section titleSection={"Cinema"}>
        <div id="rap">
          <CinemaShowtimes />
        </div>
      </Section>

      {/* News & Events Section */}
      <Section titleSection={"TIN TỨC & SỰ KIỆN"}>
        <NewsSection />
      </Section>

      {/* Testimonials Section */}
      <Section titleSection={"ĐÁNH GIÁ KHÁCH HÀNG"}>
        <TestimonialsSection />
      </Section>

      {/* App Download Section */}
      <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/20 to-purple-600/20"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-purple-600 rounded-full mb-6">
              <span className="text-3xl">📱</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Đặt Vé Online - Không Lo Trễ Nải
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Ghét đông đúc ồn ào? Lười xếp hàng mua vé? Hãy quên đi cách mua vé
            giấy truyền thống tốn thời gian. Trải nghiệm đặt vé nhanh chóng và
            tiện lợi ngay trên điện thoại.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            <button className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3">
              <span className="text-2xl group-hover:scale-110 transition-transform">
                🍎
              </span>
              Tải App iOS
            </button>
            <button className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3">
              <span className="text-2xl group-hover:scale-110 transition-transform">
                🤖
              </span>
              Tải App Android
            </button>
          </div>

          {/* App Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Đặt vé nhanh chóng</h3>
              <p className="text-gray-400 text-sm">
                Chỉ 3 bước đơn giản để có vé xem phim
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Thanh toán an toàn</h3>
              <p className="text-gray-400 text-sm">
                Hỗ trợ đa dạng phương thức thanh toán
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Ưu đãi độc quyền</h3>
              <p className="text-gray-400 text-sm">
                Nhận voucher và khuyến mãi hấp dẫn
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
