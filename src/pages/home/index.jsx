import React from "react";
import CarouselMovie from "./components/CarouselMovie";
import ListMovie from "./components/ListMovie";
import Section from "../../HOC/Section";


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

      <div className="h-20 bg-black lg:bg-yellow-300 md:bg-red-600"></div>
    </div>
  );
};

export default HomePage;
