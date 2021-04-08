import React from 'react';
import SmallSlider from '../slider/SmallSlider';
import UserMoviesHeader from './UserMoviesHeader';

const UserZzimMovies = ({ movies, count, error, loading }) => {
  return (
    <>
      {movies && (
        <>
          <UserMoviesHeader
            count={count}
            title="보고싶어요"
            link="/userPage/userZzimMoviesList"
          />
          <SmallSlider movies={movies} error={error} loading={loading} />
        </>
      )}
    </>
  );
};

export default UserZzimMovies;
