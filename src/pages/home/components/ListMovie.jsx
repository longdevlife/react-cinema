import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListMovieAction } from "../../../stores/movie";
import { movieService } from "../../../services/movieService";
import { Pagination, Modal, Skeleton } from "antd";
import PlayCircleOutlined from "@ant-design/icons/PlayCircleOutlined";
import StarOutlined from "@ant-design/icons/StarOutlined";
import RightOutlined from "@ant-design/icons/RightOutlined";
import CalendarOutlined from "@ant-design/icons/CalendarOutlined";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const ListMovie = () => {
  const dispatch = useDispatch();
  const listMovie = useSelector((state) => state.movieSlice.listMovie);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dang-chieu");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState("");
  const [loading, setLoading] = useState(true);
  const [hoveredMovie, setHoveredMovie] = useState(null);

  // Intersection Observer for animations
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const fetchListMovie = async () => {
    setLoading(true);
    try {
      const responseListMovie = await movieService.getListMovies();
      dispatch(setListMovieAction(responseListMovie.data.content));
    } catch (error) {
      console.error("Error fetching movie list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListMovie();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRedirectToDetail = (movieId) => {
    navigate(`/detail/${movieId}`);
  };

  const openTrailerModal = (trailerUrl) => {
    setCurrentTrailer(trailerUrl);
    setIsModalOpen(true);
  };

  const closeTrailerModal = () => {
    setIsModalOpen(false);
    setCurrentTrailer("");
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  // Enhanced movie filtering
  const dangChieuMovies = listMovie.filter((movie, index) => index % 2 === 0);
  const sapChieuMovies = listMovie.filter((movie, index) => index % 2 === 1);

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
    // Smooth scroll to movies section
    const moviesSection = document.getElementById("phim");
    if (moviesSection) {
      moviesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    setCurrentPage(1);
  };

  // Skeleton Loading Component
  const MovieSkeleton = () => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
      <Skeleton.Image className="w-full h-80" />
      <div className="p-4">
        <Skeleton active paragraph={{ rows: 2 }} />
      </div>
    </div>
  );

  const renderMovieGrid = (movies) => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <MovieSkeleton key={index} />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={sectionRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-8"
      >
        {movies.map((movie, index) => {
          const isHovered = hoveredMovie === movie.maPhim;

          return (
            <div
              key={movie.maPhim}
              className={`movie-card group cursor-pointer relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-3 ${
                inView ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{
                height: "520px",
                animationDelay: `${index * 100}ms`,
              }}
              onMouseEnter={() => setHoveredMovie(movie.maPhim)}
              onMouseLeave={() => setHoveredMovie(null)}
              onClick={() => handleRedirectToDetail(movie.maPhim)}
            >
              {/* Movie Poster Container with Enhanced Effects */}
              <div
                className="relative overflow-hidden"
                style={{ height: "400px" }}
              >
                <img
                  alt={movie.tenPhim}
                  src={movie.hinhAnh}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Rating Badge - Enhanced */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-2 rounded-xl text-sm font-bold flex items-center shadow-lg transform transition-all duration-300 group-hover:scale-110">
                  <StarOutlined className="mr-1" />
                  {movie.danhGia && !isNaN(movie.danhGia)
                    ? Number(movie.danhGia).toFixed(1)
                    : "9.5"}
                </div>

                {/* Age Rating - Enhanced */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-xl text-sm font-bold shadow-lg">
                  T16+
                </div>

                {/* Status Badge with Animation */}
                {activeTab === "dang-chieu" && (
                  <div className="absolute top-16 left-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg animate-pulse">
                    ● ĐANG CHIẾU
                  </div>
                )}

                {activeTab === "sap-chieu" && (
                  <div className="absolute top-16 left-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg animate-pulse">
                    ● SẮP CHIẾU
                  </div>
                )}

                {/* Enhanced Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {/* Main Action Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRedirectToDetail(movie.maPhim);
                      }}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-110 shadow-2xl flex items-center gap-2"
                    >
                      <span>🎫</span>
                      <span>ĐẶT VÉ NGAY</span>
                    </button>

                    {/* Secondary Action */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (movie.trailer) {
                          openTrailerModal(movie.trailer);
                        }
                      }}
                      className="bg-white/20 backdrop-blur-md border-2 border-white/50 text-white hover:bg-white hover:text-black px-6 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                    >
                      <PlayCircleOutlined />
                      <span>TRAILER</span>
                    </button>
                  </div>
                </div>

                {/* Floating Action Button for Quick Booking */}
                <div
                  className={`absolute bottom-4 right-4 transform transition-all duration-500 ${
                    isHovered
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRedirectToDetail(movie.maPhim);
                    }}
                    className="w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                  >
                    <RightOutlined />
                  </button>
                </div>
              </div>

              {/* Enhanced Movie Info Section */}
              <div
                className="p-6 bg-gradient-to-b from-white to-gray-50"
                style={{ height: "120px" }}
              >
                <h3 className="font-bold text-lg text-gray-800 text-center line-clamp-2 group-hover:text-red-600 transition-colors duration-300 mb-2">
                  {movie.tenPhim}
                </h3>

                {/* Additional Movie Info */}
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <CalendarOutlined />
                    {movie.ngayKhoiChieu
                      ? new Date(movie.ngayKhoiChieu).getFullYear()
                      : new Date().getFullYear()}
                  </span>
                  <span>•</span>
                  <span>124 phút</span>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl shadow-2xl shadow-red-500/20"></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="movie-section">
      {/* Enhanced Tab Navigation */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-2 h-12 bg-gradient-to-b from-red-500 to-purple-600 rounded-full mr-6"></div>
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              PHIM HOT
            </h2>
          </div>

          {/* Enhanced Tab Buttons */}
          <div className="flex items-center bg-gray-100 p-2 rounded-2xl shadow-inner">
            <button
              onClick={() => handleTabChange("dang-chieu")}
              className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 relative overflow-hidden ${
                activeTab === "dang-chieu"
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-red-600 hover:bg-white/50"
              }`}
            >
              <span className="relative z-10">Đang chiếu</span>
              {activeTab === "dang-chieu" && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-20 animate-pulse"></div>
              )}
            </button>
            <button
              onClick={() => handleTabChange("sap-chieu")}
              className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 relative overflow-hidden ${
                activeTab === "sap-chieu"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-blue-600 hover:bg-white/50"
              }`}
            >
              <span className="relative z-10">Sắp chiếu</span>
              {activeTab === "sap-chieu" && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-20 animate-pulse"></div>
              )}
            </button>
          </div>
        </div>

        {/* Movies Count Indicator */}
        <div className="text-center mb-8">
          <p className="text-gray-600 text-lg">
            <span className="font-bold text-red-600">{getTotalMovies()}</span>{" "}
            phim {activeTab === "dang-chieu" ? "đang chiếu" : "sắp chiếu"}
          </p>
        </div>

        {/* Content Area */}
        <div className="space-y-12">
          {renderMovieGrid(getCurrentMovies())}

          {/* Enhanced Pagination */}
          {getTotalMovies() > pageSize && (
            <div className="flex justify-center mt-16">
              <div className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-100">
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
      </div>

      {/* Enhanced Modal Trailer */}
      <Modal
        title={
          <div className="flex items-center gap-3 text-xl font-bold">
            <PlayCircleOutlined className="text-red-600" />
            <span>Trailer Chính Thức</span>
          </div>
        }
        open={isModalOpen}
        onCancel={closeTrailerModal}
        footer={null}
        width={1000}
        centered
        destroyOnClose
        className="trailer-modal"
      >
        {currentTrailer && (
          <div className="relative w-full h-0 pb-[56.25%] rounded-xl overflow-hidden">
            <iframe
              src={getYouTubeEmbedUrl(currentTrailer)}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ListMovie;
