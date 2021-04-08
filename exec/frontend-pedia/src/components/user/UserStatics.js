import React from 'react';
import './UserStatics.scss';
import netchapediaImg from '../../images/netchapediaTransWhite.png';
import ActorListContainer from '../../containers/user/ActorListContainer';
import DirectorListContainer from '../../containers/user/DirectorListContainer';
import WordCloudContainer from '../../containers/user/WordCloudContainer';
import StarGraphContainer from '../../containers/user/StarGraphContainer';
import CountryListContainer from '../../containers/user/CountryListContainer';
import GenreListContainer from '../../containers/user/GenreListContainer';
import { withRouter } from 'react-router-dom';
import * as authApi from '../../lib/api/auth';
import { useState } from 'react';
import { useEffect } from 'react';

const UserStatics = ({ match }) => {
  const { userId } = match.params;
  const [username, setUsername] = useState();
  const getUsername = async () => {
    const response = await authApi.getUsername(userId);
    setUsername(response.data);
  };

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <>
      {username && (
        <div className="userStaticsBox">
          <div className="roundedCornerBox">
            <div className="staticsWallPaper">
              <img
                src={netchapediaImg}
                alt="netchapedia"
                className="logoImage"
              />
              <div className="usText">취향분석</div>
              <div className="profile">
                <img
                  src="/images/profileIcon.jpg"
                  className="profileIconImg"
                  alt=""
                />
                <div style={{ display: 'inline-block' }}>
                  <h3 style={{ color: 'white' }}>{username}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="roundedCornerBox">
            <div className="paddingBox">
              <h3>별점 분포</h3>
              <StarGraphContainer userId={userId} />
            </div>
          </div>
          <div className="roundedCornerBox">
            <div className="paddingBox">
              <div>
                <h3>영화 선호태그</h3>
                <WordCloudContainer userId={userId} />
              </div>
              <hr />
              <div>
                <h3>선호배우</h3>
                <ActorListContainer userId={userId} />
              </div>
              <hr />
              <div>
                <h3>선호감독</h3>
                <DirectorListContainer userId={userId} />
              </div>
              <hr />
              <div>
                <h3>영화 선호국가</h3>
                <CountryListContainer userId={userId} />
              </div>
              <hr />
              <div>
                <h3>영화 선호장르</h3>
                <GenreListContainer userId={userId} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(UserStatics);
