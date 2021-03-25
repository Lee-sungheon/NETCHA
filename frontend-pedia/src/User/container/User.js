import React from 'react';
import './User.scss';
import MySlider from "../../home/component/slider/MySlider";

export default function User() {
    return (
        <div className="userWrapper">
            <div className="userBox">
                <div className="wallPaper">
                </div>
                <div className="user">
                    <div className="profile">
                        <img src="/images/profile.png" style={{width: "70px"}}/>
                        <div style={{marginTop: "-20px"}}><h2>강유정</h2></div>
                        <div style={{marginTop: "-20px"}}>프로필이없습니다.</div>
                    </div>
                    <hr />
                    <h3>취향분석</h3>
                    <hr />
                    <div className="userPreference">
                        <div><h3>평가 수</h3>36</div>
                        <div className="container2">
                            <MySlider data={movies} title='' />
                        </div>
                        <div>
                            <h3>별점분포</h3>
                            <div className="graph"></div>
                        </div>
                        <div>
                            <h3>영화 선호태그</h3>
                            <div className="graph"></div>
                        </div>
                        <div>
                            <h3>선호배우</h3>
                            <MySlider data={movies} title='' />
                        </div>
                        <div>
                            <h3>선호감독</h3>
                            <MySlider data={movies} title='' />
                        </div>
                        <div>
                            <h3>영화 선호장르</h3>
                            <div className="">
                                <ul>
                                    <li>드라마</li>
                                    <li>액션</li>
                                    <li>코미디</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr />
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
  