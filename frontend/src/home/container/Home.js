import React from "react";
import { Link } from "react-router-dom";
import Slider from "../component/slider";
import Banner from "../component/banner/banner";
import DehazeIcon from '@material-ui/icons/Dehaze';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import './Home.scss'


export default function Home() {
  return (
    <>
      <div className="home__top-bar__container">
        <div className="home__top-bar__area">
          <div className="home__top-bar__left"></div>
          <div className="home__top-bar__right" >
            <Link to={"/"}><div className="home__top-bar__button1" ><DehazeIcon /></div></Link>
            <Link to={"/movielist"}><div className="home__top-bar__button2"><ViewModuleIcon /></div></Link>
          </div>
        </div>
      </div>
      <Banner />
      <div className="home__container">
        <div className="home__container" id={"slider-1"}>
          <Slider title={"Netcha 인기 콘텐츠"} idx={`slider-1`}>
            {movies.map((movie, idx) => (
              <Slider.Item movie={movie} key={movie.id} idx={idx}>
                item1
              </Slider.Item>
            ))}
          </Slider>
        </div>
        <div className="home__container" id={"slider-2"}>
          <Slider title={"Netcha 랜덤 콘텐츠"} idx={`slider-2`}>
            {movies.map((movie, idx) => (
              <Slider.Item movie={movie} key={movie.id} idx={idx}>
              </Slider.Item>
            ))}
          </Slider>
        </div>
        <div className="home__container" id={`slider-3`}>
          <Slider title={"Netcha 싸피 콘텐츠"} idx={`slider-3`}>
            {movies.map((movie, idx) => (
              <Slider.Item movie={movie} key={movie.id} idx={idx}>
              </Slider.Item>
            ))}
          </Slider>
        </div>
        <div className="home__container" id={`slider-4`}>
          <Slider title={"Netcha 추천 콘텐츠"} idx={`slider-4`}>
            {movies.map((movie, idx) => (
              <Slider.Item movie={movie} key={movie.id} idx={idx}>
              </Slider.Item>
            ))}
          </Slider>
        </div>

        {[5,6,7,8,9,10,11,12,13,14,15].map(item=> (
          <div className="home__container" id={`slider-${item}`}>
            <Slider title={"Netcha 추천 콘텐츠"} idx={`slider-${item}`}>
              {movies.map((movie, idx) => (
                <Slider.Item movie={movie} key={movie.id} idx={idx}>
                </Slider.Item>
              ))}
          </Slider>
        </div>
        ))}

      </div>
      <div
        style={{
          height: "300px",
          color: "white",
          textAlign: "center",
          lineHeight: "300px",
          border: "5px white solid",
        }}
      >
        풋터 자리
      </div>
    </>
  );
}

const movies = [
  {
    id: 1,
    image: "/images/slide1.jpg",
    imageBg: "/images/slide1b.webp",
    title: "1983",
  },
  {
    id: 2,
    image: "/images/slide2.jpg",
    imageBg: "/images/slide2b.webp",
    title: "Russian doll",
  },
  {
    id: 3,
    image: "/images/slide3.jpg",
    imageBg: "/images/slide3b.webp",
    title: "The rain",
  },
  {
    id: 4,
    image: "/images/slide4.jpg",
    imageBg: "/images/slide4b.webp",
    title: "Sex education",
  },
  {
    id: 5,
    image: "/images/slide5.jpg",
    imageBg: "/images/slide5b.webp",
    title: "Elite",
  },
  {
    id: 6,
    image: "/images/slide6.jpg",
    imageBg: "/images/slide6b.webp",
    title: "Black mirror",
  },
  {
    id: 7,
    image: "/images/slide1.jpg",
    imageBg: "/images/slide1b.webp",
    title: "1983",
  },
  {
    id: 8,
    image: "/images/slide2.jpg",
    imageBg: "/images/slide2b.webp",
    title: "Russian doll",
  },
  {
    id: 9,
    image: "/images/slide3.jpg",
    imageBg: "/images/slide3b.webp",
    title: "The rain",
  },
  {
    id: 10,
    image: "/images/slide4.jpg",
    imageBg: "/images/slide4b.webp",
    title: "Sex education",
  },
  {
    id: 11,
    image: "/images/slide5.jpg",
    imageBg: "/images/slide5b.webp",
    title: "Elite",
  },
  {
    id: 12,
    image: "/images/slide6.jpg",
    imageBg: "/images/slide6b.webp",
    title: "Black mirror",
  },
];
