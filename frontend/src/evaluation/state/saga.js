import { all, call, put, takeLeading } from 'redux-saga/effects';
import { actions, types } from './index';
import { callApiMovieList, callApiNewMovieList } from '../../common/api';

export function* fetchData() {
  yield put(actions.setLoading(true));
  yield put(actions.setValue('error', ''));
  try {
    const data = yield call(callApiNewMovieList);
    yield put(actions.setMovieList(data))
  } catch(error) {
    yield put(actions.setValue('error', error))
  }
  yield put(actions.setLoading(false));
} 

export function* addData() {
  yield put(actions.setInfinite(true));
  yield put(actions.setValue('error', ''));
  try {
    const data = yield call(callApiMovieList);
    yield put(actions.addMovieList(data))
  } catch(error) {
    yield put(actions.setValue('error', error))
  }
  yield put(actions.setInfinite(false));
} 

export default function* () {
  yield all([
    takeLeading(types.REQUEST_MOVIELIST, fetchData),
    takeLeading(types.REQUEST_ADD_MOVIELIST, addData),
  ]);
}