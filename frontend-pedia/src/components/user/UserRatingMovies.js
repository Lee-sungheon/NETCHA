import React from 'react';
import SmallSlider from '../../components/slider/SmallSlider';
import SeeMoreButton from '../common/SeeMoreButton';

const UserRatingMovies = ({ movies, count, error, loading }) => {
  return (
    <>
      <h3 style={{ display: 'inline-block' }}>평가</h3>&nbsp;&nbsp;{count}
      <SeeMoreButton link="/userRatingMoviesPage" />
      <SmallSlider movies={movies} error={error} loading={loading} />
    </>
  );
};

export default UserRatingMovies;
