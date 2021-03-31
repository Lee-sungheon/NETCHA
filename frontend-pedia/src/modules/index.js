// 루트 리듀서
import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import movie, { movieSaga } from './movie';
import loading from './loading';
import movies, { searchMoviesSaga, netChaRankingMoviesSaga } from './movies';

const rootReducer = combineReducers({
  loading,
  movie,
  movies,
});

export function* rootSaga() {
  yield all([movieSaga(), searchMoviesSaga(), netChaRankingMoviesSaga()]);
}

export default rootReducer;
