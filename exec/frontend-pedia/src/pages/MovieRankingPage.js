import React from 'react';
import Footer from '../components/common/Footer';
import HeaderContainer from '../containers/common/HeaderContainer';
import MovieRankingContainer from '../containers/movies/MovieRankingContainer';
import NewMovieContainer from '../containers/movies/NewMovieContainer';
import './MovieRankingPage.scss';
import * as authApi from '../lib/api/auth';
import { setUser } from '../modules/user';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

const MovieRanking = ({ match, history }) => {
  window.scrollTo(0, 0);

  const { token } = match.params;
  const dispatch = useDispatch();
  const getUserInfo = async () => {
    const response = await authApi.getUserInfo(token);

    dispatch(setUser(response.data.data));
    localStorage.setItem('user', JSON.stringify(response.data.data));
    history.push(`/`);
  };

  if (token) {
    getUserInfo();
  }
  return (
    <>
      <HeaderContainer />
      <div>
        <div className="container1">
          <div className="container2">
            <NewMovieContainer title="최신 개봉 영화" />
          </div>
          <div className="container2">
            <MovieRankingContainer title="넷챠 영화 순위" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default withRouter(MovieRanking);
