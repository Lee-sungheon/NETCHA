import { all, call, put, takeLeading } from 'redux-saga/effects';
import { actions, types } from './index';
import { callApiLikeMovieList } from '../../common/api';

export function* likeData(action) {
  yield put(actions.setEnd(false));
  yield put(actions.setValue('error', ''));
  try {
    const data = yield call(callApiLikeMovieList, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.setMovieList(data));
    }
  } catch(error) {
    yield put(actions.setValue('error', error))
  }
  yield put(actions.setLoading(false));
} 

export function* addData(action) {
  yield put(actions.setInfinite(true));
  try {
    const data = yield call(callApiLikeMovieList, action.pageNum, action.userNo);
    if (data !== undefined) {
      if (data.length === 0) {
        yield put(actions.setEnd(true));
      } else {
        yield put(actions.addMovieList(data));
      }
    } else {
      yield put(actions.setEnd(true));
    }
  } catch(error) {
  }
  yield put(actions.setInfinite(false));
}

export default function* () {
  yield all([
    takeLeading(types.REQUEST_MOVIELIST, likeData),
    takeLeading(types.REQUEST_ADD_MOVIELIST, addData),
  ]);
}