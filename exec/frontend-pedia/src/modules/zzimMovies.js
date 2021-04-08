// import produce from "immer";
import { createAction, handleActions } from 'redux-actions';
import * as moviesAPI from '../lib/api/movies';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'zzimMovies/INITIALIZE';
export const initialize = createAction(INITIALIZE);

// 사용자별 찜한 영화 목록
const [
  LIST_ZZIM_MOVIES,
  LIST_ZZIM_MOVIES_SUCCESS,
  LIST_ZZIM_MOVIES_FAILURE,
] = createRequestActionTypes('zzimMovies/LIST_ZZIM_MOVIES');

export const listZzimMovies = createAction(
  LIST_ZZIM_MOVIES,
  (userId) => (userId)
);

// 사용지별 찜한 영화 사가 생성
const listZzimMoviesSaga = createRequestSaga(
  LIST_ZZIM_MOVIES,
  moviesAPI.listZzimMovies
);
export function* zzimMoviesSaga() {
  yield takeLatest(LIST_ZZIM_MOVIES, listZzimMoviesSaga);
}

// 사용자별 찜한 영화 개수
const [
  COUNT_ZZIM_MOVIES,
  COUNT_ZZIM_MOVIES_SUCCESS,
  COUNT_ZZIM_MOVIES_FAILURE,
] = createRequestActionTypes("zzimMovies/COUNT_ZZIM_MOVIES");

export const countZzimMovies = createAction(
  COUNT_ZZIM_MOVIES,
  (userId) => userId
);

const countZzimMoviesSaga = createRequestSaga(
  COUNT_ZZIM_MOVIES,
  moviesAPI.countZzimMovies
);
export function* zzimMoviescountSaga() {
  yield takeLatest(COUNT_ZZIM_MOVIES, countZzimMoviesSaga);
}

const initialState = {
  movies: null,
  count: null,
  error: null,
};

const zzimMovies = handleActions(
  {
    [LIST_ZZIM_MOVIES_SUCCESS]: (state, { payload: movies }) => ({
      ...state,
      movies,
    }),
    [LIST_ZZIM_MOVIES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [COUNT_ZZIM_MOVIES_SUCCESS]: (state, { payload: count }) => ({
      ...state,
      count,
    }),
    [COUNT_ZZIM_MOVIES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default zzimMovies;
