import React from 'react';
import Footer from '../components/common/Footer';
import HeaderContainer from '../containers/common/HeaderContainer';
import UserContainer from '../containers/user/UserContainer';

const User = () => {
  window.scrollTo(0, 0);

  return (
    <>
      <HeaderContainer />
      <UserContainer />
      <Footer />
    </>
  );
};

export default User;
