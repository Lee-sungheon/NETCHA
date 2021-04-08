import {
  createReducer,
  createSetValueAction,
  setValueReducer,
} from "../../common/createReducer";

export const types = {
  // 추천 영화
  REQUEST_MOVIELIST: "home/REQUEST_MOVIELIST",
  SET_MOVIELIST: "home/SET_MOVIELIST",
  SET_LOADING: "home/SET_LOADING",
  // 최신 영화
  REQUEST_NEWMOVIELIST: "home/REQUEST_NEWMOVIELIST",
  SET_NEWMOVIELIST: "home/SET_NEWMOVIELIST",
  SET_NEWLOADING: "home/SET_NEWLOADING",
  // 인기 영화
  REQUEST_POPULARMOVIELIST: "home/REQUEST_POPULARMOVIELIST",
  SET_POPULARMOVIELIST: "home/SET_POPULARMOVIELIST",
  SET_POPULARLOADING: "home/SET_POPULARLOADING",
  // 랭크 영화
  REQUEST_RANKMOVIELIST: "home/REQUEST_RANKMOVIELIST",
  SET_RANKMOVIELIST: "home/SET_RANKMOVIELIST",
  SET_RANKLOADING: "home/SET_RANKLOADING",
  // MBTI 영화
  REQUEST_MBTIMOVIELIST: "home/REQUEST_MBTIMOVIELIST",
  SET_MBTIMOVIELIST: "home/SET_MBTIMOVIELIST",
  SET_MBTILOADING: "home/SET_MBTILOADING",
  // 장르 영화
  REQUEST_GANREMOVIELIST: "home/REQUEST_GANREMOVIELIST",
  SET_GANREMOVIELIST: "home/SET_GANREMOVIELIST",
  SET_GANRELOADING: "home/SET_GANRELOADING",
  // 장르 영화2
  REQUEST_GANREMOVIELIST2: "home/REQUEST_GANREMOVIELIST2",
  SET_GANREMOVIELIST2: "home/SET_GANREMOVIELIST2",
  SET_GANRELOADING2: "home/SET_GANRELOADING2",
  // 장르 영화3
  REQUEST_GANREMOVIELIST3: "home/REQUEST_GANREMOVIELIST3",
  SET_GANREMOVIELIST3: "home/SET_GANREMOVIELIST3",
  SET_GANRELOADING3: "home/SET_GANRELOADING3",
  // 국가 영화
  REQUEST_COUNTRYMOVIELIST: "home/REQUEST_COUNTRYMOVIELIST",
  SET_COUNTRYMOVIELIST: "home/SET_COUNTRYMOVIELIST",
  SET_COUNTRYLOADING: "home/SET_COUNTRYLOADING",
  // 국가 영화2
  REQUEST_COUNTRYMOVIELIST2: "home/REQUEST_COUNTRYMOVIELIST2",
  SET_COUNTRYMOVIELIST2: "home/SET_COUNTRYMOVIELIST2",
  SET_COUNTRYLOADING2: "home/SET_COUNTRYLOADING2",
  // 국가 영화3
  REQUEST_COUNTRYMOVIELIST3: "home/REQUEST_COUNTRYMOVIELIST3",
  SET_COUNTRYMOVIELIST3: "home/SET_COUNTRYMOVIELIST3",
  SET_COUNTRYLOADING3: "home/SET_COUNTRYLOADING3",
  // 키워드 영화
  REQUEST_KEYWORDMOVIELIST: "home/REQUEST_KEYWORDMOVIELIST",
  SET_KEYWORDMOVIELIST: "home/SET_KEYWORDMOVIELIST",
  SET_KEYWORDLOADING: "home/SET_KEYWORDLOADING",
  // 키워드 영화2
  REQUEST_KEYWORDMOVIELIST2: "home/REQUEST_KEYWORDMOVIELIST2",
  SET_KEYWORDMOVIELIST2: "home/SET_KEYWORDMOVIELIST2",
  SET_KEYWORDLOADING2: "home/SET_KEYWORDLOADING2",
  // 키워드 영화3
  REQUEST_KEYWORDMOVIELIST3: "home/REQUEST_KEYWORDMOVIELIST3",
  SET_KEYWORDMOVIELIST3: "home/SET_KEYWORDMOVIELIST3",
  SET_KEYWORDLOADING3: "home/SET_KEYWORDLOADING3",
  // 비슷한 영화
  REQUEST_SIMILARMOVIELIST: "home/REQUEST_SIMILARMOVIELIST",
  SET_SIMILARMOVIELIST: "home/SET_SIMILARMOVIELIST",
  SET_SIMILARLOADING: "home/SET_SIMILARLOADING",
  // 값 변경
  SET_VALUE: "home/SET_VALUE",
};

