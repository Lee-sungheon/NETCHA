import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SmallSlider.scss";

export default function SmallSlider({ data, title }) {
  // function goToMovieDetail(movieTitle){
  //   alert(movieTitle);
  // }

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

  return (
    <div>
      <div className="title">
        <h2> {title} </h2>
      </div>
      <div>
        <Slider {...settings}>
          {data.map((data) => {
            return (
              <div className="smallMovieBox" key={data.id}>
                <img className="smallimage" // onClick={goToMovieDetail(data.title)}
                  alt={data.title} src={data.image}
                />
                <div className="smallmovieInfo">
                  <div className="smallmovieTitle">
                      <p title={data.title}>{data.title}</p>
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
    </div>
  );
}
