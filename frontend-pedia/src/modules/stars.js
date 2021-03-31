// import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import * as starsAPI from "../lib/api/userStatics";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";

const [
  LIST_STARS,
  LIST_STARS_SUCCESS,
  LIST_STARS_FAILURE,
] = createRequestActionTypes("stars/LIST_STARS");

export const listStars = createAction(
  LIST_STARS, 
  ({ userId }) => ({ userId })
);

// 사용지별 선호 태그 사가 생성
const listStarsSaga = createRequestSaga(LIST_STARS, starsAPI.listStars);
export function* starsSaga() {
  yield takeLatest(LIST_STARS, listStarsSaga);
}

const initialState = {
  stars: null,
  error: null,
};

const stars = handleActions(
  {
    [LIST_STARS_SUCCESS]: (state, { payload: stars }) => ({
      ...state,
      stars,
    }),
    [LIST_STARS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default stars;
