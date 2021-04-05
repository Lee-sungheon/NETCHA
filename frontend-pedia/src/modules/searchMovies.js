// import produce from "immer";
import { createAction, handleActions } from 'redux-actions';
import * as moviesAPI from '../lib/api/movies';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { takeLatest, takeEvery } from 'redux-saga/effects';

// const INITIALIZE = 'movies/INITIALIZE';
// export const initialize = createAction(INITIALIZE);

const SET_PAGE = 'searchMovies/SET_PAGE';
export const setPage = createAction(SET_PAGE, (page) => page);

export function* setPageSaga() {
  yield takeEvery(SET_PAGE, setPage);
}

// 검색한 영화 목록
const [
  LIST_SEARCH_MOVIES,
  LIST_SEARCH_MOVIES_SUCCESS,
  LIST_SEARCH_MOVIES_FAILURE,
] = createRequestActionTypes('searchMovies/LIST_SEARCH_MOVIES');

export const listSearchMovies = createAction(
  LIST_SEARCH_MOVIES,
  ({ keyword, page }) => ({ keyword, page })
);

// 검색한 영화 목록 사가 생성
const listsearchMoviesSaga = createRequestSaga(
  LIST_SEARCH_MOVIES,
  moviesAPI.listSearchMovies
);
export function* searchMoviesSaga() {
  yield takeLatest(LIST_SEARCH_MOVIES, listsearchMoviesSaga);
}

const initialState = {
  movies: null,
  page: 0,
  error: null,
};

const searchMovies = handleActions(
  {
    [LIST_SEARCH_MOVIES_SUCCESS]: (state, { payload: movies }) => ({
      ...state,
      movies,
    }),
    [LIST_SEARCH_MOVIES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [SET_PAGE]: (state, { payload: page }) => ({
      ...state,
      page,
    }),
  },
  initialState
);

export default searchMovies;
