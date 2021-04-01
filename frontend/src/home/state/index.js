import { createReducer, createSetValueAction, setValueReducer } from '../../common/createReducer';

export const types = {
  // 영화 인피니트 스크롤
  REQUEST_ADD_MOVIELIST: 'home/REQUEST_ADD_MOVIELIST',
  REQUEST_ADD_COUNTRYMOVIELIST: 'home/REQUEST_ADD_COUNTRYMOVIELIST',
  REQUEST_ADD_GANREMOVIELIST: 'home/REQUEST_ADD_GANREMOVIELIST',
  ADD_MOVIELIST: 'home/ADD_MOVIELIST',
  SET_INFINITE: 'home/SET_INFINITE',
  // 추천 영화
  REQUEST_MOVIELIST: 'home/REQUEST_MOVIELIST',
  SET_MOVIELIST: 'home/SET_MOVIELIST',
  SET_LOADING: 'home/SET_LOADING',
  // 최신 영화
  REQUEST_NEWMOVIELIST: 'home/REQUEST_NEWMOVIELIST',
  SET_NEWMOVIELIST: 'home/SET_NEWMOVIELIST',
  SET_NEWLOADING: 'home/SET_NEWLOADING',
  // 인기 영화
  REQUEST_POPULARMOVIELIST: 'home/REQUEST_POPULARMOVIELIST',
  SET_POPULARMOVIELIST: 'home/SET_POPULARMOVIELIST',
  SET_POPULARLOADING: 'home/SET_POPULARLOADING',
  // 랭크 영화
  REQUEST_RANKMOVIELIST: 'home/REQUEST_RANKMOVIELIST',
  SET_RANKMOVIELIST: 'home/SET_RANKMOVIELIST',
  SET_RANKLOADING: 'home/SET_RANKLOADING',
  // 장르 영화
  REQUEST_GANREMOVIELIST: 'home/REQUEST_GANREMOVIELIST',
  SET_GANREMOVIELIST: 'home/SET_GANREMOVIELIST',
  SET_GANRELOADING: 'home/SET_GANRELOADING',
  // 장르 영화2
  REQUEST_GANREMOVIELIST2: 'home/REQUEST_GANREMOVIELIST2',
  SET_GANREMOVIELIST2: 'home/SET_GANREMOVIELIST2',
  SET_GANRELOADING2: 'home/SET_GANRELOADING2',
  // 장르 영화3
  REQUEST_GANREMOVIELIST3: 'home/REQUEST_GANREMOVIELIST3',
  SET_GANREMOVIELIST3: 'home/SET_GANREMOVIELIST3',
  SET_GANRELOADING3: 'home/SET_GANRELOADING3',
  // 국가 영화
  REQUEST_COUNTRYMOVIELIST: 'home/REQUEST_COUNTRYMOVIELIST',
  SET_COUNTRYMOVIELIST: 'home/SET_COUNTRYMOVIELIST',
  SET_COUNTRYLOADING: 'home/SET_COUNTRYLOADING',
  // 국가 영화2
  REQUEST_COUNTRYMOVIELIST2: 'home/REQUEST_COUNTRYMOVIELIST2',
  SET_COUNTRYMOVIELIST2: 'home/SET_COUNTRYMOVIELIST2',
  SET_COUNTRYLOADING2: 'home/SET_COUNTRYLOADING2',
  // 국가 영화3
  REQUEST_COUNTRYMOVIELIST3: 'home/REQUEST_COUNTRYMOVIELIST3',
  SET_COUNTRYMOVIELIST3: 'home/SET_COUNTRYMOVIELIST3',
  SET_COUNTRYLOADING3: 'home/SET_COUNTRYLOADING3',
  // 영화 필터링
  REQUEST_FILTERCOUNTRYMOVIELIST: 'home/REQUEST_FILTERCOUNTRYMOVIELIST',
  REQUEST_FILTERGANREMOVIELIST: 'home/REQUEST_FILTERGANREMOVIELIST',
  SET_ISFILTER: 'home/SET_ISFILTER',
  // 값 변경
  SET_VALUE: 'home/SET_VALUE',
};

