import { all, call, put, takeLeading } from 'redux-saga/effects';
import { likeactions, types } from './index';
import { callApiLikeMovieList } from '../../common/api';

export function* likeData(action) {
  yield put(likeactions.setEnd(false));
  yield put(likeactions.setValue('error', ''));
  try {
    const data = yield call(callApiLikeMovieList, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(likeactions.setMovieList(data));
    }
  } catch(error) {
    yield put(likeactions.setValue('error', error))
  }
  yield put(likeactions.setLoading(false));
} 

export function* addData(action) {
  yield put(likeactions.setInfinite(true));
  try {
    const data = yield call(callApiLikeMovieList, action.pageNum, action.userNo);
    if (data !== undefined) {
      if (data.length === 0) {
        yield put(likeactions.setEnd(true));
      } else {
        yield put(likeactions.addMovieList(data));
      }
    } else {
      yield put(likeactions.setEnd(true));
    }
  } catch(error) {
  }
  yield put(likeactions.setInfinite(false));
}

export default function* saga() {
  yield all([
    takeLeading(types.REQUEST_MOVIELIST, likeData),
    takeLeading(types.REQUEST_ADD_MOVIELIST, addData),
  ]);
}