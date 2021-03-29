import React from "react";
import "./User.scss";
import { useHistory } from "react-router-dom";
import SmallSlider from "../components/slider/SmallSlider";
import netchapediaImg from "../images/netchapediaTransWhite.png";

export default function User() {
  const userId = 1;
  function goToStatics(e) {
    e.preventDefault();
    history.push(`/user/statics/${userId}`);
  }

  const history = useHistory();
  return (
    <div className="userWrapper">
      <div className="userBox">
        <div className="wallPaper">
        <img src={netchapediaImg} alt="netchapedia" className="logoImage" />
        </div>
        <div className="user">
          <div>
            <img src="/images/profileIcon.jpg" className="profileIconImg" />
            <div style={{ marginTop: "-20px" }}>
              <h2>강유정</h2>
            </div>
          </div>
          <hr />
          <a href="#" onClick={goToStatics} style={{ color: "#000" }}>
            <div>
              <img
                src="/images/graph.png"
                width="40px"
                alt="취향분석"
                style={{ marginBottom: "-9px" }}
              />
              <h3 style={{ display: "inline-block" }}>&nbsp;취향분석</h3>
            </div>
          </a>
          <hr />
          <div>
            <h2>영화</h2>
          </div>
          <hr />
          <div>
            <h3 style={{ display: "inline-block" }}>평가</h3>&nbsp;&nbsp;36
          </div>
          <div className="smallSliderWrap">
            <SmallSlider data={movies} title="" />
          </div>
          <hr />
          <div>
            <h3>보고싶어요</h3>
          </div>
          <div className="smallSliderWrap">
            <SmallSlider data={movies} title="" />
          </div>
        </div>
      </div>
    </div>
  );
}

const movies = [
  {
    id: 1,
    image: "/images/1.jpg",
    title: "고질라 VS. 콩",
  },
  {
    id: 2,
    image: "/images/2.jpg",
    title: "극장판 귀멸의 칼날 무한열차편",
  },
  {
    id: 3,
    image: "/images/3.jpg",
    title: "자산어보",
  },
  {
    id: 4,
    image: "/images/4.jpg",
    title: "미나리",
  },
  {
    id: 5,
    image: "/images/5.jpg",
    title: "최면",
  },
  {
    id: 6,
    image: "/images/6.jpg",
    title: "파이터",
  },
  {
    id: 7,
    image: "/images/7.jpg",
    title: "디 아더 사이드",
  },
  {
    id: 8,
    image: "/images/8.jpg",
    title: "국카스텐 콘서트 실황 : 해프닝",
  },
  {
    id: 9,
    image: "/images/9.jpg",
    title: "더 박스",
  },
  {
    id: 10,
    image: "/images/10.jpg",
    title: "스파이의 아내",
  },
];
