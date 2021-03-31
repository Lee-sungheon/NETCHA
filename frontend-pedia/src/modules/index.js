// 루트 리듀서
import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import movie, { movieSaga } from './movie';
import loading from './loading';
import movies, { searchMoviesSaga, netchaRankingMoviesSaga, scoreMoviesSaga } from './movies';
import actors, { actorsSaga } from './actors';
import directors, { directorsSaga } from './directors';

const rootReducer = combineReducers({
  loading,
  movie,
  movies,
  actors,
  directors,
});

export function* rootSaga() {
  yield all([
    movieSaga(), 
    searchMoviesSaga(), 
    netchaRankingMoviesSaga(),
    scoreMoviesSaga(),
    actorsSaga(),
    directorsSaga(),
  ]);
}

export default rootReducer;
