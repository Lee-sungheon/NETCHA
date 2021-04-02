import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "../../../component/slider";
import { actions } from "../../../state";

export default function PopularBased({ loading, idx }) {
  const movieLists = useSelector((state) => state.home.popularMovieLists);
  const isLoading = useSelector((state) => state.home.isPopularLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (movieLists && movieLists.length === 0) {
      dispatch(actions.requestPopularMovieList());
    }
  }, []);

  return (
    <div className="home__container" id={idx}>
      {loading && isLoading && (
        <Slider title={"Netcha 인기 콘텐츠"} idx={idx}>
          {loading.map((movie, idx) => (
            <Slider.Item movie={movie} key={movie.no} idx={idx}></Slider.Item>
          ))}
        </Slider>
      )}
      {movieLists && !isLoading && (
        <Slider title={"Netcha 인기 콘텐츠"} idx={idx}>
          {movieLists.map((movie, idx) => (
            <Slider.Item movie={movie} key={movie.no} idx={idx}></Slider.Item>
          ))}
        </Slider>
      )}
    </div>
  );
}
