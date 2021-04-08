import client from './client';

export const readMovie = (formData) => {
  return client.get('/movie/movie_detail', { params: { ...formData } });
};

// 영화 검색 목록
export const listSearchMovies = ({ page, keyword, userId }) => {
  return client.get(`/movie/search_total?pageNum=${page}&search=${keyword}&userId=${userId}`);
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


