// import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import * as moviesAPI from '../lib/api/movies';
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import { takeLatest } from 'redux-saga/effects';
const SET_SEARCH_KEYWORD = 'search/SET_SEARCH_KEYWORD';
const INITIALIZE_INPUT = 'search/INITIALIZE_INPUT';

const [
  SEARCH_MOVIES,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES_FAILURE,
] = createRequestActionTypes('movie/SEARCH_MOVIES');
// const UNLOAD_MOVIES = 'movie/UNLOAD_MOVIE'; // 영화 검색 페이지에서 벗어날 때 데이터 비우기

export const searchMovies = createAction(SEARCH_MOVIES, ({keyword}) => ({keyword}));

export const setSearchKeyword = createAction(
  SET_SEARCH_KEYWORD,
  (keyword) => ({keyword})
);

export const initializeInput = createAction(INITIALIZE_INPUT, keyword => keyword);


// 사가 생성
const searchMoviesSaga = createRequestSaga(SEARCH_MOVIES, moviesAPI.searchMovies);
export function* moviesSaga() {
  yield takeLatest(SEARCH_MOVIES, searchMoviesSaga);
}

const initialState = {
  keyword: "",
  movies: [],
};

const movies = handleActions(
    {
        [SET_SEARCH_KEYWORD]: (state, {payload: {keyword}}) => ({
            ...state,
            keyword,
        }),
        [SEARCH_MOVIES_SUCCESS]: (state, { payload: movies }) => ({
          ...state,
          movies,
        }),
        [SEARCH_MOVIES_FAILURE]: (state, { payload: error }) => ({
          ...state,
          error,
        }),
        [UNLOAD_MOVIES]: () => initialState,
    },
    initialState
);

export default movies;
