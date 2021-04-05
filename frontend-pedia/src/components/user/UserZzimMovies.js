import React from 'react';
import SmallSlider from '../slider/SmallSlider';
import SeeMoreButton from '../common/SeeMoreButton';

const UserZzimMovies = ({ movies, count, error, loading }) => {
  if(movies) {
    console.dir(movies);
  }
  return (
    <>
      <h3 style={{ display: 'inline-block' }}>보고싶어요</h3>&nbsp;&nbsp;{count}
      <SeeMoreButton />
      <SmallSlider movies={movies} error={error} loading={loading} />
    </>
  );
};

export default UserZzimMovies;
