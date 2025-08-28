import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setListMovieAction } from "../../../stores/movie";
import { movieService } from "../../../services/movieService";
import { Card, Rate, Button, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { PlayCircleOutlined, CalendarOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { TabPane } = Tabs;

const ListMovie = () => {
  const dispatch = useDispatch();
  const listMovie = useSelector((state) => state.movieSlice.listMovie);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dang-chieu");

  const fetchListMovie = async () => {
    try {
      const responseListMovie = await movieService.getListMovies();
      dispatch(setListMovieAction(responseListMovie.data.content));
    } catch (error) {
      console.error("Error fetching movie list:", error);
    }
  };

  useEffect(() => {
    fetchListMovie();
  }, []);

  const handleRedirectToDetail = (movieId) => {
    console.log("movieId", movieId);
    navigate(`/detail/${movieId}`);
  };

  // Giả lập phân loại phim (vì API không có trường này)
  const dangChieuMovies = listMovie.slice(0, 8);
  const sapChieuMovies = listMovie.slice(8, 16);

  const renderMovieGrid = (movies) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 px-4 md:px-8">
        {movies.map((movie, index) => {
          return (
            <Card
              key={index}
              className="movie-card group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              onClick={() => handleRedirectToDetail(movie.maPhim)}
              cover={
                <div className="relative overflow-hidden">
                  <img
                    alt={movie.tenPhim}
                    src={movie.hinhAnh}
                    className="w-full h-[280px] md:h-[350px] object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay khi hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <PlayCircleOutlined className="text-white text-4xl mb-2" />
                      <p className="text-white font-semibold">Xem trailer</p>
                    </div>
                  </div>

                  {/* Rating badge */}
                  <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                    {(Math.random() * 2 + 8).toFixed(1)}
                  </div>

                  {/* Age rating */}
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                    T16
                  </div>
                </div>
              }
              bodyStyle={{ padding: "12px" }}
            >
              <div>
                <h3 className="font-bold text-sm md:text-base line-clamp-2 mb-2 min-h-[40px]">
                  {movie.tenPhim}
                </h3>

                <div className="flex items-center justify-between mb-3">
                  <Rate disabled defaultValue={4} size="small" />
                  <span className="text-gray-500 text-xs">120 phút</span>
                </div>

                <div className="space-y-2">
                  <Button
                    type="primary"
                    danger
                    block
                    icon={<CalendarOutlined />}
                    className="font-semibold"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Logic đặt vé
                    }}
                  >
                    Đặt vé
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className="movie-section">
      {/* Tab navigation */}
      <div className="mb-8">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          size="large"
          className="movie-tabs"
        >
          <TabPane tab="Đang chiếu" key="dang-chieu">
            {renderMovieGrid(dangChieuMovies)}
          </TabPane>
          <TabPane tab="Sắp chiếu" key="sap-chieu">
            {renderMovieGrid(sapChieuMovies)}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default ListMovie;
