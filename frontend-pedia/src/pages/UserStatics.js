import React from 'react';
import './UserStatics.scss';
import netchapediaImg from "../images/netchapediaTransWhite.png";

import PeopleList from '../components/user/ActorAndDirectorList';
import StarGraph from '../components/user/StarGraph';
import WordCloud from '../container/user/WordCloud';

export default function UserStatics() {
  return (
    <div className="userStaticsBox">
      <div className="roundedCornerBox">
        <div className="staticsWallPaper">
          <img src={netchapediaImg} alt="netchapedia" className="logoImage" />
          <div className="usText">취향분석</div>
          <div className="profile">
            <img src="/images/profileIcon.jpg" className="profileIconImg" />
            <div style={{ display: 'inline-block' }}>
              <h3 style={{ color: 'white' }}>강유정</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="roundedCornerBox">
        <div className="paddingBox">
          <h3>별점 분포</h3>
          <StarGraph data={arr} />
        </div>
      </div>
      <div className="roundedCornerBox">
        <div className="paddingBox">
          <div>
            <h3>영화 선호태그</h3>
            <WordCloud data={words} />
          </div>
          <hr />
          <div>
            <h3>선호배우</h3>
            <PeopleList data={actors} />
          </div>
          <hr />
          <div>
            <h3>선호감독</h3>
            <PeopleList data={actors} />
          </div>
          <hr />
          <div>
            <h3>영화 선호국가</h3>
            <div className="gcWrap">
              <ul className="gcUl">
                {country.map((data) => {
                  return (
                    <li className="gcli">
                      <div className="gcBoldText">{data.name}</div>
                      <div className="gcText">{data.count}편</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <hr />
          <div>
            <h3>영화 선호장르</h3>
            <div className="gcWrap">
              <ul className="gcUl">
                {genre.map((data) => {
                  return (
                    <li className="gcli">
                      <div className="gcBoldText">{data.name}</div>
                      <div className="gcText">{data.count}편</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const country = [
  {
    name: '한국',
    count: 27
  },
  {
    name: '미국',
    count: 9
  },
  {
    name: '영국',
    count: 13
  },
];

const genre = [
  {
    name: '드라마',
    count: 25
  },
  {
    name: '액션',
    count: 9
  },
  {
    name: '코미디',
    count: 13
  },
];

const actors = [
  {
    id: 1,
    name: '임시완',
  },
  {
    id: 2,
    name: '박규영',
  },
  {
    id: 3,
    name: '이도현',
  },
  {
    id: 4,
    name: '한예리',
  },
  {
    id: 5,
    name: '신세경',
  },
  {
    id: 6,
    name: '수지',
  },
  {
    id: 7,
    name: '송강',
  },
  {
    id: 8,
    name: '천우희',
  },
  {
    id: 8,
    name: '레이첼 맥아담스',
  },
];

const arr = [2, 3, 2, 1, 3, 8, 4, 7, 10, 11, 9];


