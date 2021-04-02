import { all, call, put, takeLeading } from 'redux-saga/effects';
import { actions, types } from './index';
import { callApiMovieList } from '../../common/api';

export function* fetchData() {
  yield put(actions.setLoading(true));
  yield put(actions.setValue('error', ''));
  try {
    const data = yield call(callApiMovieList);
    if (data !== undefined) {
      yield put(actions.setMovieList(data));
    }
  } catch(error) {
    yield put(actions.setValue('error', error))
  }
  yield put(actions.setLoading(false));
} 

export default function* () {
  yield all([
    takeLeading(types.REQUEST_MOVIELIST, fetchData),
  ]);
}