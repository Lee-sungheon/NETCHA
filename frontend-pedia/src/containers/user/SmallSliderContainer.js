import SmallSlider from "../../components/slider/SmallSlider";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { listScoreMovies } from "../../modules/movies";

const SmallSliderContainer = () => {
    const dispatch = useDispatch();
    const { movies, error, loading } = useSelector(({ movies, loading }) => ({
      movies: movies.movies,
      error: movies.error,
      loading: loading["movies/LIST_SCORE_MOVIES"],
    }));
    useEffect(() => {
      dispatch(listScoreMovies());
    }, [dispatch]);

  return (
    <SmallSlider movies={movies} error={error} loading={loading} />
  );
}

export default withRouter(SmallSliderContainer);