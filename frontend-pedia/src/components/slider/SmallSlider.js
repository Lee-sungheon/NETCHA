import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SmallSlider.scss";
import { useHistory } from "react-router";

export default function SmallSlider({ movies, error, loading }) {
  const history = useHistory();

  if (error) {
    return <h2>에러가 발생했습니다.</h2>;
  }

  const slidesToShow = movies ? (movies.length < 5 ? movies.length : 5) : 5;

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    initialSlide: 0,
    centerMode: false,
    dots: false,
  };
  
  return (
    <>
      <div className="smallSlider">
        {!loading && movies && (
          <div>
            <Slider {...settings}>
              {movies.map((movie) => {
                return (
                  <div className="smallMovieBox" key={movie.no} onClick={() => history.push(`/movieDetail/${movie.no}`)}>
                    <img
                      className="smallimage" // onClick={goToMovieDetail(movie.title)}
                      alt={movie.title}
                      src={movie.posterUrl === "default" ? "../../images/defaultPoster.png" : movie.posterUrl}
                    />
                    <div className="smallmovieInfo">
                      <div className="smallmovieTitle">
                        <p title={movie.title}>{movie.title}</p>
                      </div>
                      <div className="smallmovieRate" style={movie.isRating === '평균'? {color: "#ff0073"} : {}}>
                        <span className="smallmovieScore">{movie.isRating}&nbsp;</span>
                        <span className="smallmovieScore">★&nbsp;{movie.score? movie.score : movie.avgRank}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        )}
      </div>
    </>
  );
}
