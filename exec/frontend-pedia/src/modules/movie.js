import { createAction, handleActions } from 'redux-actions';
import creatRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as moviesAPI from '../lib/api/movies';
import { takeLatest } from 'redux-saga/effects';

const [
  READ_MOVIE,
  READ_MOVIE_SUCCESS,
  READ_MOVIE_FAILURE,
] = createRequestActionTypes('movie/READ_MOVIE');
const UNLOAD_MOVIE = 'moive/UNLOAD_MOVIE'; // 포스트 페이지에서 벗어날 때 데이터 비우기

export const readMovie = createAction(READ_MOVIE, (id) => id);
export const unloadMovie = createAction(UNLOAD_MOVIE);

const readMoiveSaga = creatRequestSaga(READ_MOVIE, moviesAPI.readMovie);
export function* movieSaga() {
  yield takeLatest(READ_MOVIE, readMoiveSaga);
}
const initialState = {
  movie: null,
  error: null,
};

const movie = handleActions(
  {
    [READ_MOVIE_SUCCESS]: (state, { payload: movie }) => ({
      ...state,
      movie,
    }),
    [READ_MOVIE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_MOVIE]: () => initialState,
  },
  initialState
);

export default movie;
