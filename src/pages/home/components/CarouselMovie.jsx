import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { movieService } from "../../../services/movieService";
import { setListBannerAction } from "../../../stores/movie";
import { PlayCircleOutlined, CalendarOutlined } from "@ant-design/icons";

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
    <div className="relative w-full">
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
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                  <div className="max-w-2xl">
                    <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
                      {banner.tenPhim || "Phim mới"}
                    </h1>
                    <p className="text-gray-200 text-base md:text-lg lg:text-xl mb-8 leading-relaxed max-w-xl">
                      {banner.moTa ||
                        "Trải nghiệm điện ảnh đỉnh cao với công nghệ hiện đại và âm thanh sống động."}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                        <CalendarOutlined />
                        Đặt vé ngay
                      </button>
                      <button className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2 border border-white/20">
                        <PlayCircleOutlined />
                        Xem trailer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselMovie;
