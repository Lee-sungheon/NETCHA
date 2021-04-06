import React from "react";
import "./SignupSubSection.scss";

export default function SignupSubSection(props) {
  return (
    <>
      <div className="signup_subsection_div">
        <div className="signup_subsection_div_div">
          <div className="signup_subsection_div_div_div">
            <div className="signup_subsection_div_div_div_div">
              TV로 즐기세요.
            </div>
            <div
              style={{
                fontSize: "25px",
                marginTop: "15px",
              }}
            >
              스마트 TV, PlayStation, Xbox, Chromecast, Apple TV, 블루레이
              플레이어 등 다양한 디바이스에서 시청하세요.
            </div>
          </div>
          <div className="signup_img_div">
            <img
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
              alt=""
              className="signup_img"
            ></img>
            <video autoPlay playsInline muted loop className="signup_img_video">
              <source
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v  "
                type="video/mp4"
              ></source>
            </video>
          </div>
        </div>
      </div>
    </>
  );
}
