import SmallSlider from '../../components/slider/SmallSlider';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { listZzimMovies } from '../../modules/zzimMovies';

const UserZzimMoviesContainer = () => {
  const dispatch = useDispatch();
  const { userId, zzimMovies, ratingMovies, error, loading } = useSelector(
    ({ user, zzimMovies, ratingMovies, loading }) => ({
      userId: user.user.userId,
      ratingMovies: ratingMovies.movies,
      zzimMovies: zzimMovies.movies,
      error: zzimMovies.error,
      loading: loading['zzimMovies/LIST_ZZIM_MOVIES'],
    })
  );
  useEffect(() => {
    dispatch(listZzimMovies(userId));
  }, [dispatch]);

  if (zzimMovies && ratingMovies) {
    for (let i = 0; i < zzimMovies.length; i++) {
      for (let j = 0; j < ratingMovies.length; j++) {
        console.dir(zzimMovies);
        if (zzimMovies[i].id === ratingMovies[i].id) {
          zzimMovies[i].isRating = '평가함';
          break;
        }
      }
    }
    zzimMovies.map((movie) => {
      if (!movie.isRating) movie.isRating = '평균';
    })
  }

  return <SmallSlider movies={zzimMovies} error={error} loading={loading} />;
};

export default withRouter(UserZzimMoviesContainer);
