import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import UserRatingMoviesListContainer from '../containers/user/UserRatingMoviesListContainer';

const UserRatingMoviesListPage = () => {
  window.scrollTo(0, 0);

  return (
    <>
      <HeaderContainer />
      <UserRatingMoviesListContainer />
    </>
  );
};

export default UserRatingMoviesListPage;
