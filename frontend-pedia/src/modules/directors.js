// import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import * as directorsAPI from "../lib/api/userStatics";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";

const [
  LIST_DIRECTORS,
  LIST_DIRECTORS_SUCCESS,
  LIST_DIRECTORS_FAILURE,
] = createRequestActionTypes("directors/LIST_DIRECTORS");

export const listDirectors = createAction(
  LIST_DIRECTORS, 
  ({ userId }) => ({ userId })
);

// 사용지별 선호 감독 사가 생성
const listDirectorsSaga = createRequestSaga(LIST_DIRECTORS, directorsAPI.listLikeDirectors);
export function* directorsSaga() {
  yield takeLatest(LIST_DIRECTORS, listDirectorsSaga);
}

const initialState = {
  directors: null,
  error: null,
};

const directors = handleActions(
  {
    [LIST_DIRECTORS_SUCCESS]: (state, { payload: directors }) => ({
      ...state,
      directors,
    }),
    [LIST_DIRECTORS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default directors;
