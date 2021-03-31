import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SmallSlider.scss";

export default function SmallSlider({ movies, title, error, loading }) {
  if (error) {
    return <h2>에러가 발생했습니다.</h2>;
  }

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    centerMode: false,
    dots: false,
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

  return (
    <>
      <div className="smallSlider">
        <div className="title">
          <h2> {title} </h2>
        </div>
        {!loading && movies && (
          <div>
            <Slider {...settings}>
              {movies.map((movie) => {
                return (
                  <div className="smallMovieBox" key={movie.id}>
                    <img
                      className="smallimage" // onClick={goToMovieDetail(movie.title)}
                      alt={movie.title}
                      src={movie.image}
                    />
                    <div className="smallmovieInfo">
                      <div className="smallmovieTitle">
                        <p title={movie.title}>{movie.title}</p>
                      </div>
                      <div className="smallmovieRate">
                        <span className="smallmovieScore">평가함&nbsp;</span>
                        <span className="smallmovieScore">★&nbsp;5.0</span>
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
