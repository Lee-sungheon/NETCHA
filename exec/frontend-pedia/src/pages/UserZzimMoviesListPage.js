import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import UseZzimMoviesListContainer from '../containers/user/UseZzimMoviesListContainer';

const UserZzimMoviesListPage = () => {
  window.scrollTo(0, 0);

  return (
    <>
      <HeaderContainer />
      <UseZzimMoviesListContainer />
    </>
  );
};

export default UserZzimMoviesListPage;
