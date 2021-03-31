import React from 'react';
import Footer from '../components/common/Footer';
import Header from "../components/common/Header";
import MovieDetailContainer from '../containers/movieDetail/MovieDetailContainer';
const MovieDetailPage = () => {
  return (
    <>
    <Header />
    <MovieDetailContainer />
    <Footer />
  </>
  );
};

export default MovieDetailPage;
