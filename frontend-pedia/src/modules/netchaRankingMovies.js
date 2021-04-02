// import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import * as moviesAPI from "../lib/api/movies";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";

const INITIALIZE = "netchaRankingMovies/INITIALIZE";
export const initialize = createAction(INITIALIZE);

// 넷챠 영화 순위
const [
  NETCHA_RANKING_MOVIES,
  NETCHA_RANKING_MOVIES_SUCCESS,
  NETCHA_RANKING_MOVIES_FAILURE,
] = createRequestActionTypes("netchaRankingMovies/NETCHA_RANKING_MOVIES");

export const listNetChaRankingMovies = createAction(NETCHA_RANKING_MOVIES);

// 넷챠 영화 순위 사가 생성
const listNetChaRankingMoviesSaga = createRequestSaga(
  NETCHA_RANKING_MOVIES,
  moviesAPI.listNetChaRankingMovies
);
export function* netchaRankingMoviesSaga() {
  yield takeLatest(NETCHA_RANKING_MOVIES, listNetChaRankingMoviesSaga);
}

const initialState = {
  movies: null,
  error: null,
};

const netchaRankingMovies = handleActions(
  {
    [NETCHA_RANKING_MOVIES_SUCCESS]: (state, { payload: movies }) => ({
      ...state,
      movies,
    }),
    [NETCHA_RANKING_MOVIES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default netchaRankingMovies;
