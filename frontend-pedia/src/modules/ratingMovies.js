// import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import * as moviesAPI from "../lib/api/movies";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";

const INITIALIZE = "ratingMovies/INITIALIZE";
export const initialize = createAction(INITIALIZE);

// 사용자별 별점 준 영화 목록
const [
  LIST_RATING_MOVIES,
  LIST_RATING_MOVIES_SUCCESS,
  LIST_RATING_MOVIES_FAILURE,
] = createRequestActionTypes("ratingMovies/LIST_RATING_MOVIES");

export const listRatingMovies = createAction(
  LIST_RATING_MOVIES,
  (userId) => userId
);

// 사용지별 별점 준 영화 사가 생성
const listRatingMoviesSaga = createRequestSaga(
  LIST_RATING_MOVIES,
  moviesAPI.listRatingMovies
);
export function* ratingMoviesSaga() {
  yield takeLatest(LIST_RATING_MOVIES, listRatingMoviesSaga);
}

// 사용자별 별점 준 영화 개수
const [
  COUNT_RATING_MOVIES,
  COUNT_RATING_MOVIES_SUCCESS,
  COUNT_RATING_MOVIES_FAILURE,
] = createRequestActionTypes("ratingMovies/COUNT_RATING_MOVIES");

export const countRatingMovies = createAction(
  COUNT_RATING_MOVIES,
  (userId) => userId
);

const countRatingMoviesSaga = createRequestSaga(
  COUNT_RATING_MOVIES,
  moviesAPI.countRatingMovies
);
export function* ratingMoviescountSaga() {
  yield takeLatest(COUNT_RATING_MOVIES, countRatingMoviesSaga);
}

const initialState = {
  movies: null,
  count: null,
  error: null,
};

const ratingMovies = handleActions(
  {
    [LIST_RATING_MOVIES_SUCCESS]: (state, { payload: movies }) => ({
      ...state,
      movies,
    }),
    [LIST_RATING_MOVIES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [COUNT_RATING_MOVIES_SUCCESS]: (state, { payload: count }) => ({
      ...state,
      count,
    }),
    [COUNT_RATING_MOVIES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default ratingMovies;
