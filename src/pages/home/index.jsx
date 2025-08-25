import React from "react";
import CarouselMovie from "./components/CarouselMovie";
import ListMovie from "./components/ListMovie";
import Section from "../../HOC/section";
import { useMediaQuery } from "react-responsive";

const HomePage = () => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 639 });
  return (
    <div>
      <CarouselMovie />

      <Section titleSection={"Danh sách phim"}>
        <ListMovie />
      </Section>

      <Section titleSection={"Lịch chiếu phim"}>
        <div className="bg-amber-300 h-96"></div>
      </Section>

      <div className="h-20 bg-black lg:bg-yellow-300 md:bg-red-600"></div>
    </div>
  );
};

export default HomePage;
