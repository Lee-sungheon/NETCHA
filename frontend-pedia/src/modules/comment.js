import { createAction, handleActions } from 'redux-actions';
import creatRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as moviesAPI from '../lib/api/movies';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'comment/INITIALIZE'; // 모든 내용 초기화
const CHANGE_FIELD = 'comment/CHANGE_FIELD'; // 특정 key 값 바꾸기
const [
  WRITE_COMMENT,
  WRITE_COMMENT_SUCCESS,
  WRITE_COMMENT_FAILURE,
] = createRequestActionTypes('comment/WRITE_COMMENT'); // 코멘트 작성
const SET_ORIGINAL_COMMENT = 'comment/SET_ORIGINAL_COMMENT';
const [
  UPDATE_COMMENT,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,
] = createRequestActionTypes('comment/UPDATE_COMMENT'); // 코멘트 수정

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const writeComment = createAction(WRITE_COMMENT, ({ comment }) => ({
  comment,
}));
export const setOriginalComment = createAction(
  SET_ORIGINAL_COMMENT,
  (comment) => comment
);
export const updateComment = createAction(
  UPDATE_COMMENT,
  ({ id, title, body }) => ({
    id,
    title,
    body,
  })
);

// saga 생성
const writeCommentSaga = createRequestSaga(
  WRITE_COMMENT,
  commentsAPI.writeComment
);
const updateCommentSaga = createRequestSaga(
  UPDATE_COMMENT,
  commentsAPI.updateComment
);

export function* writeSaga() {
  yield takeLatest(WRITE_COMMENT, writeCommentSaga);
  yield takeLatest(UPDATE_COMMENT, updateCommentSaga);
}

const initialState = {
  title: '',
  body: '',
  comment: null,
  commentError: null,
  originalCommentId: null,
};

const write = handleActions(
  {
    [INITIALIZE]: (state) => initialState, // initialState를 넣으면 초기상태로 바뀜
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value, // 특정 key 값을 업데이트
    }),
    [WRITE_COMMENT]: (state) => ({
      ...state,
      // comment와 commentError를 초기화
      comment: null,
      commentError: null,
    }),
    // 코멘트 작성 성공
    [WRITE_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
      ...state,
      comment,
    }),
    // 코멘트 작성 실패
    [WRITE_COMMENT_FAILURE]: (state, { payload: commentError }) => ({
      ...state,
      commentError,
    }),
    [SET_ORIGINAL_COMMENT]: (state, { payload: comment }) => ({
      ...state,
      title: comment.title,
      body: comment.body,
      originalCommentId: comment._id,
    }),
    [UPDATE_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
      ...state,
      comment,
    }),
    [UPDATE_COMMENT_FAILURE]: (state, { payload: commentError }) => ({
      ...state,
      commentError,
    }),
  },
  initialState
);

export default write;
