import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "../../../component/slider";
import { actions } from "../../../state";

export default function ContentBased({ loading, idx, user }) {
  const movieLists = useSelector((state) => state.home.movieLists);
  const isLoading = useSelector((state) => state.home.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (movieLists.length === 0) {
      dispatch(actions.requestMovieList(0, user.seq));
    }
  }, [dispatch, user, movieLists]);

  return (
    <div className="home__container" id={idx}>
      {isLoading && (
        <Slider title={`${user.name}님의 취향저격 콘텐츠`} idx={idx}>
          {loading.map((movie, idx) => (
            <Slider.Item
              movie={movie}
              key={movie.no}
              idx={idx}
            ></Slider.Item>
          ))}
        </Slider>
      )}
      {!isLoading && (
        <Slider title={`${user.name}님의 취향저격 콘텐츠`} idx={idx}>
          {movieLists.slice(0, 40).map((movie, idx) => (
            <Slider.Item
              movie={movie}
              key={movie.no}
              idx={idx}
            ></Slider.Item>
          ))}
        </Slider>
      )}
    </div>
  );
}
