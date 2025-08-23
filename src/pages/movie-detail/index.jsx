import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { movieService } from "../../services/movieService";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  console.log("Movie ID:", movieId);
  const fetchMovieDetail = async () => {
    try {
      const responeMovieDetail = await movieService.getMovieDetail(movieId);
      console.log("Movie Detail:", responeMovieDetail);
    } catch (error) {
      console.error("Error fetching movie detail:", error);
    }
  };

  useEffect(() => {
    fetchMovieDetail();
  }, []);

  return <div>MovieDetail</div>;
};

export default MovieDetailPage;
