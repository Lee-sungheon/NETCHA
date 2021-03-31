// 루트 리듀서
import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import movie, { movieSaga } from './movie';
import loading from './loading';
import movies, { searchMoviesSaga, netchaRankingMoviesSaga, scoreMoviesSaga } from './movies';
import actors, { actorsSaga } from './actors';
import directors, { directorsSaga } from './directors';
import countries, { countriesSaga } from './countries';
import genres, { genresSaga } from './genres';
import tags, { tagsSaga } from './tags';

const rootReducer = combineReducers({
  loading,
  movie,
  movies,
  actors,
  directors,
  countries,
  genres,
  tags,
});

export function* rootSaga() {
  yield all([
    movieSaga(), 
    searchMoviesSaga(), 
    netchaRankingMoviesSaga(),
    scoreMoviesSaga(),
    actorsSaga(),
    directorsSaga(),
    countriesSaga(),
    genresSaga(),
    tagsSaga(),
  ]);
}

export default rootReducer;
