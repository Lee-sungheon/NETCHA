import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import UserRatingMovies from '../../components/user/UserRatingMovies';
import {
  listRatingMovies,
  countRatingMovies,
} from '../../modules/ratingMovies';
import Loader from '../../components/common/Loader';

const UserRatingMoviesContainer = () => {
  const dispatch = useDispatch();
  const { userId, movies, count, error, loading } = useSelector(
    ({ user, ratingMovies, loading }) => ({
      userId: user.user.userId,
      movies: ratingMovies.movies,
      count: ratingMovies.count,
      error: ratingMovies.error,
      loading: loading['ratingMovies/LIST_RATING_MOVIES'],
    })
  );
  useEffect(() => {
    dispatch(listRatingMovies({ page: 0, userId }));
    dispatch(countRatingMovies(userId));
  }, [dispatch, userId]);

  movies &&
    movies.forEach((movie) => {
      movie.isRating = '평가함';
    });

  if (loading)
    return <Loader type="spin" color="#ff0073" message="LOADING..." />;

  return (
    <>
      {userId && (
        <UserRatingMovies
          movies={movies}
          count={count}
          error={error}
          loading={loading}
        />
      )}
    </>
  );
};

export default withRouter(UserRatingMoviesContainer);
