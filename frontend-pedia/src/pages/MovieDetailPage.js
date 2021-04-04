import React from 'react';
import Footer from '../components/common/Footer';
import HeaderContainer from '../containers/common/HeaderContainer';
import MovieDetailContainer from '../containers/movieDetail/MovieDetailContainer';
const MovieDetailPage = () => {
  return (
    <>
      <HeaderContainer />
      <MovieDetailContainer />
      <Footer />
    </>
  );
};

export default MovieDetailPage;
