import React, { useEffect } from "react";
import CarouselMovie from "./components/CarouselMovie";
import ListMovie from "./components/ListMovie";
import CinemaShowtimes from "./components/CinemaShowtimes";
import Section from "../../HOC/Section";
import NewsSection from "./components/NewsSection";
import TestimonialsSection from "./components/TestimonialsSection";

const HomePage = () => {
  // Smooth scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Add smooth scroll behavior to window
  useEffect(() => {
    // Preload critical images
    const preloadImages = [
      '/cinema.png',
      // Add other critical images here
    ];

    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
      {/* Hero Carousel with enhanced loading */}
      <div className="relative">
        <CarouselMovie />
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <button 
            onClick={() => scrollToSection('phim')}
            className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center items-start pt-2 hover:border-white transition-colors duration-300 backdrop-blur-sm"
            aria-label="Scroll to movies section"
          >
            <div className="w-1 h-3 bg-white/70 rounded-full animate-pulse"></div>
          </button>
        </div>
      </div>

      {/* Movies Section with enhanced styling */}
      <Section 
        titleSection="DANH SÁCH PHIM" 
        subtitle="Khám phá những bộ phim hot nhất hiện tại và sắp tới"
        bgColor="bg-gradient-to-b from-white to-gray-50"
      >
        <div id="phim">
          <ListMovie />
        </div>
      </Section>

      {/* Cinema Section with enhanced background */}
      <Section 
        titleSection="HỆ THỐNG RẠP" 
        subtitle="Tìm rạp gần bạn và đặt vé nhanh chóng"
        bgColor="bg-gradient-to-b from-gray-50 to-white"
      >
        <div id="rap">
          <CinemaShowtimes />
        </div>
      </Section>

      {/* News Section */}
      <Section 
        titleSection="TIN TỨC & SỰ KIỆN" 
        subtitle="Cập nhật những tin tức mới nhất từ thế giới điện ảnh"
        bgColor="bg-white"
      >
        <NewsSection />
      </Section>

      {/* Testimonials Section */}
      <Section 
        titleSection="ĐÁNH GIÁ KHÁCH HÀNG" 
        subtitle="Những chia sẻ chân thực từ khách hàng của chúng tôi"
        bgColor="bg-gradient-to-b from-white to-gray-50"
      >
        <TestimonialsSection />
      </Section>

      {/* Enhanced Footer with better UX */}
      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-24 relative overflow-hidden">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/20 to-purple-600/20"></div>
          <div className="absolute top-20 left-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
          {/* Enhanced App Download Section */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-500 to-purple-600 rounded-full mb-8 shadow-2xl animate-pulse-glow">
              <span className="text-4xl animate-float">📱</span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent leading-tight">
            Đặt Vé Online
          </h2>
          
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-red-400">
            Không Lo Trễ Nải
          </h3>
          
          <p className="text-xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
            Ghét đông đúc ồn ào? Lười xếp hàng mua vé? Hãy quên đi cách mua vé giấy truyền thống tốn thời gian. 
            Trải nghiệm đặt vé nhanh chóng và tiện lợi ngay trên điện thoại.
          </p>

          {/* Enhanced App Download Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-16">
            <button className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-400 transform hover:scale-105 shadow-2xl hover:shadow-red-500/25 overflow-hidden">
              <div className="flex items-center justify-center gap-3 relative z-10">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🍎</span>
                <div className="text-left">
                  <div className="text-sm opacity-80">Tải về cho</div>
                  <div className="font-black">App Store</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
            
            <button className="group relative bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-400 transform hover:scale-105 shadow-2xl hover:shadow-green-500/25 overflow-hidden">
              <div className="flex items-center justify-center gap-3 relative z-10">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🤖</span>
                <div className="text-left">
                  <div className="text-sm opacity-80">Tải về cho</div>
                  <div className="font-black">Google Play</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Enhanced App Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-blue-500/25 transition-all duration-300 transform group-hover:scale-110">
                <span className="text-3xl animate-float">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                Đặt vé nhanh chóng
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Chỉ 3 bước đơn giản để có vé xem phim. Giao diện thân thiện, dễ sử dụng.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-purple-500/25 transition-all duration-300 transform group-hover:scale-110">
                <span className="text-3xl animate-float" style={{ animationDelay: '0.5s' }}>💳</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                Thanh toán an toàn
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Hỗ trợ đa dạng phương thức thanh toán: MoMo, ZaloPay, VNPay và thẻ ngân hàng.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-orange-500/25 transition-all duration-300 transform group-hover:scale-110">
                <span className="text-3xl animate-float" style={{ animationDelay: '1s' }}>🎁</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-400 transition-colors">
                Ưu đãi độc quyền
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Nhận voucher và khuyến mãi hấp dẫn dành riêng cho thành viên ứng dụng.
              </p>
            </div>
          </div>

          {/* Enhanced Social Proof */}
          <div className="mt-16 pt-12 border-t border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-black text-red-400 mb-2">1M+</div>
                <div className="text-gray-400 text-sm">Lượt tải app</div>
              </div>
              <div>
                <div className="text-3xl font-black text-blue-400 mb-2">500K+</div>
                <div className="text-gray-400 text-sm">Khách hàng</div>
              </div>
              <div>
                <div className="text-3xl font-black text-green-400 mb-2">50+</div>
                <div className="text-gray-400 text-sm">Rạp chiếu</div>
              </div>
              <div>
                <div className="text-3xl font-black text-purple-400 mb-2">4.8★</div>
                <div className="text-gray-400 text-sm">Đánh giá</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;