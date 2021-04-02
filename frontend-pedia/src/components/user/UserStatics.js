import React from 'react';
import './UserStatics.scss';
import netchapediaImg from '../../images/netchapediaTransWhite.png';
import ActorListContainer from '../../containers/user/ActorListContainer';
import DirectorListContainer from '../../containers/user/DirectorListContainer';
import WordCloudContainer from '../../containers/user/WordCloudContainer';
import StarGraphContainer from '../../containers/user/StarGraphContainer';
import CountryListContainer from '../../containers/user/CountryListContainer';
import GenreListContainer from '../../containers/user/GenreListContainer';

const UserStatics = ({user}) => {
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
      <div className="userStaticsBox">
        <div className="roundedCornerBox">
          <div className="staticsWallPaper">
            <img src={netchapediaImg} alt="netchapedia" className="logoImage" />
            <div className="usText">취향분석</div>
            <div className="profile">
              <img src="/images/profileIcon.jpg" className="profileIconImg" />
              <div style={{ display: 'inline-block' }}>
                <h3 style={{ color: 'white' }}>{user.userName}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="roundedCornerBox">
          <div className="paddingBox">
            <h3>별점 분포</h3>
            <StarGraphContainer />
          </div>
        </div>
        <div className="roundedCornerBox">
          <div className="paddingBox">
            <div>
              <h3>영화 선호태그</h3>
              <WordCloudContainer />
            </div>
            <hr />
            <div>
              <h3>선호배우</h3>
              <ActorListContainer />
            </div>
            <hr />
            <div>
              <h3>선호감독</h3>
              <DirectorListContainer />
            </div>
            <hr />
            <div>
              <h3>영화 선호국가</h3>
              <CountryListContainer />
            </div>
            <hr />
            <div>
              <h3>영화 선호장르</h3>
              <GenreListContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserStatics;
