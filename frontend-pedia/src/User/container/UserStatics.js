import React from 'react';
import './User.scss';
import MySlider from '../../home/component/slider/MySlider';
import PeopleList from './PeopleList';

export default function UserStatics() {
  return (
    <div className="userPreference">
    <div>
        <h3 style={{ display: 'inline-block' }}>평가 영화 수</h3>
        &nbsp;&nbsp;36
    </div>
    <div className="container2">
        <MySlider data={movies} title="" />
    </div>
    <hr />
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

const movies = [
  {
    id: 1,
    image: '/images/1.jpg',
    title: '고질라 VS. 콩',
  },
  {
    id: 2,
    image: '/images/2.jpg',
    title: '극장판 귀멸의 칼날 무한열차편',
  },
  {
    id: 3,
    image: '/images/3.jpg',
    title: '자산어보',
  },
  {
    id: 4,
    image: '/images/4.jpg',
    title: '미나리',
  },
  {
    id: 5,
    image: '/images/5.jpg',
    title: '최면',
  },
  {
    id: 6,
    image: '/images/6.jpg',
    title: '파이터',
  },
  {
    id: 7,
    image: '/images/7.jpg',
    title: '디 아더 사이드',
  },
  {
    id: 8,
    image: '/images/8.jpg',
    title: '국카스텐 콘서트 실황 : 해프닝',
  },
  {
    id: 9,
    image: '/images/9.jpg',
    title: '더 박스',
  },
  {
    id: 10,
    image: '/images/10.jpg',
    title: '스파이의 아내',
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
