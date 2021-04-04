import client from './client';
import qs from 'qs';

export const readMovie = (formData) => {
  return client.get('/movie/movie_detail', { params: { ...formData } });
};

// 영화 검색 목록
export const listSearchMovies = ({ page, keyword }) => {
  console.log('keyword:' + keyword);
  const queryString = qs.stringify({
    page,
    keyword,
  });
  return movies;
  // return client.get(`/api/searchMovies/${queryString}`)
  // return client.get(`/movie/list_totalView`)
};

// 메인페이지 넷챠 영화 순위 목록
export const listNetChaRankingMovies = () => {
  return client.get(`/movie/list_totalView?pageNum=0`);
};

// 메인페이지 최신 개봉 영화 목록
export const listNewMovies = () => {
  return client.get(`/movie/list_newContents?pageNum=0`);
};

// 사용자페이지 별점 준 영화 목록
export const listRatingMovies = (userId) => {
  // return client.get(`/movie/list_totalView`);
  console.log('listRatingMovies ' + userId);
  return movies;
};

// 해당 영화와 비슷한 영화 목록
export const listSimilarMovies = (formData) => {
  return client.get(`/movie/list_similar`, { params: { ...formData } });
};

// 사용자페이지 찜한 영화 목록
export const listZzimMovies = (userId) => {
  // return client.get(`/movie/list_totalView`);
  console.log('listZzimMovies ' + userId);
  return movies;
};

export const updateZzimMovies = (zzimData) => {
  return client.post('movie/zzim_update', zzimData);
};
export const deleteZzimMovies = (zzimData) => {
  return client.post('movie/zzim_delete', zzimData);
};

// 헤더 검색한 영화 자동완성
export const listAutoCompletesMovies = (keyword) => {
  if (!keyword || keyword.length == 0) return { data: [] };

  const titles = new Set();
  {
    movies_title.map((title) => {
      var titleArray = title.split('');
      var keywordArray = keyword.split('');
      {
        titleArray.map((c) => {
          {
            keywordArray.map((k) => {
              if (k === c) {
                titles.add(title);
              }
            });
          }
        });
      }
    });
  }
  // return client.get(`/movie/listautoCompletesMovies?${keyword}`);
  return { data: Array.from(titles) };
};

const movie = {
  data: { title: '미나리', movieNo: 1 },
};

const movies_title = [
  // {
  // data: [
  '고질라 VS. 콩',
  '극장판 귀멸의 칼날 무한열차편',
  '자산어보',
  '미나리',
  '최면',
  '파이터',
  '디 아더 사이드',
  '국카스텐 콘서트 실황 : 해프닝',
  '더 박스',
  '스파이의 아내',
  // ]
  // };
];

const movies = {
  data: [
    {
      id: 1,
      image: '/images/1.jpg',
      title: '고질라 VS. 콩',
      year: '2021',
      country: '한국',
    },
    {
      id: 2,
      image: '/images/2.jpg',
      title: '극장판 귀멸의 칼날 무한열차편',
      year: '2021',
      country: '한국',
    },
    {
      id: 3,
      image: '/images/3.jpg',
      title: '자산어보',
      year: '2021',
      country: '한국',
    },
    {
      id: 4,
      image: '/images/4.jpg',
      title: '미나리',
      year: '2021',
      country: '한국',
    },
    {
      id: 5,
      image: '/images/5.jpg',
      title: '최면',
      year: '2021',
      country: '한국',
    },
    {
      id: 6,
      image: '/images/6.jpg',
      title: '파이터',
      year: '2021',
      country: '한국',
    },
    {
      id: 7,
      image: '/images/7.jpg',
      title: '디 아더 사이드',
      year: '2021',
      country: '한국',
    },
    {
      id: 8,
      image: '/images/8.jpg',
      title: '국카스텐 콘서트 실황 : 해프닝',
      year: '2021',
      country: '한국',
    },
    {
      id: 9,
      image: '/images/9.jpg',
      title: '더 박스',
      year: '2021',
      country: '한국',
    },
    {
      id: 10,
      image: '/images/10.jpg',
      title: '스파이의 아내',
      year: '2021',
      country: '한국',
    },
  ],
};
