import React from 'react';
import Header from "../components/common/Header";
import SearchMovieListContainer from '../containers/movies/SearchMovieListContainer';

const SearchMovieListPage = () => {
  return (
    <>
    <Header />
    <SearchMovieListContainer />
  </>
  );
};

export default SearchMovieListPage;
