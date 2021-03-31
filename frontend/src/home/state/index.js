import { createReducer, createSetValueAction, setValueReducer } from '../../common/createReducer';

export const types = {
  // 영화 인피니트 스크롤
  REQUEST_ADD_MOVIELIST: 'home/REQUEST_ADD_MOVIELIST',
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
  // 값 변경
  SET_VALUE: 'home/SET_VALUE',
};

export const actions = {
  // 영화 인피니트 스크롤
  requestAddMovieList: () => ({ type: types.REQUEST_ADD_MOVIELIST }),
  addMovieList: data => ({ type: types.ADD_MOVIELIST, data }),
  setInfinite: isInfinite => ({
    type: types.SET_INFINITE,
    isInfinite,
  }),
  // 추천 영화
  requestMovieList: () => ({ type: types.REQUEST_MOVIELIST }),
  setMovieList: data => ({ type: types.SET_MOVIELIST, data }),
  setLoading: isLoading => ({
    type: types.SET_LOADING,
    isLoading,
  }),
  // 최신 영화
  requestNewMovieList: () => ({ type: types.REQUEST_NEWMOVIELIST }),
  setNewMovieList: data => ({ type: types.SET_NEWMOVIELIST, data }),
  setNewLoading: isNewLoading => ({
    type: types.SET_NEWLOADING,
    isNewLoading,
  }),
  // 인기 영화
  requestPopularMovieList: () => ({ type: types.REQUEST_POPULARMOVIELIST }),
  setPopularMovieList: data => ({ type: types.SET_POPULARMOVIELIST, data }),
  setPopularLoading: isPopularLoading => ({
    type: types.SET_POPULARLOADING,
    isPopularLoading,
  }),
  // 값 변경
  setValue: createSetValueAction(types.SET_VALUE),
}

const INITIAL_STATE = { 
  movieLists: [], 
  isLoading: false, 
  error: '',
  isInfinite: false , 
  newMovieLists: [],
  isNewLoading: false,
  popularMovieLists: [],
  isPopularLoading: false,
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
  // 값 변경
  [types.SET_VALUE]: setValueReducer,
});
export default reducer;