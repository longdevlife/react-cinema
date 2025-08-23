import React from "react";
import { Carousel } from "antd";

const CarouselMovie = () => {
  const classNameCarousel = "w-full aspect-[3/1]";

  return (
    <div>
      <Carousel arrows>
        <div>
          <img
            className={classNameCarousel}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTKAlHo4RqbJjXATtNbKrre7fjOYxaUTAnMw&s"
            alt=""
          />
        </div>
        <div>
          <img
            className={classNameCarousel}
            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/sci-fi-movie-poster-facebook-video-design-template-be422d6a6c1c2dd418e36389cce9ea13_screen.jpg?ts=1615966947"
            alt=""
          />
        </div>
        <div>
          <img
            className={classNameCarousel}
            src="https://snworksceo.imgix.net/ame-egl/71b1929c-0c30-475b-9287-c2adec9fb164.sized-1000x1000.jpeg?w=800&dpr=2&ar=16%3A9&fit=crop&crop=faces"
            alt=""
          />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselMovie;
