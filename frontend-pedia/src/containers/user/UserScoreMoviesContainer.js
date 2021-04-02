import SmallSlider from '../../components/slider/SmallSlider';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { listScoreMovies } from '../../modules/movies';

const UserScoreMoviesContainer = () => {
  const dispatch = useDispatch();
  const { userId, movies, error, loading } = useSelector(
    ({ user, movies, loading }) => ({
      userId: user.user.userId,
      movies: movies.movies,
      error: movies.error,
      loading: loading['movies/LIST_SCORE_MOVIES'],
    })
  );
  useEffect(() => {
    dispatch(listScoreMovies(userId));
  }, [dispatch]);

  return <SmallSlider movies={movies} error={error} loading={loading} />;
};

export default withRouter(UserScoreMoviesContainer);
