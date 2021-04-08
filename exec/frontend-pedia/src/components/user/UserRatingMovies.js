import React from 'react';
import SmallSlider from '../../components/slider/SmallSlider';
import UserMoviesHeader from './UserMoviesHeader';

const UserRatingMovies = ({ movies, count, error, loading }) => {
  return (
    <>
      {movies && (
        <>
          <UserMoviesHeader
            count={count}
            title="평가"
            link="/userPage/userRatingMoviesList"
          />
          <SmallSlider movies={movies} error={error} loading={loading} />
        </>
      )}
    </>
  );
};

export default UserRatingMovies;
