import { all, call, put, takeLeading } from 'redux-saga/effects';
import { actions, types } from './index';
import { callApiMovieList, callApiNewMovieList, callApiPopularMovieList, callApiContentMovieList } from '../../common/api';

export function* contentData() {
  yield put(actions.setLoading(true));
  yield put(actions.setValue('error', ''));
  try {
    const data = yield call(callApiContentMovieList, 1)
    yield put(actions.setMovieList(data))
  } catch(error) {
    yield put(actions.setValue('error', error))
  }
  yield put(actions.setLoading(false));
} 

export function* newData() {
  yield put(actions.setNewLoading(true));
  yield put(actions.setValue('error', ''));
  try {
    const data = yield call(callApiNewMovieList);
    yield put(actions.setNewMovieList(data))
  } catch(error) {
    yield put(actions.setValue('error', error))
  }
  yield put(actions.setNewLoading(false));
} 

export function* popularData() {
  yield put(actions.setPopularLoading(true));
  yield put(actions.setValue('error', ''));
  try {
    const data = yield call(callApiPopularMovieList);
    yield put(actions.setPopularMovieList(data))
  } catch(error) {
    yield put(actions.setValue('error', error))
  }
  yield put(actions.setPopularLoading(false));
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
    takeLeading(types.REQUEST_MOVIELIST, contentData),
    takeLeading(types.REQUEST_NEWMOVIELIST, newData),
    takeLeading(types.REQUEST_POPULARMOVIELIST, popularData),
    takeLeading(types.REQUEST_ADD_MOVIELIST, addData),
  ]);
}