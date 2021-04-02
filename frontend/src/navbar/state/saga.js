import { all, call, put, debounce, takeLeading } from 'redux-saga/effects';
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

export function* trySetText(action) {
  yield put(actions.setValue('text', action.text));
}

export default function* () {
  yield all([
    debounce(1000, types.REQUEST_MOVIELIST, fetchData),
    debounce(0, types.TRY_SET_TEXT, trySetText),
  ]);
}