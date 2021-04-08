// import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import * as actorsAPI from "../lib/api/userStatics";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";

const [
  LIST_ACTORS,
  LIST_ACTORS_SUCCESS,
  LIST_ACTORS_FAILURE,
] = createRequestActionTypes("actors/LIST_ACTORS");

export const listActors = createAction(
  LIST_ACTORS, 
  ({ userId }) => ({ userId })
);

// 사용지별 선호 배우 사가 생성
const listActorsSaga = createRequestSaga(LIST_ACTORS, actorsAPI.listLikeActors);
export function* actorsSaga() {
  yield takeLatest(LIST_ACTORS, listActorsSaga);
}

const initialState = {
  actors: null,
  error: null,
};

const actors = handleActions(
  {
    [LIST_ACTORS_SUCCESS]: (state, { payload: actors }) => ({
      ...state,
      actors,
    }),
    [LIST_ACTORS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default actors;
