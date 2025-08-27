import React from "react";
import CarouselMovie from "./components/CarouselMovie";
import ListMovie from "./components/ListMovie";
import NewsSection from "./components/NewsSection";
import CinemaSystem from "./components/CinemaSystem";
import Section from "../../HOC/Section";

const HomePage = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Carousel */}
      <CarouselMovie />

      {/* Movies Section */}
      <Section titleSection="PHIM HAY">
        <ListMovie />
      </Section>

      {/* Cinema System */}
      <Section titleSection="HỆ THỐNG RạP">
        <CinemaSystem />
      </Section>

      {/* News Section */}
      <Section titleSection="TIN TỨC & KHUYẾN MÃI">
        <NewsSection />
      </Section>
    </div>
  );
};

export default HomePage;