import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { movieService } from "../../../services/movieService";
import { setListBannerAction } from "../../../stores/movie";
import { PlayCircleOutlined, CalendarOutlined, StarOutlined } from "@ant-design/icons";

const CarouselMovie = () => {
  const dispatch = useDispatch();
  const listBanner = useSelector((state) => state.movieSlice.listBanner);

  const fetchBannerList = async () => {
    try {
      const responseBanner = await movieService.getBannerList();
      dispatch(setListBannerAction(responseBanner.data.content));
    } catch (error) {
      console.error("Error fetching banner list:", error);
    }
  };

  useEffect(() => {
    fetchBannerList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative w-full overflow-hidden">
      <Carousel
        autoplay
        arrows
        infinite={true}
        speed={800}
        autoplaySpeed={5000}
        effect="fade"
        className="banner-carousel"
        dotPosition="bottom"
      >
        {listBanner.map((banner, index) => (
          <div key={index}>
            <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] min-h-[500px] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${banner.hinhAnh})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                }}
              >
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent"></div>
                
                {/* Animated particles */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
                  <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-400/30 rounded-full animate-ping"></div>
                  <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400/20 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                  <div className="max-w-3xl">
                    {/* Movie badge */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                        <StarOutlined />
                        PHIM HOT
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                        2024
                      </span>
                    </div>
                    
                    <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
                      {banner.tenPhim || "Phim mới"}
                    </h1>
                    
                    {/* Movie info */}
                    <div className="flex items-center gap-6 mb-6 text-white/90">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-sm font-medium">Đang chiếu</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>⏱️</span>
                        <span className="text-sm">120 phút</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>🎭</span>
                        <span className="text-sm">Hành động, Phiêu lưu</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-200 text-lg md:text-xl lg:text-2xl mb-10 leading-relaxed max-w-2xl font-light">
                      {banner.moTa ||
                        "Trải nghiệm điện ảnh đỉnh cao với công nghệ hiện đại và âm thanh sống động."}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6">
                      <button className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center gap-3 border-2 border-red-500/50">
                        <CalendarOutlined />
                        <span>Đặt vé ngay</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </button>
                      <button className="group bg-white/10 hover:bg-white/20 text-white px-10 py-5 rounded-2xl font-bold text-lg backdrop-blur-md transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center gap-3 border-2 border-white/30 hover:border-white/50">
                        <PlayCircleOutlined />
                        <span>Xem trailer</span>
                        <span className="group-hover:scale-110 transition-transform">▶️</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom gradient for better button visibility */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselMovie;
