import React from "react";
import "./UserStatics.scss";
import netchapediaImg from "../images/netchapediaTransWhite.png";
import ActorAndDirectorListContainer from "../containers/user/ActorAndDirectorListContainer";
import WordCloudContainer from "../containers/user/WordCloudContainer";
import StarGraphContainer from "../containers/user/StarGraphContainer";
import CountryListContainer from "../containers/user/CountryListContainer";
import GenreListContainer from "../containers/user/GenreListContainer";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function UserStatics() {
  return (
    <>
      <Header />
      <div className="userStaticsBox">
        <div className="roundedCornerBox">
          <div className="staticsWallPaper">
            <img src={netchapediaImg} alt="netchapedia" className="logoImage" />
            <div className="usText">취향분석</div>
            <div className="profile">
              <img src="/images/profileIcon.jpg" className="profileIconImg" />
              <div style={{ display: "inline-block" }}>
                <h3 style={{ color: "white" }}>강유정</h3>
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
              <ActorAndDirectorListContainer />
            </div>
            <hr />
            <div>
              <h3>선호감독</h3>
              <ActorAndDirectorListContainer />
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
      <Footer />
    </>
  );
}
