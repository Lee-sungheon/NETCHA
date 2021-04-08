import React from 'react';
import './User.scss';
import netchapediaImg from '../../images/netchapediaTransWhite.png';
import UserRatingMoviesContainer from '../../containers/user/UserRatingMoviesContainer';
import { Link } from 'react-router-dom';
import UserZzimMoviesContainer from '../../containers/user/UserZzimMoviesContainer';

const User = ({ user }) => {
  if (!user) {
    return (
      <div className="userWrapper" style={{ paddingBottom: '25%' }}>
        <div className="userBox" style={{ 'text-align': 'center' }}>
          <h2>로그인 해주세요</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="userWrapper">
        <div className="userBox">
          <div className="wallPaper">
            <img src={netchapediaImg} alt="netchapedia" className="logoImage" />
          </div>
          <div className="user">
            <div>
              <img
                src="/images/profileIcon.jpg"
                className="profileIconImg"
                alt=""
              />
              <div style={{ marginTop: '-20px' }}>
                <h2>{user.username}</h2>
              </div>
            </div>
            <hr />
            <Link
              to={`/user/statics/${user.userId}`}
              style={{ color: 'black' }}
            >
              <div>
                <img
                  src="/images/graph.png"
                  width="40px"
                  alt="취향분석"
                  style={{ marginBottom: '-9px' }}
                />
                <h3 style={{ display: 'inline-block' }}>&nbsp;취향분석</h3>
              </div>
            </Link>
            <hr />
            <div>
              <h2>영화</h2>
            </div>
            <hr />
            <div className="smallSliderWrap">
              <UserRatingMoviesContainer />
            </div>
            <hr />
            <div className="smallSliderWrap">
              <UserZzimMoviesContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
