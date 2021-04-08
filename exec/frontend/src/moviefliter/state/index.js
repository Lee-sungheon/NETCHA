import { createReducer, createSetValueAction, setValueReducer } from '../../common/createReducer';

export const types = {
  // 영화 인피니트 스크롤
  REQUEST_ADD_MOVIELIST: 'filter/REQUEST_ADD_MOVIELIST',
  REQUEST_ADD_COUNTRYMOVIELIST: 'filter/REQUEST_ADD_COUNTRYMOVIELIST',
  REQUEST_ADD_GANREMOVIELIST: 'filter/REQUEST_ADD_GANREMOVIELIST',
  REQUEST_ADD_COUNTRYGANREMOVIELIST: 'filter/REQUEST_ADD_COUNTRYGANREMOVIELIST',
  ADD_MOVIELIST: 'filter/ADD_MOVIELIST',
  SET_INFINITE: 'filter/SET_INFINITE',
  SET_END: 'filter/SET_END',
  // 추천 영화
  REQUEST_MOVIELIST: 'filter/REQUEST_MOVIELIST',
  SET_MOVIELIST: 'filter/SET_MOVIELIST',
  SET_LOADING: 'filter/SET_LOADING',
  // 장르 영화
  REQUEST_GANREMOVIELIST: 'filter/REQUEST_GANREMOVIELIST',
  SET_GANREMOVIELIST: 'filter/SET_GANREMOVIELIST',
  SET_GANRELOADING: 'filter/SET_GANRELOADING',
  // 국가 영화
  REQUEST_COUNTRYMOVIELIST: 'filter/REQUEST_COUNTRYMOVIELIST',
  SET_COUNTRYMOVIELIST: 'filter/SET_COUNTRYMOVIELIST',
  SET_COUNTRYLOADING: 'filter/SET_COUNTRYLOADING',
  // 영화 필터링
  REQUEST_FILTERCOUNTRYMOVIELIST: 'filter/REQUEST_FILTERCOUNTRYMOVIELIST',
  REQUEST_FILTERGANREMOVIELIST: 'filter/REQUEST_FILTERGANREMOVIELIST',
  REQUEST_FILTERCOUNTRYGANREMOVIELIST: 'filter/REQUEST_FILTERCOUNTRYGANREMOVIELIST',
  SET_ISFILTER: 'filter/SET_ISFILTER',
  // 값 변경
  SET_VALUE: 'filter/SET_VALUE',
}

export const actions = {
  // 영화 인피니트 스크롤
  requestAddMovieList: (pageNum, userNo) => ({ type: types.REQUEST_ADD_MOVIELIST, pageNum, userNo }),
  requestAddCountryMovieList: (country, pageNum, userNo) => ({ type: types.REQUEST_ADD_COUNTRYMOVIELIST, country, pageNum, userNo }),
  requestAddGanreMovieList: (ganre, pageNum, userNo) => ({ type: types.REQUEST_ADD_GANREMOVIELIST, ganre, pageNum, userNo }),
  requestAddCountryGanreMovieList: (country, ganre, pageNum, userNo) => ({ type: types.REQUEST_ADD_COUNTRYGANREMOVIELIST, country,  ganre, pageNum, userNo }),
  addMovieList: data => ({ type: types.ADD_MOVIELIST, data }),
  setInfinite: isInfinite => ({
    type: types.SET_INFINITE,
    isInfinite,
  }),
  setEnd: infiniteEnd => ({
    type: types.SET_END,
    infiniteEnd,
  }),
  // 추천 영화
  requestMovieList: (pageNum, userNo) => ({ type: types.REQUEST_MOVIELIST, pageNum, userNo }),
  setMovieList: data => ({ type: types.SET_MOVIELIST, data }),
  setLoading: isLoading => ({
    type: types.SET_LOADING,
    isLoading,
  }),
  // 장르 영화
  requestGanreMovieList: (ganre, pageNum, userNo) => ({ type: types.REQUEST_GANREMOVIELIST, ganre, pageNum, userNo }),
  setGanreMovieList: data => ({ type: types.SET_GANREMOVIELIST, data }),
  setGanreLoading: isGanreLoading => ({
    type: types.SET_GANRELOADING,
    isGanreLoading,
  }),
  // 국가 영화
  requestCountryMovieList: (country, pageNum, userNo) => ({ type: types.REQUEST_COUNTRYMOVIELIST, country, pageNum, userNo }),
  setCountryMovieList: data => ({ type: types.SET_COUNTRYMOVIELIST, data }),
  setCountryLoading: isCountryLoading => ({
    type: types.SET_COUNTRYLOADING,
    isCountryLoading,
  }),
  // 키워드 영화
  requestKeywordMovieList: (keyword, pageNum, userNo) => ({ type: types.REQUEST_KEYWORDMOVIELIST, keyword, pageNum, userNo }),
  setKeywordMovieList: data => ({ type: types.SET_KEYWORDMOVIELIST, data }),
  setKeywordLoading: isKeywordLoading => ({
    type: types.SET_KEYWORDLOADING,
    isKeywordLoading,
  }),
  //영화 필터링
  requestFilterCountryMovieList: (country, pageNum, userNo) => ({ type: types.REQUEST_FILTERCOUNTRYMOVIELIST, country, pageNum, userNo }),
  requestFilterGanreMovieList: (ganre, pageNum, userNo) => ({ type: types.REQUEST_FILTERGANREMOVIELIST, ganre, pageNum, userNo }),
  requestFilterCountryGanreMovieList: (country, ganre, pageNum, userNo) => ({ type: types.REQUEST_FILTERCOUNTRYGANREMOVIELIST, country, ganre, pageNum, userNo }),
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
  infiniteEnd: false,
  isFilter: false,
};

const reducer = createReducer(INITIAL_STATE, {
  // 영화 인피니트 스크롤
  [types.ADD_MOVIELIST]: (state, action) => {
    state.movieLists = state.movieLists.concat(action.data)
  },
  [types.SET_INFINITE]: (state, action) => (state.isInfinite = action.isInfinite),
  [types.SET_END]: (state, action) => (state.infiniteEnd = action.infiniteEnd),
  // 추천 영화
  [types.SET_MOVIELIST]: (state, action) => {
    state.movieLists = action.data
  },
  [types.SET_LOADING]: (state, action) => (state.isLoading = action.isLoading),
  // 영화 필터
  [types.SET_ISFILTER]: (state, action) => (state.isFilter = action.isFilter),
  // 값 변경
  [types.SET_VALUE]: setValueReducer,
});
export default reducer;