import React from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Footer from '../components/common/Footer';
import HeaderContainer from '../containers/common/HeaderContainer';
import MovieDetailContainer from '../containers/movieDetail/MovieDetailContainer';
import * as authApi from '../lib/api/auth';
import { setUser } from '../modules/user';

const MovieDetailPage = ({ match, history }) => {
  const { movieNo, token } = match.params;
  const dispatch = useDispatch();
  const getUserInfo = async () => {
    const response = await authApi.getUserInfo(token);
    dispatch(setUser(response.data.data));
    localStorage.setItem('user', JSON.stringify(response.data.data));
    history.push(`/movieDetail/` + parseInt(movieNo));
  };

  if (token) {
    getUserInfo();
  }

  return (
    <>
      <HeaderContainer />
      <MovieDetailContainer movieNo={parseInt(movieNo)} />
      <Footer />
    </>
  );
};

export default withRouter(MovieDetailPage);
