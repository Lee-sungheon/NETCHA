import { all, call, put, takeLeading, debounce } from 'redux-saga/effects';
import { actions, types } from './index';
// import { callApiLike } from '../../common/api'

export function* trySetText(action) {
  yield put(actions.setValue('text', action.text));
}

export default function* () {
  yield all([
    debounce(0, types.TRY_SET_TEXT, trySetText),
  ]);
}