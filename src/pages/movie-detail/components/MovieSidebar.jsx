import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MovieSidebar = ({ currentMovieId }) => {
  const { listMovie } = useSelector((state) => state.movieSlice);
  const navigate = useNavigate();

  // Lọc ra các phim khác (không bao gồm phim hiện tại)
  const otherMovies = listMovie
    .filter((movie) => movie.maPhim !== currentMovieId)
    .slice(0, 5);

  const handleMovieClick = (movieId) => {
    navigate(`/detail/${movieId}`);
    // Scroll to top when navigate to new movie
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
      <div className="flex items-center mb-6">
        <div className="w-1 h-6 bg-blue-600 mr-3"></div>
        <h3 className="text-xl font-bold text-blue-600">PHIM ĐANG CHIẾU</h3>
      </div>

      <div className="space-y-4">
        {otherMovies.map((movie) => (
          <div
            key={movie.maPhim}
            className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
            onClick={() => handleMovieClick(movie.maPhim)}
          >
            <img
              src={movie.hinhAnh}
              alt={movie.tenPhim}
              className="w-16 h-24 object-cover rounded shadow-sm"
            />
            <div className="flex-1">
              <h4 className="font-medium text-sm line-clamp-2 mb-2 text-gray-800 hover:text-blue-600 transition-colors">
                {movie.tenPhim}
              </h4>
              <div className="flex items-center">
                <span className="text-yellow-500 text-sm">⭐</span>
                <span className="ml-1 text-sm font-medium text-gray-700">
                  {movie.danhGia ? movie.danhGia.toFixed(1) : "9.5"}
                </span>
              </div>
              <div className="mt-1">
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                  T16+
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {otherMovies.length === 0 && (
        <div className="text-center py-8 text-gray-500">Không có phim khác</div>
      )}
    </div>
  );
};

export default MovieSidebar;
