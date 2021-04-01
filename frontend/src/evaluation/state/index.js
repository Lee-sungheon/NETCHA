import { createReducer, createSetValueAction, setValueReducer } from '../../common/createReducer';

export const types = {
  // 영화 인피니트 스크롤
  REQUEST_ADD_MOVIELIST: 'evaluation/REQUEST_ADD_MOVIELIST',
  ADD_MOVIELIST: 'evaluation/ADD_MOVIELIST',
  SET_INFINITE: 'evaluation/SET_INFINITE',
  // 추천 영화 받아오기
  REQUEST_MOVIELIST: 'evaluation/REQUEST_MOVIELIST',
  SET_MOVIELIST: 'evaluation/SET_MOVIELIST',
  SET_LOADING: 'evaluation/SET_LOADING',
  SET_VALUE: 'evaluation/SET_VALUE',
};

export const actions = {
  // 영화 인피니트 스크롤
  requestAddMovieList: (pageNum, userNo) => ({ type: types.REQUEST_ADD_MOVIELIST, pageNum, userNo }),
  addMovieList: data => ({ type: types.ADD_MOVIELIST, data }),
  setInfinite: isInfinite => ({
    type: types.SET_INFINITE,
    isInfinite,
  }),
  // 추천 영화 받아오기
  requestMovieList: (pageNum, userNo) => ({ type: types.REQUEST_MOVIELIST, pageNum, userNo }),
  setMovieList: data => ({ type: types.SET_MOVIELIST, data }),
  setLoading: isLoading => ({
    type: types.SET_LOADING,
    isLoading,
  }),
  setValue: createSetValueAction(types.SET_VALUE),
}

const INITIAL_STATE = { movieLists: [], isLoading: false, error: '', isInfinite: false , };
const reducer = createReducer(INITIAL_STATE, {
  // 영화 인피니트 스크롤
  [types.ADD_MOVIELIST]: (state, action) => {
    state.movieLists = state.movieLists.concat(action.data)
  },
  [types.SET_INFINITE]: (state, action) => (state.isInfinite = action.isInfinite),
  [types.SET_MOVIELIST]: (state, action) => {
    state.movieLists = action.data
  },
  [types.SET_LOADING]: (state, action) => (state.isLoading = action.isLoading),
  [types.SET_VALUE]: setValueReducer,
});
export default reducer;