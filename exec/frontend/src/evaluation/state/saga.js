import { all, call, put, takeLeading } from 'redux-saga/effects';
import { actions, types } from './index';
import { callApiEvaluationMovieList } from '../../common/api';

export function* fetchData(action) {
  yield put(actions.setLoading(true));
  yield put(actions.setValue('error', ''));
  try {
    const data = yield call(callApiEvaluationMovieList, action.pageNum, action.userNo);
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
  yield put(actions.setValue('error', ''));
  try {
    const data = yield call(callApiEvaluationMovieList, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.addMovieList(data));
    }
  } catch(error) {
    yield put(actions.setValue('error', error))
  }
  yield put(actions.setInfinite(false));
} 

export default function* saga() {
  yield all([
    takeLeading(types.REQUEST_MOVIELIST, fetchData),
    takeLeading(types.REQUEST_ADD_MOVIELIST, addData),
  ]);
}