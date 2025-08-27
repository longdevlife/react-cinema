import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListMovieAction } from "../../../stores/movie";
import { movieService } from "../../../services/movieService";
import { Card, Button, Rate, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { PlayCircleOutlined, CalendarOutlined } from "@ant-design/icons";

const { Meta } = Card;

const ListMovie = () => {
  const dispatch = useDispatch();
  const listMovie = useSelector((state) => state.movieSlice.listMovie);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dangChieu");

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
    navigate(`/detail/${movieId}`);
  };

  const filteredMovies = listMovie.filter(movie => {
    if (activeTab === "dangChieu") {
      return movie.dangChieu;
    } else {
      return movie.sapChieu;
    }
  });

  return (
    <div className="container mx-auto px-4 lg:px-8">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1 inline-flex">
          <button
            onClick={() => setActiveTab("dangChieu")}
            className={`px-6 py-3 rounded-md font-semibold transition-all ${
              activeTab === "dangChieu"
                ? "bg-red-600 text-white shadow-md"
                : "text-gray-600 hover:text-red-600"
            }`}
          >
            PHIM ĐANG CHIẾU
          </button>
          <button
            onClick={() => setActiveTab("sapChieu")}
            className={`px-6 py-3 rounded-md font-semibold transition-all ${
              activeTab === "sapChieu"
                ? "bg-red-600 text-white shadow-md"
                : "text-gray-600 hover:text-red-600"
            }`}
          >
            PHIM SẮP CHIẾU
          </button>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredMovies.slice(0, 10).map((movie, index) => (
          <Card
            key={index}
            hoverable
            className="movie-card overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            cover={
              <div className="relative group">
                <img 
                  alt={movie.tenPhim} 
                  src={movie.hinhAnh} 
                  className="h-[300px] w-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1489599162810-1e666d2c8e5b?w=400&h=600&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
                    <Button
                      type="primary"
                      icon={<PlayCircleOutlined />}
                      className="bg-red-600 border-red-600"
                    >
                      Trailer
                    </Button>
                    <Button
                      onClick={() => handleRedirectToDetail(movie.maPhim)}
                      className="border-white text-white hover:bg-white hover:text-black"
                    >
                      Chi tiết
                    </Button>
                  </div>
                </div>
                {movie.hot && (
                  <Tag color="red" className="absolute top-2 left-2 font-semibold">
                    HOT
                  </Tag>
                )}
              </div>
            }
            bodyStyle={{ padding: '16px' }}
          >
            <div className="space-y-2">
              <h3 className="font-bold text-lg leading-tight line-clamp-2 min-h-[56px]">
                {movie.tenPhim}
              </h3>
              <div className="flex items-center gap-2">
                <Rate disabled defaultValue={4} className="text-sm" />
                <span className="text-gray-500 text-sm">8.5</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <CalendarOutlined />
                <span>120 phút</span>
              </div>
              <Button
                type="primary"
                block
                size="large"
                onClick={() => handleRedirectToDetail(movie.maPhim)}
                className="bg-red-600 hover:bg-red-700 border-red-600 font-semibold mt-4"
              >
                MUA VÉ
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-8">
        <Button 
          size="large" 
          className="px-8 py-6 h-auto text-lg font-semibold border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
        >
          XEM THÊM
        </Button>
      </div>
    </div>
  );
};

export default ListMovie;