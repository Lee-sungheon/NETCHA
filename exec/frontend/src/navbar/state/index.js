import {
  createReducer,
  createSetValueAction,
  setValueReducer,
} from "../../common/createReducer";

export const types = {
  // 영화 인피니트 스크롤
  REQUEST_ADD_MOVIELIST: "search/REQUEST_ADD_MOVIELIST",
  REQUEST_ADD_COUNTRYMOVIELIST: "search/REQUEST_ADD_COUNTRYMOVIELIST",
  REQUEST_ADD_GANREMOVIELIST: "search/REQUEST_ADD_GANREMOVIELIST",
  REQUEST_ADD_SEARCHMOVIELIST: "search/REQUEST_ADD_SEARCHMOVIELIST",
  REQUEST_ADD_CASTMOVIELIST: "search/REQUEST_ADD_CASTMOVIELIST",
  REQUEST_ADD_DIRECTORMOVIELIST: "search/REQUEST_ADD_DIRECTORMOVIELIST",
  ADD_MOVIELIST: "search/ADD_MOVIELIST",
  SET_INFINITE: "search/SET_INFINITE",
  SET_END: "search/SET_END",

  REQUEST_SEARCHMOVIELIST: "search/REQUEST_SEARCHMOVIELIST",
  SET_MOVIELIST: "search/SET_MOVIELIST",
  SET_LOADING: "search/SET_LOADING",
  SET_VALUE: "search/SET_VALUE",
  TRY_SET_TEXT: "search/TRY_SET_TEXT",

  SET_ISZZIM: "search/SET_ISZZIM",
  SET_ISLIKE: "search/SET_ISLIKE",

  // 장르 영화
  REQUEST_GANREMOVIELIST: "search/REQUEST_GANREMOVIELIST",
  // 국가 영화
  REQUEST_COUNTRYMOVIELIST: "search/REQUEST_COUNTRYMOVIELIST",
  // 감독 영화
  REQUEST_DIRECTORMOVIELIST: "search/REQUEST_DIRECTORMOVIELIST",
  // 배우 영화
  REQUEST_CASTMOVIELIST: "search/REQUEST_CASTMOVIELIST",

  //헤더 토글
  HEADER_TOGGLE: "header/HEADER_TOGGLE",
};

export const navActions = {
  // 헤더 토글
  headerToggle: (isHeader) => ({ type: types.HEADER_TOGGLE, isHeader }),
};

export const actions = {
  requestSearchMovieList: (search, pageNum, userNo) => ({ type: types.REQUEST_SEARCHMOVIELIST, search, pageNum, userNo }),
  setMovieList: (data) => ({ type: types.SET_MOVIELIST, data }),
  setLoading: (isLoading) => ({
    type: types.SET_LOADING,
    isLoading,
  }),
  setValue: createSetValueAction(types.SET_VALUE),
  trySetText: (text) => ({
    type: types.TRY_SET_TEXT,
    text,
  }),
  setIsZzim: (data, isTrue) => ({
    type: types.SET_ISZZIM,
    data,
    isTrue,
  }),
  setIsLike: (movieNo, like) => ({
    type: types.SET_ISLIKE,
    movieNo,
    like,
  }),
  // 영화 인피니트 스크롤
  requestAddMovieList: (pageNum, userNo) => ({
    type: types.REQUEST_ADD_MOVIELIST,
    pageNum,
    userNo,
  }),
  requestAddCountryMovieList: (country, pageNum, userNo) => ({
    type: types.REQUEST_ADD_COUNTRYMOVIELIST,
    country,
    pageNum,
    userNo,
  }),
  requestAddGanreMovieList: (ganre, pageNum, userNo) => ({
    type: types.REQUEST_ADD_GANREMOVIELIST,
    ganre,
    pageNum,
    userNo,
  }),
  requestAddSearchMovieList: (search, pageNum, userNo) => ({
    type: types.REQUEST_ADD_SEARCHMOVIELIST,
    search,
    pageNum,
    userNo,
  }),
  requestAddCastMovieList: (cast, pageNum, userNo) => ({
    type: types.REQUEST_ADD_SEARCHMOVIELIST,
    cast,
    pageNum,
    userNo,
  }),
  requestAddDirectorMovieList: (director, pageNum, userNo) => ({
    type: types.REQUEST_ADD_SEARCHMOVIELIST,
    director,
    pageNum,
    userNo,
  }),
  addMovieList: (data) => ({ type: types.ADD_MOVIELIST, data }),
  setInfinite: (isInfinite) => ({
    type: types.SET_INFINITE,
    isInfinite,
  }),
  setEnd: (infiniteEnd) => ({
    type: types.SET_END,
    infiniteEnd,
  }),
  // 장르 영화
  requestGanreMovieList: (ganre, pageNum, userNo) => ({
    type: types.REQUEST_GANREMOVIELIST,
    ganre,
    pageNum,
    userNo,
  }),
  // 국가 영화
  requestCountryMovieList: (country, pageNum, userNo) => ({
    type: types.REQUEST_COUNTRYMOVIELIST,
    country,
    pageNum,
    userNo,
  }),
  // 감독 영화
  requestDirectorMovieList: (director, pageNum, userNo) => ({
    type: types.REQUEST_DIRECTORMOVIELIST,
    director,
    userNo,
    pageNum, 
  }),
  // 배우 영화
  requestCastMovieList: (cast, pageNum, userNo) => ({
    type: types.REQUEST_CASTMOVIELIST,
    cast,
    userNo,
    pageNum, 
  }),
};

const INITIAL_STATE = {
  text: "",
  movieLists: [],
  isLoading: false,
  error: "",
  isInfinite: false,
  infiniteEnd: false,
  isLike: [],
  isZzim: [],
  isHeader: true,
};

const reducer = createReducer(INITIAL_STATE, {
  // 영화 인피니트 스크롤
  [types.ADD_MOVIELIST]: (state, action) => {
    state.movieLists = state.movieLists.concat(action.data);
  },
  [types.SET_INFINITE]: (state, action) =>
    (state.isInfinite = action.isInfinite),
  [types.SET_END]: (state, action) => (state.infiniteEnd = action.infiniteEnd),

  [types.SET_ISZZIM]: (state, action) => {
    if (!action.isTrue) {
      const idx = state.isZzim.indexOf([action.data, false]);
      if (idx >= 0) {
        state.isZzim[idx][1] = true;
      } else {
        state.isZzim = state.isZzim.concat([[action.data, action.isTrue]]);
      }
    } else {
      const idx = state.isZzim.indexOf([action.data, true]);
      if (idx >= 0) {
        state.isZzim[idx][1] = false;
      } else {
        state.isZzim = state.isZzim.concat([[action.data, action.isTrue]]);
      }
    }
  },

  [types.SET_ISLIKE]: (state, action) => {
    let isBreak = false;
    for (let i = 0; i < state.isLike.length; i++) {
      if (state.isLike[i][0] === action.movieNo) {
        state.isLike[i][0] = [action.movieNo, action.like];
        isBreak = true;
        break;
      }
    }
    if (!isBreak) {
      state.isLike = state.isLike.concat([[action.movieNo, action.like]]);
    }
  },

  [types.SET_MOVIELIST]: (state, action) => {
    state.movieLists = action.data;
  },
  [types.SET_LOADING]: (state, action) => (state.isLoading = action.isLoading),
  [types.SET_VALUE]: setValueReducer,
  [types.HEADER_TOGGLE]: (state, action) => {
    state.isHeader = action.isHeader;
  },
});
export default reducer;
