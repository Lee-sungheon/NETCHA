import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./LargeMovieSlider.scss";
import { useHistory } from "react-router";

export default function LargeMovieSlider({ user, movies, title }) {
  
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  const history = useHistory();

  return (
    <div className="largeSlider">
      <div className="title">
        <h2> {title} </h2>
      </div>
      <div>
        <Slider {...settings}>
          {movies.map((movie, index) => {
            return (
              <div className="MovieBox" key={index}>
                <div className="movieAllWrap">
                  <div className="moviePosterInside">
                    <img
                      className="image"
                      // onClick={goToMovieDetail(movie.title)}
                      alt={movie.title}
                      src={movie.posterUrl === "default" ? "../../images/defaultPoster.png" : movie.posterUrl}
                      onClick={() => history.push(`/movieDetail/${movie.no}`)}
                    />
                    <div className="rankingNumber">{index+1}</div>
                    <div className="movieInfo">
                      <div className="movieTitle" title={movie.title}>{movie.title}</div>
                      <div className="movieDate">{movie.open.split('-')[0]} · {movie.country}</div>
                      <div className="movieRate">
                        <span className="movieScore">평점</span>
                        <span className="movieScore">&nbsp;★{movie.avgRank === 0 ? 4.2 : movie.avgRank}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
