import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosCustom } from "../../../services/config";
import { setListMovieAction } from "../../../stores/movie";
import { movieService } from "../../../services/movieService";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

const ListMovie = () => {
  const dispatch = useDispatch();
  const listMovie = useSelector((state) => state.movieSlice.listMovie);
  console.log("ListMovie", listMovie);
  const navigate = useNavigate();

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

  //   lấy id phim
  const handleRedirectToDetail = (movieId) => {
    // di chuyển qua trang chi tiết phim
    console.log("movieId", movieId);
    navigate(`/detail/${movieId}`);
  };

  return (
    <div className="grid grid-cols-4 gap-4 px-12">
      {listMovie.map((movie, index) => {
        return (
          <Card
            onClick={() => {
              handleRedirectToDetail(movie.maPhim);
            }}
            key={index}
            hoverable
            // style={{ width: 240 }}
            cover={
              <img alt="example" src={movie.hinhAnh} className="!h-[200px]" />
            }
          >
            <h3>{movie.tenPhim}</h3>
          </Card>
        );
      })}
    </div>
  );
};

export default ListMovie;
