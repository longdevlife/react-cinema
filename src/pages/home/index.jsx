import React from "react";
import CarouselMovie from "./components/CarouselMovie";
import ListMovie from "./components/ListMovie";
import CinemaShowtimes from "./components/CinemaShowtimes";
import Section from "../../HOC/Section";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      <CarouselMovie />

      {/* Movies Section */}
      <Section titleSection={"PHIM"}>
        <ListMovie />
      </Section>

      {/* Cinema Showtimes Section */}
      <Section titleSection={"Cụm Rạp"}>
        <CinemaShowtimes />
      </Section>

      {/* App Download Section */}
      <section className="bg-gray-900 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Đặt Vé Online - Không Lo Trễ Nải
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Ghét đông đúc ồn ào? Lười xếp hàng mua vé? Hãy quên đi cách mua vé
            giấy truyền thống tốn thời gian.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Tải App iOS
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Tải App Android
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
