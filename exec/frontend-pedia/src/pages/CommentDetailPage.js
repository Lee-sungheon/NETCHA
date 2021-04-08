import React from 'react';
import Footer from '../components/common/Footer';
import HeaderContainer from '../containers/common/HeaderContainer';
import CommentDetailContainer from '../containers/comment/CommentDetailContainer';
import * as authApi from '../lib/api/auth';
import { setUser } from '../modules/user';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const MovieDetailPage = ({ match, history }) => {
  window.scrollTo(0, 0);

  const { commentNo, token } = match.params;
  const dispatch = useDispatch();
  const getUserInfo = async () => {
    const response = await authApi.getUserInfo(token);
    dispatch(setUser(response.data.data));
    localStorage.setItem('user', JSON.stringify(response.data.data));
    history.push(`/commentDetail/` + parseInt(commentNo));
  };

  if (token) {
    getUserInfo();
  }

  return (
    <>
      <HeaderContainer />
      <div className="container3">
        <div className="container2">
          <CommentDetailContainer commentNo={parseInt(commentNo)} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withRouter(MovieDetailPage);
