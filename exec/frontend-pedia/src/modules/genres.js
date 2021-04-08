// import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import * as genresAPI from "../lib/api/userStatics";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";

const [
  LIST_GENRES,
  LIST_GENRES_SUCCESS,
  LIST_GENRES_FAILURE,
] = createRequestActionTypes("genres/LIST_GENRES");

export const listGenres = createAction(
  LIST_GENRES, 
  ({ userId }) => ({ userId })
);

// 사용지별 선호 장르 사가 생성
const listGenresSaga = createRequestSaga(LIST_GENRES, genresAPI.listGenres);
export function* genresSaga() {
  yield takeLatest(LIST_GENRES, listGenresSaga);
}

const initialState = {
  genres: null,
  error: null,
};

const genres = handleActions(
  {
    [LIST_GENRES_SUCCESS]: (state, { payload: genres }) => ({
      ...state,
      genres,
    }),
    [LIST_GENRES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default genres;
