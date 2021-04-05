import React from 'react';
import SmallSlider from '../slider/SmallSlider';
import UserMoviesHeader from './UserMoviesHeader';

const UserZzimMovies = ({ movies, count, error, loading }) => {
  if(count) {
    console.log('count: ' + count);
  }
  return (
    <>
      <UserMoviesHeader count={count} title="보고싶어요" link="/userZzimMoviesList" />
      <SmallSlider movies={movies} error={error} loading={loading} />
    </>
  );
};

export default UserZzimMovies;
