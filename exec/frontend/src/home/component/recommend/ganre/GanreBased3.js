import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "../../slider";
import { actions } from "../../../state";

export default function GanreBased3({ loading, idx, ganre, user }) {
  const movieLists = useSelector((state) => state.home.ganreMovieLists3);
  const isLoading = useSelector((state) => state.home.isGanreLoading3);
  const dispatch = useDispatch();
  useEffect(() => {
    if (movieLists.length === 0) {
      dispatch(actions.requestGanreMovieList3(ganre, 0, user.seq));
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
