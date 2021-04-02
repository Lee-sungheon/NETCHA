import SmallSlider from '../../components/slider/SmallSlider';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { listZzimMovies } from '../../modules/zzimMovies';

const UserZzimMoviesContainer = () => {
  const dispatch = useDispatch();
  const { userId, movies, error, loading } = useSelector(
    ({ user, zzimMovies, loading }) => ({
      userId: user.user.userId,
      movies: zzimMovies.movies,
      error: zzimMovies.error,
      loading: loading['zzimMovies/LIST_ZZIM_MOVIES'],
    })
  );
  useEffect(() => {
    dispatch(listZzimMovies(userId));
  }, [dispatch]);

  return <SmallSlider movies={movies} error={error} loading={loading} />;
};

export default withRouter(UserZzimMoviesContainer);