export const homeActions = {
  setMovieList: (data) => ({ type: types.SET_MOVIELIST, data }),
  setMbtiMovieList: (data) => ({ type: types.SET_MBTIMOVIELIST, data }),
}
export const actions = {
  // 추천 영화
  requestMovieList: (pageNum, userNo) => ({
    type: types.REQUEST_MOVIELIST,
    pageNum,
    userNo,
  }),
  setMovieList: (data) => ({ type: types.SET_MOVIELIST, data }),
  setLoading: (isLoading) => ({
    type: types.SET_LOADING,
    isLoading,
  }),
  // 최신 영화
  requestNewMovieList: (pageNum, userNo) => ({
    type: types.REQUEST_NEWMOVIELIST,
    pageNum,
    userNo,
  }),
  setNewMovieList: (data) => ({ type: types.SET_NEWMOVIELIST, data }),
  setNewLoading: (isNewLoading) => ({
    type: types.SET_NEWLOADING,
    isNewLoading,
  }),
  // 인기 영화
  requestPopularMovieList: (pageNum, userNo) => ({
    type: types.REQUEST_POPULARMOVIELIST,
    pageNum,
    userNo,
  }),
  setPopularMovieList: (data) => ({ type: types.SET_POPULARMOVIELIST, data }),
  setPopularLoading: (isPopularLoading) => ({
    type: types.SET_POPULARLOADING,
    isPopularLoading,
  }),
  // MBTI 영화
  requestMbtiMovieList: (pageNum, userNo) => ({
    type: types.REQUEST_MBTIMOVIELIST,
    pageNum,
    userNo,
  }),
  setMbtiMovieList: (data) => ({ type: types.SET_MBTIMOVIELIST, data }),
  setMbtiLoading: (isMbtiLoading) => ({
    type: types.SET_MBTILOADING,
    isMbtiLoading,
  }),
  // 랭크 영화
  requestRankMovieList: (pageNum, userNo) => ({
    type: types.REQUEST_RANKMOVIELIST,
    pageNum,
    userNo,
  }),
  setRankMovieList: (data) => ({ type: types.SET_RANKMOVIELIST, data }),
  setRankLoading: (isRankLoading) => ({
    type: types.SET_RANKLOADING,
    isRankLoading,
  }),
  // 장르 영화
  requestGanreMovieList: (ganre, pageNum, userNo) => ({
    type: types.REQUEST_GANREMOVIELIST,
    ganre,
    pageNum,
    userNo,
  }),
  setGanreMovieList: (data) => ({ type: types.SET_GANREMOVIELIST, data }),
  setGanreLoading: (isGanreLoading) => ({
    type: types.SET_GANRELOADING,
    isGanreLoading,
  }),
  // 장르 영화2
  requestGanreMovieList2: (ganre, pageNum, userNo) => ({
    type: types.REQUEST_GANREMOVIELIST2,
    ganre,
    pageNum,
    userNo,
  }),
  setGanreMovieList2: (data) => ({ type: types.SET_GANREMOVIELIST2, data }),
  setGanreLoading2: (isGanreLoading2) => ({
    type: types.SET_GANRELOADING2,
    isGanreLoading2,
  }),
  // 장르 영화3
  requestGanreMovieList3: (ganre, pageNum, userNo) => ({
    type: types.REQUEST_GANREMOVIELIST3,
    ganre,
    pageNum,
    userNo,
  }),
  setGanreMovieList3: (data) => ({ type: types.SET_GANREMOVIELIST3, data }),
  setGanreLoading3: (isGanreLoading3) => ({
    type: types.SET_GANRELOADING3,
    isGanreLoading3,
  }),
  // 국가 영화
  requestCountryMovieList: (country, pageNum, userNo) => ({
    type: types.REQUEST_COUNTRYMOVIELIST,
    country,
    pageNum,
    userNo,
  }),
  setCountryMovieList: (data) => ({ type: types.SET_COUNTRYMOVIELIST, data }),
  setCountryLoading: (isCountryLoading) => ({
    type: types.SET_COUNTRYLOADING,
    isCountryLoading,
  }),
  // 국가 영화2
  requestCountryMovieList2: (country, pageNum, userNo) => ({
    type: types.REQUEST_COUNTRYMOVIELIST2,
    country,
    pageNum,
    userNo,
  }),
  setCountryMovieList2: (data) => ({ type: types.SET_COUNTRYMOVIELIST2, data }),
  setCountryLoading2: (isCountryLoading2) => ({
    type: types.SET_COUNTRYLOADING2,
    isCountryLoading2,
  }),
  // 국가 영화3
  requestCountryMovieList3: (country, pageNum, userNo) => ({
    type: types.REQUEST_COUNTRYMOVIELIST3,
    country,
    pageNum,
    userNo,
  }),
  setCountryMovieList3: (data) => ({ type: types.SET_COUNTRYMOVIELIST3, data }),
  setCountryLoading3: (isCountryLoading3) => ({
    type: types.SET_COUNTRYLOADING3,
    isCountryLoading3,
  }),
  // 키워드 영화
  requestKeywordMovieList: (keyword, pageNum, userNo) => ({
    type: types.REQUEST_KEYWORDMOVIELIST,
    keyword,
    pageNum,
    userNo,
  }),
  setKeywordMovieList: (data) => ({ type: types.SET_KEYWORDMOVIELIST, data }),
  setKeywordLoading: (isKeywordLoading) => ({
    type: types.SET_KEYWORDLOADING,
    isKeywordLoading,
  }),
  // 키워드 영화2
  requestKeywordMovieList2: (keyword, pageNum, userNo) => ({
    type: types.REQUEST_KEYWORDMOVIELIST2,
    keyword,
    pageNum,
    userNo,
  }),
  setKeywordMovieList2: (data) => ({ type: types.SET_KEYWORDMOVIELIST2, data }),
  setKeywordLoading2: (isKeywordLoading2) => ({
    type: types.SET_KEYWORDLOADING2,
    isKeywordLoading2,
  }),
  // 키워드 영화3
  requestKeywordMovieList3: (keyword, pageNum, userNo) => ({
    type: types.REQUEST_KEYWORDMOVIELIST3,
    keyword,
    pageNum,
    userNo,
  }),
  setKeywordMovieList3: (data) => ({ type: types.SET_KEYWORDMOVIELIST3, data }),
  setKeywordLoading3: (isKeywordLoading3) => ({
    type: types.SET_KEYWORDLOADING3,
    isKeywordLoading3,
  }),
  // 비슷한 영화
  requestSimilarMovieList: (movieNo, userNo) => ({
    type: types.REQUEST_SIMILARMOVIELIST,
    movieNo,
    userNo,
  }),
  setSimilarMovieList: (data) => ({ type: types.SET_SIMILARMOVIELIST, data }),
  setSimilarLoading: (isSimilarLoading) => ({
    type: types.SET_SIMILARLOADING,
    isSimilarLoading,
  }),
  // 값 변경
  setValue: createSetValueAction(types.SET_VALUE),
};

