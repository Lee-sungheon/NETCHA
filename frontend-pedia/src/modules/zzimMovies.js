// import produce from "immer";
import { createAction, handleActions } from 'redux-actions';
import * as moviesAPI from '../lib/api/movies';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'zzimMovies/INITIALIZE';
export const initialize = createAction(INITIALIZE);

// 사용자별 별점 준 영화 목록
const [
  LIST_ZZIM_MOVIES,
  LIST_ZZIM_MOVIES_SUCCESS,
  LIST_ZZIM_MOVIES_FAILURE,
] = createRequestActionTypes('zzimMovies/LIST_ZZIM_MOVIES');

export const listZzimMovies = createAction(
  LIST_ZZIM_MOVIES,
  (userId) => (userId)
);

// 사용지별 별점 준 영화 사가 생성
const listZzimMoviesSaga = createRequestSaga(
  LIST_ZZIM_MOVIES,
  moviesAPI.listZzimMovies
);
export function* zzimMoviesSaga() {
  yield takeLatest(LIST_ZZIM_MOVIES, listZzimMoviesSaga);
}

const initialState = {
  movies: null,
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
  },
  initialState
);

export default zzimMovies;
