import { createAction, handleActions } from 'redux-actions';
import creatRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as moviesAPI from '../lib/api/movies';
import { takeLatest } from 'redux-saga/effects';

const [
  UPDATE_RANK,
  UPDATE_RANK_SUCCESS,
  UPDATE_RANK_FAILURE,
] = createRequestActionTypes('rank/UPDATE_RANK');
const UNLOAD_RANK = 'rank/UNLOAD_MOVIE'; // 업데이트 페이지에서 벗어날 때 데이터 비우기

export const updateRank = createAction(UPDATE_RANK, (rankData) => rankData);
export const unloadRank = createAction(UNLOAD_MOVIE);

const updateRankSaga = creatRequestSaga(UPDATE_RANK, moviesAPI.readMovie);
export function* movieSaga() {
  yield takeLatest(UPDATE_RANK, updateRankSaga);
}
const initialState = {
  rank: null,
  error: null,
};

const movie = handleActions(
  {
    [UPDATE_RANK_SUCCESS]: (state, { payload: rank }) => ({
      ...state,
      rank,
    }),
    [UPDATE_RANK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_RANK]: () => initialState,
  },
  initialState
);

export default movie;