export const actions = {
  // 영화 인피니트 스크롤
  requestAddMovieList: (pageNum, userNo) => ({ type: types.REQUEST_ADD_MOVIELIST, pageNum, userNo }),
  requestAddCountryMovieList: (country, pageNum) => ({ type: types.REQUEST_ADD_COUNTRYMOVIELIST, country, pageNum }),
  requestAddGanreMovieList: (ganre, pageNum) => ({ type: types.REQUEST_ADD_GANREMOVIELIST, ganre, pageNum }),
  addMovieList: data => ({ type: types.ADD_MOVIELIST, data }),
  setInfinite: isInfinite => ({
    type: types.SET_INFINITE,
    isInfinite,
  }),
  // 추천 영화
  requestMovieList: (pageNum, userNo) => ({ type: types.REQUEST_MOVIELIST, pageNum, userNo }),
  setMovieList: data => ({ type: types.SET_MOVIELIST, data }),
  setLoading: isLoading => ({
    type: types.SET_LOADING,
    isLoading,
  }),
  // 최신 영화
  requestNewMovieList: (pageNum) => ({ type: types.REQUEST_NEWMOVIELIST, pageNum }),
  setNewMovieList: data => ({ type: types.SET_NEWMOVIELIST, data }),
  setNewLoading: isNewLoading => ({
    type: types.SET_NEWLOADING,
    isNewLoading,
  }),
  // 인기 영화
  requestPopularMovieList: (pageNum) => ({ type: types.REQUEST_POPULARMOVIELIST, pageNum }),
  setPopularMovieList: data => ({ type: types.SET_POPULARMOVIELIST, data }),
  setPopularLoading: isPopularLoading => ({
    type: types.SET_POPULARLOADING,
    isPopularLoading,
  }),
  // 랭크 영화
  requestRankMovieList: (pageNum) => ({ type: types.REQUEST_RANKMOVIELIST, pageNum }),
  setRankMovieList: data => ({ type: types.SET_RANKMOVIELIST, data }),
  setRankLoading: isRankLoading => ({
    type: types.SET_RANKLOADING,
    isRankLoading,
  }),
  // 장르 영화
  requestGanreMovieList: (ganre, pageNum) => ({ type: types.REQUEST_GANREMOVIELIST, ganre, pageNum }),
  setGanreMovieList: data => ({ type: types.SET_GANREMOVIELIST, data }),
  setGanreLoading: isGanreLoading => ({
    type: types.SET_GANRELOADING,
    isGanreLoading,
  }),
  // 장르 영화2
  requestGanreMovieList2: (ganre, pageNum) => ({ type: types.REQUEST_GANREMOVIELIST2, ganre, pageNum }),
  setGanreMovieList2: data => ({ type: types.SET_GANREMOVIELIST2, data }),
  setGanreLoading2: isGanreLoading2 => ({
    type: types.SET_GANRELOADING2,
    isGanreLoading2,
  }),
  // 장르 영화3
  requestGanreMovieList3: (ganre, pageNum) => ({ type: types.REQUEST_GANREMOVIELIST3, ganre, pageNum }),
  setGanreMovieList3: data => ({ type: types.SET_GANREMOVIELIST3, data }),
  setGanreLoading3: isGanreLoading3 => ({
    type: types.SET_GANRELOADING3,
    isGanreLoading3,
  }),
  // 국가 영화
  requestCountryMovieList: (country, pageNum) => ({ type: types.REQUEST_COUNTRYMOVIELIST, country, pageNum }),
  setCountryMovieList: data => ({ type: types.SET_COUNTRYMOVIELIST, data }),
  setCountryLoading: isCountryLoading => ({
    type: types.SET_COUNTRYLOADING,
    isCountryLoading,
  }),
  // 국가 영화2
  requestCountryMovieList2: (country, pageNum) => ({ type: types.REQUEST_COUNTRYMOVIELIST2, country, pageNum }),
  setCountryMovieList2: data => ({ type: types.SET_COUNTRYMOVIELIST2, data }),
  setCountryLoading2: isCountryLoading2 => ({
    type: types.SET_COUNTRYLOADING2,
    isCountryLoading2,
  }),
  // 국가 영화3
  requestCountryMovieList3: (country, pageNum) => ({ type: types.REQUEST_COUNTRYMOVIELIST3, country, pageNum }),
  setCountryMovieList3: data => ({ type: types.SET_COUNTRYMOVIELIST3, data }),
  setCountryLoading3: isCountryLoading3 => ({
    type: types.SET_COUNTRYLOADING3,
    isCountryLoading3,
  }),
  //영화 필터링
  requestFilterCountryMovieList: (country, pageNum) => ({ type: types.REQUEST_FILTERCOUNTRYMOVIELIST, country, pageNum }),
  requestFilterGanreMovieList: (ganre, pageNum) => ({ type: types.REQUEST_FILTERGANREMOVIELIST, ganre, pageNum }),
  setIsFilter: isFilter => ({
    type: types.SET_ISFILTER,
    isFilter,
  }),
  // 값 변경
  setValue: createSetValueAction(types.SET_VALUE),
}

