// import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import * as tagsAPI from "../lib/api/userStatics";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";

const [
  LIST_TAGS,
  LIST_TAGS_SUCCESS,
  LIST_TAGS_FAILURE,
] = createRequestActionTypes("tags/LIST_TAGS");

export const listTags = createAction(
  LIST_TAGS, 
  ({ userId }) => ({ userId })
);

// 사용지별 선호 태그 사가 생성
const listTagsSaga = createRequestSaga(LIST_TAGS, tagsAPI.listTags);
export function* tagsSaga() {
  yield takeLatest(LIST_TAGS, listTagsSaga);
}

const initialState = {
  tags: null,
  error: null,
};

const tags = handleActions(
  {
    [LIST_TAGS_SUCCESS]: (state, { payload: tags }) => ({
      ...state,
      tags,
    }),
    [LIST_TAGS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default tags;
