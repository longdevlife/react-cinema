import React, { useEffect, useState } from "react";
import { Carousel, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { movieService } from "../../../services/movieService";
import { setListBannerAction } from "../../../stores/movie";
import { useNavigate } from "react-router-dom";
import {
  PlayCircleOutlined,
  CalendarOutlined,
  StarOutlined,
  RightOutlined,
} from "@ant-design/icons";

const CarouselMovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listBanner = useSelector((state) => state.movieSlice.listBanner);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const handleWatchTrailer = (banner) => {
    if (banner.trailer) {
      window.open(banner.trailer, '_blank');
    }
  };

  const handleBookNow = (banner) => {
    navigate(`/detail/${banner.maPhim}`);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Carousel
        autoplay
        arrows
        infinite={true}
        speed={1000}
        autoplaySpeed={6000}
        effect="fade"
        className="hero-carousel"
        dotPosition="bottom"
        beforeChange={(current, next) => setCurrentSlide(next)}
      >
        {listBanner.map((banner, index) => (
          <div key={index}>
            <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] min-h-[600px] overflow-hidden">
              {/* Background Image with Parallax Effect */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-[8000ms] ease-out"
                style={{
                  backgroundImage: `url(${banner.hinhAnh})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                }}
              ></div>

              {/* Gradient Overlays for Better Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 md:px-8 lg:px-12">
                  <div className="max-w-2xl">
                    {/* Movie Title with Animation */}
                    <h1 
                      className={`text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 md:mb-6 leading-tight transform transition-all duration-1000 ${
                        currentSlide === index 
                          ? 'translate-y-0 opacity-100' 
                          : 'translate-y-8 opacity-0'
                      }`}
                      style={{
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                        transitionDelay: '300ms'
                      }}
                    >
                      {banner.tenPhim}
                    </h1>

                    {/* Movie Info */}
                    <div 
                      className={`flex items-center gap-6 mb-6 md:mb-8 transform transition-all duration-1000 ${
                        currentSlide === index 
                          ? 'translate-y-0 opacity-100' 
                          : 'translate-y-8 opacity-0'
                      }`}
                      style={{ transitionDelay: '500ms' }}
                    >
                      <div className="flex items-center gap-2 bg-yellow-500 px-3 py-1 rounded-full">
                        <StarOutlined className="text-black" />
                        <span className="text-black font-bold text-sm">
                          {banner.danhGia || '9.5'}/10
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <CalendarOutlined />
                        <span className="font-medium">
                          {new Date(banner.ngayKhoiChieu).getFullYear()}
                        </span>
                      </div>
                      <div className="bg-red-600 px-3 py-1 rounded text-white text-sm font-bold">
                        T16+
                      </div>
                    </div>

                    {/* Description */}
                    <p 
                      className={`text-white/90 text-lg md:text-xl mb-8 md:mb-10 leading-relaxed max-w-xl transform transition-all duration-1000 ${
                        currentSlide === index 
                          ? 'translate-y-0 opacity-100' 
                          : 'translate-y-8 opacity-0'
                      }`}
                      style={{ 
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                        transitionDelay: '700ms'
                      }}
                    >
                      {banner.moTa || 'Một bộ phim đầy kịch tính và hấp dẫn, mang đến những trải nghiệm điện ảnh tuyệt vời cho khán giả.'}
                    </p>

                    {/* Action Buttons */}
                    <div 
                      className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 ${
                        currentSlide === index 
                          ? 'translate-y-0 opacity-100' 
                          : 'translate-y-8 opacity-0'
                      }`}
                      style={{ transitionDelay: '900ms' }}
                    >
                      <Button
                        type="primary"
                        size="large"
                        onClick={() => handleBookNow(banner)}
                        className="bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700 h-14 px-8 rounded-xl font-bold text-lg shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
                        icon={<RightOutlined />}
                        iconPosition="end"
                      >
                        ĐẶT VÉ NGAY
                      </Button>
                      
                      <Button
                        size="large"
                        onClick={() => handleWatchTrailer(banner)}
                        className="h-14 px-8 rounded-xl font-bold text-lg border-2 border-white/30 text-white hover:text-black hover:bg-white/90 backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
                        icon={<PlayCircleOutlined />}
                      >
                        XEM TRAILER
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements for Visual Interest */}
              <div className="absolute top-1/4 right-10 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-20 w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-1/4 right-16 w-3 h-3 bg-red-500/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default CarouselMovie;