const INITIAL_STATE = { 
  movieLists: [], 
  isLoading: false,
  error: '',
  isInfinite: false,
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
  isFilter: false,
};

const reducer = createReducer(INITIAL_STATE, {
  // 영화 인피니트 스크롤
  [types.ADD_MOVIELIST]: (state, action) => {
    state.movieLists = state.movieLists.concat(action.data)
  },
  [types.SET_INFINITE]: (state, action) => (state.isInfinite = action.isInfinite),
  // 추천 영화
  [types.SET_MOVIELIST]: (state, action) => {
    state.movieLists = action.data
  },
  [types.SET_LOADING]: (state, action) => (state.isLoading = action.isLoading),
  // 최신 영화
  [types.SET_NEWMOVIELIST]: (state, action) => {
    state.newMovieLists = action.data
  },
  [types.SET_NEWLOADING]: (state, action) => (state.isNewLoading = action.isNewLoading),
  // 인기 영화
  [types.SET_POPULARMOVIELIST]: (state, action) => {
    state.popularMovieLists = action.data
  },
  [types.SET_POPULARLOADING]: (state, action) => (state.isPopularLoading = action.isPopularLoading),
  // 랭크 영화
  [types.SET_RANKMOVIELIST]: (state, action) => {
    state.rankMovieLists = action.data
  },
  [types.SET_RANKLOADING]: (state, action) => (state.isRankLoading = action.isRankLoading),
  // 장르 영화
  [types.SET_GANREMOVIELIST]: (state, action) => {
    state.ganreMovieLists = action.data
  },
  [types.SET_GANRELOADING]: (state, action) => (state.isGanreLoading = action.isGanreLoading),
  // 장르 영화
  [types.SET_GANREMOVIELIST]: (state, action) => {
    state.ganreMovieLists = action.data
  },
  [types.SET_GANRELOADING]: (state, action) => (state.isGanreLoading = action.isGanreLoading),
  // 장르 영화
  [types.SET_GANREMOVIELIST]: (state, action) => {
    state.ganreMovieLists = action.data
  },
  [types.SET_GANRELOADING]: (state, action) => (state.isGanreLoading = action.isGanreLoading),
  // 장르 영화2
  [types.SET_GANREMOVIELIST2]: (state, action) => {
    state.ganreMovieLists2 = action.data
  },
  [types.SET_GANRELOADING2]: (state, action) => (state.isGanreLoading2 = action.isGanreLoading2),
  // 장르 영화3
  [types.SET_GANREMOVIELIST3]: (state, action) => {
    state.ganreMovieLists3 = action.data
  },
  [types.SET_GANRELOADING3]: (state, action) => (state.isGanreLoading3 = action.isGanreLoading3),
  // 국가 영화
  [types.SET_COUNTRYMOVIELIST]: (state, action) => {
    state.countryMovieLists = action.data
  },
  [types.SET_COUNTRYLOADING]: (state, action) => (state.isCountryLoading = action.isCountryLoading),
  // 국가 영화2
  [types.SET_COUNTRYMOVIELIST2]: (state, action) => {
    state.countryMovieLists2 = action.data
  },
  [types.SET_COUNTRYLOADING2]: (state, action) => (state.isCountryLoading2 = action.isCountryLoading2),
  // 국가 영화3
  [types.SET_COUNTRYMOVIELIST3]: (state, action) => {
    state.countryMovieLists3 = action.data
  },
  [types.SET_COUNTRYLOADING3]: (state, action) => (state.isCountryLoading3 = action.isCountryLoading3),
  // 영화 필터
  [types.SET_ISFILTER]: (state, action) => (state.isFilter = action.isFilter),
  // 값 변경
  [types.SET_VALUE]: setValueReducer,
});
export default reducer;