// 루트 리듀서
import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import movie, { movieSaga } from './movie';
import loading from './loading';
import movies, { searchMoviesSaga, scoreMoviesSaga } from './movies';
import actors, { actorsSaga } from './actors';
import directors, { directorsSaga } from './directors';
import countries, { countriesSaga } from './countries';
import genres, { genresSaga } from './genres';
import tags, { tagsSaga } from './tags';
import stars, { starsSaga } from './stars';
import netchaRankingMovies, { netchaRankingMoviesSaga } from './netchaRankingMovies';
import newMovies, { newMoviesSaga } from './newMovies';
import autoCompletesMovies, { autoCompletesMoviesSaga, initializeSaga, changeSearchKeywordSaga } from './autoCompletesMovies';
import user, { userSaga } from './user';

const rootReducer = combineReducers({
  loading,
  movie,
  movies,
  actors,
  directors,
  countries,
  genres,
  tags,
  stars,
  netchaRankingMovies,
  newMovies,
  autoCompletesMovies,
  user,
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
    starsSaga(),
    newMoviesSaga(),
    autoCompletesMoviesSaga(),
    initializeSaga(),
    changeSearchKeywordSaga(),
    userSaga(),
  ]);
}

export default rootReducer;
