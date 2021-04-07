import client from './client';
// import qs from 'qs';

export const readMovie = (formData) => {
  return client.get('/movie/movie_detail', { params: { ...formData } });
};

// 영화 검색 목록
export const listSearchMovies = ({ page, keyword, userId }) => {
  return client.get(`/movie/search_total?pageNum=${page}&search=${keyword}&userId=${userId}`);
  // return client.get(`/movie/list_newContents?pageNum=${page}&userId=${userId}`);
};

// 메인페이지 넷챠 영화 순위 목록
export const listNetChaRankingMovies = (userId) => {
  return client.get(`/movie/list_totalView?pageNum=0&userId=${userId}`);
};

// 메인페이지 최신 개봉 영화 목록
export const listNewMovies = (userId) => {
  return client.get(`/movie/list_newContents?pageNum=0&userId=${userId}`);
};

// 사용자페이지 별점 준 영화 목록
export const listRatingMovies = ({page, userId}) => {
  return client.get(`/movie/rank_list?pageNum=${page}&userId=${userId}`);
};

// 사용자페이지 별점 준 영화 개수
export const countRatingMovies = (userId) => {
  return client.get(`/movie/rank_count?userId=${userId}`);
};

// 해당 영화와 비슷한 영화 목록
export const listSimilarMovies = (formData) => {
  return client.get(`/movie/list_similar`, { params: { ...formData } });
};

// 사용자페이지 찜한 영화 목록
export const listZzimMovies = ({page, userId}) => {
  return client.get(`/movie/zzim_list?pageNum=${page}&userId=${userId}`);
};

// 사용자페이지 별점 준 영화 개수
export const countZzimMovies = (userId) => {
  return client.get(`/movie/zzim_count?userId=${userId}`);
};

export const updateZzimMovies = (formData) => {
  return client.post('movie/zzim_update', formData);
};

export const deleteZzimMovies = (formData) => {
  return client.delete('movie/zzim_delete', { params: formData });
};

// 헤더 검색한 영화 자동완성
export const listAutoCompletesMovies = (keyword) => {
  if (!keyword || keyword.length === 0) return { data: [] };

  return client.get(`movie/search_title?search=${keyword}`);
  // const titles = new Set();

  // movies_title.forEach((title) => {
  //   var titleArray = title.split('');
  //   var keywordArray = keyword.split('');

  //   titleArray.forEach((c) => {
  //     keywordArray.forEach((k) => {
  //       if (k === c) {
  //         titles.add(title);
  //       }
  //     });
  //   });
  // });

  // return { data: Array.from(titles) };
};

// 영화 유튜브 정보 받기
export const listMovieVideos = (movieNo) => {
  return client.get(`/movie/youtube_get?movieNo=${movieNo}`);
}

// 영화 유튜브 정보 보내기
export const updateMovieVideos = (data) => {
  console.dir(data);
  return client.post('/movie/youtube_post', data);
}


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

