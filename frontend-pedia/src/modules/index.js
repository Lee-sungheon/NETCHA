// 루트 리듀서
import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import movie, { movieSaga } from './movie';
import loading from './loading';

const rootReducer = combineReducers({
  loading,
  movie,
});

export function* rootSaga() {
  yield all([movieSaga()]);
}

export default rootReducer;
