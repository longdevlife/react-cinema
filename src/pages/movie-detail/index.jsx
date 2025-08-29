import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieService } from "../../services/movieService";
import { setListMovieAction } from "../../stores/movie";

// Import components
import HeroBanner from "./components/HeroBanner";
import MovieInfo from "./components/MovieInfo";
import MovieSidebar from "./components/MovieSidebar";
import TrailerModal from "./components/TrailerModal";
import MovieShowtimes from "./components/MovieShowtimes";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { listMovie } = useSelector((state) => state.movieSlice);

  // States
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [error, setError] = useState(null);

  // Fetch movie detail
  const fetchMovieDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await movieService.getMovieDetail(movieId);
      setMovieDetail(response.data.content);
    } catch (error) {
      console.error("Error fetching movie detail:", error);
      setError("Không thể tải thông tin phim. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch list movies for sidebar (if not already loaded)
  const fetchListMovie = async () => {
    if (listMovie.length === 0) {
      try {
        const response = await movieService.getListMovies();
        dispatch(setListMovieAction(response.data.content));
      } catch (error) {
        console.error("Error fetching movie list:", error);
      }
    }
  };

  useEffect(() => {
    fetchMovieDetail();
    fetchListMovie();
  }, [movieId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handlers
  const handlePlayTrailer = () => {
    if (movieDetail?.trailer) {
      setIsTrailerOpen(true);
    } else {
      alert("Trailer chưa có sẵn cho phim này");
    }
  };

  const handleBookTicket = () => {
    // TODO: Navigate to booking page
    console.log("Book ticket for movie:", movieDetail?.tenPhim);
    alert("Chức năng đặt vé đang được phát triển");
  };

  const handleCloseTrailer = () => {
    setIsTrailerOpen(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin phim...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">❌</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  // Not found state
  if (!movieDetail) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Không tìm thấy phim
          </h2>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-detail-page bg-gray-50 min-h-screen">
      {/* Hero Banner Section */}
      <HeroBanner movieDetail={movieDetail} onPlayTrailer={handlePlayTrailer} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Movie Info - 8 columns */}
          <div className="col-span-12 lg:col-span-8">
            <MovieInfo
              movieDetail={movieDetail}
              onBookTicket={handleBookTicket}
            />
          </div>

          {/* Sidebar - 4 columns */}
          <div className="col-span-12 lg:col-span-4">
            <MovieSidebar currentMovieId={parseInt(movieId)} />
          </div>
        </div>
      </div>

      {/* Movie Showtimes Section */}
      <MovieShowtimes movieId={movieId} movieDetail={movieDetail} />

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={handleCloseTrailer}
        trailerUrl={movieDetail.trailer}
        movieTitle={movieDetail.tenPhim}
      />
    </div>
  );
};

export default MovieDetailPage;
