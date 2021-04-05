import React from 'react';
import SmallSlider from '../../components/slider/SmallSlider';
import UserRatingMoviesHeader from './UserMoviesHeader';

const UserRatingMovies = ({ movies, count, error, loading }) => {
  return (
    <>
      <UserRatingMoviesHeader count={count} title="평가" link="/userRatingMoviesListPage" />
      <SmallSlider movies={movies} error={error} loading={loading} />
    </>
  );
};

export default UserRatingMovies;
