// import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import * as moviesAPI from "../lib/api/movies";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import { takeLatest, put, takeEvery } from "redux-saga/effects";

const INITIALIZE = 'movies/AUTO_COMPLETES_INITIALIZE';
const CHANGE_SEARCH_KEYWORD = 'movies/CHANGE_SEARCH_KEYWORD';

export const initialize = createAction(INITIALIZE);
export const changeSearchKeyword = createAction(
  CHANGE_SEARCH_KEYWORD, 
  ({ keyword }) => ({ keyword })
);

export function* initializeSaga() {
  yield put({type: 'INITIALIZE'});
}
export function* changeSearchKeywordSaga() {
  yield takeEvery(CHANGE_SEARCH_KEYWORD, changeSearchKeyword);
}

// 검색창 자동 완성 영화 목록
const [
    AUTO_COMPLETES_MOVIES,
    AUTO_COMPLETES_MOVIES_SUCCESS,
    AUTO_COMPLETES_MOVIES_FAILURE,
] = createRequestActionTypes("movies/AUTO_COMPLETES_MOVIES");
  
export const listAutoCompletesMovies = createAction(
  AUTO_COMPLETES_MOVIES,
  (keyword) => (keyword)
);

// 검색창 자동 완성 영화 목록 사가 생성
const listautoCompletesMoviesSaga = createRequestSaga(
  AUTO_COMPLETES_MOVIES,
  moviesAPI.listAutoCompletesMovies
);
export function* autoCompletesMoviesSaga() {
  yield takeLatest(AUTO_COMPLETES_MOVIES, listautoCompletesMoviesSaga);
}

const initialState = {
  keyword: '',
  autoCompletesMovies: null,
  error: null,
};

const autoCompletesMovies = handleActions(
  {
    [INITIALIZE]: state => initialState,
    [CHANGE_SEARCH_KEYWORD]: (state, { payload: keyword }) => ({
      ...state,
      keyword,
    }),
    [AUTO_COMPLETES_MOVIES_SUCCESS]: (state, { payload: autoCompletesMovies }) => ({
      ...state,
      autoCompletesMovies,
    }),
    [AUTO_COMPLETES_MOVIES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default autoCompletesMovies;