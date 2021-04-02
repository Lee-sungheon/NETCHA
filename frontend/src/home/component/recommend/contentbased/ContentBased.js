import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "../../../component/slider";
import { actions } from "../../../state";

export default function ContentBased({ loading, idx }) {
  const movieLists = useSelector((state) => state.home.movieLists);
  const isLoading = useSelector((state) => state.home.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (movieLists && movieLists.length === 0) {
      dispatch(actions.requestMovieList());
    }
  }, []);

  return (
    <div className="home__container" id={idx}>
      {loading && isLoading && (
        <Slider title={"SSAFY님의 취향저격 콘텐츠"} idx={idx}>
          {loading.map((movie, idx) => (
            <Slider.Item movie={movie} key={movie.no} idx={idx}></Slider.Item>
          ))}
        </Slider>
      )}
      {movieLists && !isLoading && (
        <Slider title={"SSAFY님의 취향저격 콘텐츠"} idx={idx}>
          {movieLists.slice(0, 40).map((movie, idx) => (
            <Slider.Item movie={movie} key={movie.no} idx={idx}></Slider.Item>
          ))}
        </Slider>
      )}
    </div>
  );
}
