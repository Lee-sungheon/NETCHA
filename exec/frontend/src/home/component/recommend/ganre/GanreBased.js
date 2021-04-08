import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "../../../component/slider";
import { actions } from "../../../state";

export default function GanreBased({ loading, idx, ganre, user }) {
  const movieLists = useSelector((state) => state.home.ganreMovieLists);
  const isLoading = useSelector((state) => state.home.isGanreLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (movieLists.length === 0) {
      dispatch(actions.requestGanreMovieList(ganre, 0, user.seq));
    }
  }, [dispatch, user, movieLists, ganre]);

  return (
    <div className="home__container" id={idx}>
      {isLoading && (
        <Slider title={`${ganre} 영화`} idx={idx}>
          {loading.map((movie, idx) => (
            <Slider.Item movie={movie} key={movie.no} idx={idx}></Slider.Item>
          ))}
        </Slider>
      )}
      {!isLoading && (
        <Slider title={`${ganre} 영화`} idx={idx}>
          {movieLists.map((movie, idx) => (
            <Slider.Item movie={movie} key={movie.no} idx={idx}></Slider.Item>
          ))}
        </Slider>
      )}
    </div>
  );
}
