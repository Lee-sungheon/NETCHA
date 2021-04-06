import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Slider from "../../../component/slider";
import { actions } from "../../../state";

export default function RankBased({loading, idx, user}) {
  const movieLists = useSelector(state => state.home.rankMovieLists);
  const isLoading = useSelector(state => state.home.isRankLoading);
  const dispatch = useDispatch();
  useEffect(() =>{
    if (movieLists.length === 0){
      dispatch(actions.requestRankMovieList(0, user.seq));
    }
  }, [dispatch, movieLists, user])
  
  return (
    <div className="home__container" id={idx}>
        {isLoading && <Slider title={"평점이 높은 영화"} idx={idx}>
          {loading.map((movie, idx) => (
              <Slider.Item movie={movie} key={movie.no} idx={idx}>
              </Slider.Item>
          ))}
        </Slider>}
        {!isLoading && <Slider title={"평점이 높은 영화"} idx={idx}>
          {movieLists.map((movie, idx) => (
              <Slider.Item movie={movie} key={movie.no} idx={idx} >
              </Slider.Item>
          ))}
        </Slider>}
    </div>
  )
}