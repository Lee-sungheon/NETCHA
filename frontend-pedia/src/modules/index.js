// 루트 리듀서
import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import movie, { movieSaga } from './movie';
import loading from './loading';
import movies, { searchMoviesSaga, netChaRankingMoviesSaga, scoreMoviesSaga } from './movies';
import actors, { actorsSaga } from './likeActors';

const rootReducer = combineReducers({
  loading,
  movie,
  movies,
  actors,
});

export function* rootSaga() {
  yield all([
    movieSaga(), 
    searchMoviesSaga(), 
    netChaRankingMoviesSaga(),
    scoreMoviesSaga(),
    actorsSaga()
  ]);
}

export default rootReducer;
