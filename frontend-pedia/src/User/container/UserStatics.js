import React from 'react';
import './User.scss';

import PeopleList from './PeopleList';

export default function UserStatics() {
  return (
    <div className="userPreference">
    
    <div>
        <h3>별점분포</h3>
        <div className="graph">별점 그래프</div>
    </div>
    <hr />
    <div>
        <h3>영화 선호태그</h3>
        <div className="graph">태그 그래프</div>
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
        <h3>영화 선호장르</h3>
        <div className="genreWrap">
        <ul>
            <li className="genreli">드라마</li>
            <li className="genreli">액션</li>
            <li className="genreli">코미디</li>
        </ul>
        </div>
    </div>
    </div>
  );
}

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
