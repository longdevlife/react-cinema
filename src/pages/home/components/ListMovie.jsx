import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setListMovieAction } from "../../../stores/movie";
import { movieService } from "../../../services/movieService";
import { Card, Rate, Button, Tabs, Badge, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import {
  PlayCircleOutlined,
  CalendarOutlined,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
const { TabPane } = Tabs;

const ListMovie = () => {
  const dispatch = useDispatch();
  const listMovie = useSelector((state) => state.movieSlice.listMovie);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dang-chieu");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8); // Số phim hiển thị trên mỗi trang

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRedirectToDetail = (movieId) => {
    console.log("movieId", movieId);
    navigate(`/detail/${movieId}`);
  };

  // Giả lập phân loại phim (vì API không có trường này)
  const dangChieuMovies = listMovie.filter((movie, index) => index % 2 === 0);
  const sapChieuMovies = listMovie.filter((movie, index) => index % 2 === 1);

  // Phân trang cho từng tab
  const getCurrentMovies = () => {
    const movies =
      activeTab === "dang-chieu" ? dangChieuMovies : sapChieuMovies;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return movies.slice(startIndex, endIndex);
  };

  const getTotalMovies = () => {
    return activeTab === "dang-chieu"
      ? dangChieuMovies.length
      : sapChieuMovies.length;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    setCurrentPage(1); // Reset về trang đầu khi chuyển tab
  };

  const renderMovieGrid = (movies) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-8">
        {movies.map((movie, index) => {
          return (
            <Card
              key={index}
              className="movie-card group cursor-pointer border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white rounded-2xl overflow-hidden"
              onClick={() => handleRedirectToDetail(movie.maPhim)}
              cover={
                <div className="relative overflow-hidden">
                  <img
                    alt={movie.tenPhim}
                    src={movie.hinhAnh}
                    className="w-full h-[300px] md:h-[380px] object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay khi hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                        <PlayCircleOutlined className="text-white text-2xl" />
                      </div>
                      <p className="text-white font-semibold text-lg">
                        Xem trailer
                      </p>
                    </div>
                  </div>

                  {/* Action buttons overlay */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors duration-300">
                      <HeartOutlined />
                    </button>
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors duration-300">
                      <ShareAltOutlined />
                    </button>
                  </div>

                  {/* Movie status badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {movie.hot && (
                      <Badge.Ribbon
                        text="HOT"
                        color="red"
                        className="transform -translate-x-2"
                      >
                        <div></div>
                      </Badge.Ribbon>
                    )}
                    {movie.dangChieu && (
                      <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                        Đang chiếu
                      </span>
                    )}
                  </div>

                  {/* Rating badge */}
                  <div className="absolute bottom-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {(Math.random() * 2 + 8).toFixed(1)}
                  </div>

                  {/* Age rating */}
                  <div className="absolute bottom-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    T16
                  </div>
                </div>
              }
              bodyStyle={{ padding: "20px" }}
            >
              <div>
                <h3 className="font-bold text-base md:text-lg line-clamp-2 mb-3 min-h-[48px] group-hover:text-red-600 transition-colors duration-300">
                  {movie.tenPhim}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <Rate
                    disabled
                    defaultValue={4}
                    size="small"
                    className="text-yellow-500"
                  />
                  <span className="text-gray-500 text-sm font-medium">
                    120 phút
                  </span>
                </div>

                {/* Genre tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    Hành động
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    Phiêu lưu
                  </span>
                </div>

                <div className="space-y-3">
                  <Button
                    type="primary"
                    danger
                    block
                    icon={<CalendarOutlined />}
                    className="font-semibold h-10 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-none shadow-lg hover:shadow-xl transition-all duration-300"
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
      <div className="mb-12">
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          centered
          size="large"
          className="movie-tabs custom-tabs"
        >
          <TabPane
            tab={
              <span className="flex items-center gap-2 px-4 py-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                Đang chiếu ({dangChieuMovies.length})
              </span>
            }
            key="dang-chieu"
          >
            <div className="space-y-8">
              {renderMovieGrid(getCurrentMovies())}

              {/* Pagination */}
              {getTotalMovies() > pageSize && (
                <div className="flex justify-center mt-8">
                  <div className="bg-white rounded-2xl p-4 shadow-lg">
                    <Pagination
                      current={currentPage}
                      total={getTotalMovies()}
                      pageSize={pageSize}
                      onChange={handlePageChange}
                      showSizeChanger={false}
                      showQuickJumper
                      showTotal={(total, range) =>
                        `${range[0]}-${range[1]} của ${total} phim`
                      }
                      className="custom-pagination"
                    />
                  </div>
                </div>
              )}
            </div>
          </TabPane>
          <TabPane
            tab={
              <span className="flex items-center gap-2 px-4 py-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                Sắp chiếu ({sapChieuMovies.length})
              </span>
            }
            key="sap-chieu"
          >
            <div className="space-y-8">
              {renderMovieGrid(getCurrentMovies())}

              {/* Pagination */}
              {getTotalMovies() > pageSize && (
                <div className="flex justify-center mt-8">
                  <div className="bg-white rounded-2xl p-4 shadow-lg">
                    <Pagination
                      current={currentPage}
                      total={getTotalMovies()}
                      pageSize={pageSize}
                      onChange={handlePageChange}
                      showSizeChanger={false}
                      showQuickJumper
                      showTotal={(total, range) =>
                        `${range[0]}-${range[1]} của ${total} phim`
                      }
                      className="custom-pagination"
                    />
                  </div>
                </div>
              )}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default ListMovie;
