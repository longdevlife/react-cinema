import React from "react";
import CarouselMovie from "./components/CarouselMovie";
import ListMovie from "./components/ListMovie";
import Section from "../../HOC/section";

const HomePage = () => {
  return (
    <div>
      <CarouselMovie />

      <Section titleSection={"Danh sách phim"}>
        <ListMovie />
      </Section>

      <Section titleSection={"Lịch chiếu phim"}>
        <div className="bg-amber-300 h-96"></div>
      </Section>
    </div>
  );
};

export default HomePage;