const INITIAL_STATE = {
  movieLists: [],
  isLoading: false,
  error: "",
  newMovieLists: [],
  isNewLoading: false,
  popularMovieLists: [],
  isPopularLoading: false,
  rankMovieLists: [],
  isRankLoading: false,
  ganreMovieLists: [],
  isGanreLoading: false,
  ganreMovieLists2: [],
  isGanreLoading2: false,
  ganreMovieLists3: [],
  isGanreLoading3: false,
  countryMovieLists: [],
  isCountryLoading: false,
  countryMovieLists2: [],
  isCountryLoading2: false,
  countryMovieLists3: [],
  isCountryLoading3: false,
  keywordMovieLists: [],
  isKeywordLoading: false,
  keywordMovieLists2: [],
  isKeywordLoading2: false,
  keywordMovieLists3: [],
  isKeywordLoading3: false,
  similarMovieLists: [],
  isSimilarLoading: false,
  mbtiMovieLists: [],
  isMbtiLoading: false,
  bufferTime: 0,
  bannerBufferTime: 0,
  bannerToggle: true,
};

const reducer = createReducer(INITIAL_STATE, {
  // 추천 영화
  [types.SET_MOVIELIST]: (state, action) => {
    state.movieLists = action.data;
  },
  [types.SET_LOADING]: (state, action) => (state.isLoading = action.isLoading),
  // 최신 영화
  [types.SET_NEWMOVIELIST]: (state, action) => {
    state.newMovieLists = action.data;
  },
  [types.SET_NEWLOADING]: (state, action) =>
    (state.isNewLoading = action.isNewLoading),
  // 인기 영화
  [types.SET_POPULARMOVIELIST]: (state, action) => {
    state.popularMovieLists = action.data;
  },
  [types.SET_POPULARLOADING]: (state, action) =>
    (state.isPopularLoading = action.isPopularLoading),
  // MBTI 영화
  [types.SET_MBTIMOVIELIST]: (state, action) => {
    state.mbtiMovieLists = action.data;
  },
  [types.SET_MBTILOADING]: (state, action) =>
    (state.isMbtiLoading = action.isMbtiLoading),
  // 랭크 영화
  [types.SET_RANKMOVIELIST]: (state, action) => {
    state.rankMovieLists = action.data;
  },
  [types.SET_RANKLOADING]: (state, action) =>
    (state.isRankLoading = action.isRankLoading),
  // 장르 영화
  [types.SET_GANREMOVIELIST]: (state, action) => {
    state.ganreMovieLists = action.data;
  },
  [types.SET_GANRELOADING]: (state, action) =>
    (state.isGanreLoading = action.isGanreLoading),
  // 장르 영화2
  [types.SET_GANREMOVIELIST2]: (state, action) => {
    state.ganreMovieLists2 = action.data;
  },
  [types.SET_GANRELOADING2]: (state, action) =>
    (state.isGanreLoading2 = action.isGanreLoading2),
  // 장르 영화3
  [types.SET_GANREMOVIELIST3]: (state, action) => {
    state.ganreMovieLists3 = action.data;
  },
  [types.SET_GANRELOADING3]: (state, action) =>
    (state.isGanreLoading3 = action.isGanreLoading3),
  // 국가 영화
  [types.SET_COUNTRYMOVIELIST]: (state, action) => {
    state.countryMovieLists = action.data;
  },
  [types.SET_COUNTRYLOADING]: (state, action) =>
    (state.isCountryLoading = action.isCountryLoading),
  // 국가 영화2
  [types.SET_COUNTRYMOVIELIST2]: (state, action) => {
    state.countryMovieLists2 = action.data;
  },
  [types.SET_COUNTRYLOADING2]: (state, action) =>
    (state.isCountryLoading2 = action.isCountryLoading2),
  // 국가 영화3
  [types.SET_COUNTRYMOVIELIST3]: (state, action) => {
    state.countryMovieLists3 = action.data;
  },
  [types.SET_COUNTRYLOADING3]: (state, action) =>
    (state.isCountryLoading3 = action.isCountryLoading3),
  // 키워드 영화
  [types.SET_KEYWORDMOVIELIST]: (state, action) => {
    state.keywordMovieLists = action.data;
  },
  [types.SET_KEYWORDLOADING]: (state, action) =>
    (state.isKeywordLoading = action.isKeywordLoading),
  // 키워드 영화2
  [types.SET_KEYWORDMOVIELIST2]: (state, action) => {
    state.keywordMovieLists2 = action.data;
  },
  [types.SET_KEYWORDLOADING2]: (state, action) =>
    (state.isKeywordLoading2 = action.isKeywordLoading2),
  // 키워드 영화3
  [types.SET_KEYWORDMOVIELIST3]: (state, action) => {
    state.keywordMovieLists3 = action.data;
  },
  [types.SET_KEYWORDLOADING3]: (state, action) =>
    (state.isKeywordLoading3 = action.isKeywordLoading3),
  // 비슷한 영화
  [types.SET_SIMILARMOVIELIST]: (state, action) => {
    state.similarMovieLists = action.data;
  },
  [types.SET_SIMILARLOADING]: (state, action) =>
    (state.isSimilarLoading = action.isSimilarLoading),
  // 값 변경
  [types.SET_VALUE]: setValueReducer,
});
export default reducer;
