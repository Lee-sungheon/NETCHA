import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SearchMovieListContainer from '../containers/movies/SearchMovieListContainer';

const SearchMovieListPage = ({ match }) => {
  window.scrollTo(0, 0);

  const { keyword } = match.params;
  return (
    <>
      <HeaderContainer />
      <SearchMovieListContainer keyword={keyword} />
    </>
  );
};

export default SearchMovieListPage;
