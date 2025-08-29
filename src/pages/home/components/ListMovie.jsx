import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setListMovieAction } from "../../../stores/movie";
import { movieService } from "../../../services/movieService";
import { Pagination, Modal } from "antd";
import { useNavigate } from "react-router-dom";

const ListMovie = () => {
  const dispatch = useDispatch();
  const listMovie = useSelector((state) => state.movieSlice.listMovie);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dang-chieu");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8); // Số phim hiển thị trên mỗi trang
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState("");

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

  // Function để mở modal trailer
  const openTrailerModal = (trailerUrl) => {
    setCurrentTrailer(trailerUrl);
    setIsModalOpen(true);
  };

  // Function để đóng modal trailer
  const closeTrailerModal = () => {
    setIsModalOpen(false);
    setCurrentTrailer("");
  };

  // Function để convert YouTube URL thành embed URL
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-6 lg:gap-6 px-6 md:px-12 lg:px-16">
        {movies.map((movie, index) => {
          return (
            <div
              key={index}
              className="movie-card group cursor-pointer relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white w-full"
              onClick={() => handleRedirectToDetail(movie.maPhim)}
              style={{
                height: "520px",
              }}
            >
              {/* Movie Poster Container */}
              <div
                className="relative overflow-hidden"
                style={{ height: "460px" }}
              >
                <img
                  alt={movie.tenPhim}
                  src={movie.hinhAnh}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Rating Badge - nhỏ gọn hơn */}
                <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold flex items-center">
                  <span className="text-yellow-800 mr-1">⭐</span>
                  {movie.danhGia ? movie.danhGia.toFixed(1) : "0.0"}
                </div>

                {/* Age Rating */}
                <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                  T16
                </div>

                {/* Status Badge */}
                {activeTab === "dang-chieu" && (
                  <div className="absolute top-10 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    ĐANG CHIẾU
                  </div>
                )}

                {/* Hover Overlay với buttons */}
                <div className="absolute inset-0  bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-3">
                    {/* Mua vé Button */}
                    <button
                      onClick={() => handleRedirectToDetail(movie.maPhim)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1 text-sm"
                    >
                      <span>🎫</span>
                      <span>Mua vé</span>
                    </button>

                    {/* Trailer Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (movie.trailer) {
                          openTrailerModal(movie.trailer);
                        } else {
                          console.log(
                            "Không có trailer cho phim:",
                            movie.tenPhim
                          );
                        }
                      }}
                      className="bg-transparent border-2 border-white text-white hover:bg-orange-600 hover:text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-1 text-sm"
                    >
                      <span>▶️</span>
                      <span>Trailer</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Movie Title Only - như Galaxy Cinema */}
              <div
                className="p-4 flex items-center justify-center"
                style={{ height: "60px" }}
              >
                <h3 className="font-medium text-sm text-gray-800 text-center line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                  {movie.tenPhim}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="movie-section">
      {/* Tab navigation - CGV Style */}
      <div className="mb-8">
        <div className="flex items-center justify-start mb-6">
          <div className="flex items-center">
            <div className="w-1 h-8 bg-blue-600 mr-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mr-8">PHIM</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleTabChange("dang-chieu")}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                activeTab === "dang-chieu"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
              }`}
            >
              Đang chiếu
            </button>
            <button
              onClick={() => handleTabChange("sap-chieu")}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                activeTab === "sap-chieu"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
              }`}
            >
              Sắp chiếu
            </button>
          </div>
        </div>

        {/* Content Area */}
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
      </div>

      {/* Modal Trailer */}
      <Modal
        title="Xem Trailer"
        open={isModalOpen}
        onCancel={closeTrailerModal}
        footer={null}
        width={900}
        centered
        destroyOnClose
      >
        {currentTrailer && (
          <div className="relative w-full h-0 pb-[56.25%]">
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
