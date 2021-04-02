import React from "react";
import "./User.scss";
import netchapediaImg from "../../images/netchapediaTransWhite.png";
import SmallSliderContainer from "../../containers/user/SmallSliderContainer";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  return (
    <>
      {/* {!loading && data && ( */}
      <div className="userWrapper">
        <div className="userBox">
          <div className="wallPaper">
            <img src={netchapediaImg} alt="netchapedia" className="logoImage" />
          </div>
          <div className="user">
            <div>
              <img src="/images/profileIcon.jpg" className="profileIconImg" />
              <div style={{ marginTop: "-20px" }}>
                <h2>{user.userName}</h2>
              </div>
            </div>
            <hr />
            <Link to={`/user/statics/${user.userId}`} style={{"color":"black"}}>
              <div>
                <img
                  src="/images/graph.png"
                  width="40px"
                  alt="취향분석"
                  style={{ marginBottom: "-9px" }}
                />
                <h3 style={{ display: "inline-block" }}>&nbsp;취향분석</h3>
              </div>
            </Link>
            <hr />
            <div>
              <h2>영화</h2>
            </div>
            <hr />
            <div>
              <h3 style={{ display: "inline-block" }}>평가</h3>&nbsp;&nbsp;36
            </div>
            <div className="smallSliderWrap">
              <SmallSliderContainer />
            </div>
            <hr />
            <div>
              <h3>보고싶어요</h3>
            </div>
            <div className="smallSliderWrap">
              <SmallSliderContainer />
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default User;
