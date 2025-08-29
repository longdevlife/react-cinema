import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { movieService } from "../../../services/movieService";
import { setListBannerAction } from "../../../stores/movie";
import {
  PlayCircleOutlined,
  CalendarOutlined,
  StarOutlined,
} from "@ant-design/icons";

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
              ></div>

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
