import React from 'react';
import './UserStatics.scss';
import netchapediaImg from '../../images/netchapediaTransWhite.png';

import PeopleList from './PeopleList';
import StarGraph from './StarGraph';
import Wordcloud from './WordCloud';

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
            <Wordcloud data={words} />
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
    name: '정이삭',
  },
  {
    id: 2,
    name: '윤여정',
  },
  {
    id: 3,
    name: '스티븐연',
  },
  {
    id: 4,
    name: '한예리',
  },
  {
    id: 5,
    name: '이민기',
  },
  {
    id: 6,
    name: '박규영',
  },
  {
    id: 7,
    name: '고민시',
  },
  {
    id: 8,
    name: '송강',
  },
  {
    id: 8,
    name: '이도현',
  },
];

const arr = [2, 3, 2, 1, 3, 8, 4, 7, 10, 11, 9];

const words = [
  {
    text: '연기력',
    value: 200,
  },
  {
    text: '연기력',
    value: 90,
  },
  {
    text: '배경이 예쁜',
    value: 80,
  },
  {
    text: '카리스마',
    value: 70,
  },
  {
    text: '연기력',
    value: 60,
  },
  {
    text: '블록버스터',
    value: 50,
  },
  {
    text: '연기력',
    value: 40,
  },
  {
    text: '액션',
    value: 30,
  },
  {
    text: '슬픈',
    value: 64,
  },
  {
    text: '웃긴',
    value: 64,
  },
  {
    text: '블록버스터',
    value: 11,
  },
  {
    text: '블록버스터',
    value: 11,
  },
  {
    text: '블록버스터',
    value: 11,
  },
  {
    text: '블록버스터',
    value: 11,
  },
  {
    text: '강렬힌',
    value: 30,
  },
  {
    text: '강렬힌',
    value: 30,
  },
  {
    text: '강렬힌',
    value: 30,
  },
  {
    text: '한국배경',
    value: 17,
  },
  {
    text: '통쾌한',
    value: 55,
  },
  {
    text: '통쾌한',
    value: 55,
  },
  {
    text: '통쾌한',
    value: 55,
  },
  {
    text: '통쾌한',
    value: 55,
  },
  {
    text: '통쾌한',
    value: 55,
  },
  {
    text: '통쾌한',
    value: 55,
  },
];
