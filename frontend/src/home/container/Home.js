import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "../component/slider";
import Banner from "../component/banner/banner";
import DehazeIcon from '@material-ui/icons/Dehaze';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import { actions } from "../state";
import { useSelector, useDispatch } from 'react-redux';
import './Home.scss'


export default function Home() {
  const movieLists = useSelector(state => state.home.movieLists);
  const isLoading = useSelector(state => state.home.isLoading);
  const dispatch = useDispatch();
  useEffect(() =>{
    if (movieLists.length === 0){
      dispatch(actions.requestMovieList());
    }
  }, [])
  useEffect(() =>{
    console.log(movieLists);
  }, [movieLists])

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
            {isLoading && <Slider title={"Netcha 인기 콘텐츠"} idx={`slider-1`}>
              {loading.map((movie, idx) => (
                  <Slider.Item movie={movie} key={movie.no} idx={idx}>
                  </Slider.Item>
              ))}
            </Slider>}
            {!isLoading && <Slider title={"Netcha 인기 콘텐츠"} idx={`slider-1`}>
              {movieLists.slice(0,10).map((movie, idx) => (
                  <Slider.Item movie={movie} key={movie.no} idx={idx} >
                  </Slider.Item>
              ))}
            </Slider>}
        </div>
        <div className="home__container" id={"slider-2"}>
          {isLoading && <Slider title={"Netcha 랜덤 콘텐츠"} idx={`slider-2`}>
            {loading.map((movie, idx) => (
                <Slider.Item movie={movie} key={movie.no} idx={idx} >
                </Slider.Item>
            ))}
          </Slider>}
          {!isLoading && <Slider title={"Netcha 랜덤 콘텐츠"} idx={`slider-2`}>
            {movieLists.slice(10,20).map((movie, idx) => (
                <Slider.Item movie={movie} key={movie.no} idx={idx}>
                </Slider.Item>
            ))}
          </Slider>}
        </div>
        <div className="home__container" id={`slider-3`}>
          {isLoading && <Slider title={"Netcha 싸피 콘텐츠"} idx={`slider-3`}>
            {loading.map((movie, idx) => (
                <Slider.Item movie={movie} key={movie.no} idx={idx} >
                </Slider.Item>
            ))}
          </Slider>}
          {!isLoading && <Slider title={"Netcha 싸피 콘텐츠"} idx={`slider-3`}>
            {movieLists.slice(20,30).map((movie, idx) => (
                <Slider.Item movie={movie} key={movie.no} idx={idx}>
                </Slider.Item>
            ))}
          </Slider>}
        </div>
        <div className="home__container" id={`slider-4`}>
          {isLoading && <Slider title={"Netcha 추천 콘텐츠"} idx={`slider-4`}>
            {loading.map((movie, idx) => (
                <Slider.Item movie={movie} key={movie.no} idx={idx} >
                </Slider.Item>
            ))}
          </Slider>}
          {!isLoading && <Slider title={"Netcha 추천 콘텐츠"} idx={`slider-4`}>
            {movieLists.slice(30,40).map((movie, idx) => (
                <Slider.Item movie={movie} key={movie.no} idx={idx}>
                </Slider.Item>
            ))}
          </Slider>}
        </div>

        {/* {[5,6,7,8,9,10,11,12,13,14,15].map(item=> (
          <div className="home__container" id={`slider-${item}`}>
            {isLoading && <Slider title={"Netcha 추천 콘텐츠"} idx={`slider-${item}`}>
              {loading.map((movie, idx) => (
                  <Slider.Item movie={movie} key={movie.no} idx={idx} >
                  </Slider.Item>
              ))}
            </Slider>}
            {!isLoading && <Slider title={"Netcha 추천 콘텐츠"} idx={`slider-${item}`}>
              {movieLists.slice(30,40).map((movie, idx) => (
                  <Slider.Item movie={movie} key={movie.no} idx={idx}>
                  </Slider.Item>
              ))}
            </Slider>}
          </div>
        ))} */}

      </div>
    </>
  );
}

const loading = [
  {
    no: 1,
    imageUrl: "/images/loading.gif",
    imageBg: "/images/slide1b.webp",
    title: "",
  },
  {
    no: 2,
    imageUrl: "/images/loading.gif",
    imageBg: "/images/slide2b.webp",
    title: "",
  },
  {
    no: 3,
    imageUrl: "/images/loading.gif",
    imageBg: "/images/slide3b.webp",
    title: "",
  },
  {
    no: 4,
    imageUrl: "/images/loading.gif",
    imageBg: "/images/slide4b.webp",
    title: "",
  },
  {
    no: 5,
    imageUrl: "/images/loading.gif",
    imageBg: "/images/slide5b.webp",
    title: "",
  },
  {
    no: 6,
    imageUrl: "/images/loading.gif",
    imageBg: "/images/slide6b.webp",
    title: "",
  },
];
