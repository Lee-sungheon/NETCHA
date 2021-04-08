import React from 'react';
import UserStaticsContainer from '../containers/user/UserStaticsContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import Footer from '../components/common/Footer';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as authApi from '../lib/api/auth';
import { setUser } from '../modules/user';

const UserStatics = ({ match, history }) => {
  window.scrollTo(0, 0);

  const { id, token } = match.params;
  const dispatch = useDispatch();
  const getUserInfo = async () => {
    const response = await authApi.getUserInfo(token);
    dispatch(setUser(response.data.data));
    localStorage.setItem('user', JSON.stringify(response.data.data));
    history.push(`/user/statics/` + parseInt(id));
  };

  if (token) {
    getUserInfo();
  }

  return (
    <>
      <HeaderContainer />
      <UserStaticsContainer />
      <Footer />
    </>
  );
};

export default withRouter(UserStatics);
