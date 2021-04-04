// import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import { takeLatest, put, takeEvery, call } from "redux-saga/effects";
import * as authAPI from "../lib/api/auth";

const INITIALIZE = 'user/INITIALIZE';
const SET_USER = 'user/SET_USER';
const TEMP_SET_USER = "user/TEMP_SET_USER"; // 새로고침 이후 임시 로그인 처리
// 회원 정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  "user/CHECK"
);
const LOGOUT = "user/LOGOUT";

export const setUser = createAction(SET_USER, ({userId, userName}) => ({userId, userName}));
export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

export function* setUserSaga() {
  yield takeEvery(SET_USER, setUser);
}

const checkSaga = createRequestSaga(CHECK, authAPI.check);

function* logoutSaga() {
  try {
    localStorage.removeItem('user');
    yield call(authAPI.logout);
  } catch(e) {
    console.log(e);
  }
}
export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}


const initialState = {
  user: null,
  checkError: null,
};

const user = handleActions(
  {
    [INITIALIZE]: state => initialState,
    [SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
    [LOGOUT]: state => ({
      ...state,
      user: null,
    }),
  },
  initialState
);

export default user;