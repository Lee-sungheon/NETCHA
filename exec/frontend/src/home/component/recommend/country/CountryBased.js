import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "../../../component/slider";
import { actions } from "../../../state";

export default function CountryBased({ loading, idx, country, user }) {
  const movieLists = useSelector((state) => state.home.countryMovieLists);
  const isLoading = useSelector((state) => state.home.isCountryLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (movieLists.length === 0) {
      dispatch(actions.requestCountryMovieList(country, 0, user.seq));
    }
  }, [dispatch, user, movieLists, country]);

  return (
    <div className="home__container" id={idx}>
      {isLoading && (
        <Slider title={`${country} 영화`} idx={idx}>
          {loading.map((movie, idx) => (
            <Slider.Item movie={movie} key={movie.no} idx={idx}></Slider.Item>
          ))}
        </Slider>
      )}
      {!isLoading && (
        <Slider title={`${country} 영화`} idx={idx}>
          {movieLists.map((movie, idx) => (
            <Slider.Item movie={movie} key={movie.no} idx={idx}></Slider.Item>
          ))}
        </Slider>
      )}
    </div>
  );
}
